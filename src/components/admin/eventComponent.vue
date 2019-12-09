<template>
  <div>
    <div v-if="!this.empty">
      <v-layout row wrap mt-4 v-for="(item,i) in count" :key="i">
        <v-flex xs4 class="px-5">
          <v-img height="200px" v-if="getEventList[i].photo" :src="getEventList[i].photo"></v-img>
          <v-img height="200px" v-else src="@/assets/news.png"></v-img>
        </v-flex>
        <v-flex xs8>
          <v-card-title class="pt-0">{{getEventList[i].title}}</v-card-title>
          <v-card-text style="font-size:15px">{{getEventList[i].content}}</v-card-text>
        </v-flex>
        <v-flex xs12>
          <v-card-actions>
            <v-flex xs10></v-flex>
            <v-flex xs1>
              <v-icon @click="showDeleteDialog(getEventList[i])">mdi-delete</v-icon>
            </v-flex>
            <v-flex xs1>
              <v-icon @click="showEventDialog(i)">edit</v-icon>
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
    margin-right: 200px;">
      <span class="subtitle-1 mr-5 ml-5">No Events to Show</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getEventList: {
      get() {
        return this.$store.getters["adminModule/getEventList"];
      },
      set(data) {
        this.$store.commit("adminModule/setEventList", this.data);
      }
    },
    showEvent: {
      get() {
        return this.$store.getters["adminModule/getshowEventDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowEvent", data);
      }
    },
    eventListLength() {
      return this.$store.getters["adminModule/getEventList"].length;
    }
  },
  watch: {
    eventListLength() {
      if (this.eventListLength == 0) {
        this.count = 0;
        this.empty = true;
      } else {
        this.empty = false;
        this.count = 1;
      }
    }
  },
  data() {
    return {
      limit: 1,
      showMore: true,
      count: 0,
      empty: false
    };
  },
  methods: {
    getLess() {
      this.$store
        .dispatch("adminModule/getAllEvent", {
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
      this.limit = 2;
      this.skip = this.skip + this.limit;
      this.showMore = false;

      this.$store
        .dispatch("adminModule/getMoreEvent", {
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
    showEventDialog(index) {
      this.$store.commit(
        "adminModule/showEventDialog",
        JSON.parse(JSON.stringify(this.getEventList[index]))
      );
    },
    showDeleteDialog(data) {
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: "deleteSelectedEvents",
        deleteActionToDispatch: "deleteEvents"
      });
    }
  },
  beforeMount() {
    this.limit = 1;
    (this.showMore = true), this.$store.commit("showProgressBar", {});
    this.$store
      .dispatch("adminModule/getAllEvent", {
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
      });
  }
};
</script>