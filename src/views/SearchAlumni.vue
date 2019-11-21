<template>
  <v-layout row wrap class="search-alumni-wrapper">
    <v-flex xs12>
      <v-autocomplete
        v-model="selectedAlumni"
        :items="alumniList"
        :search-input.sync="searchAlumni"
        :loading="isLoading"
        rounded
        dark
        filled
        color="blue-grey lighten-2"
        label="Select Alumni"
        item-text="first_name_personal_information"
        item-value="first_name_personal_information"
      >
        <template v-slot:item="data">
          <template>
            <v-list-item-avatar color="indigo">
              <!-- <img :src="data.item.avatar" /> -->
              <span
                class="white--text headline"
              >{{data.item.first_name_personal_information.substring(0, 1) + '' + data.item.last_name_personal_information.substring(0, 1)}}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                v-html="data.item.first_name_personal_information + ' ' + data.item.last_name_personal_information"
              ></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.designation_job_information"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "SearchAlumni",
  data() {
    return {
      alumniList: [],
      selectedAlumni: [],
      isLoading: false,
      searchAlumni: null
    };
  },
  watch: {
    searchAlumni(val) {
      if (!val && !val.trim()) {
        this.alumniList = [];
        this.selectedAlumni = "";
        return;
      }
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      let data = {
        payload: {
          keyword: val
        }
      };
      this.$store
        .dispatch("adminModule/getAllAlumni", data)
        .then(response => {
          this.alumniList = response.data.result;
          console.log(this.alumniList);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

<style >
.search-alumni-wrapper .v-text-field__details {
  display: none;
}
</style>