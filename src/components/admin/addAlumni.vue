<template>
  <v-layout row wrap class="ml-5 mr-5 mt-1">
    <!-- <v-img height="500px" src="@/assets/back5.jpg"></v-img> -->
    <!-- <v-flex xs6 class="mt-3 mb-3">
      <statCards></statCards>
    </v-flex>
    <v-flex xs6 class="mt-3 mb-3">
      <statCards></statCards>
      </v-flex>-->
    <!-- <v-flex xs4 class="mt-3 mb-3">
      <statCards></statCards>
      </v-flex>-->

    <!-- <v-flex xs6 class="mt-3 mb-3">
      <viewCard :titleHead="titleHead[0]" :lastStatus="lastStatus[0]"></viewCard>
      </v-flex>
      <v-flex xs6 class="mt-3 mb-3">
      <viewCard :titleHead="titleHead[1]" :lastStatus="lastStatus[1]"></viewCard>
      </v-flex> -->

    <v-flex xs12>
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
          <v-toolbar style="background-color: #1a265c; color: white">
            <v-toolbar-title class="d-none d-sm-flex"
              >Recent Resigned Employee</v-toolbar-title
            >
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
            <div class="flex-grow-1"></div>
            <v-text-field
              style="color: white"
              v-model="search"
              append-icon="search"
              label="Search"
              color="white"
              background-color="white"
              single-line
              hide-details
              @keyup.enter.native="findData(search)"
                @input="findData(search)"
            ></v-text-field>
            <!-- <v-btn
              color="primary"
              dark
              class="mb-2"
              style="margin-left: 20px; margin-top: 14px;"
              @click="findData(search)"
              >Search</v-btn>-->
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <!-- <v-icon small class="mr-2" @click="viewAlumniDialog(item)">mdi-eye</v-icon> -->
          <v-icon
            small
            class="mr-2"
            color="#1A265C"
            @click="editAlumniDialog(item)"
            >edit</v-icon
          >
          <v-icon
            small
            class="mr-2"
            color="#1A265C"
            @click="showDeleteDialog(item)"
            >delete</v-icon
          >
        </template>
      </v-data-table>
      <p class="text-center text-white" style="background-color: #1a265c">
        <pagination
          :next="next"
          :prev="prev"
          :totalLength="pagination.TOTALPAGES"
          @pageClicked="pageClicked"
        ></pagination>
      </p>
    </v-flex>
    <BulkAlumni></BulkAlumni>
  </v-layout>
</template>
    
    

<script>
import statCards from "@/components/material/StatsCard.vue";
import AddAlumni from "@/components/admin/AddAlumniDialog.vue";
import pagination from "@/components/material/CommonPagination.vue";
import BulkAlumni from "@/components/admin/AddAlumniBulkDialog.vue";

import moment from "moment";

export default {
  components: {
    statCards,
    AddAlumni,
    pagination,
    BulkAlumni,
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
    this.getAlumni(10, 0);
  },
  destroyed() {
    this.$store.commit("adminModule/setAlumniList", []);
    this.$store.commit("closeProgressBar", {});
  },
  methods: {
    pageClicked(data) {
      let lim = (data - 1) * 10;
      this.getAlumni(10, lim);
    },
    setSelectedAlumni(item) {
      this.selectedAlumni = item;
      this.showMore = true;
    },
    getAlumni(limit, offset) {
      let vm = this;
      this.$store
        .dispatch("adminModule/getAllAlumni", {
          payload: { limit: limit, offset: offset },
        })
        .then((response) => {
          if (response.data.result.length > 0) {
            this.empty = false;
            vm.loader = false;
            for (var i = 0; i < this.getAlumniList.length; i++) {
              this.getAlumniList[i].DATE = moment
                .unix(this.getAlumniList[i].DATE / 1000)
                .format("LL");
            }
            vm.pagination = response.data.pagination;
            vm.pagination = Object.assign(
              {},
              this.someObject,
              response.data.pagination
            );
            console.log(vm.pagination);
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

    closeAlumniDialog() {
      this.$store.commit("adminModule/closeAlumniDialog");
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
      let vm=this
      this.loader = true;
      let body = {
        payload: {
          keyword: data,
        },
      };
      this.$store
        .dispatch("adminModule/getSearchAlumniById", data)
        .then((response) => {
          this.loader=false
          if(response.result.length>0)
          {
           // vm.getAlumniList=response.result
            vm.pagination = response.pagination;
            vm.pagination = Object.assign(
              {},
              this.someObject,
              response.pagination
            );
          }
        });
    },
  },
  data() {
    return {
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