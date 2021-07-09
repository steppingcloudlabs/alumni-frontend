<template>
  <v-card
    class="mt-5 mb-4 mx-auto"
    max-width="400"
    min-height="150"
  >
  <v-layout row wrap>
      <v-flex xs4>
           <v-sheet
      class="v-sheet--offset ml-5"
      color="primary"
      elevation="12"
      width="80px"
    >
      <v-icon large color="secondary" class="mt-5 mb-5 ml-5">
     mdi-palette
      </v-icon>
    </v-sheet>
   
      </v-flex>

      <v-flex xs8>
           <v-card-text class="pt-0" style="height:100px">
      <div class="title font-weight-light mb-2 mt-2 ml-5">
       Theme Settings
      </div>
     
      
    </v-card-text>
      </v-flex>
      <v-flex xs12 >
          <v-card-text text-color="secondary" style="text-align:right;">
              <v-divider class="my-2"></v-divider>
             
                 <v-btn  color="primary" @click="openInput" style="color:white" >Change Theme Settings</v-btn>
                  
                <!-- <v-icon
                    class="mr-2"
                    small
                >
                    mdi-clock
                </v-icon>
                <span v-if="getList.length" class="caption grey--text font-weight-light">last Uploaded:{{getList[0].CREATEDAT}}</span> -->
                    </v-card-text>
      </v-flex>
  </v-layout>
   
   <themepicker></themepicker>
  </v-card>
</template>

<script>
  import themepicker from "@/components/admin/themePicker.vue"
  export default {
    data: () => ({
     
    }),
   components:
   {
      themepicker
   },
   
  computed:{
      showTheme: {
      get() {
        return this.$store.getters["adminModule/getshowThemeDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowTheme", data);
      },
    },
 
  },
  methods:{
     
       openInput()
    {
     this.showTheme=true
    },
       
    
     
    
  } 
  }
</script>
<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
  .link:hover{
   cursor: pointer;
  }
</style>