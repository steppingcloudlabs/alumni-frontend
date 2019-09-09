<template>
  <v-app  style="background:#1A1A1D" >
    <Home/>
    <router-view></router-view>
  </v-app>
   
 
</template>

<script>

//import NavigationDrawer from './components/NavigationDrawer';
import Home from './views/Home';




export default {
  name: 'App',
  components: {
  
    Home,
   
  },
  data: () => ({
    //
  }),
  mounted() {
    this.$store.dispatch('authenticate');
  }
};
</script>
