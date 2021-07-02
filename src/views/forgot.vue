<template>
  <v-container class="fill-height login" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" color="info" dark style="background: rgb(0, 0, 0, .5);">
          <v-toolbar style="background: rgb(0, 0, 0, .5)">
            <v-toolbar-title class="text-center" color="secondary" >Forgot Password</v-toolbar-title>
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
            <v-row class="ml-2">
              <v-flex xs12>
                <v-btn
                  block
                  center
                  outlined
                  color="secondary"
                  style="background: rgb(0, 0, 0, 0);"
                  @click="resetPassword"
                >Reset Password</v-btn>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="text-center">Or</v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="text-center pt-0">
                  <router-link to="/login" color="accent">
                    <v-icon color="secondary" class="mr-1">person</v-icon>Login
                  </router-link>
                </v-card-text>
              </v-flex>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      if (this.$refs.forgot.validate()) {
        this.$store.commit("showProgressBar", {});
        let data = {
          payload: {
            EMAIL: this.email
          }
        };
        this.$store
          .dispatch("userModule/forgotPassword", data)
          .then(response => {
            if (
              response.data.status == 200 &&
              response.data.result == "tokensent"
            ) {
              this.$store.commit("closeProgressBar", {});
              this.$store.commit("showSnackbar", {
                color: success,
                duration: 4000,
                message: "Reset link send to your registered Email",
                heading: "Success"
              });
              this.$router.push({ path: "/login" });
            } else if (
              response.data.status == 400 &&
              response.data.result == "user not found"
            ) {
              this.$store.commit("closeProgressBar", {});
              this.$store.commit("showSnackbar", {
                color: error,
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

