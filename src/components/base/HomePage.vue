<template>
  <v-layout row wrap ma-0 pa-0 style="background:#1A1A1D">
    <v-flex xs12>
      <landingimage></landingimage>
    </v-flex>
    <v-flex xs12>
      <cards></cards>
    </v-flex>
    <v-flex xs12>
      <Ceo></Ceo>
    </v-flex>
  </v-layout>
</template>

<script>
import Ceo from "@/components/core/mesgcard";
import landingimage from "@/components/core/landingimage";
import cards from "@/components/core/cards";

export default {
  name: "HomePage",
  components: {
    Ceo,
    landingimage,
    cards
  }
};
</script>

<style>
</style>