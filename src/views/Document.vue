<template>
  <v-container>
    <v-img height="250px" src="@/assets/document_bg.jpg">
      <!-- <core-app-bar></core-app-bar> -->
    </v-img>
    <br />
    <br />
    <v-row>
      <v-flex xs1></v-flex>
      <v-flex xs4>
        <v-card color="#5097DD" dark>
          <v-card-text class="white--text">
            <div class="headline mb-2">FORM 16 Available now</div>You can download your form 16 here.
          </v-card-text>

          <v-card-actions>
            <v-btn text @click="download(95)">Download Now</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs2></v-flex>
      <v-flex xs4>
        <v-card color="#5097DD" dark>
          <v-card-text class="white--text">
            <div class="headline mb-2">Pay Slips Available now</div>You can download your Pay Slips here.
          </v-card-text>

          <v-card-actions>
            <v-btn text @click="download(96)">PaySlip1</v-btn>
            <v-btn text @click="download(97)">PaySlip2</v-btn>
            <v-btn text @click="download(98)">PaySlip3</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs1></v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar")
  },
  data() {
    return {
      // user: {
      //   userid: ""
      // }
    };
  },
  // beforeMount() {
  //   this.initializeUserId();
  // },
  methods: {
    download(data) {
      let body = {
        userid: this.userData,
        // code:data,
        filename: data
      };
      console.log(body);

      this.$store
        .dispatch("userModule/downloadDocument", body)
        .then(response => {
          if (response.data.status == 200) {
            this.$store.commit("showSnackbar", {
              color: "green",
              duration: 3000,
              message: "File downloaded succesfully",
              heading: "Success"
            });
          }
        })
        .catch(error => {
          console.log(error); //Exepection error....
          this.$store.commit("showSnackbar", {
            color: "red",
            duration: 1000,
            message: error,
            heading: "Error"
          });
        });
    }
    // initializeUserId() {
    //   this.user.userid = this.userData.user_id;
    // }
  },
  computed: {
    userData() {
      return this.$store.getters["userModule/getUserData"]
        ? this.$store.getters["userModule/getUserData"].user_id
        : null;
    }
  }
  // watch: {
  //   user() {
  //     this.initializeUserId();
  //   }
  // }
};
</script>
