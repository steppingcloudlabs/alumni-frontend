<template>
  <v-layout row wrap class="ma-0">
    <v-flex xs12>
      <v-toolbar class="mb-5">
        <v-toolbar-title class="ml-5">FAQs</v-toolbar-title>
        <div class="flex-grow-1"></div>
      </v-toolbar>
      <v-row justify="center">
        <v-expansion-panels popout class="mr-5">
            
          <v-expansion-panel v-for="(item,i) in getFaqList" :key="i">
            <v-expansion-panel-header
              v-if="questionPresent(item.question)"
              style="font-weight:bold"
            >Question:{{item.question}}{{questionMark}}</v-expansion-panel-header>
            <v-expansion-panel-header v-else style="font-weight:bold">Question.{{item.question}}</v-expansion-panel-header>

            <v-expansion-panel-content style="font-size:15px">
              <span style="font-weight:bold">Answer:</span>
              {{item.answer}}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <br />
      <br />
      <v-row>
        <v-spacer></v-spacer>
        <v-btn @click="dialog=true" large absolute dark fab float right color="blue">
          <v-icon>mdi-wechat</v-icon>
        </v-btn>
      </v-row>
    </v-flex>
    <v-flex xs12>
      <Contact :dialog="dialog" :Showemail="emailDailog" @closeAskHrDialog="closeAskHrDialog" />
    </v-flex>
  </v-layout>
</template>
<script>
import Contact from "@/components/core/contactHR";
import { addTokenToPayload, getAlumniId } from "@/utils/utils";

export default {
  name: "UserFAQList",
  components: {
    Contact
  },
  methods: {
    getAlumniData() {
      let data = {
        payload: {
          userid: getAlumniId()
        }
      };
      this.$store.dispatch("userModule/getAlumniById", data);
    },
    closeAskHrDialog() {
      this.dialog = false;
    },
    questionPresent(data) {
      if (data.endsWith("?") == false) {
        return true;
      } else {
        return false;
      }
    }
  },
  beforeMount() {
    this.$store.commit("showProgressBar", {});
    this.getAlumniData(),
      this.$store
        .dispatch("adminModule/getAllFaq", { payload: {} })
        .then(response => {
          this.$store.commit("closeProgressBar", {});
        });
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

  data() {
    return {
      emailDailog: false,
      dialog: false,
      questionMark: "?",
      space: "  "
    };
  }
};
</script>