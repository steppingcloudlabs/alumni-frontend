<template>
  <v-layout row wrap>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">Upload Document</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="10">
                <v-file-input
                  label="Upload Form16"
                 
                  accept="application/pdf"
                  multiple
                  shaped
                  outlined
                  prepend-icon="mdi-paperclip"
                  @change="getBase64Form"
                >
                  <template v-slot:selection="{ text }">
                    <v-chip small label color="primary">{{ text }}</v-chip>
                  </template>
                </v-file-input>
              </v-col>
              <v-col cols="12" md="2">
                <v-icon style="margin-top: 28px" @click="saveDialogForm()"
                  >fas fa-upload</v-icon
                >
              </v-col>
              <v-col cols="12" md="10">
                <v-file-input
                  shaped
                  outlined
                  accept="application/pdf"
                 
                  label="Upload 1st Salary Slip"
                  multiple
                  prepend-icon="mdi-paperclip"
                  @change="getBase64Salary1st"
                >
                  <template v-slot:selection="{ text }">
                    <v-chip small label color="primary">{{ text }}</v-chip>
                  </template>
                </v-file-input>
              </v-col>
              <v-col cols="12" md="2">
                <v-icon
                  style="margin-top: 28px"
                  @click="
                    saveDialogSalary({
                      stream: salarySlipBase641st,
                      code: 'firstmonthsalary',
                    })
                  "
                  >fas fa-upload</v-icon
                >
              </v-col>
              <v-col cols="12" md="10">
                <v-file-input
                  shaped
                  outlined
                  accept="application/pdf"
                  label="Upload 2nd Salary Slip"
                 
                  multiple
                  prepend-icon="mdi-paperclip"
                  @change="getBase64Salary2nd"
                >
                  <template v-slot:selection="{ text }">
                    <v-chip small label color="primary">{{ text }}</v-chip>
                  </template>
                </v-file-input>
              </v-col>
              <v-col cols="12" md="2">
                <v-icon
                  style="margin-top: 28px"
                  @click="
                    saveDialogSalary({
                      stream: salarySlipBase642nd,
                      code: 'secondmonthsalary',
                    })
                  "
                  >fas fa-upload</v-icon
                >
              </v-col>
              <v-col cols="12" md="10">
                <v-file-input
                  shaped
                  outlined
                  accept="application/pdf"
                  label="Upload 3rd Salary Slip "
                 
                  multiple
                  prepend-icon="mdi-paperclip"
                  @change="getBase64Salary3rd"
                >
                  <template v-slot:selection="{ text }">
                    <v-chip small label color="primary">{{ text }}</v-chip>
                  </template>
                </v-file-input>
              </v-col>
              <v-col cols="12" md="2">
                <v-icon
                  style="margin-top: 28px"
                  @click="
                    saveDialogSalary({
                      stream: salarySlipBase643rd,
                      code: 'thirdmonthsalary',
                    })
                  "
                  >fas fa-upload</v-icon
                >
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
          <!-- <v-btn color="blue darken-1" text @click="saveDialog">Save</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      salaryupload: true,
      files: "",
      salarySlipBase641st: "",
      salarySlipBase642nd: "",
      salarySlipBase643rd: "",
      form16Base64: "",
      // rules: [
      //   value =>
      //     !value ||
      //     value.size < 5000000 ||
      //     "File size should be less than 5 MB!"
      // ]
    };
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    empId: {
      type: String,
      default: "",
    },
  },
  methods: {
    saveDialogSalary(salaryinfo) {
      let data = {
        userid: this.empId,
      };
      let salary = {
        payload: {
          USERID: data.userid,
          FILE: salaryinfo.stream,
          DOCUMENT: salaryinfo.code,
        },
      };

      this.$store
        .dispatch("adminModule/uploadDocument", salary)
        .then((response) => {
          if (response.data.status == 200) {
            this.salaryupload = false;
            this.$store.commit("showSnackbar", {
              color: "green",
              duration: 3000,
              message: "File uploaded succesfully",
              heading: "Success",
            });
          }
        })
        .catch((error) => {
          console.log(error); //Exepection error....
          this.$store.commit("showSnackbar", {
            color: "red",
            duration: 1000,
            message: error,
            heading: "Error",
          });
        });

      console.log(data);
    },

    saveDialogForm() {
      // this.$emit("closeDocumentDialog");
      let data = {
        form16: this.form16Base64,
        userid: this.empId,
      };
      console.log(data);

      let form16 = {
        payload: {
          USERID: data.userid,
          FILE: data.form16,
          DOCUMENT: "form16",
        },
      };
      console.log(form16);

      this.$store
        .dispatch("adminModule/uploadDocument", form16)
        .then((response) => {
          if (response.data.status == 200) {
            this.$store.commit("showSnackbar", {
              color: "green",
              duration: 3000,
              message: "File uploaded succesfully",
              heading: "Success",
            });
          }
        })
        .catch((error) => {
          console.log(error); //Exepection error....
          this.$store.commit("showSnackbar", {
            color: "red",
            duration: 1000,
            message: error,
            heading: "Error",
          });
        });

      console.log(data);
    },

    closeDialog() {
      this.$emit("closeDocumentDialog");
    },
    getBase64Salary1st(file) {
      console.log(file[0]);
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        console.log(reader.result);
        var str = reader.result.substring(reader.result.indexOf(",") + 1);
        this.salarySlipBase641st = str;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    getBase64Salary2nd(file) {
      console.log(file[0]);
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        console.log(reader.result);
        var str = reader.result.substring(reader.result.indexOf(",") + 1);
        this.salarySlipBase642nd = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    getBase64Salary3rd(file) {
      console.log(file[0]);
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        console.log(reader.result);
        var str = reader.result.substring(reader.result.indexOf(",") + 1);
        this.salarySlipBase643rd = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    getBase64Form(file) {
      console.log(file[0]);
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        console.log(reader.result);
        var str = reader.result.substring(reader.result.indexOf(",") + 1);
        this.form16Base64 = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },

    // fileInputSalarySlip(files) {
    //   // const pdf2base64 = require("pdf-to-base64");
    //   // pdf2base64(files)
    //   //   .then(response => {
    //   //     console.log(response); //cGF0aC90by9maWxlLmpwZw==
    //   //     this.salarySlipBase64 = response;
    //   //   })
    //   //   .catch(error => {
    //   //     console.log(error); //Exepection error....
    //   //     this.$store.commit("showSnackbar", {
    //   //       color: "red",
    //   //       duration: 1000,
    //   //       message: error,
    //   //       heading: "Error"
    //   //     });
    //   //   });
    //   console.log(files);
    //   getBase64(files);
    // },

    // fileInputForm16(files) {
    //   const pdf2base64 = require("pdf-to-base64");
    //   console.log(files);
    //   pdf2base64(files)
    //     .then(response => {
    //       console.log(response); //cGF0aC90by9maWxlLmpwZw==
    //       this.form16Base64 = response;
    //     })
    //     .catch(error => {
    //       console.log(error); //Exepection error....
    //       this.$store.commit("showSnackbar", {
    //         color: "red",
    //         duration: 1000,
    //         message: error,
    //         heading: "Error"
    //       });
    //     });
    //   console.log(files);
    // }
  },
};
</script>