<template>
  <div>
    <Header/>
    <div id="core-login">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "../components/core/Header";
import news from "../components/core/news&events";


export default {
  components: {
    Header,
   
  }
};
</script>
<style>
#core-login {
 
  background-image: white;
  width: 100%;
  height: calc(100vh + 20px);
  background-size: cover;
  background-position: center;
}
</style>
