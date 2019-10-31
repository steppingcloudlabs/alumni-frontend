<template>
  <div>
    <Header v-if="$route.path == '/home'||$route.path == '/login' ||$route.path == '/signup'" />

    <landingimage v-if="$route.path == '/home'"></landingimage>
    
    <cards v-if="$route.path == '/home'"></cards>
 
    <Ceo v-if="$route.path == '/home'"></Ceo>
  </div>
</template>

<script>
import Header from "../components/core/Header";
import cards from "../components/core/cards";
import news from "../components/core/news&events";
import Careers from "../components/core/careers";
import Ceo from "../components/core/mesgcard";
import landingimage from "@/components/core/landingimage";

export default {
  components: {
    Header,
    news,
    cards,
    Careers,
    Ceo,
    landingimage
  }
};
</script>
