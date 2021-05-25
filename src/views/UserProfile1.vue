<template>
  <v-layout row wrap style="margin-left:-1px!important;margin-top: 15px !important">
    <v-flex xs12>
      <v-card class="pt-5">
        <v-layout row wrap ma-0>
          <v-flex xs12 sm6 md6 lg6 xl6>
             
            <div style="text-align:center" class="card">
            
                <v-img
                  
                  class="img card-img"
                  :src="user.PROFILEIMAGE?user.PROFILEIMAGE:'@/assets/avatar/download.jpg'"
                  style="
                    border-radius: 50%;
                    border: 3px solid white;
                    width: 200px;
                    max-height:200px;
                    margin:auto
                  "
                  
                >
                  <div class="card-img-overlay">
                <v-btn class="primary" @click="openInput">Upload</v-btn>
                <v-file-input  id="file" accept="image/png, image/jpeg, image/bmp" @change="openAvatarDialog" style="display: none"></v-file-input>

                  </div>  
                </v-img>
               
              
                
            </div>
              
            <div style="text-align: center">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card-text
                    class="headline py-1 displayName"
                   
                    >{{ user.firstname }} {{ user.lastname }}</v-card-text
                  >
                </v-flex>
                <v-flex xs12 class="mt-2">
                  <v-card-text
                    class="subtitle postion_header"
                    style="
                      margin-left: 0px !important;
                     
                    "
                  >
                    Worked As-
                    <span class="font-weight-bold">{{ user.position }}</span>
                  </v-card-text>
                </v-flex>
                <v-flex xs12 class="linkedinDiv">
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
          <v-flex xs12 sm6 md6 lg6 xl6>
            <div>
              <v-card-title
                class="subtitle-1 pt-0 user-profile-heading font-weight-bold"
              >
                Skills
                <v-spacer></v-spacer>
                <v-btn
                  v-if="showskill"
                  class="text-capitalize"
                  color="primary"
                  @click="showskillinput"
                  >Add New Skill</v-btn
                >
                <v-combobox
                  v-if="!showskill"
                  v-model="SKILL"
                  style="margin-top: -15px"
                  @keyup.enter.native="addskill(SKILL)"
                  @keydown.esc="showskill = true"
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
                  @click:close="deleteskill(item, i)"
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
                    >Gender</v-card-text
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
      <v-card  style="margin-top:25px!important;padding-bottom: 55px;!important">
        <v-layout row wrap class="companydata">
          <v-flex xs12  sm6 md6 lg6 xl6 pr-5>
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
                  >{{ user.lastworking }}</v-card-text
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
          <v-flex xs12  sm6 md6 lg6 xl6>
            <v-card-title
              class="subtitle-1 user-profile-heading"
              style="font-weight: bold"
            >
              Contact Information
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                class="text-capitalize contactbutton"
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
              <v-flex xs11>
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
              <v-flex xs11>
                <v-card-text
                  class="body-1 py-1 font-weight-bold"
                  style="margin-top: 8px !important"
                  >{{ user.email }}</v-card-text
                >
              </v-flex>
            </v-layout>
            <v-layout >
              <v-flex xs1>
                <v-card-text
                  class="body-1 py-1"
                  style="margin-top: 2px !important"
                >
                  <v-icon color="blue">mdi-home</v-icon>
                </v-card-text>
              </v-flex>
              <v-flex xs11>
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
      overlay: false,
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
    openInput()
    {
     var elem=document.getElementById("file")
     elem.click()
    },
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
    deleteskill(data, i) {
      let tempskill = JSON.parse(JSON.stringify(this.userskills));

      tempskill.splice(i, 1);
      // let index = data;
      // this.user.skills.splice(data, 1);
      let datam = {
        payload: {
          USER_ID: this.user.employeeId,
          ID: data.ID,
        },
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
          this.$store.commit("userModule/updateskillData", tempskill);
        }

        this.SKILL = "";
      });
    },

    addskill(item) {
      let vm = this;
      let index = this.userskills.findIndex(
        (i) => i.SKILL.toLowerCase() == item.toLowerCase()
      );
      if (index > -1) {
        this.$store.commit("showSnackbar", {
          message: "Skill Already exist",
          color: "warning",
          heading: "Warning",
          duration: 3000,
        });
        this.SKILL = "";
        this.showskill = true;
        return;
      }
      let data = {
        payload: {
          USERID: this.user.employeeId,
          SKILL: this.SKILL,
        },
      };
      this.$store.dispatch("userModule/addSkill", data).then((response) => {
        if (response.status == 200) {
          vm.showskill = true;
          vm.userskills.push(response.result);
          this.$store.commit("showSnackbar", {
            message: "Skill updated successfully",
            color: "success",
            heading: "Success",
            duration: 3000,
          });
          this.$store.commit("userModule/updateskillData", vm.userskills);
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

    openAvatarDialog(file) {
      var vm=this
      console.log(file)
       var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        var str = reader.result.substring(reader.result.indexOf(",") + 1);
        var profile = reader.result;
         let AvatarData = {
        profile: profile,
        userid: vm.user.employeeId,
      };
     vm.$store.commit("userModule/showAvatarDialog", AvatarData);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
     
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
.card-img-overlay {
  display: none;
  transition: all 0.5s;
}
.card-img-overlay button {
  margin-top: 10vh !important;
  
}
.card:hover .card-img-overlay {
  display: block;
  
}
.card:hover .card-img-overlay
{
  background-color: rgba(0,0,0,0.5) !important;
  min-height: 200px;
}
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

.displayname
{
   
     line-height: 1px;
     margin-left: 0px !important;
     color: black;
     font-family: 'Raleway', sans-serif;
     font-weight: bolder;
                  
}
.postion_header{
   line-height: 2px !important;
}
 @media screen and (max-width: 640px) {
 .displayname
{
   
     line-height: 1px;
     margin-left: 0px !important;
     color: black;
     font-family: 'Raleway', sans-serif;
     font-weight: bold;
     font-size: 15px;
                  
}
.postion_header
{
  line-height: 13px !important;
}
.contactbutton
{
  text-align: right;
}
.companydata{
  margin-left: 0px!important;
}
.linkedinDiv
{
  margin-left: -14px;
}
} 
</style>