<template>
  <div>
    <!-- <v-img height="300px" src="@/assets/pic1.jpg"> -->
    <!-- <core-app-bar></core-app-bar> -->
    <!-- </v-img> -->
    <carosel />
    <v-row></v-row>
    <v-row>
      
    </v-row>
    <v-row>
      <v-layout row wrap class="mt-5">
        <v-flex xs8>
          <events :dialog="read" @readMore="readMore" />
        </v-flex>
        <v-flex xs4>
          <statusCard></statusCard>
        </v-flex>
      </v-layout>
    </v-row>
    <v-card-title style="color:white">Recommended Career</v-card-title>
    <v-divider style="background:rgb(241, 135, 16);"></v-divider>
    <div>
     <RecommendedCareers/>
    </div>

    
  </div>
</template>

<script>
import { addTokenToPayload, getAlumniId } from "@/utils/utils";

import events from "@/components/core/events.vue";
import carosel from "@/components/material/carosel.vue";
import news from "@/components/core/newsComponent.vue";
import timeline from "@/components/material/Timeline.vue";
import statusCard from "@/components/core/statusCard.vue";
import RecommendedCareers from "@/components/core/recommendedcareers.vue"
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
   
    statusCard,
    carosel,
    news,
    timeline,
    events,
    RecommendedCareers
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
      progress: true,
     
    };
  },
  beforeMount() {
    this.getAlumniData();
    this.getStatus();
  },

  computed: {
    userData() {
      return this.$store.getters["userModule/getUserData"]
        ? this.$store.getters["userModule/getUserData"].user_id
        : null;
    }
    // FnfStatus() {
    //   return this.$store.getters["userModule/getStatusData"]
    //     ? this.$store.getters["userModule/getStatusData"].fnfStatus
    //     : null;
    // },
    // FormStatus() {
    //   return this.$store.getters["userModule/getStatusData"]
    //     ? this.$store.getters["userModule/getStatusData"].form16Status
    //     : null;
    // },
    // PfStatus() {
    //   return this.$store.getters["userModule/getStatusData"]
    //     ? this.$store.getters["userModule/getStatusData"].pfTransferStatus
    //     : null;
    // }
  },

  methods: {
    readMore() {
      this.read = true;
    },
    getAlumniData() {
      let data = {
        payload: {
          userid: getAlumniId()
        }
      };
      this.$store.dispatch("userModule/getAlumniById", data);
    },
    closeContactDialog() {
      this.$store.commit("userModule/closeContactDialog");
    },
    closeClearanceDialog() {
      this.dialog = false;
    },
    getStatus() {
      let data = {
        payload: { userid: this.userData }
      };
      this.$store.dispatch("userModule/getStatus", data).then(response => {
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