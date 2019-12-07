<template>
  <div id="core-login">
    <!-- <v-app id="inspire" :src="require('@/assets/login.jpg')"> -->
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12" style="background: rgb(0, 0, 0, .5); ">
              <v-toolbar flat outlined="white" style="background: rgb(0, 0, 0, .5)">
                <v-toolbar-title class="text-center" style="color:white">Login</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form ref="login" v-model="valid" lazy-validation>
                  <v-text-field
                    label="Email"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                    dark
                    :rules="emailRules"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    @click:append="show1 = !show1"
                    v-model="password"
                    :rules="passwordRules"
                    dark
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  block
                  outlined
                  v-on:
                  @click="login"
                  style="background: rgb(0, 0, 0, 0);color:white"
                >Login</v-btn>
              </v-card-actions>
              <v-card-text class="text-center">
                <router-link to="/forgotpassword" style="color:#66FCF1">Forgot Password</router-link>
              </v-card-text>
              <div class="flex-grow-1"></div>
              <v-card-text style="color:white" class="text-center">
                Not Registered?
                <router-link to="/signup" style="color:#66FCF1">SignUp</router-link>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <!-- </v-app> -->
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
      username: null,
      password: null,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  mounted() {
    console.log(md5("user").toString()),
    console.log(md5("admin").toString()),
    // console.log(this.test);
    this.test = "My New Data";
    console.log(this.test);
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
    login() {
      if (this.$refs.login.validate()) {
        this.$store.commit("showProgressBar", {});
        this.$store
          .dispatch("userModule/login", {
            email: this.username,
            password: this.password
          })
          .then(response => {
            if (
              response &&
              response.status == 200 &&
              response.usertype == "admin"
            ) {
              this.$router.push({ path: "/admin/dashboard" });
              this.$store.commit("closeProgressBar", {});
            } else if (
              response &&
              response.status == 200 &&
              response.result &&
              response.usertype == "user"
            ) {
              this.$router.push({ path: "/profile/dashboard" });
              this.$store.commit("closeProgressBar", {});
            } else if (response.result != "Login Successful") {
              this.$store.commit("closeProgressBar", {});
              this.$store.commit("showSnackbar", {
                color: "red",
                duration: 3000,
                message: response.result,
                heading: "Error"
              });
            }
          })
          .catch(error => {
            this.$store.commit("closeProgressBar", {});
            this.$store.commit("showNetworkError");
          });
      } else {
        this.$store.commit("showSnackbar", {
          color: "red",
          duration: 1000,
          message: "Correct Errors",
          heading: "Error"
        });
      }
    },
    onblur() {
      // this.$store.commit("showSnackbar", {
      //   color: "red",
      //   duration: 3000,
      //   message: "Password must have at least 6 letters.",
      //   heading: "Error"
      // });
    }
  }
};
</script>
<style  >
a {
  text-decoration: none;
  color: #66fcf1;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: white !important;
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
#core-login {
  background-image: url("../assets/login.jpg");
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
</style>

