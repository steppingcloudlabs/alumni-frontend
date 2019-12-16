<template>
  <div>
    <v-card min-height="150px" dark>
      <v-toolbar elevation="3" color="#424242" width="100%">
        <v-toolbar-title style="color:white">Escalation Mails</v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs4 pa-5 v-for="(item, i) in items" :key="i">
          <v-card class="mx-auto" min-width="304px" min-height="250px" light>
            <v-layout row wrap>
              <v-flex xs12>
                <div class="title mb-4 pt-4 pl-3">{{item.title}}</div>
                <v-list-item three-line v-if="getEmailList[i].levelOrder">
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{getEmailList[i].name}}</v-list-item-title>
                    <v-list-item-subtitle>{{getEmailList[i].email}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                </v-list-item>
                <v-card-actions v-if="getEmailList[i].levelOrder">
                  <v-spacer></v-spacer>
                  <v-btn fab small text @click="showDeleteDialog(getEmailList[i])">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                  <v-btn fab small text @click="showEmailDialog(i)">
                    <v-icon color="blue">edit</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-flex xs12 v-else style="margin-top:22px;margin-bottom:auto;margin-left:72px;">
                  <v-btn
                    class="ml-5"
                    v-if="!getEmailList[i].levelOrder"
                    text
                    @click="showEmailDialog(i+1)"
                  >Add a new Email</v-btn>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <AddEmail
      :editEsclationData="selectedEsclation"
      :showEmailDialog="showDialog"
      @closeDialog="closeEmailDialog"
      @saveEsclationData="saveEsclationData"
    ></AddEmail>
  </div>
</template>

<script>
import AddEmail from "@/components/material/AddEmail";

export default {
  components: {
    AddEmail
  },
  data() {
    return {
      showskill: true,
      showDialog: false,
      selectedEsclation: {},
      items: [
        { title: "Spoc", index: 0 },
        { title: "Escalation Level 1", index: 1 },
        { title: "Escalation Level 2", index: 2 }
      ]
    };
  },
  watch: {
    getEmailList() {
      return this.$store.getters["adminModule/getEmailList"];
    }
  },
  computed: {
    getEmailList: {
      get() {
        return this.$store.getters["adminModule/getEmailList"];
      },
      set(data) {
        this.$store.commit("adminModule/setEmailList", this.data);
      }
    }
  },

  methods: {
    closeEmailDialog() {
      this.showDialog = false;
    },
    showEmailDialog(data) {
      this.showDialog = true;
    },
    saveEsclationData() {}
  }
};
</script>


