<template>
<v-layout row wrap>
  <v-card
      v-for="(item,i) in event"
      :key="i"
    color="#5097DD"
    dark
    width="450px"
    class="mr-5"
  
  >
    <v-card-title>
      <v-icon
        large
        left
      >
      mdi-bullhorn
      </v-icon>
      <span class="title font-weight-bold">{{item.eventTitle}}</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{item.eventDescription}}
    </v-card-text>

    <v-card-actions>
      

        <v-list-item-content>
          <v-list-item-title>{{item.eventLocation}}</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <v-icon class="mr-1">mdi-thumb-up</v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">mdi-thumb-down</v-icon>
          <span class="subheading">45</span>
        </v-row>
     
    </v-card-actions>
  </v-card>
</v-layout> 

</template>

<script>
export default {
  data(){
    return{
          event:[
    {
        id: 1,
        eventTitle: "Hello Boss",
        eventDescription: "AFGdnbvfbfjnbmkvmvckmdjjf",
        
        
        eventLocation: "New Delhi",
       
    },
    {
        id: 2,
        eventTitle: "Hello asdf",
        eventDescription: "AFGdnbvfbfjnbmkvmvckmdfvnfjvnjvjvnjcjjf",
        
        
        eventLocation: "USA",
    },
     {
        id: 3,
        eventTitle: "Hello asdf",
        eventDescription: "AFGdnbvfbfjnbmkvmvckmdfvnfjvnjvjvnjcjjf",
        
        
        eventLocation: "USA",
    },
    {
        id: 3,
        eventTitle: "Hello asdf",
        eventDescription: "AFGdnbvfbfjnbmkvmvckmdfvnfjvnjvjvnjcjjf",
        
        
        eventLocation: "USA",
    },
]
    
   
  }
}
}
</script>
<style >
.move{
  overflow-x: auto
}

</style>