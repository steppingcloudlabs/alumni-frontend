<template>
  <v-card class="pa-0 mx-5">
    <v-row class="ma-0">
      <v-col cols="12" class="pa-0">
        <v-toolbar color="#5097DD" class="white--text">
          <v-toolbar-title class="headline mb-2">News</v-toolbar-title>
        </v-toolbar>
        <v-layout row wrap mt-4 v-for="(item,i) in count " :key="i">
          <v-flex xs4>
            <v-avatar tile size="200">
              <v-img src="@/assets/news.jpg"></v-img>
            </v-avatar>
          </v-flex>
          <v-flex xs8>
            <v-card-title class="pt-0">{{getNewsList[i].title}}</v-card-title>
            <v-card-text style="font-size:15px">{{getNewsList[i].content}}</v-card-text>
          </v-flex>

          <v-flex xs12>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
      </v-col>
    </v-row>
    <v-layout row wrap class="pb-5 pt-5">
      <v-flex xs12 class="mr-5 text-right">
        <v-btn
          color="primary"
          dark
          v-if="count == 5 && count != newsListLength"
          @click="count=newsListLength"
        >View All</v-btn>
        <v-btn
          color="primary"
          dark
          v-if="count != 5 && count == newsListLength"
          @click="count=5"
        >Close All</v-btn>
      </v-flex>
    </v-layout>
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
      }
    },
    newsListLength() {
      return this.$store.getters["adminModule/getNewsList"].length;
    }
  },
  beforeMount() {
    this.$store.dispatch("adminModule/getAllNews").then(response => {
      this.count = 5;
    });
  },
  watch: {
    newsListLength() {
      if (this.count != 5) {
        this.count = this.getNewsList.length;
      }
    }
  },
  data() {
    return {
      count: 0
    };
  }
};
</script>