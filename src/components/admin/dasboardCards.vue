<template>
  <v-card
    class="mt-5 mb-4 mx-auto"
    max-width="400"
  >
  <v-layout row wrap>
      <v-flex xs4>
           <v-sheet
      class="v-sheet--offset ml-5"
      color="#172151"
      elevation="12"
      width="80px"
    >
      <v-icon large color="white" class="mt-5 mb-5 ml-5">
       {{icon}}
      </v-icon>
    </v-sheet>
   
      </v-flex>

      <v-flex xs8>
           <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2 mt-2 ml-5">
       {{titleHead}}
      </div>
      <div class="subheading font-weight-light grey--text" v-if="getStatusList.length">
        <v-btn
        block
        text
        @click="download"
      >
        Download Report
      </v-btn>
      </div>
      
    </v-card-text>
      </v-flex>
      <v-flex xs12 >
          <v-card-text>
              <v-divider class="my-2"></v-divider>
                <v-icon
                    class="mr-2"
                    small
                >
                    mdi-clock
                </v-icon>
                <span class="caption grey--text font-weight-light">last Uploaded:{{lastStatus}}</span>
                    </v-card-text>
      </v-flex>
  </v-layout>
   
   
  </v-card>
</template>

<script>
import IconsVue from '../../views/Icons.vue'
  export default {
    data: () => ({
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
    }),

   props: {
   titleHead: {
      type: String,
      default: undefined,
    },
    lastStatus: {
      type: String,
      default: "Not Uploaded Yet",
    },
    icon:{
      type:String,
      default: undefined
    }
  }, 
  computed:{
      getStatusList: {
      get() {
        return this.$store.getters["adminModule/getStatusList"];
      },
      set(data) {
        this.$store.commit("adminModule/setStatusList", this.data);
      },
    },
 
  },
  methods:{
      download()
      {
          this.$emit("download",this.getStatusList)
      }
  } 
  }
</script>
<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>