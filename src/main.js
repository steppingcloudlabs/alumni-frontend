import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueTour from 'vue-tour'
require('vue-tour/dist/vue-tour.css')

import {gmapApi} from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key:"AIzaSyDiiJhzJc9Xplb12zM5fvu5EXdYrgvnQ4A",
    libraries: "places" // necessary for places input
  }
});
 


Vue.use(VueTour)

Vue.use(Vuelidate)




Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
