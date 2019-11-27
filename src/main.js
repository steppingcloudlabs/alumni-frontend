import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'

// Vue.use(VueGoogleMaps, {
//   load: {
//     key:"AIzaSyDiiJhzJc9Xplb12zM5fvu5EXdYrgvnQ4A",
//     libraries: "places" // necessary for places input
//   }
// });
 

Vue.use(Vuelidate)




Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
