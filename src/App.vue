<template>
  <!-- <v-app style="background: rgb(35, 43, 43)"> -->
    <v-app >
    <router-view></router-view>
    <SnackbarComponent></SnackbarComponent>
    <CommonDialogComponent></CommonDialogComponent>
    <ProgressbarComponent></ProgressbarComponent>
  </v-app>
</template>

<script>
//import NavigationDrawer from './components/NavigationDrawer';
import AOS from "aos";
import Home from "./views/Home";
import SnackbarComponent from "@/components/material/Snackbar";
import CommonDialogComponent from "@/components/material/CommonDialogComponent";
import ProgressbarComponent from "@/components/material/Progress";
AOS.init();
export default {
  name: "App",
  components: {
    Home,
    SnackbarComponent,
    CommonDialogComponent,
    ProgressbarComponent
  },
  data: () => {
    return {};
  },
  mounted() {
    // this.$store.dispatch("authenticate");
  }
};
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
