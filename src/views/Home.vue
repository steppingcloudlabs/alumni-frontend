<template>
  <div>
    <Header v-if="$route.path == '/home'||$route.path == '/login' ||$route.path == '/signup'" />
  
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
export default {
  components: {
    Header,
    news,
    cards,
    Careers,
    Ceo 
  }
};
</script>
