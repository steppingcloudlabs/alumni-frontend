<template>
  <div>
    <v-toolbar >
      <v-toolbar-title class="ml-5">FAQs</v-toolbar-title>

      <div class="flex-grow-1"></div>
    </v-toolbar>
    <br />
    <br />

    <v-row justify="center">
      <v-expansion-panels popout class="mr-5">
        <v-expansion-panel v-for="(item,i) in getFaqList" :key="i">
          <v-expansion-panel-header
            v-if="questionPresent(item.question)"
            style="font-weight:bold"
          > Question:{{item.question}}{{questionMark}}</v-expansion-panel-header>
          <v-expansion-panel-header v-else style="font-weight:bold"> Question.{{item.question}}</v-expansion-panel-header>

          <v-expansion-panel-content style="font-size:15px">
            <span style="font-weight:bold">Answer: </span>
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

    <Contact :dialog="dialog" @closeAskHrDialog="closeAskHrDialog" />
  </div>
</template>

<script>
import Contact from "./contactHR";
export default {
  components: {
    Contact
  },
  methods: {
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
    this.$store.dispatch("adminModule/getAllFaq");
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
      dialog: false,
      questionMark: "?",
      space:"  "
    };
  }
};
</script>
<style scoped >
.v-sheet.v-sheet--tile.theme--light.v-toolbar {
  background: rgb(68, 70,71,.7) !important;
  
}
.v-toolbar__title {
  color: white !important;
  font-weight: bolder !important;
  font-size:x-large !important;
}
</style>