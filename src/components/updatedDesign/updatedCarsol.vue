<template>
  <v-carousel
     style="margin-top:-48px;padding-bottom:10px"
    height="700"
    hide-delimiter-background
    show-arrows-on-hover
   cycle
  >
    <v-carousel-item
      v-for="(slide, i) in items"
      :key="i"
      :src="items[i].src"
      
    >
     <!-- <v-overlay :absolute="true" color="black"> -->
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
        
        </v-row>
     <!-- </v-overlay> -->
    
    </v-carousel-item>
  </v-carousel>
</template>
<script>
  export default {
    data () {
      return {
       
         items: [
        {
          src: require("@/assets/shutterstock/landingA.png"),
          text: "test"
        },
        {
          src: require("@/assets/shutterstock/landingI.png"),
          
        },
         {
          src: require("@/assets/shutterstock/landingG.png"),
          
        },
         {
          src: require("@/assets/shutterstock/landingH.png"),
          
        },
        // {
        //   src: require("@/assets/shutterstock/landing1.jpg"),
        //   text: "xyz"
        // }
      ]
      }
    },
  }
</script>
<style >

.v-responsive__content
{
    width: 100% !important;
}
</style>