<template>
  <div class="fill-height">
    <v-layout row wrap>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12" style="background: rgb(0, 0, 0, .5); ">
            <v-toolbar flat outlined="white" style="background: rgb(0, 0, 0, .5)">
              <v-toolbar-title class="text-center" style="color:white">Change Password</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text>
              <v-form ref="passwordChange" v-model="valid" lazy-validation>
                <v-text-field
                  id="password"
                  label="New Password"
                  name="password"
                  prepend-icon="lock"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  @click:append="show1 = !show1"
                  v-model="password"
                  :rules="passwordRules"
                  dark
                ></v-text-field>
                <v-text-field
                  label="Confirm Password"
                  name="cnfpassword"
                  prepend-icon="person"
                  type="password"
                  v-model="cnfpassword"
                  dark
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                outlined
                v-on:
                style="background: rgb(0, 0, 0, 0);color:white"
                @click="savePassword"
              >Change password</v-btn>
              <!-- <v-btn block outlined v-on: style="background: rgb(0, 0, 0, 0);color:white">Cancel</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
import md5 from "crypto-js/md5";
import { constants } from "crypto";

export default {
  data() {
    return {
      show1: false,
      valid: true,
      cnfpassword:"",
      password:"",

      passwordRules: [
        v => !!v || "Password is required",
         v =>/.(?=.*[A-Z]*)/.test(v) ||
          "Password must contain one uppercase letter",
        v=>/.(?=.*[a-z]*)/.test(v)|| "Password must contain one Lowercase letter",
       v=>/.(?=.*\d*)/.test(v)|| "Password must contain one Number letter",
        
        v => v.length > 6 || "Password must be greater than 6 characters"
      ]
    };
  },

  computed: {
    test: {
      get() {
        return this.$store.getters["userModule/getTest"];
      },
      set(data) {
        this.$store.commit("userModule/setTest", data);
      }
    }
  },
  methods: {
    savePassword() {
       if (this.password != this.Cnfpassword) {
        this.$store.commit("closeProgressBar", {});
        this.$store.commit("showSnackbar", {
          color: "red",
          duration: 1000,
          message: "Password Doesn't Match",
          heading: "Error"
        });
       }
      if (this.$refs.passwordChange.validate()) {
        this.$store.commit("showProgressBar", {});
        this.$store
      .dispatch("userModule/resetPassword", {token:this.$route.params.token ,payloadbody:{newpassword:this.password }}) .then(response =>{
        this.$store.commit("closeProgressBar", {});
        this.$router.push({ path: "/login" });
      })

      }
    }
  }
};
</script>
<style  >
a {
  text-decoration: none;
  color: #66fcf1;
}
/* 
.back {
  background-color: transparent;
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
} */
</style>
