<template>
  <v-layout row wrap style="margin-left:unset">
    <v-img height="500px" src="@/assets/back5.jpg"></v-img>
    <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="getAlumniList"
        class="elevation-1"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title>Recent Resigned Employee</v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" dark class="mb-2" @click="openAddAlumniDialog">New Alumni</v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2">edit</v-icon>
          <v-icon small class="mr-2" @click="showDeleteDialog(item)">delete</v-icon>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
    
    

<script>
import AddAlumni from "@/components/admin/AddAlumniDialog.vue";
export default {
  components: {
    AddAlumni
  },
  watch: {
    dialog() {
      console.log(this.dialog);
    }
  },
  mounted() {},
  computed: {
    getAlumniList: {
      get() {
        return this.$store.getters["adminModule/getAlumniList"];
      },
      set(data) {
        this.$store.commit("adminModule/setAlumniList", this.data);
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("adminModule/getAllAlumni");
  },
  methods: {
    closeAlumniDialog() {
      this.$store.commit("adminModule/closeAlumniDialog");
    },
    showDeleteDialog(data) {
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: "deleteSelectedAlumni",
        deleteActionToDispatch: "deleteAlumni"
      });
    },
    openAddAlumniDialog() {
      let alumniData = {
        empId: null,
        firstName: "",
        lastName: "",
        paySlipStatus: "",
        form16Status: ""
      };
      this.$store.commit("adminModule/showAlumniDialog", alumniData);
    }
  },
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "EmployeeId",
          align: "left",
          sortable: false,
          value: "user_id"
        },
        { text: "FirstName", value: "first_name_personal_information" },
        { text: "LastName", value: "last_name_personal_information" },
        { text: "Action", value: "action" }
      ]
    };
  }
};
</script>