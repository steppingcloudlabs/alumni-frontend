import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import signin from './views/Login.vue'
import signup from './views/signup.vue'
import NavigationDrawer from '@/components/NavigationDrawer'
import resetpassword from './views/forgot.vue'




Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:signin
      //component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:signup
      //component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: NavigationDrawer
    },
    {
      path: '/forgotpassword',
      name: 'restpassword',
      component: resetpassword
    },
   
  ]
})
