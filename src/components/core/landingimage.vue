<template>
  <!-- <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <span>{{item.text}}</span>
    </v-carousel-item>
  </v-carousel>-->
  <!-- <v-img height="600px" src="@/assets/building.jpg"></v-img> -->
  <div class="image-bg-wrapper">
    <div class="image-bg-text-wrapper">
      <h2>
        Today is not ours to recover,
        <br />but tomorrow is our to win or lose.
      </h2>
    </div>
  </div>
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
.image-bg-wrapper {
  height: 500px;
  background-image: url("../../assets/shutterstock/landing1.jpg");
  background-size: 1500px;
  background-position: center;
  /* background-size: contain; */
}
.image-bg-text-wrapper {
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, rgb(26, 26, 29,.05), rgba(26, 26, 29));
  
}
.image-bg-text-wrapper h2 {
  text-align: center;
  color: rgb(241, 135, 16);
  position: relative;
  top: 35%;
  font-size: 35px;
  /* font-style: italic; */
  font-family: "Lato";
  letter-spacing: 1px;
}
</style>