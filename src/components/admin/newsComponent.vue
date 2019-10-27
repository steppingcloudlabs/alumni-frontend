<template>
  <div>
    <div v-if="!empty">
      <v-layout row wrap mt-4 v-for="(item,i) in count" :key="i">
        <v-flex xs4>
          <v-avatar tile size="200">
            <v-img v-if="getNewsList[i].photo" :src="getNewsList[i].photo"></v-img>
            <v-img v-else src="@/assets/news.png"></v-img>
          </v-avatar>
        </v-flex>
        <v-flex xs8>
          <v-card-title class="pt-0">{{getNewsList[i].title}}</v-card-title>
          <v-card-text style="font-size:15px">{{getNewsList[i].content}}</v-card-text>
        </v-flex>
        <v-flex xs12>
          <v-card-actions>
            <v-flex xs10></v-flex>
            <v-flex xs1>
              <v-icon @click="showDeleteDialog(getNewsList[i])">mdi-delete</v-icon>
            </v-flex>
            <v-flex xs1>
              <v-icon @click="showNewsDialog(i)">edit</v-icon>
            </v-flex>
          </v-card-actions>
        </v-flex>
        <v-flex xs12 class="mt-5">
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="pb-5 pt-5">
        <v-flex xs12 class="mr-5 text-right">
          <v-btn
            color="primary"
            dark
            v-if="count == 1 && count != newsListLength"
            @click="count=newsListLength"
          >View All</v-btn>
          <v-btn
            color="primary"
            dark
            v-if="count != 1 && count == newsListLength"
            @click="count=1"
          >Close All</v-btn>
        </v-flex>
      </v-layout>
    </div>
    <div v-else style="margin-bottom: 30px;
    margin-left: 350px;
    margin-right: 100px;">
      <span class="subtitle-1 mr-5 ml-5">No News to Show</span>
    </div>
  </div>
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
    this.$store.commit("showProgressBar", {});
    this.$store.dispatch("adminModule/getAllNews").then(response => {
      this.$store.commit("closeProgressBar", {});
      if (response.data.result.length > 0) {
        this.count = 1;
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
        this.count = 1;
        this.empty = false;
      }
    }
  },

  data() {
    return {
      dialog: false,
      count: 0,
      showAll: false,
      empty: false
    };
  },
  methods: {
    showNewsDialog(index) {
      this.$store.commit(
        "adminModule/showNewsDialog",
        JSON.parse(JSON.stringify(this.getNewsList[index]))
      );
    },
    showDeleteDialog(data) {
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: "deleteSelectedNews",
        deleteActionToDispatch: "deleteNews"
      });
    }
  }
};
</script>