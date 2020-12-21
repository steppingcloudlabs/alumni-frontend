<template>
  <v-card class="pa-0 mx-5">
    <v-row class="ma-0">
      <v-col cols="12" class="pa-0">
        <v-toolbar color="#5097DD" class="white--text">
          <v-toolbar-title class="headline mb-2" style="font-family: Raleway"
            >News</v-toolbar-title
          >
        </v-toolbar>
        <div v-if="!this.empty">
          <v-layout row wrap mt-4 v-for="(item, i) in count" :key="i">
            <v-flex xs3>
              <v-avatar tile size="200">
                <v-img
                  v-if="getNewsList[i].photo"
                  :src="getNewsList[i].photo"
                ></v-img>
                <v-img v-else src="@/assets/news.png"></v-img>
              </v-avatar>
            </v-flex>
            <v-flex xs9>
              <v-card-title class="pt-0">{{
                getNewsList[i].title
              }}</v-card-title>
              <v-card-text style="font-size: 15px">{{
                getNewsList[i].content
              }}</v-card-text>
            </v-flex>

            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
        </div>
        <div
          v-else
          style="
            margin-bottom: 30px;
            margin-left: 450px;
            margin-right: 100px;
            margin-top: 50px;
          "
        >
          <span class="subtitle-1 mr-5 ml-0">No News to Show</span>
          <v-img width="100" height="100" src="@/assets/waiting.gif"></v-img>
        </div>
      </v-col>
    </v-row>
    <div v-if="!empty">
      <v-layout row wrap class="pb-5 pt-5">
        <v-flex xs12 class="mr-5 text-right">
          <v-btn
            color="primary"
            dark
            v-if="count == 5 && count != newsListLength"
            @click="count = newsListLength"
            >View All</v-btn
          >
          <v-btn
            color="primary"
            dark
            v-if="count != 5 && count == newsListLength"
            @click="count = 5"
            >Close All</v-btn
          >
        </v-flex>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
export default {
  computed: {
    getNewsList: {
      get() {
        return this.$store.getters["adminModule/getNewsList"];
      },
      set(data) {
        this.$store.commit("adminModule/setNewsList", this.data);
      },
    },  
    newsListLength() {
      return this.$store.getters["adminModule/getNewsList"].length;
    },
  },
  beforeMount() {
    this.$store
      .dispatch("adminModule/getAllNews", { payload: { limit: 10, offset: 0 } })
      .then((response) => {
        if (response.data.result.length > 0) {
          this.count = 5;
          this.empty = false;
        } else {
          this.count = 0;
          this.empty = true;
        }
      });
  },
  watch: {
    newsListLength() {
      if (this.newsListLength == 0) {
        this.count = 0;
        this.empty = true;
      } else {
        this.count = 5;
        this.empty = false;
      }
    },
  },
  data() {
    return {
      count: 0,
      empty: false,
    };
  },
};
</script>