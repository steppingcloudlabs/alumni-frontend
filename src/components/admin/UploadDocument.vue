<template>
  <v-layout row wrap class="ml-5 mr-5 mt-1" >
    <v-flex xs12>
    <v-data-table
      :headers="headers"
      :items="getAlumniList"
      :sort-by="['date']"
      :sort-desc="[true]"
      :loading="loader"
      hide-default-footer
      multi-sort
      height="auto"
      light
      
      style="background: white; border-bottom: none"
    >
      <template v-slot:top>
        <v-toolbar style="background-color: #1A265C;color:white">
          <v-toolbar-title style="color: white"
            >Upload Pending Documents</v-toolbar-title
          >
          <v-spacer></v-spacer>
             <v-btn
                color="primary"
                light
                class="mb-3 mr-4 newAlumni"
                @click="openAddBulkDocumentDialog"
               
                >Bulk Upload</v-btn
              >
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            @keyup.enter.native="findData(search)"
            background-color="white"
            
          ></v-text-field>
          <!-- <v-btn   color="primary"
              dark
          class="mb-2" style="margin-left: 20px; margin-top: 14px;" @click="findData(search)">Search</v-btn>-->
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" color="#1A265C" @click="openDialog(item)"
          >fas fa-upload</v-icon
        >
      </template>
    </v-data-table>
    <UploadDialog
      :dialog="dialog"
      :empId="empid"
      @closeDocumentDialog="closeDocumentDialog"
    />

    <p class="text-center text-white mt-5" style="background-color:#1A265C" >
     <pagination
        :next="next"
        :prev="prev"
        :totalLength="pagination.TOTALPAGES"
        @pageClicked="pageClicked"
      ></pagination>
    </p>
    </v-flex>
    <BulkDocument></BulkDocument>
  </v-layout>
</template>

<script>
import UploadDialog from "@/components/admin/UploadDocumentDialog";
import pagination from "@/components/material/CommonPagination.vue";
import BulkDocument from "@/components/admin/AddBulkDocumentDialog.vue";
import moment from "moment"
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    UploadDialog,
     pagination,
     BulkDocument
  },
  beforeMount() {
    this.limit = 9;
    this.loader = true;
    this.getAlumni(10,0)
  },
  computed: {
    getAlumniList: {
      get() {
        return this.$store.getters["adminModule/getAlumniList"];
      },
      set(data) {
        this.$store.commit("adminModule/setAlumniList", this.data);
      },
    },
  },
  methods: {
    pageClicked(data) {
         let lim=(data-1)*10
      this.getAlumni(10,lim);
     // this.getAlumni(data);
    },
    setSelectedAlumni(item) {
      this.selectedAlumni = item;
      this.showMore = true;
    },
    getAlumni(limit, offset) {
      let vm=this
      this.$store
        .dispatch("adminModule/getAllAlumni", {
          payload: { limit: limit, offset: offset },
        })
        .then((response) => {
          if (response.data.result.length > 0) {
            this.empty = false;
           vm.loader=false
            for (var i = 0; i < vm.getAlumniList.length; i++) {
              vm.getAlumniList[i].DATE = moment
                .unix(vm.getAlumniList[i].DATE / 1000)
                .format("LL");
            }
            vm.pagination = response.data.pagination;
            vm.pagination = Object.assign( {}, this.someObject, response.data.pagination);
            console.log(vm.pagination)
          } else {
            this.empty = true;
          }
        });
    },
    next() {
      this.pagination.LIMIT += 0;
      this.pagination.OFFSET += this.pagination.LIMIT;
      this.getAlumni(this.pagination.LIMIT, this.pagination.OFFSET);
    },

    prev() {
      this.pagination.LIMIT -= 0;
      this.pagination.OFFSET -= this.pagination.LIMIT;
      this.getAlumni(this.pagination.LIMIT, this.pagination.OFFSET);
    },
   
    openDialog(data) {
      this.dialog = true;
      this.empid = data.USER_ID;
      console.log(this.empid);
    },
    closeDocumentDialog() {
      this.dialog = false;
    },
    findData(data) {
      this.loader = true;
      let body = {
        payload: {
          skip: 0,
          limit: 9,
          keyword: data,
        },
      };
      this.$store
        .dispatch("adminModule/getAllAlumni", body)
        .then((response) => {
          this.loader = false;
        });
    },
     openAddBulkDocumentDialog() {
      // let alumniData = {
      //   USER_ID: null,
      //   FIRST_NAME_PERSONAL_INFORMATION: "",
      //   LAST_NAME_PERSONAL_INFORMATION: "",
      //   paySlipStatus: "",
      //   form16Status: "",
      //   openFrom: "New",
      // };
      this.$store.commit("adminModule/setshowBulkDocument", true);
    },
  },
  destroyed() {
    this.$store.commit("adminModule/setAlumniList", []);
  },
  data() {
    return {
       pagination: {
        LIMIT: 10,
        OFFSET: 0,
        TOTALPAGES:0
      },  
      limit: 9,
      skip: 0,
      showMore: false,
      loader: false,
      search: "",
      dialog: false,
      empid: "",
      headers: [
        {
          text: "EmployeeId",
          align: "left",
          sortable: false,
          value: "USER_ID",
        },
        { text: "FirstName", value: "FIRST_NAME_PERSONAL_INFORMATION" },
        { text: "LastName", value: "LAST_NAME_PERSONAL_INFORMATION" },

        { text: "Actions", value: "action", sortable: false },
      ],
      jobs: [
        {
          empid: "1234",
          FirstName: "new delhi",
          LastName: "integration",
          SlipStatus: "pending",
          Form16Status: "pending",
        },
        {
          empid: "4567",
          FirstName: "new delhi",
          LastName: "integration",
          SlipStatus: "pending",
          Form16Status: "pending",
        },
      ],
    };
  },
};
</script>
<style >
.v-data-table {
  border-top: "none";
}
</style>