<template>
  <v-app>
    <Header></Header>
    <NavigationDrawer></NavigationDrawer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import NavigationDrawer from './components/NavigationDrawer';
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    NavigationDrawer,
    Header,
  },
  data: () => ({
    //
  }),
  mounted() {
    this.$store.dispatch('authenticate');
  }
};
</script>
