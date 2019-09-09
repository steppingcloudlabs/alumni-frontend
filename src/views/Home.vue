<template>
<div>
 <Header v-if="$route.path == '/home'||$route.path == '/signin' ||$route.path == '/signup'"/>
 <cards v-if="$route.path == '/home'"></cards>
 <news v-if="$route.path == '/home'"></news>
</div>
</template>

<script>
import Header from '../components/core/Header';
import cards from '../components/core/cards';
import news from '../components/core/news&events';
import Careers from '../components/core/careers';




export default {
  components: {
    Header,
    news,
    cards,
    Careers
  },
 
};
</script>
