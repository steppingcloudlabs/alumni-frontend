<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="pt-5" style="margin-top: 15px!important">
        <v-layout row wrap ma-0>
          <v-flex xs6>
            <div>
              <p class="text-center">
                <img
                  v-if="user.PROFILEIMAGE"
                  class="img"
                  :src="user.PROFILEIMAGE"
                  style="
                    border-radius: 50%;
                    border: 3px solid white;
                    width: 200px;
                  "
                  @click="openAvatarDialog()"
                />
                <img
                  v-else
                  class="img"
                  src="@/assets/avatar/download.jpg"
                  style="
                    border-radius: 50%;
                    border: 3px solid white;
                    width: 200px;
                  "
                  @click="openAvatarDialog()"
                />
              </p>
            </div>
            <div style="text-align: center">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card-text
                    class="headline py-1"
                    style="
                      line-height: 1px;
                      margin-left: 0px !important;
                      color: black;
                      font-family: 'Raleway', sans-serif;
                      font-weight: bolder;
                    "
                    >{{ user.firstname }} {{ user.lastname }}</v-card-text
                  >
                </v-flex>
                <v-flex xs12 class="mt-2">
                  <v-card-text
                    class="subtitle"
                    style="
                      margin-left: 0px !important;
                      line-height: 2px !important;
                    "
                  >
                    Worked As-
                    <span class="font-weight-bold">{{ user.position }}</span>
                  </v-card-text>
                </v-flex>
                <v-flex xs12>
                  <AddEditlinkedInlink
                    :linkedInlinkProfileLink="user.LINKEDIN"
                    @saveProfileLink="saveProfileLink"
                  ></AddEditlinkedInlink>
                </v-flex>
                <v-flex xs12>
                  <v-card-text
                    class="subtitle"
                    style="
                      margin-left: 0px !important;
                      line-height: 2px !important;
                    "
                  >
                    <p style="font-family: 'Raleway', sans-serif">
                      {{ user.city }}
                    </p>
                  </v-card-text>
                </v-flex>
              </v-layout>

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
              <v-card-title
                class="subtitle-1 pt-0 user-profile-heading font-weight-bold"
              >
                skills
                <v-spacer></v-spacer>
                <v-btn
                  v-if="showskill"
                  class="text-capitalize"
                  color="primary"
                  @click="showskillinput"
                  >Add New SKILL</v-btn
                >
                <v-combobox
                  v-if="!showskill"
                  v-model="SKILL"
                  :items="skilled"
                  append-icon="add"
                  style="margin-top: -15px"
                  @keyup.enter.native="addskill()"
                  @keydown.esc="showskill = true"
                  @click:append="addskill()"
                  label="Add SKILL"
                  hide-details
                  hide-selected
                ></v-combobox>
                <!-- <v-text-field
                  v-if="!showskill"
                  v-model="SKILL"
                  label=" Add SKILL"
                  style=" margin-top:-15px;"
                  append-icon="add"
                  single-line
                  hide-details
                  @keyup.enter.native="addskill()"
                  @keydown.esc="showskill=true"
                  @click:append="addskill()"
                ></v-text-field>-->
              </v-card-title>
              <v-divider></v-divider>
              <div v-if="userskills.length">
                <v-chip
                  color="primary"
                  v-for="(item, i) in userskills"
                  :key="i"
                  class="body-1 mr-2 ml-2 mt-4"
                  style="margin-top: 10px"
                  close
                  @click:close="deleteskill(item,i)"
                  >{{ item.SKILL }}</v-chip
                >
              </div>
              <div v-else>
                <p class="text-center mt-2" style="font-size: 15px">
                  No skills to Show
                </p>
              </div>
            </div>
            <div class="mt-2">
              <p
                class="subtitle-1 pt-5 mb-1 pl-4 user-profile-heading"
                style="font-weight: bold"
              >
                Basic Information
              </p>
              <v-divider></v-divider>
              <v-layout row wrap class="ma-0">
                <v-flex xs5>
                  <v-card-text
                    class="body-1 py-1"
                    style="margin-top: 2px !important"
                    >Date Of Birth</v-card-text
                  >
                </v-flex>
                <v-flex xs7>
                  <v-card-text
                    class="body-1 py-1 font-weight-bold"
                    style="margin-top: 2px !important; color: #181818"
                    >{{ user.DOB }}</v-card-text
                  >
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs5>
                  <v-card-text
                    class="body-1 py-1"
                    style="margin-top: 2px !important"
                    >GENDER</v-card-text
                  >
                </v-flex>
                <v-flex xs7>
                  <v-card-text
                    class="body-1 py-1 font-weight-bold"
                    style="margin-top: 2px !important; color: #181818"
                    >{{ user.GENDER }}</v-card-text
                  >
                </v-flex>
              </v-layout>
              <v-layout class="mb-4">
                <v-flex xs5>
                  <v-card-text
                    class="body-1 py-1"
                    style="margin-top: 2px !important"
                    >Nationality</v-card-text
                  >
                </v-flex>
                <v-flex xs7>
                  <v-card-text
                    class="body-1 py-1 font-weight-bold"
                    style="margin-top: 2px !important; color: #181818"
                    >{{ user.nationality }}</v-card-text
                  >
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card class="mt-2" style="margin-top: 25px!important">
        <v-layout row wrap>
          <v-flex xs6 pr-5>
            <v-card-title
              class="subtitle-1 font-weight-bold pt-5 pl-4 pb-3 user-profile-heading"
              >Company Information</v-card-title
            >
            <v-divider></v-divider>
            <v-layout pt-2>
              <v-flex xs5>
                <v-card-text
                  class="body-1 py-1"
                  style="margin-top: 2px !important"
                  >Employee Id</v-card-text
                >
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top: 2px !important; color: #181818"
                  >{{ user.employeeId }}</v-card-text
                >
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs5>
                <v-card-text
                  class="body-1 py-1"
                  style="margin-top: 2px !important"
                  >Last Designation</v-card-text
                >
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top: 2px !important; color: #181818"
                  >{{ user.position }}</v-card-text
                >
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs5>
                <v-card-text
                  class="body-1 py-1"
                  style="margin-top: 2px !important"
                  >Resignation Date</v-card-text
                >
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top: 2px !important; color: #181818"
                  >{{ user.resignation }}</v-card-text
                >
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs5>
                <v-card-text
                  class="body-1 py-1"
                  style="margin-top: 2px !important"
                  >Relieving Date</v-card-text
                >
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top: 2px !important; color: #181818"
                  >{{ user.lastworking}}</v-card-text
                >
              </v-flex>
            </v-layout>
            <v-layout class="mb-4">
              <v-flex xs5>
                <v-card-text
                  class="body-1 py-1"
                  style="margin-top: 2px !important"
                  >Manager</v-card-text
                >
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top: 2px !important; color: #181818"
                  >{{ user.managerid }}</v-card-text
                >
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-card-title
              class="subtitle-1 user-profile-heading"
              style="font-weight: bold"
            >
              Contact Information
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                class="text-capitalize"
                @click="openContactDialog"
                >Update Contact</v-btn
              >
            </v-card-title>
            <v-divider></v-divider>
            <v-layout>
              <v-flex xs1>
                <v-card-text
                  class="body-1 py-1"
                  style="margin-top: 2px !important"
                >
                  <v-icon class="mt-1" color="blue">mdi-cellphone</v-icon>
                </v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top: 8px !important; color: #181818"
                  >{{ user.mobile }}</v-card-text
                >
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs1>
                <v-card-text
                  class="body-1 py-1"
                  style="margin-top: 2px !important"
                >
                  <v-icon color="blue">mdi-email</v-icon>
                </v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top: 8px !important"
                  >{{ user.email }}</v-card-text
                >
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs1>
                <v-card-text
                  class="body-1 py-1"
                  style="margin-top: 2px !important"
                >
                  <v-icon color="blue">mdi-home</v-icon>
                </v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top: 5px !important; color: #181818"
                  >{{ user.city }}</v-card-text
                >
              </v-flex>
            </v-layout>
            <updateContact></updateContact>
            <updateAvatar></updateAvatar>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <!-- <v-flex xs12>
      <v-card class="mt-2 pb-5">
        <v-card-title
          class="subtitle-1 pt-5 mb-1 user-profile-heading"
          style="font-weight: bold"
          >Document Status</v-card-title
        >
        <v-divider></v-divider>
        <v-layout row wrap mt-4 ml-0>
          <v-flex xs4>
            <v-card class="mr-3 ml-3" height="100%">
              <v-card-title
                class="font-weight-medium"
                style="font-family: Raleway; font-size: 15px"
                >FnF Status</v-card-title
              >
              <v-card-text>
                <timeline
                  :status="DocumentStatus.FIRSTMONTHSALARY"
                  :code="95"
                  :userid="this.user.employeeId"
                  :showLoader="progress"
                />
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="mr-3 ml-3" height="100%">
              <v-card-title
                class="font-weight-medium"
                style="font-family: Raleway; font-size: 15px"
                >Form16 Status</v-card-title
              >
              <v-card-text>
                <timeline
                  :status="DocumentStatus.FORM16"
                  :code="95"
                  :userid="this.user.employeeId"
                  :showLoader="progress"
                />
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="mr-3 ml-3" style="margin-left: 20px" height="100%">
              <v-card-title
                class="font-weight-medium"
                style="font-family: Raleway; font-size: 15px"
                >Salary Slip Status</v-card-title
              >
              <v-card-text>
                <timeline
                  :status="DocumentStatus.THIRDMONTHSALARY"
                  :code="96"
                  :userid="this.user.employeeId"
                  :showLoader="progress"
                />
              </v-card-text>
            </v-card>
          </v-flex> -->
        <!-- </v-layout>
      </v-card>
    </v-flex> -->
  </v-layout>
</template>
<script>
import timeline from "@/components/material/Timeline.vue";
import updateContact from "@/components/core/updatecontactDialog.vue";
import updateAvatar from "@/components/core/updateAvatarDialog.vue";
import AddEditlinkedInlink from "@/views/AddEditLinkedInLink";
import moment from "moment";
import { addTokenToPayload, getAlumniId } from "@/utils/utils";

export default {
  components: {
    timeline,
    updateContact,
    AddEditlinkedInlink,
    updateAvatar,
  },
  data() {
    return {
      select: "",
      showskill: true,
      office: true,
      read: false,
      status: "Not Available",
      status2: false,
      dialog: false,
      SKILL: "",
      skilled: [],
      skills: [],
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
        GENDER: "",
      },
      progress: true,
      userskills: [],
      filteredArray: [],
      linkedInlinkProfileLink: "",
      showlinkedInlinkInput: false,
    };
  },
  beforeMount() {
    this.getAlumniData();
    this.initializeUserData();
  },
  watch: {
    userData() {
      this.initializeUserData();
    },
  },
  mounted() {
    this.getStatus();
  },
  computed: {
    // userskills() {
    //   return this.user.skills;
    // },
    userData() {
      return this.$store.getters["userModule/getUserData"];
    },

    DocumentStatus: {
      get() {
        return this.$store.getters["userModule/getStatusData"];
      },
      set(data) {
        this.$store.commit("userModule/setStatusData", this.data);
      },
    },
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
    // },
  },

  methods: {
    saveProfileLink(data) {
      let datam = {
        payload: {
          USERID: this.user.employeeId,
          LINKEDIN: data,
        },
      };
      this.$store.dispatch("userModule/updateData", datam).then((response) => {
        if (response.data.status == 200) {
          this.$store.commit("showSnackbar", {
            message: "Profile link updated successfully",
            color: "success",
            heading: "Success",
            duration: 3000,
          });
          this.$store.commit("userModule/updatelinkedinData", data);
          //this.user.linkedInlinkProfileLink = data;
        }
      });
    },
    recommendedskill() {
      let tempskill = JSON.parse(JSON.stringify(this.userskills));
      this.filteredArray = this.skilled.filter(function (x) {
        return tempskill.indexOf(x) < 0;
      });
      console.log(this.filteredArray);
    },
    deleteskill(data,i) {
       let tempskill = JSON.parse(JSON.stringify(this.userskills));
        
         tempskill.splice(i, 1);
     // let index = data;
      // this.user.skills.splice(data, 1);
      let datam = {
        payload: {
          USER_ID: this.user.employeeId,
          ID: data.ID,
        }
      };
      console.log(data);
       let vm = this;
      this.$store.dispatch("userModule/deleteSkill", datam).then((response) => {
        if (response.status == 200) {
          // this.user.skills.splice(index, 1);
          this.$store.commit("showSnackbar", {
            message: "SKILL deleted successfully",
            color: "success",
            heading: "Success",
            duration: 3000,
          });
          vm.userskills = tempskill;
         
        }

        this.SKILL = "";
      });
    },

    addskill() { 
       let vm = this;   
          let data = {
            payload: {
              USERID: this.user.employeeId,
              SKILL: this.SKILL,
            },
          };
        this.$store.dispatch("userModule/addSkill", data).then((response) => {
        if (response.status == 200) {
          vm.showskill=true
           vm.userskills.push(response.result)
          this.$store.commit("showSnackbar", {
            message: "Skill updated successfully",
            color: "success",
            heading: "Success",
            duration: 3000,
          });
         
          //this.user.linkedInlinkProfileLink = data;
        }
      });

    },
    initializeUserData() {
      this.user.position = this.userData.DESIGNATION_JOB_INFORMATION;
      this.user.employeeId = this.userData.USER_ID;
      this.user.managerid = this.userData.MANAGER_JOB_INFORMATION;
      this.user.GENDER = this.userData.GENDER;
      this.user.DOB = moment
        .unix(this.userData.DATE_OF_BIRTH / 1000)
        .format("LL");

      this.user.relieving = moment
        .unix(this.userData.date_of_relieving / 1000)
        .format("LL");
      // new Date(this.userData.relieving_date).getDate() +
      // "/" +
      // new Date(this.userData.relieving_date).getMonth() +
      // "/" +
      // new Date(this.userData.relieving_date).getFullYear();

      this.user.lastworking = moment
        .unix(this.userData.LAST_WORKING_DAY_AS_PER_NOTICE_PERIOD / 1000)
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
      //  var date = new Date(this.userData.DATE_OF_RESIGNATION*1000);

      this.user.resignation = moment
        .unix(this.userData.DATE_OF_RESIGNATION / 1000)
        .format("LL");
      // new Date(this.userData.DATE_OF_RESIGNATION).getDate() +
      // "/" +
      // new Date(this.userData.DATE_OF_RESIGNATION).getMonth() +
      // "/" +
      // new Date(this.userData.DATE_OF_RESIGNATION).getFullYear();

      this.user.firstname = this.userData.FIRST_NAME_PERSONAL_INFORMATION;
      this.user.lastname = this.userData.LAST_NAME_PERSONAL_INFORMATION;
      this.user.nationality = this.userData.NATIONALITY_PERSONAL_INFORMATION;
      this.user.city = this.userData.CITY_ADDRESSES;
      this.user.email = this.userData.PERSONAL_EMAIL_ID;
      this.user.mobile = this.userData.PHONE_NUMBER_PHONE_INFORMATION;
      this.userskills = this.userData.SKILL;
      this.user.LINKEDIN = this.userData.LINKEDIN;
      this.user.PROFILEIMAGE = this.userData.PROFILEIMAGE;
      this.user.state = this.userData.STATE;
      this.user.country = this.userData.COUNTRY;
    },
    getAlumniData() {
      console.log(getAlumniId());
      let data = {
        payload: {
          userid: getAlumniId(),
        },
      };
      this.$store.dispatch("userModule/getAlumniById", data);
    },
    closeContactDialog() {
      this.$store.commit("userModule/closeContactDialog");
    },
    openContactDialog() {
      let contactData = {
        phone: this.user.mobile,
        email: this.user.email,
        city: this.user.city,
        address: this.user.address,
        state: this.user.state,
      };
      this.$store.commit("userModule/showContactDialog", contactData);
    },

    openAvatarDialog() {
      let AvatarData = {
        profile: this.user.PROFILEIMAGE,
        userid: this.user.employeeId,
      };
      this.$store.commit("userModule/showAvatarDialog", AvatarData);
    },

    showskillinput() {
      this.showskill = false;
    },
    getStatus() {
      let data = {
        payload: {
          userid: getAlumniId(),
        },
      };
      this.$store.dispatch("userModule/getStatus", data).then((response) => {
        if (response.data.status == 400) {
          this.progress = true;
        } else {
          this.progress = false;
        }
      });
    },
    setoffice() {
      this.office = true;
    },
    resetoffice() {
      this.office = false;
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
/* 
.img:hover {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
} */

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