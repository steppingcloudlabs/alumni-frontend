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
           <v-card-text class="pt-0" style="height:100px">
      <div class="title font-weight-light mb-2 mt-2 ml-5">
       {{titleHead}}
      </div>
      <div class="subheading font-weight-light grey--text" v-if="getList.length">
        <p
        block
        text
        @click="download"
        class="link"
      >
       Report_{{getList[0].ID}}
        </p>
      </div>
      <div class="subheading font-weight-light grey--text ml-5" v-else>
       No Report Available
      </div>
      
    </v-card-text>
      </v-flex>
      <v-flex xs12 >
          <v-card-text style="text-align:right;color:white">
              <v-divider class="my-2"></v-divider>
             
                <v-btn v-if="getList.length" color="#172151"  class="text-capitalize white--text" @click="complete">Previous Logs</v-btn>
                 <v-btn v-else disabled color="#172151"  class="text-capitalize white--text" >No Logs</v-btn>
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
   
   
  </v-card>
</template>

<script>

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
    },
    getList:
    {
    type:Array,
    default:[]
    }
  }, 
  // computed:{
  //     getStatusList: {
  //     get() {
  //       return this.$store.getters["adminModule/getStatusList"];
  //     },
  //     set(data) {
  //       this.$store.commit("adminModule/setStatusList", this.data);
  //     },
  //   },
 
  // },
  methods:{
      download()
      {
          this.$emit("download",this.getList)
      },
      complete()
      {
        this.$emit("download","nodata")
      }
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