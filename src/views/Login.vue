<template>
  <div id="core-login">
    <v-app id="inspire" class="back">
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
                  <v-form>
                    <v-text-field
                      label="Username"
                      name="login"
                      prepend-icon="person"
                      type="text"
                      v-model="username"
                      dark
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                      v-model="password"
                      dark
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <div class="error" v-if="!$v.password.minLength">{{onblur()}}</div>
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
    </v-app>
  </div>
</template>
<script>
import md5 from "crypto-js/md5";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { constants } from "crypto";

export default {
  data() {
    return {
      username: null,
      password: null
    };
  },
  mounted() {
    // console.log(md5("Rahil").toString()),
    console.log(this.test);
    this.test = "My New Data";
    console.log(this.test);
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    }
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
      this.$store.commit("showProgressBar", {});
      this.$store
        .dispatch("userModule/login", {
          email: this.username,
          password: this.password
        })
        .then(response => {
          if (
            response &&
            response.status &&
            response.status == 200 &&
            response.message &&
            response.message.Status == "Login Successful"
          ) {
            this.$router.push({ path: "/profile/user-profile" });
            this.$store.commit("closeProgressBar", {});
          } else if (
            response &&
            response.status &&
            response.status == 200 &&
            response.data &&
            response.data.Status == "User doesn't Exist"
          ) {
            this.$store.commit("closeProgressBar", {});
            this.snackbar = true;
          }
        })
        .catch(error => {
          this.$store.commit("closeProgressBar", {});
          this.$store.commit("showNetworkError");
          console("");
        });
    },
    onblur() {
      this.$store.commit("showSnackbar", {
        color: "red",
        duration: 3000,
        message: "Password must have at least 6 letters.",
        heading: "Error"
      });
    }
  }
};
</script>
<style  >
a {
  text-decoration: none;
  color: #66fcf1;
}

.back {
  background-color: #cccccc;
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.v-content__wrap {
  background-image: url("../assets/login.jpg");
  background-size: cover;
}
</style>

