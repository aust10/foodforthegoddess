<template>
  <div  class="about">
    <v-container class="success pb-0" fluid>
      <v-app-bar
      app
      color="white"
      dark
      hide-on-scroll
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
        <v-btn class="mr-1 blue-grey--text" rounded color="transparent" to="/">home</v-btn>
        <!-- <v-btn class="mr-1 blue-grey--text" rounded color="transparent">About</v-btn> -->
        <v-btn class="blue-grey--text" to="/login" rounded color="amber" @click="getToken">Login</v-btn>
    </v-app-bar>
        <v-container   color="#FADCCA" fluid>
    <v-row class=" pb-6">
      <v-col class="pt-0" cols="12">
        <v-row
          class="pb-0 justify-space-between"
         
        >
        <v-card
            width="30%"
            class="ma-6 mb-1 pa-6 mr-6 info "
            outlined
          >
          <v-img
            class="white--text align-end ml-3"
            height="80px"
            width="60"
            :src="require('../images/FFTG_logo.png')"
          >
          </v-img>
          <v-card-title class="black--text">So why a cookbook?</v-card-title>
          <v-card-text class="text--primary">
            <div>
            “Food for the Goddess” provides men – and women, for that matter -- one avenue for getting back in touch with the feminine principles that move in mysterious and powerful
            ways in our world.
            <br><br>
            By showing respect for women through the loving preparation and
            presentation of food, a man can put himself in proper alignment with the Cosmic Order.
            <br><br>
            And he can have a good time and be useful in the bargain.
            </div>
          </v-card-text>
          </v-card>
          
          <v-card
            width="28%"
            class="ma-6 mb-1 pa-6 mr-6 info "
            outlined
          >
          <v-card
            outlined
            class="gold">
          <h1 class="text-center display-1 mt-4 ">Who is the goddess?
          </h1>
          <div class="text-center">
            She is your mother.<br> She is your sister.<br> Your lover. Your wife. Your friend.
          </div>

          <v-card class="ma-3">
            <v-img
              class="white--text ma-3 mt-"
              height=""
              width=""
              :src="require('../images/FFTG_logo.png')"
            >
            </v-img>
          </v-card>
           <v-card-text class="text--primary">
          
          </v-card-text>
          </v-card>
          </v-card>
          <v-card
            width="30%"
            class="ma-6 mb-1 pa-6 mr-6 info"
            outlined
          >
          <v-card-title class="black--text  text-center display-1">Why Should a Man<br> Know How to Cook?</v-card-title>
          <v-card-text class="text--primary ">
            <div>
            “What do women want?” Sigmund Freud famously asked.
            <br><br>
            How the heck should I know? If the good doctor couldn’t work it out after all those years, you can’t very well expect me to have the answer.
            <br><br>
            I can tell you something women don’t want. They don’t want to spend three-quarters of a lifetime churning out two or three meals a day for the men and children in their local social unit just because tradition says they must.
            <br><br>
            <div class="text-center ">
              <p class="font-weight-bold">And most of all, they don’t want to be taken for granted.</p>
              <br>
              <p class="font-italic display-1">Log in and find out what awaits you!</p>
            </div>
            </div>
          </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
    

    </v-container>
    <v-footer
    class="blue-grey--text"
      color="white"
      app
      position: absolute
    
    >
      <span class="blue-grey--text">food4thegoddess</span><v-spacer></v-spacer> &copy; 2020
    </v-footer>
  </div>
</template>
<script>
export default {
  data(){
    return {
    }
  },
  methods: {
    // call state obtain token here
       getToken() {
      const payload = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("obtainToken", payload);
    },
  }
}
</script>
<style scoped>

</style>