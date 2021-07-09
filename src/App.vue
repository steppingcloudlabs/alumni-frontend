<template>
  <!-- <v-app style="background: rgb(35, 43, 43)"> -->
    <v-app >
    <router-view></router-view>
    <SnackbarComponent></SnackbarComponent>
    <CommonDialogComponent></CommonDialogComponent>
    <ProgressbarComponent></ProgressbarComponent>
    <v-tour name="myTour" :steps="steps"></v-tour>
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
    return {
       steps: [
        {
          // I prefer using data attributes, but you can use
          // classes, ids, or whatever else you want!
          // (So long as document.querySelector() likes it.)
          target: '[data-tour-step="1"]',
          content: `You can update your profile by clicking user porfile under this icon.`
        },
        {
          target: '[data-tour-step="2"]',
          // You can even use HTML!
          content: `You can download your documents under this option!`,
           params: {
            // You can control the position of the tour popup easily.
            placement: 'right'
          }
        },
        {
          target: '[data-tour-step="3"]',
          content: `You can find current openings here!.`,
          params: {
            // You can control the position of the tour popup easily.
            placement: 'right'
          }
        },
          {
          target: '[data-tour-step="4"]',
          content: `Find all the employees on world map`,
          params: {
            // You can control the position of the tour popup easily.
            placement: 'right'
          }
        },
         {
          target: '[data-tour-step="5"]',
          content: `Have queries. No worries You can raise ticket to HR`,
          params: {
            // You can control the position of the tour popup easily.
            placement: 'right'
          }
        },
         {
          target: '[data-tour-step="6"]',
          content: `Access all frequently asked question here.`,
          params: {
            // You can control the position of the tour popup easily.
            placement: 'right'
          }
        }
      ]
    };
  },
  mounted() {
    // this.$store.dispatch("authenticate");
  },
  beforeMount()
  {
    this.$store.dispatch('userModule/getColorTheme',{}).then((response)=>
    {
      if(response.status=="200")
      {
         Object.keys(response.result).forEach(i => {
        this.$vuetify.theme.themes.light[i]=response.result[i];
      });
      }
    })
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
