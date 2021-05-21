<template>
    <v-app >
      
      <AppBar></AppBar>
      
      <core-view ></core-view>
      <tour></tour>
      
    </v-app>     
</template>

<script>
import AppBar from "@/components/core/AppBar";
import tour from "@/components/core/tourDialog.vue"
  export default {
    components: {
      AppBar,
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View'),
      tour
      
    }
  }
</script>
<style >


</style>

