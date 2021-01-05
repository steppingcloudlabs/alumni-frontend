<template>
  <v-overlay :value="showProgressBar">
    <v-progress-circular style="margin-left:15px" indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  computed: {
    showProgressBar: {
      get() {
        return this.$store.getters.getShowProgressBar;
      },
      set(data) {
        this.$store.commit("setshowProgressBar", data);
      }
    }
  }
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>