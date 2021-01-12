<template>
  <v-carousel

    height="500"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in items"
      :key="i"
      :src="items[i].src"
    >
     
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">
            {{ slide.text }}
          </div>
        </v-row>
    
    </v-carousel-item>
  </v-carousel>
</template>
<script>
  export default {
    data () {
      return {
       
         items: [
        {
          src: require("@/assets/shutterstock/landing1.jpg"),
          text: "test"
        },
        {
          src: require("@/assets/shutterstock/landing1.jpg"),
          text: "testing"
        },
        {
          src: require("@/assets/shutterstock/landing1.jpg"),
          text: "xyz"
        }
      ]
      }
    },
  }
</script>