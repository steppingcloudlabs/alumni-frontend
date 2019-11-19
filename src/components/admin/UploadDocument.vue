<template>
  <div>
    <v-img height="500px" src="@/assets/back5.jpg"></v-img>
    <v-data-table
      :headers="headers"
      :items="getAlumniList"
      :sort-by="['date']"
      :sort-desc="[true]"
      :loading="loader"
      hide-default-footer
      multi-sort
      height="auto"
      dark
      style="background:#1A1A1D;border-bottom:none;"
    >
      <template v-slot:top>
        <v-toolbar elevation="0" color="#1A1A1D">
          <v-toolbar-title style="font-family: Raleway;color:#5097DD">Pending Data</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            @keyup.enter.native="findData(search)"
          ></v-text-field>
          <!-- <v-btn   color="primary"
              dark
          class="mb-2" style="margin-left: 20px; margin-top: 14px;" @click="findData(search)">Search</v-btn>-->
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="openDialog(item)">fas fa-upload</v-icon>
      </template>
    </v-data-table>
    <UploadDialog :dialog="dialog" :empId="empid" @closeDocumentDialog="closeDocumentDialog" />
  </div>
</template>

<script>
import UploadDialog from "@/components/admin/UploadDocumentDialog";
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    UploadDialog
  },
  beforeMount() {
    this.loader = true;
    this.$store
      .dispatch("adminModule/getAllAlumni", {
        payload:{
           skip: 0,
        limit: 9
        }
      
      })
      .then(response => {
        this.loader = false;
      });
  },
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
  methods: {
    openDialog(data) {
      this.dialog = true;
      this.empid = data.user_id;
      console.log(this.empid);
    },
    closeDocumentDialog() {
      this.dialog = false;
    },
    findData(data) {
      this.loader = true;
      let body = {
        payload:{
         skip: 0,
        limit: 9,
        keyword: data
        }
      
      };
      this.$store.dispatch("adminModule/getAllAlumni", body).then(response => {
        this.loader = false;
      });
    }
  },
  data() {
    return {
      loader: false,
      search: "",
      dialog: false,
      empid: "",
      headers: [
        {
          text: "EmployeeId",
          align: "left",
          sortable: false,
          value: "user_id"
        },
        { text: "FirstName", value: "first_name_personal_information" },
        { text: "LastName", value: "last_name_personal_information" },

        { text: "Actions", value: "action", sortable: false }
      ],
      jobs: [
        {
          empid: "1234",
          FirstName: "new delhi",
          LastName: "integration",
          SlipStatus: "pending",
          Form16Status: "pending"
        },
        {
          empid: "4567",
          FirstName: "new delhi",
          LastName: "integration",
          SlipStatus: "pending",
          Form16Status: "pending"
        }
      ]
    };
  }
};
</script>
<style >
.v-data-table {
  border-top: "none";
}
</style>