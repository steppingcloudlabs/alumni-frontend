<template>
  <div>
    <v-toolbar dark>
      <v-btn
        class="button ml-2 mt-2"
        fab
        dark
        color="primary"
        :disabled="varProgress"
        @click="showDialog"
      >
        <v-progress-circular
          v-if="varProgress"
          v-model="varProgress"
          :size="30"
          :width="4"
          indeterminate
          color="white"
        ></v-progress-circular>

        <span v-else>
          <v-icon dark>mdi-plus</v-icon>
        </span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-tabs v-model="tab" fixed-tabs dark icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-5-1">
          News
          <v-icon>mdi-newspaper</v-icon>
        </v-tab>

        <v-tab href="#tab-5-2">
          Events
          <v-icon>mdi-calendar-check</v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item :value="'tab-5-1'">
        <v-card outlined dark style="border-radius: 0px;">
          <!-- <v-btn
            class="button"
            color="primary"
            :disabled="newsProgress"
            dark
            block
            @click="showNewsDialog"
          >
            <v-progress-circular
              v-if="newsProgress"
              v-model="newsProgress"
              :size="30"
              :width="4"
              indeterminate
              color="white"
            ></v-progress-circular>

            <span v-else>
              <i class="fas fa-plus-circle mr-2"></i>
            </span>
          </v-btn>-->

          <News />
        </v-card>
      </v-tab-item>
      <v-tab-item :value="'tab-5-2'">
        <v-card outlined dark style="border-radius: 0px;">
          <!-- <v-btn
            class="button"
            :disabled="eventsProgress"
            color="primary"
            dark
            block
            @click="showEventDialog"
          >
            <v-progress-circular
              v-if="eventsProgress"
              v-model="eventsProgress"
              :size="30"
              :width="4"
              indeterminate
              color="white"
            ></v-progress-circular>
            <span v-else>
              <i class="fas fa-plus-circle mr-2"></i>
            </span>
          </v-btn>-->

          <event />
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <!-- <v-row>
      <v-col cols="12" class="ml-0">
        <v-card outlined dark>
          <v-toolbar>
            <v-toolbar-title>News</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn
              class="button"
              color="primary"
              :disabled="newsProgress"
              dark
              @click="showNewsDialog"
            >
              <v-progress-circular
                v-if="newsProgress"
                v-model="newsProgress"
                :size="30"
                :width="4"
                indeterminate
                color="white"
              ></v-progress-circular>

              <span v-else>
                <i class="fas fa-plus-circle mr-2"></i>Add News
              </span>
            </v-btn>
          </v-toolbar>
          <News />
        </v-card>
      </v-col>

      <v-col cols="12" class="ml-0">
        <v-card outlined dark>
          <v-toolbar>
            <v-toolbar-title>Events</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn
              class="button"
              :disabled="eventsProgress"
              color="primary"
              dark
              @click="showEventDialog"
            >
              <v-progress-circular
                v-if="eventsProgress"
                v-model="eventsProgress"
                :size="30"
                :width="4"
                indeterminate
                color="white"
              ></v-progress-circular>
              <span v-else>
                <i class="fas fa-plus-circle mr-2"></i>Add Events
              </span>
            </v-btn>
          </v-toolbar>
          <event />
        </v-card>
      </v-col>
    </v-row>-->
    <!-- <AddNewsDialog :dialog="dialog" @closeNewsDialog="closeNewsDialog" /> -->
    <!-- <AddEventDialog :dialog="dialog1" @closeEventDialog="closeEventDialog" @saveNewsDialog="saveNewsDialog"/> -->
  </div>
</template>

<script>
import AddNewsDialog from "@/components/admin/AddNewsDialog";
import AddEventDialog from "@/components/admin/AddEventDialog";
import News from "@/components/admin/newsComponent";
import event from "@/components/admin/eventComponent";

export default {
  data: () => ({
    dialog: false,
    dialog1: false,
    tab: null,
    varProgress: false
  }),
  components: {
    AddNewsDialog,
    AddEventDialog,
    News,
    event
  },
  beforeMount() {},
  computed: {
    newsProgress: {
      set(data) {
        this.$store.commit("adminModule/setNewsProgress", data);
      },
      get() {
        return this.$store.getters["adminModule/getNewsProgress"];
      }
    },
    eventsProgress: {
      set(data) {
        this.$store.commit("adminModule/setEventsProgress", data);
      },
      get() {
        return this.$store.getters["adminModule/getEventsProgress"];
      }
    }
  },

  methods: {
    closeNewsDialog() {
      this.$store.commit("adminModule/closeNewsDialog");
    },
    showNewsDialog() {
      let newsData = {
        headLine: "",
        body: ""
      };
      console.log(this.tab);
      this.$store.commit("adminModule/showNewsDialog", {});
    },
    openAddNewsDialog() {
      let NewsData = {
        headline: "",
        body: ""
      };
      this.$store.commit("adminModule/showNewsDialog", NewsData);
    },

    //  Event Section
    closeEventDialog() {
      this.$store.commit("adminModule/closeEventDialog");
    },
    showEventDialog() {
      let eventData = {
        title: "",
        description: ""
      };
      console.log(this.tab);
      this.$store.commit("adminModule/showEventDialog", {});
    },
    showDialog() {
      if (this.tab == "tab-5-1") {
        this.varProgress = this.newsProgress;
        this.showNewsDialog();
      } else if (this.tab == "tab-5-2") {
        this.varProgress = this.eventsProgress;
        this.showEventDialog();
      }
    },
    openAddEventDialog() {
      let EventData = {
        title: "",
        description: ""
      };
      this.$store.commit("adminModule/showEventDialog", EventData);
    }
  }
};
</script>
<style>
.row {
  margin-left: 2px;
  margin-right: initial;
}
.button {
  margin-bottom: 10px;
}
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: rgba(210, 210, 210, 1) !important;
}
</style>