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

.flip-card {
  background-color: transparent;
  min-height: 240px;
  width: 100%;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #bbb;
  color: black;
  width: 100%;
  max-height: 240px;
  height: 240px;
  border-radius: 10px;
  cursor: pointer;
}

/* Style the back side */
.flip-card-back {
  width: 100%;
  height: 240px;
  max-height: 240px;
  background: linear-gradient(to right, rgba(241, 135, 16, 1));
  color: white;
  transform: rotateY(180deg);
  border-radius: 10px;
  cursor: pointer;
}
</style>