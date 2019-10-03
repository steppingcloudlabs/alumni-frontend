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
      faq: {
        id: "",
        question: "",
        answer: ""
      }
    };
  },
  computed: {
    getFaqList: {
      get() {
        return this.$store.getters["adminModule/getFaqList"];
      },
      set(data) {
        this.$store.commit("adminModule/setFaqList", this.data);
      }
    }
  },
  methods: {
    saveDialog() {
      this.$store.commit(
        "adminModule/addNewFaqToList",
        JSON.parse(JSON.stringify(this.faq))
      );
      this.$store.commit("adminModule/closeFaqDialog");
    }
  }
};
</script>