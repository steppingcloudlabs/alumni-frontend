<template>
  <v-card height="100%" class="pb-5">
    <v-layout>
      <v-flex xs4>
        <div class="py-1">
          <v-list-item-avatar
            tile
            size="180"
            style="margin-top: 60px;
                 margin-left: 60px;"
          >
            <v-img src="@/assets/avatar/download.jpg"></v-img>
          </v-list-item-avatar>
          <v-divider></v-divider>
          <v-card-title class="subtitle-2 py-1" style="font-weight: bold;">Basic Information</v-card-title>
          <v-layout>
            <v-flex xs5>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">Date Of Birth:</v-card-text>
            </v-flex>
            <v-flex xs7>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">{{user.DOB}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">Gender:</v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">{{user.gender}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">Nationality:</v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-card-text
                class="body-2 py-1"
                style="margin-top:2px !important;"
              >{{user.nationality}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-card-title class="subtitle-2" style="font-weight: bold;">
            <!-- Skills -->
            <v-text-field
              v-model="skill"
              label="Skills"
              class="elevation-0"
              single-line
              hide-details
              append-icon="add"
              @click:append="addSkill"
              @keyup.enter.native="addSkill()"
            ></v-text-field>
            <!-- <v-btn small color="primary">Add Skills</v-btn> -->
          </v-card-title>
          <v-card-text v-for="(item, i) in skills" :key="i" class="body-2 py-1 pb-2">
            <span>{{item}}</span>
            <span style="float: right">
              <v-icon small @click="deleteSkill(i)">mdi-close-circle-outline</v-icon>
            </span>
          </v-card-text>
        </div>
      </v-flex>
      <v-flex xs8 pl-5 mt-5>
        <div style="padding-bottom: 50px !important;">
          <v-list-item-title class="headline mb-1 ml-4">
            {{user.firstname}} {{user.lastname}}
            <v-icon class="ml-2 mr-2" small>mdi-map-marker</v-icon>
            <span style="font-size:15px">{{user.nationality}}</span>
          </v-list-item-title>
          <v-flex xs7>
            <v-card-title class="subtitle-2 py-1" style="font-weight: bold;">Company Information</v-card-title>
          </v-flex>
          <v-layout>
            <v-flex xs4>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">EmployeeId:</v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-card-text
                class="body-2 py-1"
                style="margin-top:2px !important;"
              >{{user.employeeId}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4>
              <v-card-text
                class="body-2 py-1"
                style="margin-top:2px !important;"
              >Previous Designation:</v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">{{user.position}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">Resignation Date:</v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-card-text
                class="body-2 py-1"
                style="margin-top:2px !important;"
              >{{user.resignation}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">Relieving Date:</v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">{{user.relieving}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">Manager:</v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">{{user.managerid}}</v-card-text>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>
          <v-card-title class="subtitle-2" style="font-weight: bold;">
            Contact Information
            <v-spacer></v-spacer>
            <v-btn small color="primary" @click="openContactDialog">Update Contact</v-btn>
          </v-card-title>
          <v-layout>
            <v-flex xs4>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">Phone No:</v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-card-text
                class="body-2 py-1"
                style="margin-top:2px !important; color: darkblue;"
              >{{user.mobile}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">Email:</v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-card-text
                class="body-2 py-1"
                style="margin-top:2px !important;color: darkblue;"
              >{{user.email}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">Address:</v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="body-2 py-1" style="margin-top:2px !important;">{{user.city}}</v-card-text>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
    <updateContact></updateContact>
  </v-card>
</template>

<script>
import updateContact from "@/components/core/updatecontactDialog.vue";
export default {
  components: {
    updateContact
  },
  data() {
    return {
      skill: "",
      skills: ["hello", "testing"],
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
      }
    };
  },
  beforeMount() {
    this.initializeUserData();
  },
  watch: {
    userData() {
      this.initializeUserData();
    }
  },
  methods: {
    deleteSkill(data) {
      this.skills.splice(data, 1);
    },
    addSkill() {
      let skillExists = this.skills.filter(item => {
        if (item.toLowerCase() == this.skill.toLowerCase()) {
          return true;
        }
        return false;
      });
      if (skillExists.length < 1) {
        let data = {
          user_id: this.user.employeeId,
          skill: this.skill
        };

        console.log(data);
        this.$store.dispatch("userModule/updateData", data).then(response => {
          if (response.data.status == 200) {
            this.skills.push(this.skill);
            this.$store.commit("showSnackbar", {
              message: "COntact Updated successfully",
              color: "success",
              heading: "Success",
              duration: 3000
            });
          }

          this.skill = "";
        });
      }
    },
    initializeUserData() {
      this.user.position = this.userData.designation_job_information;
      this.user.employeeId = this.userData.user_id;
      this.user.managerid = this.userData.manager_job_information;
      this.user.relieving =
        new Date(this.userData.relieving_date).getDate() +
        "/" +
        new Date(this.userData.relieving_date).getMonth() +
        "/" +
        new Date(this.userData.relieving_date).getFullYear();

      this.user.lastworking =
        new Date(
          this.userData.last_working_day_as_per_notice_period
        ).getDate() +
        "/" +
        new Date(
          this.userData.last_working_day_as_per_notice_period
        ).getMonth() +
        "/" +
        new Date(
          this.userData.last_working_day_as_per_notice_period
        ).getFullYear();

      this.user.resignation =
        new Date(this.userData.date_of_resignation).getDate() +
        "/" +
        new Date(this.userData.date_of_resignation).getMonth() +
        "/" +
        new Date(this.userData.date_of_resignation).getFullYear();

      this.user.firstname = this.userData.first_name_personal_information;
      this.user.lastname = this.userData.last_name_personal_information;
      this.user.nationality = this.userData.nationality_personal_information;
      this.user.city = this.userData.city_addresses;
      this.user.email = this.userData.personal_email_id;
      this.user.mobile = this.userData.phone_number_phone_information;
    },
    closeContactDialog() {
      this.$store.commit("userModule/closeContactDialog");
    },
    openContactDialog() {
      let contactData = {
        phone: this.user.mobile,
        email: this.user.email,
        address: this.user.city
      };
      this.$store.commit("userModule/showContactDialog", contactData);
    }
  },
  computed: {
    userData() {
      return this.$store.getters["userModule/getUserData"];
    }
  }
};
</script>
<style>
.subtitle-2 {
  font-family: "Raleway", sans-serif;
  font-weight: bold;
}
.body-2 {
  font-family: "Lato", sans-serif;
  font-size: larger;
}
</style>