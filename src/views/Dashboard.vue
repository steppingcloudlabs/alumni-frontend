<template>
  <div>
    <v-img height="500px" src="@/assets/pic1.jpg">
      <core-app-bar></core-app-bar>
    </v-img>
    <v-row>
      <br />
      <br />
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card color="#5097DD" dark height="150px" width="415px">
          <v-card-text class="white--text">
            <div class="headline mb-2">Clearance Status</div>You can download your form 16 here.
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="dialog=true">Check Here</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card color="#5097DD" dark height="150px" width="415px">
          <v-card-text class="white--text">
            <div class="headline mb-2">Other Status</div>hello.
          </v-card-text>
        </v-card>
      </v-col>
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
    <news/>

    <clearance :dialog="dialog" @closeClearanceDialog="closeClearanceDialog" />
  </div>
</template>

<script>
import clearance from "@/components/core/clearanceDialog.vue";
import carosel from "@/components/material/carosel.vue";
import news from "@/components/core/newsComponent.vue";
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    clearance,
    carosel,
    news
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    };
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