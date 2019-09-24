<template>
<div>
    <v-img
        height="500px"
        src="@/assets/back5.jpg"
      >   <core-app-bar ></core-app-bar></v-img>
    <v-row><br/><br/></v-row>
      <v-row>
       
       <carosel/>
        
      </v-row>
      <v-row><br/><br/></v-row>
      <v-row>
          
          <v-col cols="12" md="7">
               <v-toolbar
           elevation='0'
         color="#5097DD"
         class="white--text" >
<v-toolbar-title  class="headline mb-2">News </v-toolbar-title>
</v-toolbar>
            <v-card width="750px">
            
    <v-card
      v-for="(item,i) in news"
      :key="i"
    >
    <v-list-item three-line>
    <v-list-item-avatar
        tile
        size="100"
        
        
      ><v-img src="@/assets/news.jpg"></v-img></v-list-item-avatar>

      
      
    <v-card>
    
     <v-card-title> {{item.HeadLine}}</v-card-title>
     <v-row class="mr-5">
     <p  style="font-size:10px">{{item.Date}}</p>
     </v-row>
      <v-card-text style="font-size:15px">
        {{item.Body}}
      </v-card-text>
    
    </v-card>
    

      
    </v-list-item>
    </v-card>
  </v-card>
          </v-col>
          <v-col cols="12" md="5">
              <v-row>
               <v-card
            color='#5097DD'
            dark
             height="150px"
            width="415px"
          >
       <v-card-text class="white--text">
              <div class="headline mb-2">Clearance Status</div>
                You can download your form 16 here.
            </v-card-text>

            <v-card-actions>
              
        <v-btn color="primary" @click="dialog=true">Check Here</v-btn>
     
      
      
             
            </v-card-actions>
          </v-card>
              </v-row>
              <v-row><br/><br/><br/></v-row>
          <v-row>
            <v-card
            color='#5097DD'
            dark
            height="150px"
            width="415px"
           
          >
       <v-card-text class="white--text">
              <div class="headline mb-2">Other Status</div>
                hello.
            </v-card-text>
            </v-card>
          </v-row>
          <v-row><br/><br/><br/></v-row>
          <v-row>
            <v-card
            color='#5097DD'
            dark
            height="150px"
            width="415px"
            
          >
       <v-card-text class="white--text">
              <div class="headline mb-2">Other Status</div>
                hello.
            </v-card-text>
            </v-card>
          </v-row>
          </v-col>

      </v-row>
      <clearance :dialog='dialog' @closeClearanceDialog='closeClearanceDialog'/>
</div>
</template>

<script>
import clearance from '@/components/core/clearanceDialog.vue'
import carosel from '@/components/material/carosel.vue'
  export default {
    components: {
      
      CoreAppBar: () => import('@/components/core/AppBar'),
      clearance,
      carosel,
      
      
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
         news: [
          { HeadLine: 'Where does it come from?',Date:'20/06/2019',Body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,' },
          { HeadLine: 'Where does it come from?',Date:'20/06/2019',Body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,'  },
          { HeadLine: 'Where does it come from?',Date:'20/06/2019',Body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,' },
          { HeadLine: 'Where does it come from?',Date:'20/06/2019',Body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,' },
        ],
   
      }
    },
    methods:{
      closeClearanceDialog(){
        this.dialog=false
      }
    }
  }
</script>
<style >
.row{
    margin-left: 30px;
    margin-right: initial
}



</style>