<template>
   
      
     <div>          
    <v-layout row wrap mt-4 v-for="(item,i) in count"
      :key="i">
   <v-flex xs4>
    <v-avatar
        tile
        size="200"
        ><v-img src="@/assets/news.jpg"></v-img></v-avatar>
   </v-flex>
    <v-flex xs8>
     <v-card-title class="pt-0"> {{getNewsList[i].headLine}}</v-card-title>
      <v-card-text style="font-size:15px">
        {{getNewsList[i].body}}
      </v-card-text> 
    </v-flex>
    <v-flex xs12>
        <v-card-actions>
          <v-flex xs10></v-flex>
          <v-flex xs1>
          <v-icon>mdi-delete </v-icon>
          </v-flex>
           <v-flex xs1>
          <v-icon @click="showNewsDialog(i)" >edit </v-icon>
          </v-flex>
      </v-card-actions>
    </v-flex>
    <v-flex xs12 class="mt-5">
      <v-divider></v-divider>
    </v-flex>
    
    </v-layout>
    <v-layout row wrap class="pb-5 pt-5" >
        <v-spacer></v-spacer>
        <v-btn  color="primary" dark v-if="count == 1 && count!=getNewsList.length" @click="count=getNewsList.length">View All</v-btn>  
        <v-btn  color="primary" dark v-if="count != 1 && count==getNewsList.length" @click="count=1">Close All</v-btn>  
    </v-layout>
    </div>
  
         
    
</template>

<script>
export default {
     computed:{
        getNewsList:{
            get() {
                return this.$store.getters['adminModule/getNewsList']
            },
            set(data) {
                this.$store.commit('adminModule/setNewsList', this.data)
            }
        }
    },

    data(){
        return{
            dialog:false,
            count:1,
        //      news: [
        //   { headLine: 'Where does it come from?',Date:'20/06/2019',body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,' },
        //   { headLine: 'Where does it come from?',Date:'20/06/2019',body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,'  },
        //   { headLine: 'Where does it come from?',Date:'20/06/2019',body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,' },
        //   { headLine: 'Where does it come from?',Date:'20/06/2019',body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,'  },
         
        // ],
   
        }
    },
    methods: {
      showNewsDialog(index) {
        this.$store.commit('adminModule/showNewsDialog', JSON.parse(JSON.stringify(this.getNewsList[index])))
      },
    }

}
</script>