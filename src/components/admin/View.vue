<template>
  <v-content class="main-user-container">
    <core-drawer></core-drawer>
    <div id="core-view" style="margin-top:12vh">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
  </v-content>
</template>

<script>
  export default {
    name: 'CoreView',
    components:{
     CoreDrawer: () => import("@/components/admin/admin.drawer"),
    },
    metaInfo () {
      return {
        title: 'Vue Material Dashboard by CreativeTim'
      }
    }
  }
</script>
