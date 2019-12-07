<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="pt-5">
        <v-layout row wrap ma-0>
          <v-flex xs6>
            <div>
              <p class="text-center">
                <img
                  class="img"
                  src="@/assets/avatar/download.jpg"
                  style="border-radius: 50%; border: 3px solid white; width: 200px;"
                />
              </p>
            </div>
            <div style="text-align:center">
              <v-card-text
                class="headline py-1"
                style="line-height:1px;margin-left:0px !important;"
              >
                <p
                  style="color:black;font-family:'Raleway',sans-serif;font-weight:bolder"
                >{{user.firstname}} {{user.lastname}}</p>
              </v-card-text>
              <v-card-text
                class="subtitle"
                style="margin-left: 0px!important;line-height: 2px !important;"
              >
                <p
                  class="caption"
                  style="line-height: 2px !important;font-family:'Raleway',sans-serif"
                >Worked As-{{user.designation}}</p>
                <p>
                  <v-icon color="blue">mdi-linkedin</v-icon>
                </p>
                <p style="font-family:'Raleway',sans-serif">{{user.city}}</p>
              </v-card-text>
              <!-- <v-card-text class="py-5">
                <p>
                  <v-btn
                    class="button"
                    x-large
                    fab
                    :style="!office ? 'background: lightgrey' : 'background: white;'"
                    style="margin-right:10px; color: white"
                    @click="resetoffice"
                  >
                    <v-icon class="hello mr-5 ml-5" color="blue">mdi-account</v-icon>
                  </v-btn>
                  <v-btn
                    class="button"
                    :style="office ? 'background: lightgrey' : 'background: white;'"
                    x-large
                    fab
                    style="margin-left:10px; color: white"
                    @click="setoffice"
                  >
                    <v-icon class="hello mr-5 ml-5" color="blue">mdi-domain</v-icon>
                  </v-btn>
                </p>
              </v-card-text>-->
            </div>
          </v-flex>
          <v-flex xs6>
            <div>
              <v-card-title class="subtitle-1 pt-0 user-profile-heading font-weight-bold">
                Skills
                <v-spacer></v-spacer>
              </v-card-title>
              <v-divider></v-divider>
              <v-chip
                color="primary"
                v-for="(item, i) in userSkills"
                :key="i"
                class="body-1 mr-2 ml-2 mt-4"
                style="margin-top:10px"
              >{{item}}</v-chip>
            </div>
            <div class="mt-2">
              <p
                class="subtitle-1 pt-5 mb-1 pl-4 user-profile-heading"
                style="font-weight: bold;"
              >Basic Information</p>
              <v-divider></v-divider>
              <v-layout row wrap class="ma-0">
                <v-flex xs5>
                  <v-card-text class="body-1 py-1" style="margin-top:2px !important;">Date Of Birth</v-card-text>
                </v-flex>
                <v-flex xs7>
                  <v-card-text
                    class="body-1 py-1 font-weight-bold"
                    style="margin-top:2px !important; color: #181818	"
                  >{{user.DOB}}</v-card-text>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs5>
                  <v-card-text class="body-1 py-1" style="margin-top:2px !important;">Gender</v-card-text>
                </v-flex>
                <v-flex xs7>
                  <v-card-text
                    class="body-1 py-1 font-weight-bold"
                    style="margin-top:2px !important; color: #181818	"
                  >{{user.gender}}</v-card-text>
                </v-flex>
              </v-layout>
              <v-layout class="mb-4">
                <v-flex xs5>
                  <v-card-text class="body-1 py-1" style="margin-top:2px !important;">Nationality</v-card-text>
                </v-flex>
                <v-flex xs7>
                  <v-card-text
                    class="body-1 py-1 font-weight-bold"
                    style="margin-top:2px !important; color: #181818	"
                  >{{user.nationality}}</v-card-text>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card class="mt-2">
        <v-layout row wrap>
          <v-flex xs6 pr-5>
            <v-card-title
              class="subtitle-1 font-weight-bold pt-5 pl-4 pb-3 user-profile-heading"
            >Company Information</v-card-title>
            <v-divider></v-divider>
            <v-layout pt-2>
              <v-flex xs5>
                <v-card-text class="body-1 py-1" style="margin-top:2px !important;">Employee Id</v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top:2px !important; color: #181818	"
                >{{user.employeeId}}</v-card-text>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs5>
                <v-card-text class="body-1 py-1" style="margin-top:2px !important;">Last Designation</v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top:2px !important; color: #181818	"
                >{{user.designation}}</v-card-text>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs5>
                <v-card-text class="body-1 py-1" style="margin-top:2px !important;">Resignation Date</v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top:2px !important; color: #181818	"
                >{{user.resignation}}</v-card-text>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs5>
                <v-card-text class="body-1 py-1" style="margin-top:2px !important;">Relieving Date</v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top:2px !important; color: #181818	"
                >{{user.relieving}}</v-card-text>
              </v-flex>
            </v-layout>
            <v-layout class="mb-4">
              <v-flex xs5>
                <v-card-text class="body-1 py-1" style="margin-top:2px !important;">Manager</v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top:2px !important; color: #181818	"
                >{{user.managerid}}</v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";
import { addTokenToPayload, getAlumniId } from "@/utils/utils";

export default {
  data() {
    return {
      showskill: true,
      office: true,
      read: false,
      status: "Not Available",
      status2: false,
      dialog: false,
      skill: "",
      skills: ["hello", "testing", "python", "ruby"],
      user: {
        username: "",
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        country: "india",
        postalcode: "",
        me: "",
        email: "",
        position: "",
        mobile: "",
        DOB: "",
        avatar: "download",
        employeeId: "",
        managerid: "",
        relieving: "",
        lastworking: "",
        nationality: ""
      },
      progress: true,
      userSkills: []
    };
  },
  beforeMount() {
    console.log(this.$route.params.userId);
    if (!this.userData) {
      let data = {
        payload: {
          userid: this.$route.params.userId
        }
      };
      this.$store.dispatch("userModule/getSearchAlumniById", data).then(response => {
        this.initializeUserData();
      });
    } else if (this.userData.user_id != this.$route.params.userId) {
      let data = {
        payload: {
          userid: this.$route.params.userId
        }
      };
      this.$store.dispatch("userModule/getSearchAlumniById", data).then(response => {
        this.initializeUserData();
      });
    } else {
      this.initializeUserData();
    }
  },
  watch: {
    userData() {
      this.initializeUserData();
    }
  },

  computed: {
    // userSkills() {
    //   return this.user.skills;
    // },
    userData() {
      return this.$store.getters["userModule/getSearchUserData"];
    }
  },
  methods: {
    initializeUserData() {
      this.user.position = this.userData.designation_job_information;
      this.user.employeeId = this.userData.user_id;
      this.user.managerid = this.userData.manager_job_information;
      console.log(moment(this.userData.relieving_date));
      this.user.relieving =moment
        .unix(this.userData.relieving_date / 1000)
        .format("LL");
        // new Date(this.userData.relieving_date).getDate() +
        // "/" +
        // new Date(this.userData.relieving_date).getMonth() +
        // "/" +
        // new Date(this.userData.relieving_date).getFullYear();

      this.user.lastworking =moment
        .unix(this.userData.last_working_day_as_per_notice_period / 1000)
        .format("LL");
        // new Date(
        //   this.userData.last_working_day_as_per_notice_period
        // ).getDate() +
        // "/" +
        // new Date(
        //   this.userData.last_working_day_as_per_notice_period
        // ).getMonth() +
        // "/" +
        // new Date(
        //   this.userData.last_working_day_as_per_notice_period
        // ).getFullYear();

      this.user.resignation =moment
        .unix(this.userData.date_of_resignation / 1000)
        .format("LL");
        // new Date(this.userData.date_of_resignation).getDate() +
        // "/" +
        // new Date(this.userData.date_of_resignation).getMonth() +
        // "/" +
        // new Date(this.userData.date_of_resignation).getFullYear();

      this.user.firstname = this.userData.first_name_personal_information;
      this.user.lastname = this.userData.last_name_personal_information;
      this.user.nationality = this.userData.nationality_personal_information;
      this.user.city = this.userData.city_addresses;
      this.user.email = this.userData.personal_email_id;
      this.user.mobile = this.userData.phone_number_phone_information;
      this.userSkills = this.userData.skill;
    }
  }
};
</script>



<style scoped>
.row {
  margin-left: 30px;
  margin-right: initial;
}
.button:active {
  color: rgb(241, 135, 16) !important;
}

.img:hover {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>