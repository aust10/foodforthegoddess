<template>
  <v-app id="inspire">

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>food4thegoddess</v-toolbar-title>
      <v-spacer></v-spacer>

        <v-text-field
   
            clearable
            flat
            solo-inverted
            hide-details
            label="Search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn @click="keywordsearch" :key="searchit">Search</v-btn>
        <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn rounded color="transparent" @click="getRecipes">Favorites</v-btn>
      <v-btn rounded color="transparent" @click="deleteToken">Logout</v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row
          :align="alignment"
          justify-space-between
          class="pb-0 justify-space-between"
         
        >
          <v-card
              class="align-right ma-6 pa-2 mb-1"
              max-width="60%"
          >
              <v-img
              class="white--text align-end"
              height="300px"
              :src="require('../images/FFTG_logo.png')"
              >
              <v-card-title class="red--text">Today's top recipe</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

              <v-card-text class="text--primary">
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
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
            class="white--text align-end ml-3"
            height="80px"
            width="60"
            :src="require('../images/FFTG_logo.png')"
          >
          </v-img>
          <v-card-title class="black--text">Today's top recipe</v-card-title>
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
      class="pa-5 pt-0">
        <v-container fluid>
            <v-data-iterator
            :items="dbInfo"
            :items-per-page.sync="itemsPerPage"
            :page="page"
            :search="search"
            :sort-by="sortBy.toLowerCase()"
            :sort-desc="sortDesc"
            hide-default-footer
            >
            <v-spacer></v-spacer>

            <template v-slot:default="props">
                <v-row>
                <v-col
                    v-for="item in props.items"
                    :key= "item.recipe_name" 
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                >
                    <v-card>
                    <v-card-title class="subheading font-weight-bold">{{ item.recipe_name }}</v-card-title>

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
                    color="blue darken-3"
                    class="mr-1"
                    @click="formerPage"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                    fab
                    dark
                    color="blue darken-3"
                    class="ml-1"
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
            <h1>History:</h1>
            <p>This will be the body of the history</p>
            <ul> 
                <li v-for="name in dbInfo" :key = "name" >{{ name.recipe_name }}</li>
            </ul>
            <p>{{ dbInfo }}</p>
        </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>
<script>
// import axios from "axios";
// export default {
//     data() {
//         return {
//         info: [],
//         };
//     },
//     methods: {
//     deleteToken() {
//         this.$store.dispatch("deleteToken");
//     },
//     getRecipes() {
//         axios({
//         method: "get",
//         url: 'http://localhost:8000/api/v1/recipes/',
//         headers: {
//             authorization: `Bearer ${this.access}`
//         }
//         })
//         .then(response => console.log(response.data))
//         .catch(error => {
//             alert("Error with request...not authenticated");
//             console.log(error);
//         });
//     }
//     },

// }
// </script>
// import axios
// <script>
import axios from "axios";
  export default {
    data () {
      return {

        itemsPerPageArray: [4, 8, 12],
        
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'recipe_name',
        selectBar:'',
        search: '',
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
        if (this.selectBar= "category_info"){
          axios({
            method: "get",
            url: `http://localhost:8000/api/v1/recipes/?search=${this.search}`,
          })
          .then(response => console.log(response.data))
          .catch(error => {
            alert("Please try another search");
            console.log(error);
          });
      };
      nextPage(); {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      }
      formerPage (); {
        if (this.page - 1 >= 1) this.page -= 1
      }
      updateItemsPerPage (number); {
        this.itemsPerPage = number
      }
      deleteToken(); {
        this.$store.dispatch("deleteToken");
    }
    getRecipes(); {
        axios({
        method: "get",
        url: 'http://localhost:8000/api/v1/recipes/',
        })
        .then(response => this.dbInfo = response.data)
        .catch(error => {
            alert("Error with request...not authenticated");
            console.log(error);
        });
    }
    },
    mounted() {
        this.getRecipes()
        // inspectToken()
    }
  }
  }
</script>