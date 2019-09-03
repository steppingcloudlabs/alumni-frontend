<template>
  <v-app>
   <Home/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
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
