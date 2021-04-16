<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="mx-auto" flat tile style="margin-top:25px!important">
        <v-toolbar color="#1A265C" class="mb-5">
          <v-toolbar-title class="ml-5 white--text" >FAQs</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-row justify="center" v-if="getFaqList.length" color="primary">
          <v-expansion-panels class="mr-5 elevation-0" accordion>
            <v-expansion-panel v-for="(item, i) in getFaqList" :key="i">
              <v-expansion-panel-header
                class="subtitle-1 font-weight-meduim"
                v-if="item.QUESTION"
                >{{ item.QUESTION }}{{ questionMark }}</v-expansion-panel-header
              >
              <v-expansion-panel-header class="subtitle-1" v-else>{{
                item.QUESTION
              }}</v-expansion-panel-header>

              <v-expansion-panel-content class="subtitle-1 p2-4">
                <span style="font-weight: bold">Answer:</span>
                {{ item.ANSWER }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        <div v-else>
          <p class="black--text text-center">
            No FAQs Available
            <v-img
              style="margin-right: auto; margin-left: auto"
              width="100"
              height="100"
              src="@/assets/waiting.gif"
            ></v-img>
          </p>
        </div>
        <br />
        <br />
        <v-row>
          <v-spacer></v-spacer>
        </v-row>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Contact from "@/components/core/contactHR";
import { addTokenToPayload, getAlumniId } from "@/utils/utils";

export default {
  name: "UserFAQList",
  components: {
    Contact,
  },
  methods: {
    getAlumniData() {
      let data = {
        payload: {
          userid: getAlumniId(),
        },
      };
      this.$store.dispatch("userModule/getAlumniById", data);
    },

    questionPresent(data) {
      if (data.endsWith("?") == false) {
        return true;
      } else {
        return false;
      }
    },
  },
  beforeMount() {
    this.$store.commit("showProgressBar", {});
    this.getAlumniData(),
      this.$store
        .dispatch("userModule/getAllFaq", { payload: {} })
        .then((response) => {
          this.$store.commit("closeProgressBar", {});
        });
  },

  computed: {
    getFaqList: {
      get() {
        return this.$store.getters["userModule/getFaqList"];
      },
      set(data) {
        this.$store.commit("userModule/setFaqList", this.data);
      },
    },
  },

  data() {
    return {
      emailDailog: false,
      dialog: false,
      questionMark: "?",
      space: "  ",
    };
  },
};
</script>