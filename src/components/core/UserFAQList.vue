<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="mx-auto">
        <v-toolbar class="mb-5">
          <v-toolbar-title class="ml-5">FAQs</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-row justify="center">
          <v-expansion-panels class="mr-5 elevation-0" accordion>
            <v-expansion-panel v-for="(item,i) in getFaqList" :key="i">
              <v-expansion-panel-header
                class="subtitle-1 font-weight-meduim"
                v-if="questionPresent(item.question)"
              >{{item.question}}{{questionMark}}</v-expansion-panel-header>
              <v-expansion-panel-header class="subtitle-1" v-else>{{item.question}}</v-expansion-panel-header>

              <v-expansion-panel-content class="subtitle-1 p2-4">
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
        </v-row>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <Contact :dialog="dialog" :Showemail="emailDailog" @closeAskHrDialog="closeAskHrDialog" />
    </v-flex>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          @click="dialog=true"
          style="position: fixed; bottom: 20px;"
          large
          absolute
          dark
          fab
          float
          right
          bottom
          color="blue"
          class="mb-5"
        >
          <v-icon>mdi-wechat</v-icon>
        </v-btn>
      </template>
      <span>Raise Concern</span>
    </v-tooltip>
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