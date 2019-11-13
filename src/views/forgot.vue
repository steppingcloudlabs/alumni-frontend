<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12" color="#282828" dark>
              <v-toolbar>
                <v-toolbar-title class="text-center" style="color:#66FCF1">Forgot Password</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-row>
                  <v-flex xs2></v-flex>
                  <v-flex xs6>
                    <v-btn block center style="color:#66FCF1">Reset Password</v-btn>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text class="text-center">
                      Or
                      <router-link to="/signin" style="color:#66FCF1">
                        <v-icon style="color:#66FCF1">person</v-icon>Login
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
      username: null,
      password: null
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", { email: this.username, password: this.password })
        .then(response => {
          if (
            response &&
            response.status &&
            response.status == "Login Successful"
          ) {
            this.$router.push({ path: "/profile" });
          }
        });
    }
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

