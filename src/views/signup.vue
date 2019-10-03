<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12 white--text" style="background: rgb(0, 0, 0, .5); ">
              <v-toolbar outlined="white" style="background: rgb(0, 0, 0, .5)">
                <v-toolbar-title class="text-center" style="color:white">SignUp</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <!-- <v-col>
                      <v-text-field
                        dark
                        label="Companyname"
                        name="Company"
                        prepend-icon="domain"
                        type="text"
                        v-model="Companyname"
                    ></v-text-field>
                  
                  </v-col>-->
                  <v-text-field
                    dark
                    label="EmployeeId"
                    name="EmployeeId"
                    prepend-icon="person"
                    type="text"
                    v-model="EmployeeId"
                    class="white--text"
                  ></v-text-field>
                  <v-text-field
                    dark
                    label="Email"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="email"
                    class="white--text"
                  ></v-text-field>

                  <v-text-field
                    dark
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    class="white--text"
                  ></v-text-field>
                  <v-text-field
                    dark
                    id="Cnfpassword"
                    label="Confirm Password"
                    name="Cnfpassword"
                    prepend-icon="lock"
                    type="password"
                    v-model="Cnfpassword"
                  ></v-text-field>
                  <div class="error" v-if="!$v.Cnfpassword.sameAsPassword"></div>
                  <div class="error" v-if="!$v.password.minLength">{{onblur()}}</div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  outlined
                  block
                  @click="signup"
                  class="button"
                  style="background: rgb(0, 0, 0, 0);color:white"
                >Signup</v-btn>
              </v-card-actions>
              <v-row class="text center">
                <v-card-text style="color:white">
                  <v-icon style="color:white">person</v-icon>Already have account?
                  <router-link to="/login" style="color:#66FCF1">LogIn</router-link>
                </v-card-text>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      Companyname: null,
      EmployeeId: null,
      email: null,
      Cnfpassword: null,
      password: null,
      snackbar: false,
      snackbar1: true
    };
  },
  methods: {
    signup() {
      this.$store.commit("showProgressBar", {});

      this.$store
        .dispatch("userModule/signup", {
          email: this.email,
          password: this.password,
          companyname: this.Companyname,
          userid: this.EmployeeId
        })
        .then(response => {
          if (
            response &&
            response.message &&
            response.message.token &&
            response.status == 200
          ) {
            this.$store.commit("closeProgressBar", {});
            this.$store.commit("closeProgressBar", {});
            console.log(response);
            this.$router.push({ path: "/login" });
          }
        })
        .catch(error => {
          this.$store.commit("closeProgressBar", {});
          this.$store.commit("showNetworkError", {});
        });
    },
    onblur() {
      this.$store.commit("showSnackbar", {
        color: "red",
        duration: 1000,
        message: "Password must have at least 6 letters.",
        heading: "Error"
      });
    }

    // signup() {
    //     this.$store.dispatch('signup', { 'email':this.email, 'password': this.password ,'companyname':this.Companyname,'userid':this.EmployeeId}).then((response) => {
    //       if (response && response.token) {
    //         this.$router.push({ path:'/signin' })
    //       }
    //     })
    // }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    Cnfpassword: {
      sameAsPassword: sameAs("password")
    }
  }
};
</script>
<style  >
a {
  text-decoration: none;
}
.v-card {
  font-size: 10px;
  font-style: inherit;
}
.v-content__wrap {
  background-image: url("../assets/login.jpg");
  background-size: cover;
}
</style>