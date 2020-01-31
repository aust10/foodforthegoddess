<template>
  <v-app id="inspire">

    <v-app-bar
      app
      color="secondary"
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
        <v-btn rounded color ="transparent" class="ml-3" @click="keywordsearch"><v-icon>mdi-magnify</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn rounded color="transparent" @click="home">Home</v-btn>
      <v-btn rounded color="transparent" @click="logout">Logout</v-btn>
    </v-app-bar>        
        <v-container
            max-width="200"
        >
          <h1>Favorites:</h1>
        <v-card
            class="ma-6 mb-1 pa-6 mr-6 "
            outlined
            v-for="recipe in favoriteInfo" :key = "recipe"
          >
          <v-card-title class="black--text justify-center" >{{ recipe.recipe_name }}
             <v-icon
            color="red darken-4" class="ml-12" @click="favorite(name.id)">mdi-heart</v-icon>
          </v-card-title>
            <v-container
              fill-height="300px"
              fill-width="500">
              <v-layout 
                  align-center
                  fill-height="300px"
                  fill-width="500">
                <v-img
                  class="white--text align-end ml-3 info "
                  height="300px"
                  width="500"
                  :src='recipe.picture'
                >
                </v-img>
              </v-layout>
            </v-container>

          <v-card-text class="text--primary">
            <v-row justify="center">
              <v-expansion-panels popout>
                <v-expansion-panel
                  v-for="(item,i) in 1"
                  :key="i"
                  :hover="hover"
                >
                  <v-expansion-panel-header class="gold">Check out the Recipe!</v-expansion-panel-header>
                  <v-expansion-panel-content v-model="hover">
                    <ul class="mt-2 mb-5" >
                      <li v-for="ingredient in recipe.ingredient_info" :key="ingredient">
                        {{ingredient.ingredients}}
                      </li>
                    </ul>
                    <p>{{recipe.body}}</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-card-text>
          </v-card>        
        </v-container>
    <v-footer
      color="secondary"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>
<script>
import axios from 'axios'
import router from '../router'
  export default {
    data () {
      return {
        favorited: false,
        favoriteInfo: [],
      }
    },
    methods:{
        logout(){
            this.$store.dispatch('deleteToken')
        },
        home(){
           router.push({name: 'userDashBoard'})
        },
        getFavorites(){
            axios({
                method: "get",
                url: `http://localhost:8000/api/v1/users/`+ this.$store.getters.userId,
                headers:{
                  authorization:
                  `Bearer ${this.$store.getters.accessToken}`
                }
              })
              .then(response => {
                this.favoriteInfo = response.data.favorites_info
              console.log(this.favoriteInfo)
              },
            //   router.push({name:'favorites'})
                )
              .catch(error => {
                alert("Please try another search");
                console.log(error);
              });
            }
        },
    mounted(){
        this.getFavorites()
    },
}
</script>