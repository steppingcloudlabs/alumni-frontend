<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <span>{{item.text}}</span>
    </v-carousel-item>
  </v-carousel>
  <!-- <v-img height="600px" src="@/assets/building.jpg"></v-img> -->
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: require("@/assets/buildings.gif"),
          text: ""
        },
        {
          src: require("@/assets/Floating guy2.gif"),
          text: ""
        },
        {
          src: require("@/assets/giphy.gif"),
          text: ""
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-image__image.v-image__image--coverimg:hover {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>