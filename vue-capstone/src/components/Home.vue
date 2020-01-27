<template>
  <div  class="home">
    <v-container class="success" fluid>
      <!-- <h1>Home Page</h1> -->
      <v-app-bar
      app
      color="secondary"
      dark
    >
      <v-toolbar-title>food4thegoddess</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <!-- <v-spacer></v-spacer> -->
        <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn rounded color="transparent" @click="getRecipes">Favorites</v-btn>
        <v-btn to="/login" rounded color="transparent" @click="obtainToken">Login</v-btn>
    </v-app-bar>
        <v-container  color="#FADCCA" fluid>
    <v-row>
      <v-col cols="12">
        <v-row
          :align="alignment"
          justify-space-between
          class="pb-0 justify-space-between"
         
        >
        <v-card
            width="25%"
            class="ma-6 mb-1 pa-6 mr-6 info"
            outlined
          >
          <v-img
            class="white--text align-end ml-3"
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
          <v-card
              class="align-right ma-6 pa-2 mb-1 info"
              max-width="40%"
          >
              <v-img
              class="white--text align-end"
              height="300px"
              :src="require('../images/sample.jpg')"
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
            width="25%"
            class="ma-6 mb-1 pa-6 mr-6 info "
            outlined
          >
          <v-card
            outlined>
          <v-card-title class="black--text ">okra</v-card-title>
          <v-img
            class="white--text align-end ml-3"
            height="100px"
            width=""
            :src="require('../images/sample.jpg')"
          >
          </v-img>
           <v-card-text class="text--primary">
            <div>
              <p class="text-center">
              Discription of the food above
              </p>
            </div>
          </v-card-text>
          </v-card>
          <v-card
            class="mt-1"
            outlined>
          <v-card-title class="">okra</v-card-title>
            <v-img
            class="white--text align-end ml-3 "
            height="100px"
            width=""
            :src="require('../images/sample.jpg')"
          >
           </v-img>
          <v-card-text class="text--primary">
            <div>
              <p class="text-center">
              Discription of the food above
              </p>
            </div>
          </v-card-text>
          </v-card>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
    

    </v-container>
    <v-footer
      color="secondary"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </div>
</template>
<script>

</script>
<style scoped>
#home{
  background-color: #F59A98;
}

</style>