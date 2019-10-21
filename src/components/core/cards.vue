<template>
  <v-row>

    <v-col v-for="(card, i) in cards" :key="i" data-aos="zoom-in" data-aos-duration="1000">
      <v-card class="mx-auto home-activity-card" max-width="370" elevation="1" min-height="240px">
        <v-img height="240px" :src="card.back">
          <br />
          <v-card-title class="text" style=" font-family:Raleway font-size:40px">{{cards[i].title}}</v-card-title>

          <v-card-text></v-card-text>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AOS from "aos";
AOS.init();
export default {
  data() {
    return {
      cards: [
        { title: "Engagement", back: require("@/assets/party.jpg") },
        { title: "Enrichment", back: require("@/assets/team.jpg") },
        { title: "Careers", back: require("@/assets/enrichment.jpg") }
      ]
    };
  }
};
</script>

<style >
.home-activity-card .v-responsive__content {
  background-color: rgb(0, 0, 0, 0.5);
  padding-left: 100px;

  font-weight: 900;
  color: white;
}

.home-activity-card .v-responsive__content:hover {
  background-color: rgb(0, 0, 0, 0);
  font-weight: 900;
  color: black;
}
</style>