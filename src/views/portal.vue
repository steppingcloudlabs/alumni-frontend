<template>
    <v-app >
      
      <AppBar></AppBar>
      
      <core-view ></core-view>
      
      
    </v-app>     
</template>

<script>
import AppBar from "@/components/core/AppBar";
  export default {
    components: {
      AppBar,
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View'),
      
    }
  }
</script>
<style >


</style>

