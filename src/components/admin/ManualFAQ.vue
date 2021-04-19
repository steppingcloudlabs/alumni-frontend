<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="faq.QUESTION"
        prepend-icon="mdi-comment-question-outline"
        label="Question"
        shaped
        outlined
        required
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="faq.ANSWER"
        prepend-icon="mdi-comment-check-outline"
        label="Answer"
        required
        shaped
        outlined
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="9"></v-col>
    <v-col cols="12" md="3">
      <!-- <v-btn color="primary" text > Close</v-btn> -->
      <v-flex xs6></v-flex>
      <v-btn color="primary" text @click="saveDialog">Save</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      //   faq: {
      //     id: "",
      //     question: "",
      //     answer: ""
      //   }
    };
  },
  computed: {
    faq: {
      get() {
        return this.$store.getters["adminModule/getFaqDialogData"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowFaqDialogData", data);
      },
    },
  },
  methods: {
    saveDialog() {
      let faqData = JSON.parse(JSON.stringify(this.faq));
      // this.$store.commit("adminModule/showEventsProgress", {});
      this.$store.commit("adminModule/closeFaqDialog");
      let data = {
        payload: {
          QUESTION: faqData.QUESTION,
          ANSWER: faqData.ANSWER,
          ID: faqData.ID ? faqData.ID : null,
        },
      };
      this.$store.dispatch("adminModule/addFaq", data).then((response) => {
        if(response.data.status==200)
        {
           this.$store.commit(
          "adminModule/addFaqToList",
          JSON.parse(JSON.stringify(faqData))
        );
        this.$store.commit("showSnackbar", {
          message: "Faq Added successfully",
          color: "success",
          heading: "Success",
          duration: 3000,
        })
        }
        else
        {
           this.$store.commit("showSnackbar", {
          message: "Error Occured",
          color: "red",
          heading: "Error",
          duration: 3000,
        })
        }
        }).catch((error) => {
         
          console.log(error); //Exepection error....
          this.$store.commit("showSnackbar", {
            color: "red",
            duration: 1000,
            message: error,
            heading: "Error",
          });
        });;

        
       
        // this.$store.commit("adminModule/closeEventsProgress", {});
     
    },
  },
};
</script>