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
      <v-btn rounded color="transparent" @click="getRecipes">Favorites</v-btn>
      <v-btn rounded color="transparent" @click="deleteToken">Logout</v-btn>
    </v-app-bar>  

    <v-container class="success" fluid>
    <v-row>
      <v-col cols="12">
          <!-- :align="alignment" -->
        <v-row
          justify-space-between
          class="pb-0 justify-space-between"
         
        >
          <v-card
              class="align-right ma-6 pa-2 mb-1 info"
              max-width="60%"
          >
              <v-img
              class="white--text align-end"
              height="300px"
              :src="require('../images/FFTG_logo.png')"
              >
              <v-card-title class="red--text">Today's top recipe</v-card-title>
              </v-img>

              <v-card-text class="text--primary">
              <div>Whitehaven Beach</div>
              </v-card-text>

              <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                Share
              </v-btn>

              <v-btn
                color="orange"
                text
              >
                Explore
              </v-btn>
              </v-card-actions>
          </v-card>
          <v-card
            width="30%"
            class="ma-6 mb-1 pa-6 mr-6 "
            outlined
          >
          <v-img
            class="white--text align-end ml-3 info"
            height="80px"
            width="60"
            :src="require('../images/FFTG_logo.png')"
          >
          </v-img>
          <v-card-title class="black--text">Food for thought</v-card-title>
          <v-card-text class="text--primary">
            <div>
            “Food for the Goddess” provides men – and women, for that matter -- one avenue for
            getting back in touch with the feminine principles that move in mysterious and powerful
            ways in our world. By showing respect for women through the loving preparation and
            presentation of food, a man can put himself in proper alignment with the Cosmic Order.
            And he can have a good time and be useful in the bargain.
            </div>
          </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
    <v-content
      class="pa-5 pt-0 success">
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
                    <v-card>
                    <v-card-title class="subheading font-weight-bold info">{{ item.recipe_name }}</v-card-title>

                    <v-divider></v-divider>

                    <v-list dense>

                        <v-img
                        class="white--text align-end"
                        height="200px"
                        :src='item.picture'
                        >
                        </v-img>
                  

                        <v-list-item-content class="black--text" v-for="category in item.category_info" :key = "category">Category:{{ category.name }}</v-list-item-content>

                       
                    </v-list>
                    </v-card>
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

        <v-container
            max-width="200"
        >
          <h1 v-show="this.selectedInfo.length">Results:</h1>
        <v-card
            class="ma-6 mb-1 pa-6 mr-6 "
            outlined
            v-for="name in selectedInfo" :key = "name"
          >
          <v-card-title class="black--text justify-center" >{{ name.recipe_name }}<v-icon 
            color="red darken-4" class="ml-12" @click="favorite(name.id)">mdi-heart-outline</v-icon>
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
                    <ul class="mt-2 mb-5" >
                      <li v-for="ingredient in name.ingredient_info" :key="ingredient">
                        {{ingredient.ingredients}}
                      </li>
                    </ul>
                    <p>{{name.body}}</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-card-text>
          </v-card>        
        </v-container>
    </v-content>
    <v-footer
      color="secondary"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>
<script>
import axios from "axios"
// import router from '../router'
// import { bus } from '../main'
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
        emptyIcon: 'mdi-heart-outline',
        fullIcon: 'mdi-heart',
        color: 'red lighten-3',
        selectedInfo: [],
        favoriteInfo: [],
       
  
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
        .then(response => {
          this.selectedInfo = response.data
          // this.$emit('searched', this.selectedInfo)
        }
          )


        // bus.$emit(console.log('infochanged', this.selectedInfo))
        // this.$router.push('/results')
          // router.push({name:'searchResult'})
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
        this.$store.dispatch('deleteToken')
      },
      // favorite(id) {
      //   axios({
      //     method: "patch",
      //     url: 'http://localhost:8000/api/v1/favorite/'+ id,
      //     headers: {
      //         authorization: `Bearer ${this.$store.obtainToken}`
      //       },
      //     data: {
      //       favorite_recipes: this.id
      //     }
      //     })
      //     .then((response)=> {
      //       console.log(response);
      //     })
      //     .catch(error => {
      //         alert("Error with request...not authenticated");
      //         console.log(error);
      // });
      // },
    },
    mounted() {
        this.getRecipes()
        // inspectToken()
    }
  }
</script>