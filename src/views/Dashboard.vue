<template>
  <div>
    <v-img height="300px" src="@/assets/pic1.jpg">
      <core-app-bar></core-app-bar>
    </v-img>
    <v-row>
      <br />
      <br />
    </v-row>
    <v-row>
      <v-layout row wrap style="margin-left: 1px !important; margin-right: 25px !important;">
        <v-flex xs4>
          <v-card class="mr-3 ml-3">
            <v-card-title>FnF Status</v-card-title>
            <timeline />
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card class="mr-3 ml-3">
            <v-card-title>Form16 Status</v-card-title>
            <timeline />
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card class="mr-3 ml-3" style="margin-left:20px">
            <v-card-title>Pf Clearance Status</v-card-title>
            <timeline />
          </v-card>
        </v-flex>
      </v-layout>
    </v-row>

    <v-row>
      <br />
      <br />
    </v-row>

    <v-row>
      <carosel />
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
import carosel from "@/components/material/carosel.vue";
import news from "@/components/core/newsComponent.vue";
import timeline from "@/components/material/Timeline.vue";
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    clearance,
    carosel,
    news,
    timeline
  },
  data() {
    return {
      status1: true,
      status2: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      power: {
        value: 80,
        text: "In process"
      },
      progress: 0,
      interval: {}
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.progress === this.power.value) {
        return (this.progress = 0);
      }
      this.progress += 10;
    }, 1000);
  },
  methods: {
    closeClearanceDialog() {
      this.dialog = false;
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