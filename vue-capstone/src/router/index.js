import Vue from 'vue'
import VueRouter from 'vue-router'
import JWTTest from '../components/JWTTest.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import UserDashBoard from '../components/UserDashBoard'
import SearchResult from '../components/SearchResult'
import Favorites from '../components/Favorites'
import index from '../store'
// import { authComputed } from '../store/helpers'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/JWTTest',
      name: 'jwtTest',
      component: JWTTest
    },
    {
      path: '/Login',
      name: 'testLogin',
      component: Login
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
      beforeEnter (to, from, next){
        if(index.state.isAuthenticated) {
          next ()
        } else {
          next('/Login')
        }
      }
    },
    {
      path: '/results',
      name: 'searchResult',
      component: SearchResult,
      beforeEnter (to, from, next){
        if(index.state.isAuthenticated) {
          next ()
        } else {
          next('/Login')
        }
      }
    },
    {
      path: '/userDashBoard',
      name: 'userDashBoard',
      component: UserDashBoard,
      beforeEnter (to, from, next){
        if(index.state.isAuthenticated) {
          next ()
        } else {
          next('/Login')
        }
      }
    }
  ]
})


export default router

