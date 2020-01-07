<template>
  <div>
    <div v-if="!empty">
      <v-layout row wrap mt-4 px-5 v-for="(item,i) in getNewsList" :key="i">
        <v-flex xs4 class="px-5">
          <v-img height="200px" v-if="getNewsList[i].photo" :src="getNewsList[i].photo"></v-img>
          <v-img height="200px" v-else src="@/assets/news.png"></v-img>
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
          <v-btn color="primary" dark v-if="showMore" @click="getMore()">View All</v-btn>
          <v-btn color="primary" dark v-if="!showMore" @click="getLess()">Close All</v-btn>
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
    this.showMore = true;
    this.limit = 10;
    (this.skip = 0), this.$store.commit("showProgressBar", {});
    this.$store
      .dispatch("adminModule/getAllNews", {
        payload: { skip: 0, limit: this.limit }
      })
      .then(response => {
        this.$store.commit("closeProgressBar", {});
        if (response.data.result.length > 0) {
          this.count = 1;
          this.empty = false;
        } else {
          this.count = 0;
          this.empty = true;
        }
        if (response.data.result.length < this.limit) {
          this.empty = false;
          this.showMore = false;
        }
        else{
           this.empty = false;
          this.showMore = true;
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
      showMore: true,
      limit: 1,
      skip: 0,
      dialog: false,
      count: 0,
      showAll: false,
      empty: false
    };
  },
  methods: {
    getLess() {
      this.$store
        .dispatch("adminModule/getAllNews", {
          payload: { limit: 1, skip: 0 }
        })
        .then(response => {
          if (
            response.data.status == 200 &&
            response.data.result.length < this.limit
          ) {
            this.showMore = false;
          } else {
            this.showMore = true;
          }
        });
      this.showMore = true;
    },
    getMore() {
      this.limit = this.limit;
      this.skip = this.skip + this.limit;
      this.showMore = false;
      let actionToCall = "getAllNews";
      this.$store
        .dispatch("adminModule/getMoreNews", {
          payload: { limit: this.limit, skip: this.skip }
        })
        .then(response => {
          if (
            response.data.status == 200 &&
            response.data.result.length < this.limit
          ) {
            this.showMore = false;
          } else {
            this.showMore = true;
          }
        });
    },
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