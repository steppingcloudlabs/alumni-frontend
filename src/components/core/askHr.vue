<template>

  <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
    <v-toolbar extended>
      

      <v-toolbar-title>FAQs</v-toolbar-title>

      <div class="flex-grow-1"></div>

     

     

     
    </v-toolbar>
     <br/>
     <br/>
    
         <v-row justify="center">
    <v-expansion-panels popout>
      <v-expansion-panel
        v-for="(item,i) in event"
        :key="i"
      >
        <v-expansion-panel-header>{{item.Question}}</v-expansion-panel-header>
        <v-expansion-panel-content style="font-size:15px">
          {{item.Answer}}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
  <br/>
  <br/>
  <v-row>
  <v-spacer></v-spacer>
  <v-icon color="blue darken-2" @click="dialog=true"  size="100px"> mdi-wechat</v-icon>
  </v-row>
 
  <Contact :dialog='dialog' @closeAskHrDialog='closeAskHrDialog'/>
   </v-card>

</template>

<script>
import Contact from './contactHR'
export default {
    components:{
       Contact,
    },
    methods:{
        closeAskHrDialog() {
            this.dialog=false;
        },
    },
   
  data(){
    return{
        dialog:false,
          event:[
    {
        id: 1,
        Question: "What is Lorem Ipsum?",
        Answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
        
    },
    {
        id: 2,
        Question: "What is Lorem Ipsum",
        Answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
      
        
        
    },
     {
        id: 3,
        Question: "What is Lorem Ipsum?",
        Answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
  
        
        
       
    },
    {
        id: 3,
        Question: "What is Lorem Ipsum?",
        Answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
       
        
        
        
    },
]
    
   
  }
}
}
</script>