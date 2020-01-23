import Vue from 'vue'
import VueRouter from 'vue-router'
import JWTTest from '../views/JWTTest.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import UserDashBoard from '../views/UserDashBoard'

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
      path: '/home',
      name: 'userDashBoard',
      component: UserDashBoard
    }
  ]
})

export default router
