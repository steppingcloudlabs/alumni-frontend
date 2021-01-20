<template>
  <v-app >
    <AppBar></AppBar>
    <core-view></core-view>
  </v-app>
</template>

<script>
import AppBar from "@/components/admin/AppBar";
export default {
  components: {
    AppBar,
    CoreDrawer: () => import("@/components/admin/admin.drawer"),

   
    CoreView: () => import("@/components/admin/View")
  }
};
</script>
<style >
</style>

