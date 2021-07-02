<template>
  <div id="core-login"  class="login" >
    <v-layout row wrap>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5" style="margin-top:8%">
          <v-card class="elevation-12" style="background: rgb(0, 0, 0, .5); ">
            <v-toolbar flat outlined style="background: rgb(0, 0, 0, .5)">
              <v-toolbar-title class="text-center" text-color="secondary" >Change Password</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text>
              <v-form ref="passwordChange" v-model="valid" lazy-validation>
                <v-text-field
                  id=" old password"
                  label="Old Password"
                  name=" oldpassword"
                  prepend-icon="lock"
                  :type="show2 ? 'text' : 'password'"
                  :append-icon="show2 ? 'visibility' : 'visibility_off'"
                  @click:append="show2 = !show2"
                  v-model="oldpassword"
                  dark
                ></v-text-field>
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
                  name="Cnfpassword"
                  prepend-icon="person"
                  type="password"
                 :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                  v-model="Cnfpassword"
                  dark
                ></v-text-field>
                
              </v-form>
            </v-card-text>
            <v-card-actions>
              <p class="text-center">
                <v-btn
                  outlined
                  v-on:
                  style="background: rgb(0, 0, 0, 0);color:white"
                  class="mr-2"
                  @click="savePassword"
                >Change password</v-btn>
                <v-btn
                  outlined
                  v-on:
                  style="background: rgb(0, 0, 0, 0);color:white"
                  @click="reset"
                >Cancel</v-btn>
              </p>
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
      msg: [],
      show2: false,
      show1: false,
      valid: true,
      Cnfpassword: null,
      password: null,
      oldpassword: null,
       confirmPasswordRules: [v => !!v || "Password is required"],
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          /.(?=.*[A-Z]*)/.test(v) ||
          "Password must contain one uppercase letter",
        v =>
          /.(?=.*[a-z]*)/.test(v) ||
          "Password must contain one Lowercase letter",
        v => /.(?=.*\d*)/.test(v) || "Password must contain one Number letter",

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
    },
     userData() {
      return this.$store.getters["userModule/getUserData"]
        ? this.$store.getters["userModule/getUserData"]
            .PERSONAL_EMAIL_ID
        : null;
    },
    passwordConfirmationRule() {
      return () =>
        this.password === this.Cnfpassword || "Password must match";
    }

  },
  
 
  methods: {
    reset()
    {
       this.$refs.passwordChange.reset();
    },
    
    savePassword() {
       let success
      let error
      let warning
      if(this.$vuetify.theme.dark)
      {
        success=this.$vuetify.theme.themes.dark.success
        error=this.$vuetify.theme.themes.dark.error;
        warning=this.$vuetify.theme.themes.dark.warning
      }
      else
      {
        success=this.$vuetify.theme.themes.light.success
        error=this.$vuetify.theme.themes.light.error;
        warning=this.$vuetify.theme.themes.light.warning
      }
      if (this.$refs.passwordChange.validate()) {
        this.$store.commit("showProgressBar", {});
        this.$store.dispatch("userModule/changePassword",{payload:{NEWPASSWORD:this.password,OLDPASSWORD:this.oldpassword,EMAIL:this.userData,USERTYPE:"user"}}).then(response=>{
          if(response.data.status==200)
          {
            this.$store.commit("closeProgressBar",{})
              this.$store.commit("showSnackbar", {
          color: success,
          duration: 1000,
          message: "Password Updated Sucessfully",
          heading: "Success"
        });
          }
          else
          {
             this.$store.commit("closeProgressBar",{})
              this.$store.commit("showSnackbar", {
          color: error,
          duration: 1000,
          message: response.data.result,
          heading: "Error"
        });
          }
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
