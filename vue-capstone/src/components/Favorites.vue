<template>
  <v-app id="inspire"
  class="success">

    <v-app-bar
      app
      color="secondary"
      dark
      hide-on-scroll
    >
    
      <v-toolbar-title class="headline">food4thegoddess</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
       <v-toolbar-title class="display-1 font-italic">Favorites</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" rounded  color="transparent" @click="home">Home</v-btn>
      <v-btn rounded color="transparent" @click="logout">Logout</v-btn>
    </v-app-bar>        
    <v-container
            class="success"
    >
         
        <v-card
            class="ma-6 mb-10 pa-6 mr-6 info"
            outlined
            v-for="recipe in this.favoriteInfo" :key = "recipe"
          >
             <v-icon
            color="red darken-4" large class=" ml-12" @click="deleteFavorite(recipe)">mdi-close-outline</v-icon>
          <v-card-title class="pt-0 black--text justify-center display-1 font-weight-bold" >{{ recipe.recipe_name }}
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
          <v-card-text 
          class="text--primary"
          >
            <v-row justify="center">
              <v-expansion-panels popout>
                <v-expansion-panel
                  v-for="(item,i) in 1"
                  :key="i"
                  :hover="hover"
                >
                  <v-expansion-panel-header class="gold">Check out the Recipe!</v-expansion-panel-header>
                  <v-expansion-panel-content v-model="hover">
                    <li class="mt-2" v-for="ingredient in recipe.ingredient_info" :key="ingredient">
                        <input class="strikethrough" type="checkbox" :id="ingredient.ingredients" :value="ingredient.ingredients">
                        <label class="ml-6" :for="ingredient.ingredients">{{ingredient.ingredients}}</label>
                    </li>
                    <p class="mt-6">{{recipe.body}}</p>
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
      postion: absolute
    >
      <span class="white--text">food4thegoddess &copy; 2020</span>
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
        selectedInfo: [],
        delete: [],
      }
    },
    methods:{
      //this function takes in the id of the recipe, and then finds the index inorder to splice the index of and re write the store to patch data base
      // this takes in the full recipe insted of the number because the favorite in for is not numbers it is recipes 
        deleteFavorite(recipe) {
         
          this.delete = this.favoriteInfo.indexOf(recipe)
    
          this.favoriteInfo.splice(this.delete , 1)
      
          this.$store.getters.favorite.splice(this.delete, 1)
          console.log(this.$store.getters.favorite)
        
          axios({
            method: "patch",
            url: 'http://localhost:8000/api/v1/users/'+ this.$store.getters.userId +'/',
            headers:{
            authorization:
            `Bearer ${this.$store.getters.accessToken}`
              },
            data:{
              username: this.$store.getters.user,
              favorites: this.$store.getters.favorite,
            }
            })
            .then((response)=> {
              console.log(response);
            })
            .catch(error => {
                alert("Error with request...not authenticated");
                console.log(error);
          });
        },
        //logout button
        logout(){
            this.$store.dispatch('deleteToken')
        },
        //home button
        home(){
           router.push({name: 'userDashBoard'})
        },
        check(){
          console.log(this.favoriteInfo)
        },
        //this is an axios call to get the favorites for the user from the authUser
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
              )
              .catch(error => {
                alert("Please try another search");
                console.log(error);
              });
            }
        },
    //this runs getFavorites right when the page is loaded 
    mounted(){
        this.getFavorites()
       
    },
}
</script>
<style scoped>
/* this is the scoped css for the strikethrough on the ingredients */
.strikethrough:checked +label {
  text-decoration: line-through red 
}
</style>