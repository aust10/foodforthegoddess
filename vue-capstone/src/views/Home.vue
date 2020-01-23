<template>
  <div class="home">
    <v-container fluid>
      <h1>Home Page</h1>
      <!-- <input v-model="username" placeholder="Search..." /> -->
      <!-- <input v-model="password" placeholder="password here..." /> -->
      <!-- <v-btn @click="getToken">Find</v-btn><br> -->
      <router-link to="/login">
          Login
      </router-link>
      <p>This Page will be the initial page that everyone can visit with a login, pictures scrolling carosell </p>
      <!-- <v-btn @click="deleteToken">Remove token from Vue frontend</v-btn> -->
      <!-- <h3>Access token:</h3>
      <p>{{access}}</p>
      <h3>Refresh token:</h3>
      <p>{{refresh}}</p>
      <v-btn @click="inspectToken">Inspect token</v-btn>
      <v-btn @click="refreshToken">Refresh token</v-btn>
      <v-btn @click="testAPI">Test Protected Django API</v-btn> -->
    </v-container>
  </div>
</template>
<script>

</script>