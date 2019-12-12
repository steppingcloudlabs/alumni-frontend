<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="faq.question"
        prepend-icon="mdi-comment-question-outline"
        label="Question"
        required
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="faq.answer"
        prepend-icon="mdi-comment-check-outline"
        label="Answer"
        required
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
      }
    }
  },
  methods: {
    saveDialog() {
      let faqData = JSON.parse(JSON.stringify(this.faq));
      // this.$store.commit("adminModule/showEventsProgress", {});
      this.$store.commit("adminModule/closeFaqDialog");
      let data = {
        payload:{
question: faqData.question,
        answer: faqData.answer,
        id: faqData._id ? faqData._id : null
        }
        
      };
      this.$store.dispatch("adminModule/addFaq", data).then(response => {
        if(data.payload.id==null)
        {
        this.$store.commit(
          "adminModule/addNewFaqToList",
          JSON.parse(JSON.stringify(faqData))
        );
        this.$store.commit("showSnackbar", {
          message: "Faq Added successfully",
          color: "success",
          heading: "Success",
          duration: 3000
        });
        }
        else{
          this.$store.dispatch("adminModule/getAllFaq",{payload:{}})
          this.$store.commit("showSnackbar", {
          message: "Faq updated successfully",
          color: "success",
          heading: "Success",
          duration: 3000
        });

        }
        // this.$store.commit("adminModule/closeEventsProgress", {});
      });
    }
  }
};
</script>