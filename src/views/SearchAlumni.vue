<template>
  <v-layout row wrap class="search-alumni-wrapper">
    <v-flex xs0 sm4 md4 lg4 xl4></v-flex>
    <v-flex xs12 sm8 md8 lg8 xl8>
      <v-autocomplete
        v-model="selectedAlumni"
        :items="alumniList"
        :search-input.sync="searchAlumni"
        :loading="isLoading"
        solo
        rounded
        color="primary"
        label="Search Alumni"
        item-text="FIRST_NAME_PERSONAL_INFORMATION"
        item-value="FIRST_NAME_PERSONAL_INFORMATION"
        @change="openSearch()"
      >
        <template v-slot:item="data">
          <template>
            <v-list-item-avatar color="accent">
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
        path: "/profile/search/" + this.alumniList[0].USER_ID +" "+this.alumniList[0].FIRST_NAME_PERSONAL_INFORMATION,
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
.search-alumni-wrapper
{
  padding-top: 20px;
  padding-bottom: 10px;
}

@media screen and (max-width: 992px) {
.search-alumni-wrapper
{
 padding-top: 20px;
  padding-bottom: 10px;
}

}

/* On screens that are 600px or less, set the background color to olive */
 @media screen and (max-width: 640px) {
 .search-alumni-wrapper
{
  padding-top: 10px;
 padding-bottom: 5px;
}

} 

</style>