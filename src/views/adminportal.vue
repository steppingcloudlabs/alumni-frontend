<template>
    <v-app style="background: rgb(35, 43, 43)" >
      <core-drawer ></core-drawer>
      <core-view ></core-view>
    
    </v-app>     
</template>

<script>
  export default {
    components: {
      CoreDrawer: () => import('@/components/admin/admin.drawer'),
     
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

