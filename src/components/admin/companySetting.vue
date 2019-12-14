<template>
  <div>
    <v-card min-height="150px" dark>
      <v-toolbar elevation="3" color="#424242" width="100%">
        <v-toolbar-title style="color:white">Escalation Mails</v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs4 pa-1 v-for="(item, i) in items" :key="i">
          <v-card class="mx-auto" min-width="304px" min-height="250px" light>
            <v-layout row wrap>
              <div class="title mb-4 pt-4 pl-3">{{item.title}}</div>
              <v-list-item three-line v-if="getEmailList[i].levelOrder">
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{getEmailList[i].name}}</v-list-item-title>
                  <v-list-item-subtitle>{{getEmailList[i].email}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
              </v-list-item>

              <v-card-actions v-if="getEmailList[i].levelOrder">
                <v-flex xs4></v-flex>
                <v-flex xs7>
                  <v-btn>
                    <v-icon @click="showDeleteDialog(getEmailList[i])">mdi-delete</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs1>
                  <v-btn>
                    <v-icon @click="showEmailDialog1(i)">edit</v-icon>
                  </v-btn>
                </v-flex>
              </v-card-actions>
              <v-flex xs12 v-else style="margin-top:22px;margin-bottom:auto;margin-left:72px;">
                <v-btn
                  class="ml-5"
                  v-if="!getEmailList[i].levelOrder"
                  text
                  @click="showEmailDialog(i+1)"
                >Add a new Email</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- <v-card >
      <v-layout row wrap >
        <v-flex xs8>
          <v-card-title
            class="title-5 mb-1 pl-4 user-profile-heading"
            style="font-weight: bold;"
          >{{item.title}}</v-card-title>
        </v-flex>
        <v-flex xs4></v-flex>

        <v-flex xs5 v-if="getEmailList[i].levelOrder">
          <v-card-text
            color="primary"
            class="body-1 mr-2 ml-2 mt-2"
            style="margin-top:10px"
          >{{getEmailList[i].email}}</v-card-text>
        </v-flex>
        <v-card-actions v-if="getEmailList[i].levelOrder">
          <v-flex xs5></v-flex>
          <v-flex xs6>
            <v-icon @click="showDeleteDialog(getEmailList[i])">mdi-delete</v-icon>
          </v-flex>
          <v-flex xs1>
            <v-icon @click="showEmailDialog1(i)">edit</v-icon>
          </v-flex>
        </v-card-actions>

        <v-flex xs5 v-else>
          <v-btn
            class="ml-5"
            v-if="!getEmailList[i].levelOrder"
            text
            @click="showEmailDialog(i+1)"
          >Add a new Email</v-btn>
        </v-flex>
      </v-layout>
      </v-card>-->
      <!-- <v-card-title class="subtitle-2 mb-1 pl-4 user-profile-heading" style="font-weight: bold;">
        Esclation Level 1
        <v-spacer></v-spacer>
        <v-btn text v-if="!getEmailList[1].levelOrder" @click="showEmailDialog(2)">Add a new Email</v-btn>
      </v-card-title>
      <v-layout v-if="getEmailList[1].levelOrder">
        <v-flex xs5>
          <v-card-text
            color="primary"
            class="body-1 mr-2 ml-2 mt-2"
            style="margin-top:10px"
          >{{getEmailList[1].email}}</v-card-text>
        </v-flex>
        <v-card-actions>
          <v-flex xs5></v-flex>
          <v-flex xs6>
            <v-icon @click="showDeleteDialog(getEmailList[1])">mdi-delete</v-icon>
          </v-flex>
          <v-flex xs1>
            <v-icon @click="showEmailDialog1(1)">edit</v-icon>
          </v-flex>
        </v-card-actions>
      </v-layout>
      <v-card-title class="subtitle-2 mb-1 pl-4 user-profile-heading" style="font-weight: bold;">
        Escalation Level 1
        <v-spacer></v-spacer>
        <v-btn text v-if="!getEmailList[2].levelOrder" @click="showEmailDialog(3)">Add a new Email</v-btn>
      </v-card-title>
      <v-layout v-if="getEmailList[2].levelOrder">
        <v-flex xs5>
          <v-card-text
            color="primary"
            class="body-1 mr-2 ml-2 mt-2"
            style="margin-top:10px"
          >{{getEmailList[2].email}}</v-card-text>
        </v-flex>
        <v-card-actions>
          <v-flex xs5></v-flex>
          <v-flex xs6>
            <v-icon @click="showDeleteDialog(getEmailList[2])">mdi-delete</v-icon>
          </v-flex>
          <v-flex xs1>
            <v-icon @click="showEmailDialog1(2)">edit</v-icon>
          </v-flex>
        </v-card-actions>
      </v-layout>-->
    </v-card>
  </div>
</template>

<script>
import query from "@/components/admin/queryManagement.vue";
export default {
  components: {
    query
  },
  data() {
    return {
      showskill: true,
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
    // deleteSkill(data) {
    //   this.skills.splice(data, 1);
    // },
    // addSkill() {
    //   this.showskill = true;
    //   if (!this.skill.trim()) {
    //     this.showskill = true;
    //   } else {
    //     let skillExists = this.skills.filter(item => {
    //       if (item.toLowerCase() == this.skill.toLowerCase()) {
    //         return true;
    //       }
    //       return false;
    //     });
    //     if (skillExists.length < 1) {

    //           this.skills.push(this.skill);
    //           this.$store.commit("showSnackbar", {
    //             message: "Skill added successfully",
    //             color: "success",
    //             heading: "Success",
    //             duration: 3000
    //           });
    //         }

    //         this.skill = "";

    //   }
    // },
    // showskillinput() {
    //   this.showskill = false;
    // },

    closeEmailDialog() {
      this.$store.commit("adminModule/closeEmailDialog");
    },
    showEmailDialog(data) {
      this.$store.commit("adminModule/showEmailDialog1", data);
    },

    showEmailDialog1(index) {
      this.$store.commit(
        "adminModule/showEmailDialog",
        JSON.parse(JSON.stringify(this.getEmailList[index]))
      );
    },
    showDeleteDialog(data) {
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: "deleteSelectedEmail",
        deleteActionToDispatch: "deleteEmail"
      });
    }
  }
};
</script>


