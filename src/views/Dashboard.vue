<template>
  <div>
    <v-img height="300px" src="@/assets/pic1.jpg">
      <!-- <core-app-bar></core-app-bar> -->
    </v-img>
    <v-row>
      <br />
      <br />
    </v-row>
    <v-row>
      <!-- <v-layout row wrap style="margin-left: 1px !important; margin-right: 25px !important;">
        <v-flex xs4>
          <v-card class="mr-3 ml-3" height="100%">
            <v-card-title style="font-family:Raleway;">FnF Status</v-card-title>
            <v-card-text>
              <timeline
                :status="FnfStatus"
                :code="96"
                :userid="this.userData "
                :showLoader="progress"
              />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card class="mr-3 ml-3" height="100%">
            <v-card-title style="font-family:Raleway;">Form16 Status</v-card-title>
            <v-card-text>
              <timeline
                :status="FormStatus"
                :code="95"
                :userid="this.userData "
                :showLoader="progress"
              />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card class="mr-3 ml-3" style="margin-left:20px" height="100%">
            <v-card-title style="font-family:Raleway;">Pf Clearance Status</v-card-title>
            <v-card-text>
              <timeline
                :status="PfStatus"
                :code="95"
                :userid="this.userData "
                :showLoader="progress"
              />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>-->
    </v-row>

    <v-row>
      <br />
      <br />
    </v-row>

    <v-row>
      <events :dialog="read" @readMore="readMore" />
    </v-row>
    <v-row>
      <br />
      <br />
    </v-row>
    <news />

    <clearance :dialog="dialog" @closeClearanceDialog="closeClearanceDialog" />
  </div>
</template>

<script>
import clearance from "@/components/core/clearanceDialog.vue";
import events from "@/components/core/events.vue";
import carosel from "@/components/material/carosel.vue";
import news from "@/components/core/newsComponent.vue";
import timeline from "@/components/material/Timeline.vue";
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    clearance,
    carosel,
    news,
    timeline,
    events
  },
  data() {
    return {
      read: false,
      status: "Not Available",
      status2: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      progress: true
    };
  },
  mounted() {
    this.getStatus();
  },

  computed: {
    userData() {
      return this.$store.getters["userModule/getUserData"]
        ? this.$store.getters["userModule/getUserData"].user_id
        : null;
    },
    FnfStatus() {
      return this.$store.getters["userModule/getStatusData"]
        ? this.$store.getters["userModule/getStatusData"].fnfStatus
        : null;
    },
    FormStatus() {
      return this.$store.getters["userModule/getStatusData"]
        ? this.$store.getters["userModule/getStatusData"].form16Status
        : null;
    },
    PfStatus() {
      return this.$store.getters["userModule/getStatusData"]
        ? this.$store.getters["userModule/getStatusData"].pfTransferStatus
        : null;
    }
  },

  methods: {
    readMore() {
      this.read = true;
    },
    closeClearanceDialog() {
      this.dialog = false;
    },
    getStatus() {
      let data = {
        userid: this.userData
      };
      debugger;
      this.$store.dispatch("userModule/getStatus", data).then(response => {
        debugger;
        this.progress = false;
      });
    }
  }
};
</script>
<style >
.row {
  margin-left: 30px;
  margin-right: initial;
}
</style>