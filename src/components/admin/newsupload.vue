<template>
  <div>
     <v-row>
          
      <v-col cols="12" md="5">
        <v-card outlined
        >
        <v-card-title>
          <p>News</p>
        <v-spacer></v-spacer>
        <v-btn class="button" color="primary" dark @click="dialog = true"><i class="fas fa-plus-circle"></i>Add News</v-btn>
        </v-card-title>
        <v-card
      v-for="(item,i) in 7"
      :key="i"
    >
    <v-list-item three-line>
    <v-list-item-avatar
        tile
        size="50"
        color="grey"
      ></v-list-item-avatar>

      
      <v-list-item-content>
        <v-list-item-title class="headline mb-2">Headline</v-list-item-title>
        <v-list-item-subtitle>Body</v-list-item-subtitle>
      </v-list-item-content>

      
    </v-list-item>
    </v-card>
        
     </v-card>   
      </v-col>

       <v-col cols="12" md="1"></v-col>

      <v-col cols="12" md="5">
         <v-card outlined
        >
        <v-card-title>
          <p>Events</p>
        <v-spacer></v-spacer>
        <v-btn  class="button" color="primary" dark @click="dialog1 = true"><i class="fas fa-plus-circle"></i>Add Events</v-btn>
         </v-card-title>
          <v-card
      v-for="(item,i) in 7"
      :key="i"
    >
    <v-list-item three-line>
    <v-list-item-avatar
        tile
        size="50"
        color="grey"
      ></v-list-item-avatar>

      
      <v-list-item-content>
        <v-list-item-title class="headline mb-2">Title</v-list-item-title>
        <v-list-item-subtitle>Event Description Here</v-list-item-subtitle>
      </v-list-item-content>

      
    </v-list-item>
    </v-card>
        
      </v-card>        
      
      </v-col>
      </v-row>
      <AddNewsDialog :dialog="dialog" @closeNewsDialog="closeNewsDialog" />
      <AddEventDialog :dialog="dialog1" @closeEventDialog="closeEventDialog"/>
  </div>
</template>

<script>
import AddNewsDialog from '@/components/admin/AddNewsDialog'
import AddEventDialog from '@/components/admin/AddEventDialog'
  export default {
    data: () => ({
      dialog: false,
      dialog1: false,
      news:[
        {
          Headline:"",
          Body:""
        }
      ]
    }),
    components: {
      AddNewsDialog,
      AddEventDialog,
    },
    methods: {
      closeNewsDialog() {
        this.dialog = false;
      },
      closeEventDialog() {
        this.dialog1 = false;
      },
     
  }
  }
</script>
<style>
.button{
  margin-bottom: 10px
}

</style>