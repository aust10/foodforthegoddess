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
        <!-- <v-spacer></v-spacer> -->
        <v-btn rounded color ="transparent" class="ml-3" @click="keywordsearch">Search</v-btn>
        <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn rounded color="transparent" @click="getRecipes">Favorites</v-btn>
      <v-btn rounded color="transparent" @click="deleteToken">Logout</v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>  
    <v-container fluid>
        <!-- <ul>
          <li v-for="items in selectedInfo" :key= "items">{{ items }}</li>
        </ul> -->

        <app-input @searched="findinfo(console.log($event))"></app-input>
        
        <!-- <ul v-if="selectedInfo">
          <li>This is : {{selectedInfo}}</li>
        </ul> -->


    </v-container>
  </v-app>
</template>
<script>
import UserDashBoard from '../components/UserDashBoard'
import { bus } from '../main'// // // import axios from "axios"
// // import router from '../router'
export default {
  data() {
    return {
      selectedInfo: [],
    }
  },
  components:{
    'app-input': UserDashBoard
  },
  methods: {
    findinfo(findinfo){
      this.selectedInfo = console.log("this is find info", findinfo)
    },
      created(){
      bus.$on('infochanged', (data) => {
      this.selectedInfo = data;
      console.log(this.selectedInfo)
    })
  },
  }
}

</script>