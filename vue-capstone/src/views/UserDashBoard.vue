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
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            label="Search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-select
            v-model="sortBy"
            flat
            solo-inverted
            hide-details
            :items="keys"
            label="Sort by"
        ></v-select>
      <v-spacer></v-spacer>
      <v-btn rounded color="transparent" @click="getRecipes">Favorites</v-btn>
      <v-btn rounded color="transparent" @click="deleteToken">Logout</v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
        <v-card
            class="mx-auto"
            max-width=""
        >
            <v-img
            class="white--text align-end"
            height="200px"
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
                    :key="item.recipe_name" 
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                >
                    <v-card>
                    <v-card-title class="subheading font-weight-bold">{{ item.recipe_name }}</v-card-title>

                    <v-divider></v-divider>

                    <v-list dense>
    

                        <v-list-item-content class="blue--text" v-for="category in item.category_info" :key="category">Category: {{ category.name }}</v-list-item-content>

                        <!-- <v-list-item-content class="align-end" v-for="keyword in item.keyword_info" :key="keyword">Keywords: {{ keyword.keywords }}</v-list-item-content> -->


                       
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
                <li v-for="name in dbInfo" :key="name">{{ name.recipe_name }}</li>
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
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'recipe_name',
        // keys: [
        //     'Name',
        //   'Category',
        //   'Key Words',
          
        // ],
        dbInfo: [],
        items: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%',
          },
        ],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.dbInfo.length / this.itemsPerPage)
      },
    //   filteredKeys () {
    //     return this.keys.filter(key => key !== `Name`)
    //   },
      
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      deleteToken() {
        this.$store.dispatch("deleteToken");
    },
    getRecipes() {
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
        this.getRecipes(),
        inspectToken()
    }
  }
</script>