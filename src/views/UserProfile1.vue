<template>
  <v-card height="100%">
    <v-layout>
      <v-flex xs4>
        <div>
          <v-list-item-avatar
            tile
            size="180"
            style="margin-top: 60px;
                 margin-left: 60px;"
          >
            <v-img src="@/assets/avatar/download.jpg"></v-img>
          </v-list-item-avatar>
          <v-divider></v-divider>
          <v-flex xs7>
            <v-card-title class="subtitle-2">Company Information</v-card-title>
          </v-flex>
          <v-layout>
            <v-flex xs4>
              <v-card-text class="body-2" style="margin-top:2px !important;">Designation:</v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-card-text class="body-2" style="margin-top:2px !important;">{{user.position}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs5>
              <v-card-text class="body-2" style="margin-top:2px !important;">Resignation Date:</v-card-text>
            </v-flex>
            <v-flex xs7>
              <v-card-text class="body-2" style="margin-top:2px !important;">{{user.lastworking}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs5>
              <v-card-text class="body-2" style="margin-top:2px !important;">Relieving Date:</v-card-text>
            </v-flex>
            <v-flex xs7>
              <v-card-text class="body-2" style="margin-top:2px !important;">{{user.relieving}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4>
              <v-card-text class="body-2" style="margin-top:2px !important;">Manager:</v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-card-text class="body-2" style="margin-top:2px !important;">{{user.managerid}}</v-card-text>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
      <v-flex xs8>
        <div>
          <v-list-item-content style="margin-top: 60px;
    margin-left: 40px;">
            <v-list-item-title class="headline mb-1">
              {{user.firstname}} {{user.lastname}}
              <v-icon class="ml-2" small>mdi-map-marker</v-icon>
              {{user.city}}
            </v-list-item-title>
            <v-list-item-subtitle
              class="mt-3"
              style="margin-left: 4px;margin-top: 10px !important;"
            >{{user.employeeId}}</v-list-item-subtitle>
            <v-layout>
              <v-flex xs4 style="margin-top: 10px;">
                <v-chip
                  style="margin-left: 2px;"
                  color="green"
                  v-for="(item, i) in skills"
                  :key="i"
                >{{item.skill}}</v-chip>
              </v-flex>
            </v-layout>
          </v-list-item-content>
          <v-divider></v-divider>
          <v-card-title class="subtitle-2">
            Contact Information
            <v-spacer></v-spacer>
            <v-btn color="green" @click="openContactDialog">Update Contact</v-btn>
          </v-card-title>
          <v-layout>
            <v-flex xs2>
              <v-card-text class="body-2" style="margin-top:2px !important;">Phone No:</v-card-text>
            </v-flex>
            <v-flex xs10>
              <v-card-text class="body-2" style="margin-top:2px !important;">{{user.mobile}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs2>
              <v-card-text class="body-2" style="margin-top:2px !important;">Email:</v-card-text>
            </v-flex>
            <v-flex xs10>
              <v-card-text class="body-2" style="margin-top:2px !important;">{{user.email}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs2>
              <v-card-text class="body-2" style="margin-top:2px !important;">Address:</v-card-text>
            </v-flex>
            <v-flex xs10>
              <v-card-text class="body-2" style="margin-top:2px !important;">{{user.city}}</v-card-text>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>
          <v-card-title class="subtitle-2">Basic Information</v-card-title>
          <v-layout>
            <v-flex xs2>
              <v-card-text class="body-2" style="margin-top:2px !important;">BirthDate:</v-card-text>
            </v-flex>
            <v-flex xs10>
              <v-card-text class="body-2" style="margin-top:2px !important;">{{user.DOB}}</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs2>
              <v-card-text class="body-2" style="margin-top:2px !important;">Nationality:</v-card-text>
            </v-flex>
            <v-flex xs10>
              <v-card-text class="body-2" style="margin-top:2px !important;">{{user.nationality}}</v-card-text>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
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
      skills: [
        {
          skill: "hello"
        },
        {
          skill: "testing"
        }
      ],
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
    user() {
      this.initializeUserData();
    }
  },
  methods: {
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