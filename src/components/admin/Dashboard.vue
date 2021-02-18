<template>
  <v-layout row wrap class="ml-5 mr-5" style="margin-top: 100px !important">
    <v-flex xs6 class="mt-3 mb-3">
      <viewCard
        :titleHead="titleHead[0]"
        :lastStatus="lastStatus[0]"
        :icon="icon[0]"
        :getList="getStatusList"
        @download="download"
      ></viewCard>
    </v-flex>
    <v-flex xs6 class="mt-3 mb-3">
      <viewCard
        :titleHead="titleHead[1]"
        :lastStatus="lastStatus[1]"
        :icon="icon[1]"
         :getList="getDocument"
        @download="download"
      ></viewCard>
    </v-flex>

    <!-- <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="getAlumniList"
          class="elevation-1"
          disable-pagination
          hide-default-footer
          :loading="loader"
          light
        >
          <template v-slot:top>
            <v-toolbar style="background-color: #1A265C;color:white">
              <v-toolbar-title class="d-none d-sm-flex">Recent Resigned Employee</v-toolbar-title>
              <v-btn
                color="primary"
                light
                class="mb-2 newAlumni"
                @click="openAddAlumniDialog"
               
                >New Alumni</v-btn
              >
              <v-divider class="mx-4" inset vertical></v-divider>
               <v-btn
                color="primary"
                light
                class="mb-2 newAlumni"
                @click="openAddBulkAlumniDialog"
               
                >Bulk Upload</v-btn
              >
              <div class="flex-grow-1" ></div>
              <v-text-field
              style="color:white"
                v-model="search"
                append-icon="search"
                label="Search"
                color="white"
                background-color="white"
              
                single-line
                hide-details
                @keyup.enter.native="findData(search)"
                
              ></v-text-field>
           
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
          
            <v-icon small class="mr-2" color="#1A265C" @click="editAlumniDialog(item)"
              >edit</v-icon
            >
            <v-icon small class="mr-2" color="#1A265C" @click="showDeleteDialog(item)"
              >delete</v-icon
            >
          </template>
        </v-data-table>
        <p class="text-center text-white" style="background-color:#1A265C">
          <pagination
        :next="next"
        :prev="prev"
        :totalLength="pagination.TOTALPAGES"
        @pageClicked="pageClicked"
      ></pagination>
         
        </p>
      </v-flex> -->
    <v-flex xs8>
      <graph></graph>
    </v-flex>
    <v-flex xs4>
      <v-card class="pl-5 pr-5">
          <p class="display-1 font-weight-thin pt-2" style="text-align:center">User Status</p>
          <donut></donut>
      </v-card>
    </v-flex>
  </v-layout>
</template>
    
    

<script>
import graph from "@/components/admin/dashboardGraph.vue";
import AddAlumni from "@/components/admin/AddAlumniDialog.vue";
import pagination from "@/components/material/CommonPagination.vue";
import BulkAlumni from "@/components/admin/AddAlumniBulkDialog.vue";
import viewCard from "@/components/admin/dasboardCards.vue";
import moment from "moment";
import donut from "@/components/admin/donutChartDash.vue";

export default {
  components: {
    graph,
    AddAlumni,
    pagination,
    BulkAlumni,
    viewCard,
    donut,
  },
  watch: {
    dialog() {
      console.log(this.dialog);
    },
  },
  mounted() {},
  computed: {
    getAlumniList: {
      get() {
        return this.$store.getters["adminModule/getAlumniList"];
      },
      set(data) {
        this.$store.commit("adminModule/setAlumniList", this.data);
      },
    },
     getStatusList: {
      get() {
        return this.$store.getters["adminModule/getStatusList"];
      },
      set(data) {
        this.$store.commit("adminModule/setStatusList", this.data);
      },
    },
  },
  beforeMount() {
    this.limit = 10;
    this.skip = 0;
    this.loader = true;
    this.getDocumentStat();
  },
  destroyed() {
    this.$store.commit("adminModule/setAlumniList", []);
  },
  methods: {
  
    getDocumentStat() {
      let vm = this;
      this.$store
        .dispatch("adminModule/bulkUploadDocumentStatus", {
         
        })
        .then((response) => {
          if (response.result.length > 0) {
            this.getDocument=response.result
          } 
        });
    },
  

   
    showDeleteDialog(data) {
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: "deleteSelectedAlumni",
        deleteActionToDispatch: "deleteAlumni",
      });
    },
    openAddAlumniDialog() {
      let alumniData = {
        USER_ID: null,
        FIRST_NAME_PERSONAL_INFORMATION: "",
        LAST_NAME_PERSONAL_INFORMATION: "",
        paySlipStatus: "",
        form16Status: "",
        openFrom: "New",
      };
      this.$store.commit("adminModule/showAlumniDialog", alumniData);
    },
    openAddBulkAlumniDialog() {
      // let alumniData = {
      //   USER_ID: null,
      //   FIRST_NAME_PERSONAL_INFORMATION: "",
      //   LAST_NAME_PERSONAL_INFORMATION: "",
      //   paySlipStatus: "",
      //   form16Status: "",
      //   openFrom: "New",
      // };
      this.$store.commit("adminModule/setshowBulkAlumni", true);
    },
    viewAlumniDialog(data) {
      console.log(data);
      this.dialog = true;
      this.$store.commit(
        "adminModule/showAlumniDialog",
        JSON.parse(JSON.stringify(data))
      );
    },
    closeClearanceDialog() {
      this.dialog = false;
    },

    editAlumniDialog(data) {
      console.log(data);
      let alumniData = JSON.parse(JSON.stringify(data));
      if (data.DATE_OF_RESIGNATION) {
        alumniData.DATE_OF_RESIGNATION = moment
          .unix(data.DATE_OF_RESIGNATION / 1000)
          .toISOString()
          .substr(0, 10);
      }
      if (data.DATE_OF_BIRTH) {
        alumniData.DATE_OF_BIRTH = moment
          .unix(data.DATE_OF_BIRTH / 1000)
          .toISOString()
          .substr(0, 10);
      }
      if (data.date_of_relieving) {
        alumniData.date_of_relieving = moment
          .unix(data.date_of_relieving / 1000)
          .toISOString()
          .substr(0, 10);
      }
      this.$store.commit(
        "adminModule/showAlumniDialog",
        JSON.parse(JSON.stringify(alumniData))
      );
    },
    findData(data) {
      this.loader = true;
      let body = {
        payload: {
          keyword: data,
        },
      };
      this.$store
        .dispatch("adminModule/getSearchAlumniById", data)
        .then((response) => {
          this.loader = false;
        });
    },
    download(arrayData) {
      let arrayHeader = [
        "USER_ID",
        "GENDER",
        "DATE_OF_BIRTH",
        "DATE_OF_RELIEVING",
        "DATE_OF_RESIGNATION",
        "LAST_WORKING_DAY_AS_PER_NOTICE_PERIOD",
        "PERSONAL_EMAIL_ID",
        "FIRST_NAME_PERSONAL_INFORMATION",
        "LAST_NAME_PERSONAL_INFORMATION",
        "	MIDDLE_NAME_PERSONAL_INFORMATION",
        "NATIONALITY_PERSONAL_INFORMATION",
        "SALUTATION_PERSONAL_INFORMATION",
        "CITY_ADDRESSES",
        "PHONE_NUMBER_PHONE_INFORMATION",
        "MANAGER_JOB_INFORMATION",
        "DESIGNATION_JOB_INFORMATION",
        "STATE",
        "COUNTRY",
        "Status",
      ];
      let header = arrayHeader.join(",") + "\n";
      let csv = header;
      arrayData.forEach((obj) => {
        let row = [];

        for (const [key, value] of Object.entries(obj)) {
          row.push(value);
        }
        csv += row.join(",") + "\n";
      });

      let csvData = new Blob([csv], { type: "text/csv" });
      let csvUrl = URL.createObjectURL(csvData);

      let hiddenElement = document.createElement("a");
      hiddenElement.href = csvUrl;
      hiddenElement.target = "_blank";
      hiddenElement.download = "report" + ".csv";
      hiddenElement.click();
    },
  },
  data() {
    return {
      getDocument:[],
      pagination: {
        LIMIT: 2,
        OFFSET: 0,
        TOTALPAGES: 0,
      },
      initial: false,
      skip: 0,
      showMore: true,
      limit: 9,
      loader: false,
      search: "",
      dialog: false,
      headers: [
        {
          text: "EmployeeId",
          align: "left",
          sortable: false,
          value: "USER_ID",
        },
        { text: "FirstName", value: "FIRST_NAME_PERSONAL_INFORMATION" },
        { text: "LastName", value: "LAST_NAME_PERSONAL_INFORMATION" },
        { text: "Action", value: "action" },
      ],
      titleHead: ["Alumni Upload Status", "Document Status"],
      lastStatus: ["Yet to upload", "Yet to upload"],
      icon: ["mdi-account", "mdi-clipboard"],
    };
  },
};
</script>
<style >
.newAlumni {
  margin-left: 20px;
  margin-top: 14px;
}
@media screen and (max-width: 992px) {
  .newAlumni {
    margin-left: 20px;
    margin-top: 14px;
  }
}

/* On screens that are 600px or less, set the background color to olive */
@media screen and (max-width: 640px) {
  .newAlumni {
    margin-left: 5px;
    margin-top: 14px;
    font-size: 8px !important;
    width: 50px;
  }
}
</style>