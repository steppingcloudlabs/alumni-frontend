<template>
  <v-app id="core-login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12" color="#282828" dark>
              <v-toolbar>
                <v-toolbar-title class="text-center" style="color:white">Forgot Password</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form ref="forgot">
                  <v-text-field
                    label="Email"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-row>
                  <v-flex xs2></v-flex>
                  <v-flex xs6>
                    <v-btn block center style="color:white" @click="resetPassword">Reset Password</v-btn>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text class="text-center">
                      Or
                      <router-link to="/login" style="color:#66FCF1">
                        <v-icon style="color:white">person</v-icon>Login
                      </router-link>
                    </v-card-text>
                  </v-flex>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    resetPassword() {
      if (this.$refs.forgot.validate()) {
        this.$store.commit("showProgressBar", {});
        let data = {
          payload: {
            email: this.email,
            url: "sc-alumni.s3.ap-south-1.amazonaws.com"
          }
        };
        this.$store
          .dispatch("userModule/forgotPassword", data)
          .then(response => {
            if (
              response.data.status == 200 &&
              response.data.result == "Reset Token sent to your email"
            ) {
              this.$store.commit("closeProgressBar", {});
              this.$store.commit("showSnackbar", {
                color: "green",
                duration: 1000,
                message: "Reset link send to your registered Email",
                heading: "Success"
              });
              this.$router.push({ path: "/resetpassword" });
            } else if (
              response.data.status == 400 &&
              response.data.result == "user not found"
            ) {
              this.$store.commit("closeProgressBar", {});
              this.$store.commit("showSnackbar", {
                color: "error",
                duration: 1000,
                message: "Invalid Email ID.Try again",
                heading: "Error"
              });
              this.email = null;
            }
          })
          .catch(error => {
            this.$store.commit("closeProgressBar", {});
            this.$store.commit("showNetworkError");
          });
      }
    }

    // login() {
    //   this.$store
    //     .dispatch("login", { email: this.username, password: this.password })
    //     .then(response => {
    //       if (
    //         response &&
    //         response.status &&
    //         response.status == "Login Successful"
    //       ) {
    //         this.$router.push({ path: "/profile" });
    //       }
    //     });
    // }
  }
};
</script>
<style >
a {
  text-decoration: none;
}
.v-card {
  font-size: 10px;
  font-style: inherit;
}
</style>

