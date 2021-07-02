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
     mdi-newspaper
      </v-icon>
    </v-sheet>
   
      </v-flex>

      <v-flex xs8>
           <v-card-text class="pt-0" style="height:100px">
      <div class="title font-weight-light mb-2 mt-2 ml-5">
       Newsletter
      </div>
      <div class="subheading font-weight-light blue--text"  v-if="getNewsletter">
           <p @click="download" style="cursor: pointer" >Download NewsLetter</p>
      </div>
       <div class="subheading font-weight-light grey--text" v-else>
           <p>No NewsLetter Available</p>
      </div>
     
      
    </v-card-text>
      </v-flex>
      <v-flex xs12 >
          <v-card-text text-color="secondary" style="text-align:right;">
              <v-divider class="my-2"></v-divider>
             
                 <v-btn  color="primary" @click="openInput" style="color:white" v-if="!getNewsletter">Upload</v-btn>
                   <v-btn  color="primary" @click="openInput" style="color:white" v-else>Update</v-btn>
                  <v-file-input  id="file" @change="openAvatarDialog" style="display: none"></v-file-input>
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
  computed:{
      getNewsletter: {
      get() {
        return this.$store.getters["adminModule/getNewsletter"];
      },
      set(data) {
        this.$store.commit("adminModule/setNewsletter",data);
      },
    },
 
  },
  methods:{
      download()
      {
          const downloadLink = document.createElement("a");
                    const fileName = "newsletter.pdf";

                    downloadLink.href = this.getNewsletter;
                    downloadLink.download = fileName;
                    downloadLink.click();
      },
       openInput()
    {
     var elem=document.getElementById("file")
     elem.click()
    },
       openAvatarDialog(file) {
      var vm=this
      console.log(file)
       var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        
        this.getNewsletter=reader.result
   
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
     
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