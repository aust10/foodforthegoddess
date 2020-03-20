<template>
  <v-app class="pb-0 success">

    <v-app-bar
      app
      color="white"
      dark
    >
      <v-toolbar-title class="display-1 font-weight-black blue-grey--text">food4thegoddess</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <h1 class="headline font-weight-medium font-italic blue-grey--text">A Thinking Man’s Guide to Cooking for Women</h1>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      <p class="pr-5 mt-4 title font-weight-regular blue-grey--text">{{this.$store.getters.user.toUpperCase()}}</p>
      <v-btn class="mr-2 blue-grey--text" rounded color="amber" key="favorites" @click="getFavorites()">Favorites</v-btn>
      <v-btn class="blue-grey--text" rounded color="transparent" @click="deleteToken">Logout</v-btn>
    </v-app-bar>
    <v-container
    class="pt-0 pb-0"
    >
      <v-row justify="center">
        <v-col class="pt-3 pb-0" cols="12" sm="6">
        <v-text-field
            rounded
            v-model='search'
            clearable
            flat
            solo-inverted
            hide-details
            label="Search The Cookbook"
            @keyup.enter="keywordsearch"
        >
        </v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <!-- card for the randomly generated top left card -->
    <v-container class="pt-0"  color="#FADCCA" fluid>
      <v-row>
        <v-col cols="12">
          <v-row
            class="pb-0 justify-space-between"
          >
          <v-card
              width="100%"
              class="ma- mb-1 pa-3 mr-3 info "
              outlined
            >
            
            <v-img
              height="400px"
              width="100%"
              :src="require('../images/granola.jpg')"
            >
            <v-card 
            class="mt-12 ma-12"
            width="32%">
            <v-card-text background-color="white" class="display-2 font-weight-medium white--black">
              COOKING & LOVE</v-card-text>
            </v-card>
            </v-img>
            
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-content
      class="pa-4 pt-0 success"
      >
    <!-- carousel card -->
        <v-container fluid>
            <v-data-iterator
            v-show="!this.selectedInfo.length"
            :items="dbInfo"
            :items-per-page.sync="itemsPerPage"
            :page="page"
            :scroll="scroll"
            :sort-by="sortBy"
            :sort-desc="sortDesc"
            hide-default-footer
            
            >
            <v-spacer></v-spacer>

            <template v-slot:default="props">
                <v-row>
                <v-col
                    :key= "item.recipe_name" 
                    v-for="item in props.items"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                >
                <!-- this is the card title -->
                  <v-hover>
                    <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`">
                    <v-card-title class="font-family-dancing-script-cursive subheading font-weight-bold info">{{ item.recipe_name }}</v-card-title>
                    <v-divider></v-divider>

                    <v-list class="pt-0" dense>
                      <!-- this is the card image -->
                        <v-img
                        class="white--text align-end"
                        height="200px"
                        :src='item.picture'
                        @click="showSelected(item.id)"
                        >
                        </v-img>
                  
                        <!-- this is the card content -->
                        <v-list-item-content class="black--text justify-center font-italic font-weight-thin	" 
                        @click="showSelected(item.id)"
                        >
                          See More 
                        </v-list-item-content>
                       
                    </v-list>
                    </v-card>
                   </v-hover>
                </v-col>
                </v-row>
            </template>

            <template v-slot:footer>
                <v-row class="mt-2" align="center" justify="center">
            
                <v-spacer></v-spacer>

                <span
                    class="mr-4
                    grey--text"
                >
                    Page {{ page }} of {{ numberOfPages }}
                </span>
                <v-btn
                    fab
                    dark
                    color="gold"
                    class="mr-1 black--text"
                    @click="formerPage"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                    fab
                    dark
                    color="gold"
                    class="ml-1 black--text"
                    @click="nextPage"
                >
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                </v-row>
            </template>
            </v-data-iterator>
        </v-container>

<!-- search results below -->
        <v-container
            max-width="200"
        >
          <h1 class="ml-3" v-show="this.selectedInfo.length">You searched "{{this.search}}"</h1>
        <v-card
            class="ma-3 mb-1 pa-4 mb-6 info"
            outlined
            v-for="name in selectedInfo" :key="name.id"
          >
          <v-card-title class="black--text justify-center" >{{ name.recipe_name }}
  
            <v-btn 
            x-large
            class="ml-5"
            text icon :color = "$store.getters.favorite.indexOf(name.id)>-1 ? 'pink' : 'gray'" 
            @click="favorite(name.id)"
            >

              <v-icon>mdi-heart</v-icon>
            </v-btn>
       
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
                  :src='name.picture'
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
                    
                        <li class="mt-2" v-for="ingredient in name.ingredient_info" :key="ingredient">
                          <input class="strikethrough" type="checkbox" :id="ingredient.ingredients" :value="ingredient.ingredients" :key="strikethrough">
                          <label class="ml-6" :for="ingredient.ingredients">{{ingredient.ingredients}}</label>
                        </li>
                    <p class="mt-6">{{name.body}}</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-card-text>
          </v-card>        
        </v-container>

        <!-- click on slide show display -->
       
        <v-container
            max-width="200"
            v-show="!this.selectedInfo.length"
        >
          <h1 v-show="Object.keys(caroselFinder).length"></h1>
        <v-card
            class="ma-3 mb-6 pa-4 "
            outlined
            v-if="Object.keys(caroselFinder).length"
          >
          <v-card-title class="black--text justify-center" >{{ this.caroselFinder.recipe_name }}
      
            <v-btn 
            x-large
            class="ml-5"
            text icon :color = "$store.getters.favorite.indexOf(this.caroselFinder.id)>-1 ? 'pink' : 'gray'" 
            @click="favorite(caroselFinder.id)"
            >

              <v-icon>mdi-heart</v-icon>
            </v-btn>
 
          </v-card-title>
            <v-container
              fill-height="300px"
              fill-width="500"
              class="pb-2">
              <v-layout 
                  align-center
                  fill-height="300px"
                  fill-width="500">
                <v-img
                  class="white--text align-end ml-3 info "
                  height="300px"
                  width="500"
                  :src='this.caroselFinder.picture'
                >
                </v-img>
              </v-layout>
            </v-container>

          <v-card-text class="text--primary">
            <v-row justify="center">
              <v-expansion-panels popout>
                <v-expansion-panel
                  v-for="(name,i) in 1"
                  :key="i"
                  :hover="hover"
                >
                  <v-expansion-panel-header class="gold">Check out the Recipe!</v-expansion-panel-header>
                  <v-expansion-panel-content v-model="hover">
                      <li class="mt-2" v-for="ingredient in caroselFinder.ingredient_info" :key="ingredient.id">
                        <input class="strikethrough" type="checkbox" :id="ingredient.ingredients" :value="ingredient.ingredients">
                        <label class="ml-6" :for="ingredient.ingredients">{{ingredient.ingredients}}</label>
                    </li>
             
                    <p class="mt-6">{{caroselFinder.body|linebreaks}}</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-btn rounded color="amber" 
              @click="registerComment = !registerComment"
              v-if="!registerComment"
              class="blue-grey--text"

             >Comment</v-btn><br>
               <v-text-field
                v-if="registerComment"
                v-model='comment'
                clearable
                flat
                solo-inverted
                hide-details
                label="Add Comment"
                @keyup.enter="addComment(caroselFinder.id)"
            >
          </v-text-field>
            </v-row>
          <v-container
          v-for="comment in commentinfo" :key="comment">
          {{comment.comments_info.comments}}
          </v-container>
            <!-- <p>{{this.comment}}</p> -->
          </v-card-text>
          </v-card>        
        </v-container>
        
    </v-content>
    <v-footer
      color="white"
      app
      postion: absolute
      
    >
      <span class="blue-grey--text">food4thegoddess</span><v-spacer></v-spacer>
      <a class="mr-2" href="/About">About</a>
      <span class="blue-grey--text"> &copy; 2020</span>
    </v-footer>
  </v-app>
</template>
<script>
import axios from "axios"
// import jwt_decode from 'jwt-decode'
import router from '../router'
// import { bus } from '../main'
  export default {
    data () {
      return {
        jwt:{
            access: localStorage.getItem('accessToken'),
            refresh: localStorage.getItem('refreshToken'),
            refreshExpiration: localStorage.getItem('refreshExpiration'),
            accessExpiration: localStorage.getItem('accessExpiration'), 
        },

        itemsPerPageArray: [4, 8, 12],
        
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'recipe_name',
        search: '',
        scroll: '',
        emptyIcon: 'mdi-heart-outline',
        fullIcon: 'mdi-heart',
        color: 'red lighten-3',
        selectedInfo: [],
        favoriteInfo: [],
        caroselFinder: [],
        submited: false,
        registerComment: false,
        title_card: [],
        hover: '',
        strikethrough:'',
        dbInfo: [],
        comment:'',
        commentinfo:[],

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
      //method for the carousel pages
      numberOfPages () {
        return Math.ceil(this.dbInfo.length / this.itemsPerPage)
      },
      
    },
    methods: {
      addComment() {
       
        // console.log("this is id", id)
        console.log(this.$store.getters.comments)
        this.$store.getters.comments.push(this.comment),
        console.log(this.$store.getters.comments)
        axios({
          method: "patch",
          url: 'http://aus10c.pythonanywhere.com/api/v1/users/'+ this.$store.getters.userId +'/',
          headers:{
          authorization:
          `Bearer ${this.$store.getters.accessToken}`
            },
          data:{
            username: this.$store.getters.user,
            comments_info: this.$store.getters.comments
          }
          })
          .then((response)=> { this.commentinfo = response.config.data
          
          })
          .catch(error => {
              alert("Error with request...not authenticated");
              console.log(error);
      });
      },
      getComments(){
            axios({
                method: "get",
                url: `http://aus10c.pythonanywhere.com/api/v1/users/`+ this.$store.getters.userId,
                headers:{
                  authorization:
                  `Bearer ${this.$store.getters.accessToken}`
                }
              })
              .then(response => {
                this.commentinfo = response.data.comments_info
              console.log(this.commentsinfo)
              },
                )
              .catch(error => {
                alert("Please try another search");
                console.log(error);
              })
      },
      //method for selecting the carosel items
      showSelected(id){
        // console.log(this.dbInfo)
        console.log(this.title_card)
        // console.log("this is carosel finder"+ `${id}`)
          axios({
          method: "get",
          url: `http://aus10c.pythonanywhere.com/api/v1/recipes/${id}/`,
          headers:{
            authorization:
            `Bearer ${this.$store.getters.accessToken}`
          }
        })
        .then(response => {
          this.caroselFinder = response.data
        }
          )

        .catch(error => {
          alert("Please try another search");
          console.log(error);
        });
      },
      //method for searching recipes
      keywordsearch(){
        // console.log("this is the user id", this.$store.getters.userId, "this is the user name", this.$store.getters.favorite)
        console.log(this.$store.state.authUser)
        axios({
          method: "get",
          url: `http://aus10c.pythonanywhere.com/api/v1/recipes/?search=${this.search}`,
          headers:{
            authorization:
            `Bearer ${this.$store.getters.accessToken}`
          }
        })
        .then(response => {
          this.selectedInfo = response.data
        }
          )
        .catch(error => {
          alert("Please try another search");
          console.log(error);
        });
      },
      randomFinder(){
        // console.log(response.data[Math.floor(Math.random()*response.data.length)])
      },
      //method for getting all the recipes from the backend
      getRecipes(){
          axios({
          method: "get",
          url: 'http://aus10c.pythonanywhere.com/api/v1/recipes/',
          headers:{
            authorization:
            `Bearer ${this.$store.getters.accessToken}`
          }
          })
          .then(response => this.dbInfo = response.data)
         

          return axios({
          method: "get",
          url: 'http://aus10c.pythonanywhere.com/api/v1/recipes/',
          headers:{
            authorization:
            `Bearer ${this.$store.getters.accessToken}`
          }
          })
          .then(response => this.title_card = response.data[Math.floor(Math.random()*response.data.length)])
          .catch(error => {
              alert("Error with request...not authenticated");
              console.log(error);
      });
      },
      // next 3 are for the buttons on the carousel
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
        this.$store.dispatch('deleteToken')
      },
      // method for favoriting posts and saving them to your favorites
      favorite(id) {
        // console.log(this.$store.getters.favorite)
        this.$store.getters.favorite.push(id),
        // console.log(favoriteRecipes.favorites)
        axios({
          method: "patch",
          url: 'http://aus10c.pythonanywhere.com/api/v1/users/'+ this.$store.getters.userId +'/',
          headers:{
          authorization:
          `Bearer ${this.$store.getters.accessToken}`
            },
          data:{
            username: this.$store.getters.user,
            favorites: this.$store.getters.favorite
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
      // obtaining token for user authorization
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
                            url: `http://aus10c.pythonanywhere.com/auth/users/me/`,
                            headers: {
                                authorization: `Bearer ${response.data.access}`
                            }
                        })
                    } else {
                        alert("trying to decode user from access token but no token found!")
                    }
                })
                // Set user information 
                .catch((error) => {
                    console.log(error);
                    alert("Invalid username/password combination, please try again.")
                });
         
        },
        getFavorites(){
            axios({
                method: "get",
                url: `http://aus10c.pythonanywhere.com/api/v1/users/`+ this.$store.getters.userId,
                headers:{
                  authorization:
                  `Bearer ${this.$store.getters.accessToken}`
                }
              })
              .then(response => {
                this.favoriteInfo = response.data.favorites_info
              console.log(this.favoriteInfo)
              },
              router.push({name:'favorites'})
                )
              .catch(error => {
                alert("Please try another search");
                console.log(error);
              });
        },
    },
    mounted() {
        this.getRecipes(),
        this.getComments()

    }
  }
</script>
<style>
.strikethrough:checked + label {
  text-decoration: line-through red
}
main {
  padding-bottom: 0 !important;
}
</style>