<template>
  <div  class="home success">
    <v-container class="success pb-0" fluid>
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
        <v-btn class="mr-2 blue-grey--text" rounded color="transparent" to="about">About</v-btn>
        <v-btn class="blue-grey--text" to="/login" rounded color="amber" @click="getToken">Login</v-btn>
    </v-app-bar>
    <v-container
    class="pt-0 pb-0"
    >
      <v-row justify="center">
         <!-- <v-spacer></v-spacer> -->
        <v-col class="pt-0 pb-0" cols="12" sm="6">
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
    <v-container class="pa-0">
      <v-row justify="center">
      <v-card-title class="headline font-weight-medium font-italic blue-grey--text"><v-icon>mdi-chevron-double-down</v-icon>EXPLORE THE COOKING<v-icon>mdi-chevron-double-down</v-icon></v-card-title>
      </v-row>
    </v-container>

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
                   
                    <v-card-title class="pb-1 pt-1 justify-center font-family-dancing-script-cursive subheading font-weight-bold  blue-grey--text">{{ item.recipe_name }}</v-card-title>
                
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
                        <v-list-item-content class="pb-1 black--text justify-center font-italic font-weight-thin	" 
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

            <template  v-slot:footer>
                <v-row class="mt-2 mb-12" align="center" justify="center">
            
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
    </v-container>
          
          <h1 class="ml-3 blue-grey--text" v-show="this.selectedInfo.length">You searched "{{this.search}}"</h1>
            <!-- class="ma-3 mb-1 pa-4 mb-6 info" -->
      <v-container
      class="justify-center mr-12">
        <v-card
            class="mb-12 info"
            
            max-width="90%"
            outlined
            v-for="name in selectedInfo" 
            :key="name.id"
          >
          <v-icon
            color="red darken-4" large class=" ml-12" @click="deleteSeclected(name)">mdi-close-outline</v-icon>
          <v-card-title class="pt-0 black--text justify-center" >{{ name.recipe_name }}
  
            <v-btn 
            x-large
            class="ml-5"
            text icon: color="red"
            @click="favorite()"
            >
            <!-- text icon :color = "$store.getters.favorite.indexOf(name.id)>-1 ? 'pink' : 'gray'" 
            @click="favorite(name.id)" -->

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
                          <label class="ml-6" :for="ingredient.ingredients" :key="ingred">{{ingredient.ingredients}}</label>
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
            max-width="20%"
            v-show="!this.selectedInfo.length"
        >
          <h1 v-show="Object.keys(caroselFinder).length"></h1>
        <v-card
            class="ma-3 pa-4 info mb-12"
            outlined
            v-if="Object.keys(caroselFinder).length"
          >
        <v-icon
            color="red darken-4" large class=" ml-12" @click="deleteIt(recipe)">mdi-close-outline</v-icon>
          <v-card-title  class="pt-0 black--text justify-center" >{{ this.caroselFinder.recipe_name }}
      
            <v-btn 
            x-large
            class="ml-5"
            text icon: color="red"
            @click="favorite()"
            >
                 <!-- text icon :color = "$store.getters.favorite.indexOf(this.caroselFinder.id)>-1 ? 'pink' : 'gray'" -->

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
             
                    <p class="mt-6">{{caroselFinder.body}}</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-card-text>
          </v-card>        
        </v-container>
    <v-footer
      color="white"
      app
      position: absolute
    >
      <span class="blue-grey--text">food4thegoddess</span><v-spacer></v-spacer><span class="blue-grey--text"> &copy; 2020</span>
    </v-footer>
  </div>
</template>
<script>
// import router from '../router'
import axios from "axios"
export default {
  data(){
    return {
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
        title_card: [],
        hover: '',
        strikethrough:'',
        dbInfo: [],
        xOut: [],

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
    // call state obtain token here
      deleteSeclected(name){
        console.log(this.selectedInfo)
          this.xOut = this.selectedInfo.indexOf(name)
        console.log(this.xOut)
          
          this.selectedInfo.splice(this.xOut,1)
      },
      deleteIt(){
        this.caroselFinder= []
      },
      favorite(){
          alert("You must be logged in to use this feature")
      },
      getToken() {
      const payload = {
        username: "guest",
        password: "qazwsxQAZWSX10!!!!"
      };
      this.$store.dispatch("homeToken", payload);
    },
    getRecipes(){
          axios({
          method: "get",
          url: 'http://localhost:8000/api/v1/recipes/',
          headers:{
            authorization:
            `Bearer ${this.$store.getters.accessToken}`
          }
          })
          .then(response => this.dbInfo = response.data)
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
      showSelected(id){
        // console.log(this.dbInfo)
        console.log(this.title_card)
        // console.log("this is carosel finder"+ `${id}`)
          axios({
          method: "get",
          url: `http://localhost:8000/api/v1/recipes/${id}/`,
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
      keywordsearch(){
        // console.log("this is the user id", this.$store.getters.userId, "this is the user name", this.$store.getters.favorite)
        console.log(this.$store.state.authUser)
        axios({
          method: "get",
          url: `http://localhost:8000/api/v1/recipes/?search=${this.search}`,
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
      
      
  },
  mounted(){
    this.getToken()
    this.getRecipes()
  }
}
</script>
<style scoped>

</style>