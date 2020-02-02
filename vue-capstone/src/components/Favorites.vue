<template>
  <v-app id="inspire">

    <v-app-bar
      app
      color="secondary"
      dark
    >
    
      <v-toolbar-title class="headline">food4thegoddess</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
       <v-toolbar-title class="display-1 font-italic">Favorites</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn rounded  color="transparent" @click="home">Home</v-btn>
      <v-btn rounded color="transparent" @click="logout">Logout</v-btn>
    </v-app-bar>        
        <v-container
            max-width="200"
        >
         
        <v-card
            class="ma-6 mb-1 pa-6 mr-6 info"
            outlined
            v-for="recipe in this.favoriteInfo" :key = "recipe"
          >
             <v-icon
            color="red darken-4" large class=" ml-12" @click="deleteFavorite(recipe.id)">mdi-close-outline</v-icon>
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
        selectedInfo: [],
        delete: [],
      }
    },
    methods:{
      //this function takes in the id of the recipe, and then finds the index inorder to splice the index of and re write the store to patch data base
        deleteFavorite(id) {
  
          this.delete = this.favoriteInfo.indexOf(id)
    
          this.favoriteInfo.splice(this.delete , 1)
          // console.log("hi from deleteFavorite")
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
              // favorites: this.favoriteInfo
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
        logout(){
            this.$store.dispatch('deleteToken')
        },
        home(){
           router.push({name: 'userDashBoard'})
        },
        check(){
          console.log(this.favoriteInfo)
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
        deleteFavorite(id) {
        // console.log("this is the recipe id", id)
        // // this.$store.getters.favorite.push(id)
        console.log('this is the getters fav',this.$store.getters.favorite)
   
        this.favoriteInfo.splice(id,1)
        console.log("hi from deleteFavorite")
        // console.log(this.$store.getters.favorite)
        // console.log(favoriteRecipes.favorites)
        axios({
          method: "delete",
          url: 'http://localhost:8000/api/v1/users/'+ this.$store.getters.userId +'/',
          headers:{
          authorization:
          `Bearer ${this.$store.getters.accessToken}`
            },
          data:{
            username: this.$store.getters.user,
            favorites: this.favoriteInfo
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
      
    mounted(){
        this.getFavorites()
       
    },
}
</script>