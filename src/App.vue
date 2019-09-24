<template>
  <v-app  style="background:#1A1A1D" >
    <Home/>
    <router-view></router-view>
    <SnackbarComponent></SnackbarComponent>
  </v-app>
</template>

<script>

//import NavigationDrawer from './components/NavigationDrawer';
import Home from './views/Home';
import SnackbarComponent from '@/components/material/Snackbar'




export default {
  name: 'App',
  components: {
    Home,
    SnackbarComponent   
  },
  data: () => {
    return {

    }
  },
  mounted() {
    this.$store.dispatch('authenticate');
  },
  
};
</script>
