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
     <v-card-title class="pt-0"> {{getEventList[i].title}}</v-card-title>
      <v-card-text style="font-size:15px">
        {{getEventList[i].description}}
      </v-card-text> 
    </v-flex>
    <v-flex xs12>
        <v-card-actions>
          <v-flex xs10></v-flex>
          <v-flex xs1>
          <v-icon>mdi-delete </v-icon>
          </v-flex>
           <v-flex xs1>
          <v-icon @click="showEventDialog(i)" >edit </v-icon>
          </v-flex>
      </v-card-actions>
    </v-flex>
    <v-flex xs12 class="mt-5">
      <v-divider></v-divider>
    </v-flex>
    
    </v-layout>
    <v-layout row wrap class="pb-5 pt-5" >
    <v-spacer></v-spacer>
     <v-btn  color="primary" dark v-if="count == 1 && count!=getEventList.length" @click="count=getEventList.length">View All</v-btn>  
    <v-btn  color="primary" dark v-if="count != 1 && count==getEventList.length" @click="count=1">Close All</v-btn>  
    
     
    </v-layout>
    </div>
  
         
    
</template>

<script>
export default {
   computed:{
        getEventList:{
            get() {
                return this.$store.getters['adminModule/getEventList']
            },
            set(data) {
                this.$store.commit('adminModule/setEventList', this.data)
            }
        },
       showEvent:{
         get(){
            return this.$store.getters['adminModule/getshowEventDialog']
        },
        set(data) 
            {
                this.$store.commit('adminModule/setShowEvent', data)
            }
      }
    },
    data(){
        return{
            count:1,
             
   
        }
    },
    methods: {
      showEventDialog(index) {
        this.$store.commit('adminModule/showEventDialog', JSON.parse(JSON.stringify(this.getEventList[index])))
      },
    }

}
</script>