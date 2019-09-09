import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import signin from './views/Login.vue'
import signup from './views/signup.vue'
import portal from '@/views/portal.vue'
import resetpassword from './views/forgot.vue'
import careers from './components/core/careers.vue'
import Dashboard from './views/Dashboard.vue'
import UserProfile from './views/UserProfile.vue'
import Maps from './views/Maps.vue'
import notification from './views/Notifications.vue'





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
      component: portal,
      children:[
        {
          path: 'dashboard',
          // Relative to /src/views
          component: Dashboard
        },
        {
          path: 'user-profile',
          name: 'Profile',
          component: UserProfile
        },
        {
          path: 'maps',
          component: Maps
        },
        {
          path: 'careers',
          name: 'careers',
          component:careers
        },
        {
          path: 'notification',
          name: 'notification',
          component:notification
        },
        
      ]
    },
    {
      path: '/forgotpassword',
      name: 'restpassword',
      component: resetpassword
    },
   
   
   
  ]
})
