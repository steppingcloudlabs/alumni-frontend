<template>
  <v-layout row wrap class="dialogClass">
    <v-dialog v-model="showTheme" persistent max-width="600px">
      <v-card>
        <v-toolbar class="mb-5 primary">
          <v-toolbar-title class="ml-5 white--text " >Change Theme</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <template v-slot:extension>
                <v-tabs
                v-model="tab"
                grow
                color="secondary"
                 light
                >
                <v-tabs-slider color="secondary"></v-tabs-slider>

                <v-tab
                    v-for="item in items"
                    :key="item"
                     
                >
                    {{ item }}
                </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>
        <v-tabs-items v-model="tab">
            <v-tab-item >
                <v-card>
                <v-card-text>
           <v-row justify="center" align="center">
			<v-col md="4" class="shrink" >
                Primary
            </v-col>
            <v-col md="7" class="shrink" style="min-width: 220px;">
                <colorpick :color.sync="colors.primary"></colorpick>
            </v-col>
           </v-row>
           <v-row justify="center" align="center">
			<v-col md="4" class="shrink" >
                Secondary
            </v-col>
            <v-col md="7" class="shrink" style="min-width: 220px;">
                <colorpick :color.sync="colors.secondary"></colorpick>
            </v-col>
           </v-row>
           <v-row justify="center" align="center">
			<v-col md="4" class="shrink" >
                Error
            </v-col>
            <v-col md="7" class="shrink" style="min-width: 220px;">
                <colorpick :color.sync="colors.error"></colorpick>
            </v-col>
           </v-row>
           <v-row justify="center" align="center">
			<v-col md="4" class="shrink" >
                Success
            </v-col>
            <v-col md="7" class="shrink" style="min-width: 220px;">
                <colorpick :color.sync="colors.success"></colorpick>
            </v-col>
           </v-row>
           <v-row justify="center" align="center">
			<v-col md="4" class="shrink" >
                Info
            </v-col>
            <v-col md="7" class="shrink" style="min-width: 220px;">
                <colorpick :color.sync="colors.info"></colorpick>
            </v-col>
           </v-row>
           <v-row justify="center" align="center">
			<v-col md="4" class="shrink" >
                Warning
            </v-col>
            <v-col md="7" class="shrink" style="min-width: 220px;">
                <colorpick :color.sync="colors.warning"></colorpick>
            </v-col>
           </v-row>
           <v-row justify="center" align="center">
			<v-col md="4" class="shrink" >
                Accent
            </v-col>
            <v-col md="7" class="shrink" style="min-width: 220px;">
                <colorpick :color.sync="colors.accent"></colorpick>
            </v-col>
           </v-row>
        </v-card-text>
     
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="accent darken-1" text @click="resetDialog">Reset to Default</v-btn>
          <v-btn color="error darken-1" text @click="closeDialog">Close</v-btn>
          <v-btn color="primary darken-1" text @click="saveDialog">Save</v-btn>
        </v-card-actions>
                </v-card>
     
            </v-tab-item>
            <v-tab-item >
              <Dynamicimage></Dynamicimage>
            </v-tab-item>
            <v-tab-item >
              <Dynamicimage></Dynamicimage>
            </v-tab-item>
    </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";
import colorpick from "@/components/admin/colorpicker.vue"
import Dynamicimage from "./dynamicImage.vue"
export default {
    components:
    {
      colorpick,
      Dynamicimage
    },
  computed: {
    
    showTheme: {
      get() {
        return this.$store.getters["adminModule/getshowThemeDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowTheme", data);
      },
    },
  },
  data() {
    return {
        tab: null,
        items: ['Color', 'Images', 'Director'],
        
      titleRules: [(v) => !!v || "Title is required"],
      bodyRules: [(v) => !!v || "Body is required"],
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
       colors: {
          primary: "#E65100",
          accent: "#7CB342",
          secondary: "#689F38",
          success: "#4CAF50",
          info: "#6156d8",
          warning: "#1565C0",
          error: "#FF7043"
        },
    };
  },
  beforeMount()
  {
      this.$store.dispatch('userModule/getColorTheme',{}).then((response)=>
    {
      if(response.status=="200")
      {
         Object.keys(response.result).forEach(i => {
        this.$vuetify.theme.themes.light[i]=response.result[i];
         Object.keys(this.$vuetify.theme.themes.light).forEach(i => {
        this.colors[i]=this.$vuetify.theme.themes.light[i] ;
      });
      });
      }
    })
  
    
  },
  methods: {
      resetDialog()
      {
           this.showTheme=false
             let data={payload:this.colors} 
             Object.keys(this.$vuetify.theme.themes.dark).forEach(i => {
         this.colors[i]=this.$vuetify.theme.themes.dark[i];
         this.$vuetify.theme.themes.light[i]=this.$vuetify.theme.themes.dark[i];
      });

            this.$store.dispatch('adminModule/updateColorTheme',data).then((response)=>
       {
           if(response.status=="200")
           {
               this.$store.commit("showSnackbar", {
                                color: "success",
                                duration: 1000,
                                message: "Color Theme reset to default ",
                                heading: "Success"
                                })
           }
           else
           {
                this.$store.commit("showSnackbar", {
                                color: "error",
                                duration: 1000,
                                message: response.result,
                                heading: "error"
                                })
           }

       }).catch((error)=> {
           
                this.$store.commit("showSnackbar", {
                                color: "error",
                                duration: 1000,
                                message: error,
                                heading: "error"
                                })
       })
      },
      closeDialog()
      {   console.log(this.colors.primary)
      

          this.showTheme=false
      },
      saveDialog()
      {
       let data={payload:this.colors}   
       console.log(data)
        Object.keys(this.colors).forEach(i => {
        this.$vuetify.theme.themes.light[i] = this.colors[i];
      });
      // also save theme name to disable selection
      this.$vuetify.theme.themes.name = "test";
      
       this.showTheme=false
       this.$store.dispatch('adminModule/updateColorTheme',data).then((response)=>
       {
           if(response.status=="200")
           {
               this.$store.commit("showSnackbar", {
                                color: "success",
                                duration: 1000,
                                message: "Color Theme Updated Sucessfully",
                                heading: "Success"
                                })
           }
           else
           {
                this.$store.commit("showSnackbar", {
                                color: "error",
                                duration: 1000,
                                message: response.result,
                                heading: "error"
                                })
           }

       }).catch((error)=> {
           
                this.$store.commit("showSnackbar", {
                                color: "error",
                                duration: 1000,
                                message: error,
                                heading: "error"
                                })
       })
     
  }
  }
};
</script>