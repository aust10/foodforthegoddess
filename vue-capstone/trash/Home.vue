<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <Search/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import Search from '@/components/Search';


export default {
  name: 'home',
  components: {
    HelloWorld,
    // Search
  },
  
  computed: {
    
  }
}
</script>
