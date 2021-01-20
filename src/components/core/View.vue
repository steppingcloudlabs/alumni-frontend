<template>
  <v-content class="main-user-container">
    <core-drawer></core-drawer>
    <div id="core-view" style="margin-top: 20px">
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
    AppBar,
    CoreDrawer: () => import("@/components/core/Drawer"),
  },
  metaInfo() {
    return {
      title: "Vue Material Dashboard by CreativeTim",
    };
  },
};
</script>
<style>
.main-user-container {
  margin: 10px 20px !important;
  margin-top: 60px !important;
}
/* .main-user-container .v-content__wrap #core-view {
  height: 100%;
} */
.main-user-container .v-content__wrap #core-view .user-profile-card {
  border-radius: 50px;
}

</style>