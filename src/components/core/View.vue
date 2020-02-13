<template>
  <v-content class="main-user-container">
    <div>
      <AppBar />
    </div>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
  </v-content>
</template>

<script>
import AppBar from "@/components/core/AppBar";
export default {
  name: "CoreView",
  components: {
    AppBar
  },
  metaInfo() {
    return {
      title: "Vue Material Dashboard by CreativeTim"
    };
  }
};
</script>
<style>
.main-user-container {
  margin: 10px 20px !important;
}
/* .main-user-container .v-content__wrap #core-view {
  height: 100%;
} */
.main-user-container .v-content__wrap #core-view .user-profile-card {
  border-radius: 50px;
}
</style>