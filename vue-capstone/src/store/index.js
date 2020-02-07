import Vue from 'vue'
// For connecting to Django backend using JWT
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt_decode from 'jwt-decode'
import Vuex from 'vuex'
import router from '../router'

// For using JWT and Axios
Vue.use(VueAxios, axios)
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        user:{
            userId: '',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            favorites: '',
        },
        // For managing User logins
        authUser: null,
        isAuthenticated: false,
        // JSON Web Token 
        jwt:{
            access: localStorage.getItem('accessToken'),
            refresh: localStorage.getItem('refreshToken'),
            refreshExpiration: localStorage.getItem('refreshExpiration'),
            accessExpiration: localStorage.getItem('accessExpiration'), 
        },
        // Endpoints to access the backend 
        endpoints: {
            obtainJWT: 'http://localhost:8000/auth/jwt/create/',
            refreshJWT: 'http://localhost:8000/auth/jwt/refresh/',
            baseURL: 'http://localhost:8000',
            baseAPI: 'http://localhost:8000/api/v1',
        },
        // Rules for the form 
        formRules: {
			name: [
				v => !!v || 'Name is required.',
				v => (v && v.length) <= 30 || 'Name must be less than 30 characters.',
				v => (v && v.length) >= 3 || 'Name must be at least 3 characters.',
			],
			email: [
				v => !!v || 'E-mail is required.',
				// v => /.+@.+/.test(v) || 'E-mail must be valid.',
				v => (v && v.indexOf("@") !== 0) || 'Email should have username.',
				v => (v && !!v.includes("@")) || 'Email should have @ sybol.',
				v => (v && v.indexOf(".") - v.indexOf('@') > 1)|| 'Email should have have domain.',
				v => (v && !!v.indexOf(".")) || 'Email should have have domain.',
				v => (v && v.indexOf('.') <= v.length - 3) || 'Email should contain a valid domain extension.'
            ],
            password: [
                v => !!v || 'Password is required.',
                v => (v && v.length) >= 6 || 'Password must be at least 6 characters.',
            ],
            description: [
                v => !!v || 'Description is required.',
                v => (v && v.length) >= 3 || 'Name must be at least 3 characters.',
            ],
            code: [ v => !!v || 'Please input Organization code.' ],
        }
    },
    // the getters take in the state of the yellow sections and stores it for later use 
    getters: {
        // loggedIn (state){ return !!state.authUser},
        //this is the user id
        userId(state){ return state.authUser.user_id},
        //this is the user name 
        user(state){ return state.authUser.username },
        //this gets the favorites
        favorite(state){ return state.authUser.favorites },
        //this returns if they are authenticated
        isAuthenticated(state){ return state.isAuthenticated },
        //this is the access token 
        accessToken(state){ return state.jwt.access },
        //this is the refresh token
        refreshToken(state){ return state.jwt.refresh },
        //this is the endpoints 
        endpoints(state){ return state.endpoints },
        //this is the form rules 
        formRules(state){ return state.formRules }
        },
     // end Vuex state

    mutations: {
    
        // Login: set the authenticated user in state
        setAuthUser(state,{
            authUser,
            isAuthenticated,
        }){
            Vue.set(state, 'authUser', authUser)
            Vue.set(state, 'isAuthenticated', isAuthenticated)
        },
        // Logout: null authenticated user in state
        unsetAuthUser(state){
            Vue.set(state, 'authUser', {});
            Vue.set(state, 'isAuthenticated', false)
        },
        // Update local storage and Vuex state with new JWT
        updateToken(state, newToken) {
            // Broken into two if statements as the refresh token is not always provided
            if(newToken.access){
                state.jwt.access = newToken.access;
				state.jwt.accessExpiration = jwt_decode(newToken.access).exp;	
                localStorage.setItem('accessToken', newToken.access);
                state.jwt_access = newToken.access;
            }
            if(newToken.refresh){
                state.jwt.refresh = newToken.refresh;
				state.jwt.refreshExpiration  = jwt_decode(newToken.refresh).exp;  
                localStorage.setItem('refreshToken', newToken.refresh);
                state.jwt_refresh = newToken.refresh;
            }
        },
        // Remove JWT from local Vuex storage and state
        removeToken(state) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.jwt_access = null;
            state.jwt_refresh = null;
        },
    }, 
     // end Vuex mutations
    actions: {
        // Delete tokens and log user out this is for the logout button

        homeToken(context, payload) {
            console.log("hello")
            axios.post(this.state.endpoints.obtainJWT, payload)
                .then(response => {
                    
                    // update token with the response data that comes back from the post
                    this.commit('updateToken', response.data);
                
                    // Set state information for logged in user
                    const token = response.data.access
                    if (token) {
                        // use jwt_decode library to extract user_id from JWT 
                        // const decoded = jwt_decode(token);
                        // const user_id = decoded.user_id

                        // send user_id next axios call, to pull User info from API
                        return axios({
                            method: 'get',
                            url: `http://localhost:8000/auth/users/me/`,
                            headers: {
                                authorization: `Bearer ${response.data.access}`
                            }
                        })
                    } else {
                        alert("trying to decode user from access token but no token found!")
                    }
                })
                // Set user information 
                .then(response => { console.log("this is the response.data ", response.data)
                    this.commit('setAuthUser', {
                        // in Vuex store, add user information retrieved from API
                        // authUser: {
                        //     user_id: response.data.id,
                        //     username: response.data.username,
                        //     first_name: response.data.first_name,
                        //     last_name: response.data.last_name,
                        //     favorites: [],
                        // },
                        isAuthenticated: true,
                    })
                    // redirect user to Dashboard
                    // router.push({name:'userDashBoard'})
                })
                .catch((error) => {
                    console.log(error);
                    alert("Invalid username/password combination, please try again.")
                });
         
        },
        deleteToken() {
            this.commit("removeToken")
            this.commit("unsetAuthUser")
            router.push({name: "home"})
        },

        // Get tokens and update user information (payload is username and password)
        obtainToken(context, payload) {
            console.log("hello")
            axios.post(this.state.endpoints.obtainJWT, payload)
                .then(response => {
                    
                    // update token with the response data that comes back from the post
                    this.commit('updateToken', response.data);
                
                    // Set state information for logged in user
                    const token = response.data.access
                    if (token) {
                        // use jwt_decode library to extract user_id from JWT 
                        // const decoded = jwt_decode(token);
                        // const user_id = decoded.user_id

                        // send user_id next axios call, to pull User info from API
                        return axios({
                            method: 'get',
                            url: `http://localhost:8000/auth/users/me/`,
                            headers: {
                                authorization: `Bearer ${response.data.access}`
                            }
                        })
                    } else {
                        alert("trying to decode user from access token but no token found!")
                    }
                })
                // Set user information 
                .then(response => { console.log("this is the response.data ", response.data)
                    this.commit('setAuthUser', {
                        // in Vuex store, add user information retrieved from API
                        authUser: {
                            user_id: response.data.id,
                            username: response.data.username,
                            first_name: response.data.first_name,
                            last_name: response.data.last_name,
                            favorites: [],
                        },
                        isAuthenticated: true,
                    })
                    // redirect user to Dashboard
                    router.push({name:'userDashBoard'})
                })
                .catch((error) => {
                    console.log(error);
                    alert("Invalid username/password combination, please try again.")
                });
         
        },
        // this is the user login page payload is (username, password)
        userSetup(cotext, payload){
            const registrationPayload ={
                username: payload.username,
                password: payload.password,
                first_name: payload.firstName,
                last_name: payload.lastName,
                email: payload.email,
            }
            console.log("this is user setup")
                // make a axios call to post he information to the backend and register the user with ethe registrationPayload
            axios({
                method: 'post',
                url: `${this.state.endpoints.baseURL}/auth/users/`,
                data: registrationPayload,
            })
            //take in the response and set the payload userID
            .then(response => {
                console.log(`User ${response.data.id} create Good.`)
               
                payload['userId'] = response.data.id

                // //set the state of the user with the response from the post request
                // this.state.user['userId'] = response.date.id
                // //set the loginPayload
                let loginPayload = {
                    username: payload.username,
                    password: payload.password
                }
                console.log("i am before the return axios")
                //on the return set another axios call to obtain a token for the user trying to login
                return axios({
                    method: 'post',
                    url: this.state.endpoints.obtainJWT,
                    data: loginPayload,
                })
                .then(response => {

                    // Print status message to console
                    console.log(`User logged in after registration.`)
                    
                    // set the state and change the isAuthenticated to true
                    this.state.isAuthenticated = true
    
                    // Store tokens
                    this.commit('updateToken', response.data)
                    
                
                    // Send to home page after registration
                    // setTimeout(() => {
                    //     router.push({name: 'userdashboard'})
                    // }, 300)

                    //set the userId
                    let userId = jwt_decode(this.state.jwt.access).user_id
                    router.push({name: 'home'})
                    //return an axios call that gets from the back end 
                    return axios({
                        method: 'get',
                        url: `${this.state.endpoints.baseAPI}/users/${userId}/`,
                        headers: {
                            authorization: `Bearer ${this.state.jwt.access}`
                        }
                    })
                })
                .then(response => {
                    this.commit('updateUserInfoOnly', response.data.user)
                })
                })
                //catch any erros and display an alert 
                .catch(error => {
                    if (error =='Error: request failed with status code 401') {
                        alert('Invalid credentials')
                    }
                })
            },
        },

        // Delete stored token, both in localStorage and state and re route to the home page 
        deleteToken() {
            this.commit("removeToken")
            this.commit("unsetAuthUser")
            router.push({name: "home"})
        },
        // Use Axios to refresh existing JWT (no username/password needed with refresh, just refresh token)
        refreshToken() {
            const payload = {
                refresh: this.state.jwt_refresh
            }
            axios.post(this.state.endpoints.refreshJWT, payload)
                .then((response) => {
                    this.commit('updateToken', response.data)
                })
                .catch((error) => {
                    console.log(error)
                    alert("Error freshing access token...make sure refresh token passed to backend!")
                })
        },
        // Verify JWT is valid.  Prompt user if they need to login again.
        inspectToken() {
            const token = this.state.jwt_access;
            if (token) {
                const decoded = jwt_decode(token);
                const exp = decoded.exp
                const orig_iat = decoded.orig_iat
                if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - orig_iat < 628200) {
                    this.dispatch('refreshToken')
                    alert("token inspected, refreshing token")
                } else if (exp - (Date.now() / 1000) < 1800) {
                    // DO NOTHING, DO NOT REFRESH   
                    alert("token inspected, no issues")
                } else {
                    // PROMPT USER TO RE-LOGIN
                    // THIS ELSE CLAUSE COVERS THEN CONDITION WHERE A TOKEN IS EXPIRED
                    alert("Authentication token expired), please login again!")
                    router.push({name: 'login'})
                }
            }
            else {
                alert("No token detected.")
            }
        },
        //this is just a test 
        test() {
            axios({
                method: 'get',
                url: 'http://localhost:8000/api/v1/recipes/',
                headers: {
                    authorization: 'Bearer' `${this.state.jwt_access}`
                }
            })
            .then(response => console.log(response))
        },
        //update the backend with a payload  of username first last email 
        updateUserBackend(context, payload){

            // Patch user model
            axios({
                method: 'patch',
                url: `${this.state.endpoints.baseAPI}/users/${payload.userId}/`,
                data: {
                    username: payload.username,
                    first_name: payload.firstName,
                    last_name: payload.lastName,
                    email: payload.email,
                },
                headers: {
                    authorization: `Bearer ${this.state.jwt.access}`
                }
            })
            .then(response => {
                console.log(response)

                // this.commit('updateUserInfoOnly', response.data)
            })
            .catch(error => console.log(error))
            
            // Patch user model
            axios({
                method: 'patch',
                url: `${this.state.endpoints.baseAPI}/managers/${payload.userId}/`,
                data: {
                    full_name: payload.fullName,
                    dark_mode_enabled: payload.darkModeEnabled,
                },
                headers: {
                    authorization: `Bearer ${this.state.jwt.access}`
                }
            })
            .then(response => {
                console.log(response)
                // this.commit('updateUserInfoOnly', response.data)
            })
            .catch(error => console.log(error))
        },
        
   
			

    }, // end Vuex actions
    // modules: {
// }
    
     // end Vuex modules
)
