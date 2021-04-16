<template>
  <div class="ml-5 mr-5">
    <v-card min-height="150px" tile flat >
      <v-toolbar elevation="0" color="#1A265C"  width="100%">
        <v-toolbar-title style="color:white" >Escalation Mails</v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs4 v-for="item in 3" :key="'escalationManager' + item">
          <EscalationManagerCard
            :render="renderManagerComponent"
            :arrayIndex="item - 1"
            :escalationManager="
              escalationManagerList[item - 1]
                ? escalationManagerList[item - 1]
                : undefined
            "
            @addManagerDialog="addManagerDialog"
            @showDeleteDialog="showDeleteDialog"
          />
        </v-flex>
        <!-- <v-flex xs12 >
          <sftpForm style="text-align:center"></sftpForm>
        </v-flex> -->
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
//import sftpForm from "@/components/admin/sftpForm"
import SftpForm from './sftpForm.vue';

export default {
  components: {
    AddEmail,
    EscalationManagerCard,
   
    
  },
  data() {
    return {
      showskill: true,
      showDialog: false,
      selectedEsclation: {},
      escalationManagerList: [],
      renderManagerComponent: false,
      selectedIndex: undefined,
      escalationList: [],
      items: [
        { title: "Spoc", index: 0 },
        { title: "Escalation Level 1", index: 1 },
        { title: "Escalation Level 2", index: 2 },
      ],
    };
  },
  watch: {
    getEmailList() {
      return this.$store.getters["adminModule/getEmailList"];
    },
  },
  computed: {
    getEmailList: {
      get() {
        return this.$store.getters["adminModule/getEmailList"];
      },
      set(data) {
        this.$store.commit("adminModule/setEmailList", this.data);
      },
    },
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
      this.selectedEsclation = data;
    },
    showDeleteDialog(index) {
      let data = {
        payload: {
          EMAIL: index.EMAIL,
        },
      };
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: undefined,
        deleteActionToDispatch: "removeEscalationManager",
      });
      let ind = this.escalationManagerList.findIndex(
        (i) => i.EMAIL === index.EMAIL
      );
      this.escalationManagerList.splice(ind, 1);
    },
    getMangerList() {
      this.$store.dispatch("adminModule/getMangerList", {}).then((response) => {
        if (response && response.data && response.data.result) {
          for (let i = 0; i < response.data.result.length; i++) {
            this.escalationManagerList[i] = response.data.result[i];
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
          EMAIL: managerId.EMAIL,
          LEVELMANAGER: managerId.LEVELMANAGER,
          ID: managerId.ID ? managerId.ID : undefined,
        },
      };
      this.$store
        .dispatch("adminModule/saveEscalationManager", data)
        .then((response) => {
          this.showDialog = false;
          this.getMangerList();
        });
    },
  },
};
</script>


