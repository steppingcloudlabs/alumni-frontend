import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HomePage from '@/components/base/HomePage'
import signin from './views/Login.vue'
import signup from './views/signup.vue'
import portal from '@/views/portal.vue'
import resetpassword from './views/forgot.vue'
import careers from './components/core/careers.vue'
import changepassword from './components/core/changePassword.vue'
import updatepassword from './components/core/updatePassword.vue'
import Dashboard from './views/Dashboard.vue'
import UserProfile from './views/UserProfile1.vue'
import Maps from './views/Maps.vue'
import notification from './views/Notifications.vue'
import Document from './views/Document.vue'
import admin from './views/adminportal.vue'
import newsupload from './components/admin/newsupload.vue'
import document from './components/admin/UploadDocument.vue'
import dashboard from './components/admin/Dashboard.vue'
import FaQ from './components/admin/FaqUpdate.vue'
import AskHr from './components/core/askHr.vue'
import companySetting from './components/admin/companySetting.vue'
import searchProfile from './components/core/OpenProfile.vue'
import upHome from "./components/updatedDesign/updatedHomepage.vue"
Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    children: [{
      path: '/home',
      name: 'hompage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomePage
      //component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/login',
      name: 'signin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: signin
      //component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/test',
      name: 'testing',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: upHome
      //component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: signup
      //component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/forgotpassword',
      name: 'resetpassword',
      component: resetpassword
    },
    {
      path: '/resetpassword/:token',
      name: 'changepassword',
      component: changepassword
    }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: portal,
    children: [{
      path: 'changepassword',
      // Relative to /src/views
      component: updatepassword
    },
    {
      path: 'dashboard',
      // Relative to /src/views
      component: Dashboard
    },
    {
      path: 'query',
      // Relative to /src/views
      component: AskHr
    },
    {
      path: 'search/:userId',
      // Relative to /src/views
      component: searchProfile
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
      component: careers
    },
    {
      path: 'notification',
      name: 'notification',
      component: notification
    },
    {
      path: 'dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: 'document',
      name: 'document',
      component: Document
    }


    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    children: [{
      path: 'dashboard',
      // Relative to /src/views
      component: dashboard
    },
    {
      path: 'newsupload',
      name: '',
      component: newsupload
    },
    {
      path: 'update',
      component: FaQ
    },
    {
      path: 'document',

      component: document
    },
    {
      path: 'notification',

      component: notification
    },
    {
      path: 'dashboard',

      component: Dashboard
    },
    {
      path: 'document',

      component: Document
    },
    {
      path: 'settings',

      component: companySetting
    }



    ]
  },



  ]
})


router.beforeResolve((to, from, next) => {
  // if (to.name) {
  //   NProgress.start()
  // }
  if (!sessionStorage.getItem('AccessToken') && to.fullPath.indexOf('/profile') > -1) {
    next({
      path: '/home'
    })
    return
  } else if (!sessionStorage.getItem('AccessToken') && to.fullPath.indexOf('/admin') > -1) {
    next({
      path: '/home'
    })
    return
  } else if (sessionStorage.getItem('AccessToken') && sessionStorage.getItem('Type') == '21232f297a57a5a743894a0e4a801fc3' && to.fullPath.indexOf('/profile') > -1) {
    next({
      path: '/admin/dashboard'
    })
    return
  } else if (sessionStorage.getItem('AccessToken') && sessionStorage.getItem('Type') == 'ee11cbb19052e40b07aac0ca060c23ee' && to.fullPath.indexOf('/admin') > -1) {
    next({
      path: '/profile/dashboard'
    })
    return
  }
  next();
})

router.afterEach((to, from, next) => {
  NProgress.done()
})

export default router