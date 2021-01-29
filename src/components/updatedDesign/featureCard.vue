<template >
  <v-layout row wrap class="ma-0" style="background: #f5f5f5;padding-left:45px;padding-bottom:40px">
    <v-flex xs12>
    <p
      class="headline font-weight-bold"
      style="text-align: center; margin-top: 2%;padding-right:45px"
    >
      Empower your Alumni Network
    </p>
    </v-flex>

    <v-flex
      xs12
      sm3
      md3
      lg3
      xl3
      class="pa-2"
      v-for="(card, i) in cards"
      :key="i"
    >
      <v-card class="featCard">
        <img :src="card.pic" style="width: 100%; height: 200px" />

        <v-card-text
          class="black--text title-headline"
          style="font-weight: 500; text-align: center;padding: 8px !important;"
        >
          {{ card.text }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          icon: "mdi-account-search",
          text: "Online Directory",
          pic: require("@/assets/compressjpeg/F1-min.jpg"),
        },
        {
          icon: "mdi-home-modern",
          text: "Company Profile",
          pic: require("@/assets/compressjpeg/F2-min.jpg"),
        },
        {
          icon: "mdi-view-dashboard",
          text: "Job Board",
          pic: require("@/assets/compressjpeg/F3-min.jpg"),
        },
        {
          icon: "mdi-newspaper",
          text: "News & Event",
          pic: require("@/assets/compressjpeg/F4-min.jpg"),
        },
        {
          icon: "mdi-home-map-marker",
          text: "Maps",
          pic: require("@/assets/compressjpeg/F5-min.jpg"),
        },
        {
          icon: "mdi-file-document",
          text: "Document Center",
          pic: require("@/assets/compressjpeg/F6-min.jpg"),
        },
        {
          icon: "mdi-comment-question-outline",
          text: "Ask HR",
          pic: require("@/assets/compressjpeg/F7-min.jpg"),
        },
        {
          icon: "mdi-account-check",
          text: "Recommended Job Oppurtunities",
          pic: require("@/assets/compressjpeg/F8-min.jpg"),
        },
      ],
    };
  },
  methods: {
    navtologin() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style>
.div-15 {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 215px;
  height: 52px;
  color: rgba(0, 0, 0, 1);
  font-size: 40px;
  letter-spacing: 53%;
  text-align: left;
  font-family: Roboto;
}
.featCard {
  font-size: 25px;
  /* padding-bottom: 20px; */
  border: 10px solid white;
  background-color: #f5f5f5;
  height: 100%;
  width: 250px;
  box-shadow: 15px 15px 40px -10px #808080 !important;
}
</style>