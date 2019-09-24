<template>
  <v-carousel
    cycle
    height=400px
    hide-delimiter-background
    show-arrows-on-hover
    hide-delimiters
  >
    <v-carousel-item
      v-for="(item, i) in event"
      :key="i"
    >
      <v-card
        :color="colors[i]"
        height="100%"
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
<br/>
<br/>
    <v-card-text class="headline font-weight-light">
      {{item.eventDescription}}
    </v-card-text>
<br/>
<br/>
    <v-card-actions>
      

        <v-list-item-content>
          <v-list-item-title><v-icon class="mr-1">mdi-map-marker</v-icon>{{item.eventLocation}}</v-list-item-title>
        </v-list-item-content>
<br/>
<br/>
<br/>
<br/>
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
      
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data(){
    return{
        colors: [
          'indigo',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
           'indigo',
        ],
    event:[
    {
        id: 1,
        eventTitle: "Alumni Meet",
        eventDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        
        
        eventLocation: "New Delhi",
       
    },
    {
        id: 2,
        eventTitle: "Annual Sports Event",
        eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventLocation: "USA",
    },
    //  {
    //     id: 3,
    //     eventTitle: "Hello asdf",
    //     eventDescription: "AFGdnbvfbfjnbmkvmvckmdfvnfjvnjvjvnjcjjf",
    //     eventLocation: "USA",
    // },
    // {
    //     id: 4,
    //     eventTitle: "Hello asdf",
    //     eventDescription: "AFGdnbvfbfjnbmkvmvckmdfvnfjvnjvjvnjcjjf",
        
        
    //     eventLocation: "USA",
    // },
    // {
    //     id: 5,
    //     eventTitle: "Hello asdf",
    //     eventDescription: "AFGdnbvfbfjnbmkvmvckmdfvnfjvnjvjvnjcjjf",
        
        
    //     eventLocation: "USA",
    // },
]
    
   
  }
}
}
</script>