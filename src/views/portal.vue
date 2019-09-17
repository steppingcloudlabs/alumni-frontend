<template>
    <v-app  >
      <core-drawer ></core-drawer>
      <core-view ></core-view>
    
    </v-app>     
</template>

<script>
  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View'),
      
    }
  }
</script>
<style >
.v-content__wrap{
/* background:#151515 !important */
}

</style>

