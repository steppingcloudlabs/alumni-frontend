<template>
  <div>
    <v-card min-height="150px" dark>
      <v-toolbar elevation="3" color="#424242" width="100%">
        <v-toolbar-title style="color:white">Escalation Mails</v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs4 v-for="item in 3" :key="'escalationManager'+item">
          <EscalationManagerCard
            :render="renderManagerComponent"
            :arrayIndex="item - 1"
            :escalationManager="escalationManagerList[item - 1] ? escalationManagerList[item - 1] : undefined"
            @addManagerDialog="addManagerDialog"
            @showDeleteDialog="showDeleteDialog"
          />
        </v-flex>
      </v-layout>
    </v-card>
    <AddEmail
      :editEsclationData="selectedEsclation"
      :showEmailDialog="showDialog"
      @closeDialog="closeEmailDialog"
      @saveEsclationData="saveEsclationData"
      @updateAssignedManger="getMangerList"
    ></AddEmail>
  </div>
</template>

<script>
import AddEmail from "@/components/material/AddEmail";
import EscalationManagerCard from "@/components/admin/EscalationManagerCard";

export default {
  components: {
    AddEmail,
    EscalationManagerCard
  },
  data() {
    return {
      showskill: true,
      showDialog: false,
      selectedEsclation: {},
      escalationManagerList: [{}, {}, {}],
      renderManagerComponent: false,
      selectedIndex: undefined,
      escalationList: [],
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
  beforeMount() {
    this.getMangerList();
  },
  methods: {
    closeEmailDialog() {
      this.showDialog = false;
    },
    showEmailDialog(data) {
      this.showDialog = true;
    },
    addManagerDialog(data) {
      this.showDialog = true;
      this.selectedIndex = data;
    },
    showDeleteDialog(index) {
      let data = {
        payload: {
          level: this.escalationManagerList[index].level
        }
      };
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: undefined,
        deleteActionToDispatch: "removeEscalationManager"
      });
    },
    getMangerList() {
      this.$store.dispatch("adminModule/getMangerList", {}).then(response => {
        if (response && response.data && response.data.result) {
          for (let i = 0; i < response.data.result.length; i++) {
            let level = response.data.result[i].level.charAt(
              response.data.result[i].level.length - 1
            );
            this.escalationManagerList[parseInt(level) - 1] =
              response.data.result[i];
            this.escalationList.push(
              response.data.result[i].esclation_manager_id
            );
          }
        }
        this.escalationManagerList = JSON.parse(
          JSON.stringify(this.escalationManagerList)
        );
        this.renderManagerComponent = true;
        console.log("Response", this.escalationManagerList);
      });
    },
    saveEsclationData(managerId) {
      let data = {
        payload: {
          new_manager_obejctid: managerId,
          level: "esclation_manager_" + (this.selectedIndex + 1)
        }
      };
      this.$store
        .dispatch("adminModule/saveEscalationManager", data)
        .then(response => {
          this.showDialog = false;
          this.getMangerList();
        });
    }
  }
};
</script>


