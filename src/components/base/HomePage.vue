<template>
  <v-layout row wrap style="margin-left: unset">
    <v-row class="rowValue">
      <updatedcarousel />
    </v-row>
    <v-row class="rowValue">
      <featureCard></featureCard>
    </v-row>
    <v-row class="rowValue">
      <Ceo></Ceo>
    </v-row>
    <v-row class="rowValue">
      <features></features>
    </v-row>
    <v-row class="rowValue">
      <newsletter />
    </v-row>
    <v-row class="rowValue">
      <footter />
    </v-row>
  </v-layout>
  <!-- <v-layout row wrap ma-0 pa-0 style="background:#1A1A1D">
    <v-flex xs12>
      <landingimage></landingimage>
    </v-flex>
    <v-flex xs12>
      <cards></cards>
    </v-flex>
    <v-flex xs12>
      <Ceo></Ceo>
    </v-flex>
  </v-layout> -->
</template>

<script>
import updatedcarousel from "@/components/updatedDesign/updatedCarsol.vue";
import newsletter from "@/components/updatedDesign/Newslettersubscription.vue";
import footter from "@/components/updatedDesign/footer.vue";
import features from "@/components/updatedDesign/featues.vue";
import featureCard from "@/components/updatedDesign/featureCard.vue";
import Ceo from "@/components/core/mesgcard";
import landingimage from "@/components/core/landingimage";
import cards from "@/components/core/cards";
import Featues from "../updatedDesign/featues.vue";

export default {
  name: "HomePage",
  components: {
    Ceo,
    landingimage,
    cards,
    updatedcarousel,
    newsletter,
    features,
    footter,
    featureCard

  },
};
</script>

<style>
.rowValue {
  width: 100%;
  margin-top: 2px;
}
</style>