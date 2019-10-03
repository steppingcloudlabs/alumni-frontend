<template>
  <div>
     <v-row>
          
      <v-col cols="12" >
        <v-card outlined
        >
        <v-card-title>
          <p>News</p>
        <v-spacer></v-spacer>
        
        <v-btn class="button" color="primary" dark @click="showNewsDialog"><i class="fas fa-plus-circle"></i>Add News</v-btn>
       
        </v-card-title>
        <News/>
        
     </v-card>   
      </v-col>

     

      <v-col cols="12" >
         <v-card outlined
        >
        <v-card-title>
          <p>Events</p>
        <v-spacer></v-spacer>
       
        <v-btn  class="button" color="primary" dark @click="showEventDialog"><i class="fas fa-plus-circle"></i>Add Events</v-btn>
          
        
         </v-card-title>
         <event/>
        
      </v-card>        
      
      </v-col>
      </v-row>
      <!-- <AddNewsDialog :dialog="dialog" @closeNewsDialog="closeNewsDialog" /> -->
      <!-- <AddEventDialog :dialog="dialog1" @closeEventDialog="closeEventDialog" @saveNewsDialog="saveNewsDialog"/> -->
  </div>
</template>

<script>
import AddNewsDialog from '@/components/admin/AddNewsDialog'
import AddEventDialog from '@/components/admin/AddEventDialog'
import News from '@/components/admin/newsComponent'
import event from '@/components/admin/eventComponent'

  export default {
    data: () => ({
      dialog: false,
      dialog1: false,
     
    }),
    components: {
      AddNewsDialog,
      AddEventDialog,
      News,
       event
    },
  
   methods: {
      closeNewsDialog() {
        this.$store.commit('adminModule/closeNewsDialog')
      },
      showNewsDialog() {
        let newsData = {
          headLine: '',
          body: '' 
        }
        this.$store.commit('adminModule/showNewsDialog', {})
      },
      openAddNewsDialog(){
        let NewsData = {
           headline:"",
           body:""
        }
        this.$store.commit('adminModule/showNewsDialog', NewsData)
      },

    //  Event Section
      closeEventDialog() {
        this.$store.commit('adminModule/closeEventDialog')
      },
      showEventDialog() {
        let eventData = {
          title: '',
          description: '' 
        }
        this.$store.commit('adminModule/showEventDialog', {})
      },
      openAddEventDialog(){
        let EventData = {
           title:"",
           description:""
        }
        this.$store.commit('adminModule/showEventDialog',EventData)
      },
      
      
     },
  }
</script>
<style>
.button{
  margin-bottom: 10px
}

</style>