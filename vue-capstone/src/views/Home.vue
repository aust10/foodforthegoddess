<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Search/>
    <h1 v-for="(item, index) in posts" :key="index">{{ item.title }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Search from '@/components/Search';
import {mapState} from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Search
  },
  mounted() {
    this.$store.dispatch('loadPosts')
  },
  computed: {
    ...mapState([
      'posts'
    ])
  }
}
</script>
