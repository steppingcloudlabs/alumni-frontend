<template>
  <v-layout row wrap class="ma-0">
    <v-flex
      xs4
      class="pa-5"
      v-for="(card, i) in cards"
      :key="i"
      data-aos="zoom-in"
      data-aos-duration="500"
    >
      <!-- <v-card class="home-activity-card" elevation="1" min-height="240px">
        <v-img height="240px" :src="card.back"></v-img>
        <p class="title text-center py-5" style="color: rgb(241,135,16)">{{cards[i].title}}</p>
      </v-card>-->
      <div class="flip-card">
        <div class="flip-card-inner elevation-9">
          <div class="flip-card-front">
            <img
              :src="card.back"
              alt="Avatar"
              style="width:100%; height: 240px; border-radius: 10px;"
            />
          </div>
          <div class="flip-card-back pa-5 elevation-9">
            <h2>{{card.title}}</h2>
          </div>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AOS from "aos";
AOS.init();
export default {
  data() {
    return {
      cards: [
        {
          title: "Engagement",
          back: require("@/assets/shutterstock/engagement.jpg")
        },
        { title: "Document", back: require("@/assets/team.jpg") },
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