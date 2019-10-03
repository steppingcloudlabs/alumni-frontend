<template>
    <v-card class="pa-0 mx-5">
      <v-row class="ma-0">
          
          <v-col cols="12" class="pa-0">
               <v-toolbar
         color="#5097DD"
         class="white--text " >
<v-toolbar-title  class="headline mb-2">News </v-toolbar-title>
</v-toolbar>
    <v-layout row wrap mt-4 v-for="(item,i) in news"
      :key="i">
   <v-flex xs4>
    <v-avatar
        tile
        size="200"
        ><v-img src="@/assets/news.jpg"></v-img></v-avatar>
   </v-flex>
    <v-flex xs8>
     <v-card-title class="pt-0"> {{item.HeadLine}}</v-card-title>
      <v-card-text style="font-size:15px">
        {{item.Body}}
      </v-card-text> 
    </v-flex>
    <v-flex xs12>
      <v-divider></v-divider>
    </v-flex>
    
    </v-layout>
    
  
          </v-col>
          
      </v-row>
      </v-card>
</template>

<script>
export default {
    data(){
        return{
             news: [
          { HeadLine: 'Where does it come from?',Date:'20/06/2019',Body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,' },
          { HeadLine: 'Where does it come from?',Date:'20/06/2019',Body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,'  },
          { HeadLine: 'Where does it come from?',Date:'20/06/2019',Body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,' },
          { HeadLine: 'Where does it come from?',Date:'20/06/2019',Body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,' },
        ],
   
        }
    }
}
</script>