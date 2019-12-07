<template>
  <div>
    <!-- <v-img height="300px" src="@/assets/pic1.jpg"> -->
    <!-- <core-app-bar></core-app-bar> -->
    <!-- </v-img> -->
    <carosel />
    <v-row></v-row>
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
      <v-layout row wrap>
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
      <v-layout row wrap style="margin-left:unset;">
        <v-flex xs6 class="pl-3 pt-3" v-for="(item, i) in jobs" :key="i">
          <v-card>
            <v-card-title>{{jobs[i].name}}</v-card-title>
            <v-card-text>
              <span
                v-for="(skill,j) in jobs[i].compentency"
                :key="j"
              >{{jobs[i].compentency[j]}},&nbsp;</span>
            </v-card-text>

            <v-layout row wrap style="margin-left:unset;">
              <v-flex xs4>
                <v-card-text>
                  <v-icon color="blue">mdi-map-marker</v-icon>
                  {{jobs[i].location}}
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text>
                  <v-icon color="blue">mdi-calendar</v-icon>
                  {{jobs[i].date}}
                </v-card-text>
              </v-flex>
              <v-flex xs2>
                <v-card-actions>
                  <v-btn color="primary" outlined>Apply</v-btn>
                </v-card-actions>
              </v-flex>
              <!-- <v-flex xs2>
                  <v-card-actions>
                   <v-btn color="primary">Refer</v-btn>
                  </v-card-actions>
              </v-flex>-->
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
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
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
   
    statusCard,
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
      progress: true,
      jobs: [
        {
          name: "Associate Consultant",
          location: "new delhi",
          department: "integration",
          date: "24-12-2018",
          compentency: ["C", "C++", "javaScript"]
        },
        {
          name: "Developer",
          location: "new delhi",
          department: "integration",
          date: "24-12-2018",
          compentency: ["C", "C++", "javaScript"]
        },
        {
          name: " Deputy Manager",
          location: "new delhi",
          department: "integration",
          date: "24-12-2018",
          compentency: ["C", "C++", "javaScript"]
        },
        {
          name: "IT Consultant",
          location: "new delhi",
          department: "integration",
          date: "24-12-2018",
          compentency: ["C", "C++", "javaScript"]
        }
      ]
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