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
                >
                  Worked As-
                  <span class="font-weight-bold">{{user.position}}</span>
                </p>
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
                <v-btn
                  v-if="showskill"
                  class="text-capitalize"
                  color="primary"
                  @click="showskillinput"
                >Add New Skill</v-btn>
                <v-combobox
                  v-if="!showskill"
                  v-model="skill"
                  :items="skilled"
                  append-icon="add"
                  style=" margin-top:-15px;"
                  @keyup.enter.native="addSkill()"
                  @keydown.esc="showskill=true"
                  @click:append="addSkill()"
                  label="Add Skill"
                  hide-details
                  hide-selected
                ></v-combobox>
                <!-- <v-text-field
                  v-if="!showskill"
                  v-model="skill"
                  label=" Add Skill"
                  style=" margin-top:-15px;"
                  append-icon="add"
                  single-line
                  hide-details
                  @keyup.enter.native="addSkill()"
                  @keydown.esc="showskill=true"
                  @click:append="addSkill()"
                ></v-text-field>-->
              </v-card-title>
              <v-divider></v-divider>
              <v-chip
                color="primary"
                v-for="(item, i) in userSkills"
                :key="i"
                class="body-1 mr-2 ml-2 mt-4"
                style="margin-top:10px"
                close
                @click:close="deleteSkill(i)"
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
                >{{user.position}}</v-card-text>
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
          <v-flex xs6>
            <v-card-title class="subtitle-1 user-profile-heading" style="font-weight: bold;">
              Contact Information
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                class="text-capitalize"
                @click="openContactDialog"
              >Update Contact</v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-layout>
              <v-flex xs1>
                <v-card-text class="body-1 py-1" style="margin-top:2px !important;">
                  <v-icon class="mt-1" color="blue">mdi-cellphone</v-icon>
                </v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top:8px !important; color: #181818	"
                >{{user.mobile}}</v-card-text>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs1>
                <v-card-text class="body-1 py-1" style="margin-top:2px !important;">
                  <v-icon color="blue">mdi-email</v-icon>
                </v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top:8px !important;"
                >{{user.email}}</v-card-text>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs1>
                <v-card-text class="body-1 py-1" style="margin-top:2px !important;">
                  <v-icon color="blue">mdi-home</v-icon>
                </v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top:5px !important; color: #181818"
                >{{user.city}}</v-card-text>
              </v-flex>
            </v-layout>
            <updateContact></updateContact>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card class="mt-2 pb-5">
        <v-card-title
          class="subtitle-1 pt-5 mb-1 user-profile-heading"
          style="font-weight: bold;"
        >Company Status</v-card-title>
        <v-divider></v-divider>
        <v-layout row wrap mt-4 ml-0>
          <v-flex xs4>
            <v-card class="mr-3 ml-3" height="100%">
              <v-card-title
                class="font-weight-medium"
                style="font-family:Raleway; font-size:15px;"
              >FnF Status</v-card-title>
              <v-card-text>
                <timeline
                  :status="DocumentStatus.fnfStatus"
                  :code="96"
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
                style="font-family:Raleway; font-size:15px"
              >Form16 Status</v-card-title>
              <v-card-text>
                <timeline
                  :status="DocumentStatus.form16"
                  :code="95"
                  :userid="this.user.employeeId "
                  :showLoader="progress"
                />
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="mr-3 ml-3" style="margin-left:20px" height="100%">
              <v-card-title
                class="font-weight-medium"
                style="font-family:Raleway;font-size:15px"
              >Pf Clearance Status</v-card-title>
              <v-card-text>
                <timeline
                  :status="DocumentStatus.pfTransferStatus"
                  :code="95"
                  :userid="this.user.employeeId"
                  :showLoader="progress"
                />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import timeline from "@/components/material/Timeline.vue";
import updateContact from "@/components/core/updatecontactDialog.vue";
import moment from "moment";
import { addTokenToPayload, getAlumniId } from "@/utils/utils";

export default {
  components: {
    timeline,
    updateContact
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
      skill: "",
      skilled: ["hello", "testing", "python", "ruby"],
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
        gender: ""
      },
      progress: true,
      userSkills: [],
      filteredArray: []
    };
  },
  beforeMount() {
    this.getAlumniData();
    this.initializeUserData();
  },
  watch: {
    userData() {
      this.initializeUserData();
    }
  },
  mounted() {
    this.getStatus();
  },
  computed: {
    // userSkills() {
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
      }
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
    recommendedSkill() {
      let tempSkill = JSON.parse(JSON.stringify(this.userSkills));
      this.filteredArray = this.skilled.filter(function(x) {
        return tempSkill.indexOf(x) < 0;
      });
      console.log(this.filteredArray);
    },
    deleteSkill(data) {
      let tempSkill = JSON.parse(JSON.stringify(this.userSkills));
      let vm = this;
      tempSkill.splice(data, 1);
      let index = data;
      // this.user.skills.splice(data, 1);
      let datam = {
        payload: {
          user_id: this.user.employeeId,
          skill: tempSkill
        }
      };
      console.log(data);
      this.$store.dispatch("userModule/updateData", datam).then(response => {
        if (response.data.status == 200) {
          // this.user.skills.splice(index, 1);
          this.$store.commit("showSnackbar", {
            message: "Skill deleted successfully",
            color: "success",
            heading: "Success",
            duration: 3000
          });
          this.userSkills = tempSkill;
        }

        this.skill = "";
      });
    },

    addSkill() {
      if (this.userSkills.length) {
        this.recommendedSkill();
      }

      console.log(this.skill);
      this.showskill = true;
      if (!this.skill.trim()) {
        this.showskill = true;
      } else {
        let skillExists = this.userSkills.filter(item => {
          if (item.toLowerCase() == this.skill.toLowerCase()) {
            return true;
          }
          return false;
        });
        if (skillExists.length < 1) {
          let tempSkill = JSON.parse(JSON.stringify(this.userSkills));
          tempSkill.push(this.skill);
          let data = {
            payload: {
              user_id: this.user.employeeId,
              skill: tempSkill
            }
          };
          console.log(data);
          this.$store.dispatch("userModule/updateData", data).then(response => {
            if (response.data.status == 200) {
              this.userSkills.push(this.skill);
              this.$store.commit("showSnackbar", {
                message: "Skill added successfully",
                color: "success",
                heading: "Success",
                duration: 3000
              });
            }

            this.skill = "";
          });
        }
      }
    },
    initializeUserData() {
      this.user.position = this.userData.designation_job_information;
      this.user.employeeId = this.userData.user_id;
      this.user.managerid = this.userData.manager_job_information;
      this.user.gender = this.userData.gender;
      this.user.DOB = moment
        .unix(this.userData.date_of_birth / 1000)
        .format("LL");

      this.user.relieving = moment
        .unix(this.userData.relieving_date / 1000)
        .format("LL");
      // new Date(this.userData.relieving_date).getDate() +
      // "/" +
      // new Date(this.userData.relieving_date).getMonth() +
      // "/" +
      // new Date(this.userData.relieving_date).getFullYear();

      this.user.lastworking = moment
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
      //  var date = new Date(this.userData.date_of_resignation*1000);

      this.user.resignation = moment
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
    openContactDialog() {
      let contactData = {
        phone: this.user.mobile,
        email: this.user.email,
        city: this.user.city,
        address:this.user.address,
        state:this.user.state
      };
      this.$store.commit("userModule/showContactDialog", contactData);
    },

    showskillinput() {
      this.showskill = false;
    },
    getStatus() {
      let data = {
        payload: {
          userid: getAlumniId()
        }
      };
      this.$store.dispatch("userModule/getStatus", data).then(response => {
        this.progress = false;
      });
    },
    setoffice() {
      this.office = true;
    },
    resetoffice() {
      this.office = false;
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