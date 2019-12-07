<template>
  <v-container>
    <v-img height="250px" src="@/assets/document_bg.jpg">
      <!-- <core-app-bar></core-app-bar> -->
    </v-img>
    <br />
    <br />
    <v-layout row wrap mt-4 ml-5 mr-5>
      <v-flex xs4 mt-4 v-for="(item,i) in cards" :key="i">
        <v-card class="mx-auto" max-width="350" min-height="300px">
          <v-img
            v-if="status[i]=='Available'"
            class="white--text align-end"
            height="200px"
            :src="images[0].back"
          >
            <v-card-title>{{item.title}}</v-card-title>
          </v-img>
          <v-img v-else class="align-end" height="200px" :src="images[1].back">
            <v-card-title>{{item.title}}</v-card-title>
          </v-img>

          <v-card-text class="text--primary" v-if="status[i]=='Available'" >
            <div >Your Document is ready for download</div>
          </v-card-text>
          <v-card-text class="text--primary" v-else>
            <div>
              <v-icon color="orange">mdi-exclamation</v-icon>Your Document is Pending from Company.It will be available shortly
            </div>
          </v-card-text>

          <v-card-actions v-if="status[i]=='Available'">
            <v-btn color="orange" text @click="download(item.code)">Download</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <v-layout row wrap mt-4 ml-5 mr-5>
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
    </v-layout>-->

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
import { addTokenToPayload, getAlumniId } from "@/utils/utils";
import timeline from "@/components/material/Timeline.vue";
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    timeline
  },
  data() {
    return {
      cards: [
        { title: "Form16", code: 97 },
        { title: "Full n Final", code: 95 },
        { title: "Salary Slips", code: 96 },
        { title: "Relieving Letter", code: 97 },
        { title: "Pf Clearance", code: 97 },
        { title: "Experience Letter", code: 97 }
      ],
      status: [
        "Available",
        " Not Available",
        "Available",
        "Available",
        " Not Available",
        "Available"
      ],
      images: [
        { back: require("@/assets/documentavailable1.gif") },
        { back: require("@/assets/documentwaiting.gif") }
      ],
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
        payload: {
          userid: getAlumniId(),
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
  beforeMount() {
    this.getAlumniData();
    this.getStatus();
    // this.getDocumentStatus();
  },

  computed: {
    userData() {
      return this.$store.getters["userModule/getUserData"]
        ? this.$store.getters["userModule/getUserData"].user_id
        : null;
    },
    DocumentStatus: {
      get() {
        return this.$store.getters["userModule/getStatusData"];
      },
      set(data) {
        this.$store.commit("userModule/setStatusData", this.data);
      }
    }
    // FnfStatus() {
    //   return this.$store.getters["userModule/getStatusData"]
    //     ? this.$store.getters["userModule/getStatusData"].fnfStatus
    //     : null;
    // },
    // FormStatus() {
    //   return this.$store.getters["userModule/getStatusData"]
    //     ? this.$store.getters["userModule/getStatusData"].form16
    //     : null;
    // },
    // PfStatus() {
    //   return this.$store.getters["userModule/getStatusData"]
    //     ? this.$store.getters["userModule/getStatusData"].pfTransferStatus
    //     : null;
    // },
    // SalaryStatus() {
    //   return this.$store.getters["userModule/getStatusData"]
    //     ? this.$store.getters["userModule/getStatusData"].salarycurrent
    //     : null;
    // }
  },

  methods: {
    getAlumniData() {
      let data = {
        payload: {
          userid: getAlumniId()
        }
      };
      this.$store.dispatch("userModule/getAlumniById", data);
    },
    getStatus() {
      let data = {
        payload: {
          userid: this.userData
        }
      };
      this.$store.dispatch("userModule/getStatus", data).then(response => {
        this.progress = false;
      });
    }
    // getDocumentStatus(){

    //     this.status[0]=this.DocumentStatus.form16
    //     this.status[1]=this.DocumentStatus.fnfStatus
    //     this.status[2]=this.DocumentStatus.salarycurrent
    //     this.status[3]=this.DocumentStatus.fnfStatus
    //     this.status[4]=this.DocumentStatus.pfTransferStatus
    //     this.status[5]=this.DocumentStatus.fnfStatus

    // }
  }
  // watch: {
  //   user() {
  //     this.initializeUserId();
  //   }
  // }
};
</script>
