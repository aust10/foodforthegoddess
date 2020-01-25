<template>
  <v-app id="inspire">

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
        <p>{{ selectedInfo }}</p>
    </v-container>
  </v-app>
</template>
<script>
import axios from "axios"
import router from '../router'
  export default {
    data () {
      return {

        itemsPerPageArray: [4, 8, 12],
        
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'recipe_name',
        search: '',
        scroll: '',
        selectedInfo: [],
  
        dbInfo: [],
        items: [
         {
          text: "Keywords",
          value: "key_words_info",
         },
         {
           text:"Category",
           value:"category_info"
         },
         {
           text:"Technique",
           value:"technique_name"
         }
        ],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.dbInfo.length / this.itemsPerPage)
      },
   
    },
    methods: {
      keywordsearch(){
        // console.log(this.search)
        // console.log(this.selectBar)
        axios({
          method: "get",
          url: `http://localhost:8000/api/v1/recipes/?search=${this.search}`,
        })
        .then(response => console.log(response.data))
          router.push({name:'searchResult'})
        .catch(error => {
          alert("Please try another search");
          console.log(error);
        });
      },
      getRecipes(){
          axios({
          method: "get",
          url: 'http://localhost:8000/api/v1/recipes/',
          })
          .then(response => this.dbInfo = response.data)
          .catch(error => {
              alert("Error with request...not authenticated");
              console.log(error);
      });
      },
      nextPage(){
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage(){
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage(number){
        this.itemsPerPage = number
      },
      deleteToken(){
        this.$store.dispatch("deleteToken");
      },
    },
    mounted() {
        this.getRecipes()
        // inspectToken()
    }
  }
</script>