<template>
  <div>
    <div v-if="!this.empty">
      <v-layout row wrap mt-4 v-for="(item,i) in count" :key="i">
        <v-flex xs4>
          <v-avatar tile size="200">
            <v-img v-if="getEventList[i].photo" :src="getEventList[i].photo"></v-img>
            <v-img v-else src="@/assets/news.png"></v-img>
          </v-avatar>
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
          <v-btn
            color="primary"
            dark
            v-if="count == 1 && count!=eventListLength"
            @click="count=eventListLength"
          >View All</v-btn>
          <v-btn
            color="primary"
            dark
            v-if="count != 1 && count==eventListLength"
            @click="count=1"
          >Close All</v-btn>
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
      count: 0,
      empty: false
    };
  },
  methods: {
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
    this.$store.commit("showProgressBar", {});
    this.$store.dispatch("adminModule/getAllEvent", {}).then(response => {
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