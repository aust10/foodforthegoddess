<template>
  <v-app id="inspire">
    <v-content class="basckground">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="secondary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                </v-tooltip>
                </v-toolbar>
              <v-card-text>
                <v-form v-model="formValidity" ref="registrationForm">
                   <v-text-field
                    v-if ="registermode"
                    v-model="firstName"
                    :rules="rules.name"
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    type="text"
                  />
                  <v-text-field
                    v-if ="registermode"
                    v-model="lastName"
                    :rules="rules.name"
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    type="text"
                  />
                  <v-text-field
                    v-show ="registermode"
                    v-model="email"
                    id="email"
                    label="Email"
                    name="email"
                    :rules="rules.email"
                    type="text"
                  />
                  <v-text-field
                    v-show ="!registermode"
                    v-model="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                    <v-text-field
                    v-show ="registermode"
                    v-model="username"
                    label="Username"
                    name="username"
                    :rules="rules.username"
                    type="text"
                  />
                  <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="rules.password"
                      @click:append="showPassword = !showPassword"
                    />
                    <v-text-field
                      v-if="registermode"
                      id="password2"
                      label="Re-enter Password"
                      name="password2"
                      :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"	
                      v-model="password2"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="password2Validation"
                      @click:append="showPassword2 = !showPassword2"
                    />
                    <v-checkbox label="Agree to terms and conditions" v-if="registermode" v-model="termsCheckbox" required></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>

                <v-btn color="gold" v-if="!registermode" @click="registermode = !registermode">Register new user
                </v-btn>

                <v-btn color="primary" v-if="registermode" @click="registermode = !registermode">Back to login...
                </v-btn>

                <v-spacer/>

                <v-btn color="gold" v-if="!registermode" @click="getToken">Login
                </v-btn>

                <v-btn color="gold" v-if="registermode" @click="register" :disabled="!(formValidity && termsCheckbox)">Register
                </v-btn>
          
                <v-btn color="primary" v-if="!register" @click="register = !register">Register
                </v-btn>

              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import router from "../router"
import axios from "axios";
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      firstName: '',
      lastName: '',
      email: '',
      showPassword: false,
			showPassword2: false,
      formValidity: false,
      registermode: false,
      termsCheckbox: false,
			// This is specified here instead of the store so that there is access to this.password
			password2Validation:  [
				v => !!v || 'Password is required.',
				v => (v && v.length) >= 6 || 'Password must be at least 6 characters.',
        () => (this.password == this.password2) || 'Passwords must be the same.',
        ],
    }
  },
  methods: {
    getToken() {
      // call state obtain token here
      const payload = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch('obtainToken', payload)
      console.log("hi")
    },
    //this is ran to register and take in the user info
  register(){
			const payload = {
				username: this.username,
				password: this.password2,
				firstName: this.firstName,
				lastName: this.lastName,
				// fullName: `${this.firstName} ${this.lastName}`,
				email: this.email,
      }
      // console.log("hi from register")
      this.$store.dispatch('userSetup', payload)
      router.push({name:'userDashBoard'})
    },
    //test for making the api to ensure tokens were being recieved and stored
    testAPI() {
      axios({
        method: "get",
        url: 'http://aus10c.pythonanywhere.com/api/v1/recipes/',
        headers: {
          authorization: `Bearer ${this.access}`
        }
      })
        .then(response => alert(response.data.message))
        .catch(error => {
          alert("Error with request...not authenticated");
          console.log(error);
        });
    }
  },
  computed: {
    access() {
      return this.$store.state.jwt_access;
    },
    refresh() {
      return this.$store.state.jwt_refresh;
    },
    baseUrl(){
			return this.$store.getters.endpoints.baseURL
		},
		rules(){
      return this.$store.getters.formRules
    },
  }
};
</script>
   // refreshToken() {
    //   this.$store.dispatch("refreshToken");
    // },
    // inspectToken() {
    //   this.$store.dispatch("inspectToken");
    // },
    // deleteToken() {
    //   this.$store.dispatch("deleteToken");
    // },