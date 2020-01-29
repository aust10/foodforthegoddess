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

        endpoints: {
            obtainJWT: 'http://localhost:8000/auth/jwt/create/',
            refreshJWT: 'http://localhost:8000/auth/jwt/refresh/',
            // userCreate: 'http://localhost:8000/auth/jwt/users/',
            baseURL: 'http://localhost:8000',
            baseAPI: 'http://localhost:8000/api/v1',
        },
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

    getters: {
        // loggedIn (state){ return !!state.authUser},
        user(state){ return state.user },
        username(state){ return state.user.username },
        isAuthenticated(state){ return state.isAuthenticated },
        accessToken(state){ return state.jwt.access },
        refreshToken(state){ return state.jwt.refresh },
        endpoints(state){ return state.endpoints },
        organization(state) { return state.organization },
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
    },  // end Vuex mutations
    actions: {
        deleteToken() {
            this.commit("removeToken")
            this.commit("unsetAuthUser")
            router.push({name: "home"})
        },
        obtainToken(context, payload) {
            console.log("hello")
            // Get tokens and update user information (payload is username and password)
            axios.post(this.state.endpoints.obtainJWT, payload)
                .then(response => {
                    
                    // update 
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
                .then(response => {
                    this.commit('setAuthUser', {
                        // in Vuex store, add user information retrieved from API
                        authUser: {
                            user_id: response.data.id,
                            username: response.data.username,
                            first_name: response.data.first_name,
                            last_name: response.data.last_name,
                            saved_items: [],
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
        
        userSetup(cotext, payload){
            const registrationPayload ={
                username: payload.username,
                password: payload.password,
                email: payload.email,
            }
            console.log("this is user setup")
                // commit('auth_request')
            axios({
                method: 'post',
                url: `${this.state.endpoints.baseURL}/auth/users/`,
                data: registrationPayload,
            })
            .then(response => {
                console.log(`User ${response.data.username} create Good.`)

                payload['userId'] = response.data.id
                this.state.user['userId'] = response.date.id

                const loginPayload = {
                    username: payload.username,
                    password: payload.username
                }

                return axios({
                    method: 'post',
                    url: this.state.endpoints.obtainJWT,
                    data: loginPayload,
                })
                .then(response => {

                    // Print status message to console
                    console.log(`User logged in after registration.`)

                    this.state.isAuthenticated = true
    
                    // Store tokens
                    this.commit('updateTokens', response.data)
                    router.push({name: 'userdashboard'})
                    // Post Manager/User info
                    // this.dispatch('updateUserBackend', fullUserPayload)
    
                    // Send to home page after registration
                    // setTimeout(() => {
                    //     router.push({name: 'userdashboard'})
                    // }, 300)
                    let userId = jwt_decode(this.state.jwt.access).user_id
                    return axios({
                        method: 'get',
                        url: `${this.state.endpoints.baseAPI}/managers/${userId}/`,
                        headers: {
                            authorization: `Bearer ${this.state.jwt.access}`
                        }
                    })
                })
                .then(response => {
                    this.commit('updateUserInfoOnly', response.data.user)
                })
                })
                .catch(error => {
                    if (error =='Error: request failed with status code 401') {
                        alert('Invalid credentials')
                    }
                })
            },
        },

        // Delete stored token, both in localStorage and state
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

                this.commit('updateUserInfoOnly', response.data)
            })
            .catch(error => console.log(error))
            
            // Patch manager model
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
                this.commit('updateManagerInfoOnly', response.data)
            })
            .catch(error => console.log(error))
        }
   
			

    }, // end Vuex actions
    // modules: {
// }
    
     // end Vuex modules
)
