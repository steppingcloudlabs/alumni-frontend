<template>
  <v-layout row wrap style="margin-left:0px">
    <v-flex xs12>
      <v-card class="pt-5" style="margin-top:20px!important">
        <v-layout row wrap style="margin-left:0px">
          <v-flex xs12>
            <div>
              <p class="text-center">
                <img v-if="user.photo"
                  class="img"
                  :src="user.photo"
                  style="
                    border-radius: 50%;
                    border: 3px solid white;
                    width: 200px;
                    height:200px
                  "
                />
                 <img v-else
                  class="img"
                  src="@/assets/avatar/download.jpg"
                  style="
                    border-radius: 50%;
                    border: 3px solid white;
                    width: 200px;
                    height:200px
                  "
                />
              </p>
            </div>
            <div style="text-align: center">
              <v-card-text
                class="headline py-1"
                style="line-height: 1px; margin-left: 0px !important"
              >
                <p
                class="info"
                  style="
                   
                    font-family: 'Raleway', sans-serif;
                    font-weight: bolder;
                  "
                >
                  {{ user.firstname }} {{ user.lastname }}
                </p>
              </v-card-text>
              <v-card-text
                class="subtitle"
                style="margin-left: 0px !important; line-height: 2px !important"
              >
                <p
                  class="caption"
                  style="
                    line-height: 2px !important;
                    font-family: 'Raleway', sans-serif;
                  "
                >
                  Worked As-{{ user.position }}
                </p>

                <p>Till {{ user.lastworking }}</p>
                <p v-if="linkedInlinkProfileLink">
                  <v-icon
                    color="primary"
                    @click="openlinkedInlinkProfile"
                    class="mr-1"
                    >mdi-linkedin</v-icon
                  >
                </p>
                <p style="font-family: 'Raleway', sans-serif">
                  {{ user.city }}
                </p>
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
          <!-- <v-flex xs6>
            <div>
              <v-card-title class="subtitle-1 pt-0 user-profile-heading font-weight-bold">
                skills
                <v-spacer></v-spacer>
              </v-card-title>
              <v-divider></v-divider>
              <v-chip
                color="primary"
                v-for="(item, i) in userskills"
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
                  <v-card-text class="body-1 py-1" style="margin-top:2px !important;">GENDER</v-card-text>
                </v-flex>
                <v-flex xs7>
                  <v-card-text
                    class="body-1 py-1 font-weight-bold"
                    style="margin-top:2px !important; color: #181818	"
                  >{{user.GENDER}}</v-card-text>
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
          </v-flex>-->
          <!-- <v-flex xs12>
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
          </v-flex>-->
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
      SKILL: "",
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
        nationality: "",
      },
      progress: true,
      userskills: [],
      linkedInlinkProfileLink: "",
    };
  },
  beforeMount() {
    this.$store.commit("showProgressBar", {});
    console.log(this.$route.params.userId);
    if (!this.userData) {
      let data = {
        payload: {
          userid: this.$route.params.userId,
        },
      };
      this.$store
        .dispatch("userModule/getSearchAlumniById", data)
        .then((response) => {
          this.$store.commit("closeProgressBar", {});
          this.initializeUserData();
        });
    } else if (this.userData.USER_ID != this.$route.params.userId) {
      let data = {
        payload: {
          userid: this.$route.params.userId,
        },
      };
      this.$store
        .dispatch("userModule/getSearchAlumniById", data)
        .then((response) => {
           this.$store.commit("closeProgressBar", {});
          this.initializeUserData();
        });
    } else {
       this.$store.commit("closeProgressBar", {});
      this.initializeUserData();
    }
  },
  watch: {
    userData() {
      this.initializeUserData();
    },
  },

  computed: {
    // userskills() {
    //   return this.user.skills;
    // },
    userData() {
      return this.$store.getters["userModule/getSearchUserData"];
    },
  },
  methods: {
    openlinkedInlinkProfile() {
      window.open(this.linkedInlinkProfileLink, "_blank");
    },
    initializeUserData() {
      this.user.position = this.userData[0].DESIGNATION_JOB_INFORMATION;
      this.user.employeeId = this.userData[0].USER_ID;
      //this.user.managerid = this.userData.MANAGER_JOB_INFORMATION;
      //console.log(moment(this.userData.relieving_date));
      //this.user.relieving = moment
      //  .unix(this.userData.date_of_relieving / 1000)
      //  .format("LL");
      // new Date(this.userData.relieving_date).getDate() +
      // "/" +
      // new Date(this.userData.relieving_date).getMonth() +
      // "/" +
      // new Date(this.userData.relieving_date).getFullYear();

      this.user.lastworking = moment
        .unix(this.userData[0].LAST_WORKING_DAY_AS_PER_NOTICE_PERIOD / 1000)
        .format("LL");
      // new Date(
      //   this.userData.LAST_WORKING_DAY_AS_PER_NOTICE_PERIOD
      // ).getDate() +
      // "/" +
      // new Date(
      //   this.userData.LAST_WORKING_DAY_AS_PER_NOTICE_PERIOD
      // ).getMonth() +
      // "/" +
      // new Date(
      //   this.userData.LAST_WORKING_DAY_AS_PER_NOTICE_PERIOD
      // ).getFullYear();

      //  this.user.resignation = moment .unix(this.userData.DATE_OF_RESIGNATION / 1000).format("LL");
      // new Date(this.userData.DATE_OF_RESIGNATION).getDate() +
      // "/" +
      // new Date(this.userData.DATE_OF_RESIGNATION).getMonth() +
      // "/" +
      // new Date(this.userData.DATE_OF_RESIGNATION).getFullYear();

      this.user.firstname = this.userData[0].FIRST_NAME_PERSONAL_INFORMATION;
      this.user.lastname = this.userData[0].LAST_NAME_PERSONAL_INFORMATION;
      //this.user.nationality = this.userData.NATIONALITY_PERSONAL_INFORMATION;
      this.user.city = this.userData[0].CITY_ADDRESSES;
      // this.user.email = this.userData[0].PERSONAL_EMAIL_ID;
      // this.user.mobile = this.userData.PHONE_NUMBER_PHONE_INFORMATION;
      //  this.userskills = this.userData[0].SKILL;
      this.linkedInlinkProfileLink = this.userData[0].LINKEDIN;
      this.user.photo=this.userData[0].PROFILEIMAGE
    },
  },
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