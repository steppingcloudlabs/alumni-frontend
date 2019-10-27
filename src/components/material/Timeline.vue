<template>
  <div class="mr-3 mb-3">
    <div v-if="!showLoader">
      <div v-if="this.status=='Available'">
        <v-alert type="success" dense text>Ready To download</v-alert>
        <p class="text-right">
          <span @click="download">
            <a style="color:green">Download</a>
          </span>
        </p>
      </div>
      <v-alert type="warning" dense text v-else>Pending From Company</v-alert>
    </div>
    <div v-else>
      <v-progress-circular :size="30" :width="4" indeterminate color="green"></v-progress-circular>
    </div>
  </div>
</template>

<script>
// import AOS from "aos";
// AOS.init();
export default {
  props: {
    status: {
      type: String,
      default: "Available"
    },
    code: {
      type: Number,
      default: 0
    },
    userid: {
      type: String,
      default: ""
    },
    showLoader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    download() {
      let body = {
        userid: this.userid,
        // code:data,
        filename: this.code
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
  }
};
</script>