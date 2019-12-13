<template>
  <div class="mr-3 mb-3">
    <div v-if="!showLoader">
      <div v-if="this.status=='Available'">
        <v-alert type="success" dense text>Ready To download</v-alert>
        <p class="text-right">
          <span v-if="code!=96" @click="download({payload:{userid,filename:code}})">
            <a style="color:green">Download</a>
          </span>
        </p>
        <p class="text-center">
          <span class="ml-4 mr-4" v-if="code==96" @click="download({payload:{userid,filename:code}})">
            <a style="color:green">Payslip1</a>
          </span>
          <span class="ml-4 mr-4" v-if="code==96" @click="download({payload:{userid,filename:97}})">
            <a style="color:green">PaySlip2</a>
          </span>
          <span class="ml-4 mr-4" v-if="code==96" @click="download({payload:{userid,filename:98}})">
            <a style="color:green">PaySlip3</a>
          </span>
        </p>
      </div>
      <v-alert type="warning" dense text v-else>Pending From Company</v-alert>
    </div>
    <div v-else>
      <p class="text-center">
        <v-progress-circular :size="30" :width="4" indeterminate color="green"></v-progress-circular>
      </p>
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
    download(data) {
      // let body = {
      //   userid: this.userid,
      //   // code:data,
      //   filename: this.code
      // };
      // console.log(body);

      this.$store
        .dispatch("userModule/downloadDocument", data)
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