<template>
  <v-layout row wrap class="ma-0" style="min-height: 600px; padding-bottom: 5%;background:#F5F5F5">
    <v-flex xs12 style="text-align: center; margin-top: 4%">
      <span class="headline font-weight-bold" >Empower your Alumni Network</span>
    </v-flex>
    <v-flex
      style="margin-top: 0.5%"
      xs12
      sm3
      md3
      lg3
      xl3
      class="pa-5"
      v-for="(card, i) in cards"
      :key="i"
      
    >
      <v-card
        style="
          font-size: 25px;
        "
        tile
        flat
        color="transparent"
      >
        <v-card-title>
          <v-icon style="margin:auto;font-size:60px"
          color="#E4BA18"> {{ card.icon }}</v-icon>
        </v-card-title>
        <v-card-text class="black--text title-headline" style="font-weight: 500;text-align: center;">
         {{card.text}}
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
        },
        { icon: "mdi-home-modern", text: "Company Profile"},
        { icon: "mdi-view-dashboard", text: "Job Board"},
         { icon: "mdi-newspaper", text: "News & Event"},
        { icon: "mdi-home-map-marker", text: "Maps"}, 
        { icon: "mdi-file-document", text: "Document Center"},
        { icon: "mdi-comment-question-outline", text: "Ask HR"},
         { icon: "mdi-account-check", text: "Recommended Job Oppurtunities"}
       
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
</style>