import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCxQR5SxCB8uOi4YbOxViMs5qboDrMpsBM",
    libraries: "places" // necessary for places input
  }
});
 

Vue.use(Vuelidate)




Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
