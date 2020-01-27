<template>
  <v-app id="inspire">
    <v-content>
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
                <v-form >
                  <v-text-field
                    v-model="username"
                    label="Login"
                    name="login"
                    type="text"
                  />
                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="getToken" color="secondary">Login</v-btn>
                <v-btn color="secondary">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  name: "about",
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    getToken() {
      // call state obtain token here
      const payload = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("obtainToken", payload);
    },
    // refreshToken() {
    //   this.$store.dispatch("refreshToken");
    // },
    // inspectToken() {
    //   this.$store.dispatch("inspectToken");
    // },
    // deleteToken() {
    //   this.$store.dispatch("deleteToken");
    // },
    testAPI() {
      axios({
        method: "get",
        url: 'http://localhost:8000/api/v1/recipes/',
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
    }
  }
};
</script>