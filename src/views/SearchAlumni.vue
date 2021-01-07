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
        label="Search Alumni"
        item-text="FIRST_NAME_PERSONAL_INFORMATION"
        item-value="FIRST_NAME_PERSONAL_INFORMATION"
        @change="openSearch()"
      >
        <template v-slot:item="data">
          <template>
            <v-list-item-avatar color="indigo">
              <!-- <img :src="data.item.avatar" /> -->
              <span class="white--text headline">{{
                data.item.FIRST_NAME_PERSONAL_INFORMATION.substring(0, 1) +
                "" +
                data.item.LAST_NAME_PERSONAL_INFORMATION.substring(0, 1)
              }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                v-html="
                  data.item.FIRST_NAME_PERSONAL_INFORMATION +
                  ' ' +
                  data.item.LAST_NAME_PERSONAL_INFORMATION
                "
              ></v-list-item-title>
              <v-list-item-subtitle
                v-html="data.item.DESIGNATION_JOB_INFORMATION"
              ></v-list-item-subtitle>
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
      searchAlumni: null,
    };
  },
  methods: {
    openSearch() {
      this.selectedAlumni=[]
      this.$store.commit("userModule/setSearchData", this.alumniList);
      this.$router.push({
        path: "/profile/search/" + this.alumniList[0].USER_ID,
      });
    },
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
      if(val.length<4)
      {
        return;
      }
      this.isLoading = true;
      let data = {
        payload: {
          userid: val,
        },
      };
      this.$store
        .dispatch("userModule/getSearchAlumniById", data)
        .then((response) => {
          this.alumniList = response.result;

          console.log(this.alumniList);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style >
.search-alumni-wrapper .v-text-field__details {
  display: none;
}
</style>