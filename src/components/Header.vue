<template>
  <v-layout row wrap px-5 py-2 class="elevation-9">
    <v-flex xs4>
      <img :src="companyData.titan.companyLogo" height="50" />
    </v-flex>
    <v-flex xs6>
      <p class="text-center vertical-align-content font-weight-light">Alumni Portal</p>
    </v-flex>
  </v-layout>
</template>

<script>
import data from "@/assets/data";

export default {
  data() {
    return {
      companyData: data
    };
  },
  created() {},
  methods: {}
};
</script>

<style>
.vertical-align-content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
