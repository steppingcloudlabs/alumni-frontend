<template>
  <v-content class="main-user-container">
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
  </v-content>
</template>

<script>
  export default {
    name: 'CoreView',

    metaInfo () {
      return {
        title: 'Vue Material Dashboard by CreativeTim'
      }
    }
  }
</script>
<style>
.main-user-container {
  margin: 65px 20px !important; 
}
.main-user-container .v-content__wrap #core-view {
  height: 100%;
}
.main-user-container .v-content__wrap #core-view .user-profile-card {
  border-radius: 50px;
}
</style>