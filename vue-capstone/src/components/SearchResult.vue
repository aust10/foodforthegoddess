<template>
  <v-app id="result">

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>food4thegoddess</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          rounded
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            label="Search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
 
      <v-btn rounded color="transparent" @click="deleteToken">Logout</v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>  
    <v-container fluid>

        <app-input @searched="console.log($event)"></app-input>

    </v-container>
  </v-app>
</template>
<script>
import UserDashBoard from '../components/UserDashBoard'
// import { bus } from '../main'// // // import axios from "axios"
// // import router from '../router'
export default {
  data() {
    return {
      selectedInfo: [],
      search: '',
    }
  },
  components:{
    'app-input': UserDashBoard
  },
  methods: {
    findinfo(findinfo){
      this.selectedInfo = console.log("this is find info", findinfo)
    },
    deleteToken(){
        this.$store.dispatch("deleteToken");
    }
  },
}

</script>