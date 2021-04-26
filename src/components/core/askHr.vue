<template>
  <v-layout row wrap class="ma-0">
    <v-flex xs12>
      <QueryWindowWrapper />
    </v-flex>
    <!-- <v-flex xs12>
      <UserFAQList></UserFAQList>
    </v-flex> -->
  </v-layout>
</template>

<script>

import QueryWindowWrapper from "@/components/core/QueryWindowWrapper";
//import UserFAQList from "@/components/core/UserFAQList";
export default {
  components: {
    QueryWindowWrapper,
 // UserFAQList
  }
};
</script>
<style scoped >
.v-sheet.v-sheet--tile.theme--light.v-toolbar {
  background: rgb(68, 70, 71, 0.7) !important;
}
.v-toolbar__title {
  color: white !important;
  font-weight: bolder !important;
  font-size: x-large !important;
}
</style>