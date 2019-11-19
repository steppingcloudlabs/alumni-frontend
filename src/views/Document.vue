<template>
  <v-container>
    <v-img height="250px" src="@/assets/document_bg.jpg">
      <!-- <core-app-bar></core-app-bar> -->
    </v-img>
    <br />
    <br />
    <v-layout row wrap mt-4 ml-5 mr-5>
      <v-flex xs6>
        <v-card class="mr-3 ml-3" height="100%">
          <v-card-title
            class="font-weight-medium"
            style="font-family:Raleway; font-size:15px;"
          >FnF Status</v-card-title>
          <v-card-text>
            <timeline
              :status="FnfStatus"
              :code="95"
              :userid="this.userData"
              :showLoader="progress"
            />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card class="mr-3 ml-3" height="100%">
          <v-card-title
            class="font-weight-medium"
            style="font-family:Raleway; font-size:15px"
          >Form16 Status</v-card-title>
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
      <v-flex xs6>
        <v-card class="mr-3 ml-3 mt-3" style="margin-left:20px" height="100%">
          <v-card-title
            class="font-weight-medium"
            style="font-family:Raleway;font-size:15px"
          >Pf Clearance Status</v-card-title>
          <v-card-text>
            <timeline :status="PfStatus" :code="95" :userid="this.userData" :showLoader="progress" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card class="mr-3 ml-3 mt-3" style="margin-left:20px" height="100%">
          <v-card-title
            class="font-weight-medium"
            style="font-family:Raleway;font-size:15px"
          >Salary Slip Status</v-card-title>
          <v-card-text>
            <timeline
              :status="SalaryStatus"
              :code="96"
              :userid="this.userData"
              :showLoader="progress"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- <v-row>
      <v-flex xs1></v-flex>
      <v-flex xs4>
        <v-card color="#5097DD" dark>
          <v-card-text class="white--text">
            <div class="headline mb-2">FORM 16 Available now</div>You can download your form 16 here.
          </v-card-text>

          <v-card-actions>
            <v-btn text @click="download(95)">Download Now</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs2></v-flex>
      <v-flex xs4>
        <v-card color="#5097DD" dark>
          <v-card-text class="white--text">
            <div class="headline mb-2">Pay Slips Available now</div>You can download your Pay Slips here.
          </v-card-text>

          <v-card-actions>
            <v-btn text @click="download(96)">PaySlip1</v-btn>
            <v-btn text @click="download(97)">PaySlip2</v-btn>
            <v-btn text @click="download(98)">PaySlip3</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs1></v-flex>
    </v-row>-->
  </v-container>
</template>

<script>
import timeline from "@/components/material/Timeline.vue";
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    timeline
  },
  data() {
    return {
      progress: true
      // user: {
      //   userid: ""
      // }
    };
  },
  // beforeMount() {
  //   this.initializeUserId();
  // },
  methods: {
    download(data) {
      let body = {
        payload:{
        userid: this.userData,
        // code:data,
        filename: data
        }
       
      };
      console.log(body);

      this.$store
        .dispatch("userModule/downloadDocument", body)
        .then(response => {
          if (response.data.status == 200) {
            this.$store.commit("showSnackbar", {
              color: "green",
              duration: 3000,
              message: "File downloaded succesfully",
              heading: "Success"
            });
          }
        })
        .catch(error => {
          console.log(error); //Exepection error....
          this.$store.commit("showSnackbar", {
            color: "red",
            duration: 1000,
            message: error,
            heading: "Error"
          });
        });
    }
    // initializeUserId() {
    //   this.user.userid = this.userData.user_id;
    // }
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
    },
    SalaryStatus() {
      return this.$store.getters["userModule/getStatusData"]
        ? this.$store.getters["userModule/getStatusData"].salarycurrent
        : null;
    }
  },

  methods: {
    getStatus() {
      let data = {
        payload:{
         userid: this.user.employeeId
        }
      };
      this.$store.dispatch("userModule/getStatus", data).then(response => {
        this.progress = false;
      });
    }
  }
  // watch: {
  //   user() {
  //     this.initializeUserId();
  //   }
  // }
};
</script>
