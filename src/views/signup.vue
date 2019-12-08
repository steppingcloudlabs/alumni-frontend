<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 white--text" style="background: rgb(0, 0, 0, .5); ">
          <v-toolbar outlined="white" style="background: rgb(0, 0, 0, .5)">
            <v-toolbar-title class="text-center" style="color:white">SignUp</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-card-text>
            <v-form ref="signup" v-model="valid" lazy-validation>
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
                :rules="employeeRules"
              ></v-text-field>
              <v-text-field
                dark
                label="Email"
                name="login"
                prepend-icon="person"
                type="text"
                v-model="email"
                :rules="emailRules"
                class="white--text"
              ></v-text-field>

              <v-text-field
                dark
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                v-model="password"
                :rules="passwordRules"
                class="white--text"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                @click:append="show1 = !show1"
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
          <v-row class>
            <v-card-text style="color:white" class="text-center">
              <v-icon style="color:white; margin-right:5px">person</v-icon>Already have account?
              <router-link to="/login" style="color:#66FCF1">Login</router-link>
            </v-card-text>
            <v-card-text style="color:white" class="text-center pt-0 mb-5">
              <v-icon style="color:white; margin-right:5px">mdi-help-circle-outline</v-icon>Need Help?
              <a style="color:#66FCF1" @click="dialog=true">Contact Us</a>
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <Contact :dialog="dialog" @closeAskHrDialog="closeAskHrDialog" />
    </v-row>
  </v-container>
</template>

<script>
import Contact from "@/components/core/contactHR";
export default {
  components: {
    Contact
  },
  data() {
    return {
      show1: false,
      dialog: false,
      valid: true,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          /.(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v) ||
          "Password must contain one uppercase letter, one lowercase letter and one number",
        v => v.length > 6 || "Password must be greater than 6 characters"
      ],
      employeeRules: [v => !!v || "Employee Id is required"],

      Companyname: "",
      EmployeeId: "",
      email: "",
      Cnfpassword: "",
      password: "",
      snackbar: false,
      snackbar1: true
    };
  },
  beforeMount() {
    this.length = 6;
  },
  methods: {
    closeAskHrDialog() {
      this.dialog = false;
    },

    signup() {
      if (this.password != this.Cnfpassword) {
        this.$store.commit("closeProgressBar", {});
        this.$store.commit("showSnackbar", {
          color: "red",
          duration: 1000,
          message: "Password Doesn't Match",
          heading: "Error"
        });
      } else if (this.$refs.signup.validate()) {
        this.$store.commit("showProgressBar", {});

        this.$store
          .dispatch("userModule/signup", {
            email: this.email,
            password: this.password,
            companyname: this.Companyname,
            userid: this.EmployeeId
          })
          .then(response => {
            if (response && response.result && response.status == 200) {
              this.$store.commit("closeProgressBar", {});
              console.log(response);
              this.$router.push({ path: "/login" });
            } else if (
              response.result == "User is not an Alumni" ||
              (response.result == "UserId already Exists" &&
                response.status == 400)
            ) {
              this.$store.commit("closeProgressBar", {});
              this.$store.commit("showSnackbar", {
                color: "red",
                duration: 1000,
                message: "Employee Id doesnot Exist.",
                heading: "Error"
              });
            } else if (response.error == "email is already in use") {
              this.$store.commit("closeProgressBar", {});
              this.$store.commit("showSnackbar", {
                color: "red",
                duration: 1000,
                message: "email is already in use",
                heading: "Error"
              });
            }
          })
          .catch(error => {
            this.$store.commit("closeProgressBar", {});
            this.$store.commit("showNetworkError", {});
          });
      } else {
        this.$store.commit("showSnackbar", {
          color: "red",
          duration: 1000,
          message: "Correct Errors",
          heading: "Error"
        });
      }
    }

    // signup() {
    //     this.$store.dispatch('signup', { 'email':this.email, 'password': this.password ,'companyname':this.Companyname,'userid':this.EmployeeId}).then((response) => {
    //       if (response && response.token) {
    //         this.$router.push({ path:'/signin' })
    //       }
    //     })
    // }
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

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: white !important;
}
</style>