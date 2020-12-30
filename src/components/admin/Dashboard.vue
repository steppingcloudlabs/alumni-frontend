<template>
  <v-card class="ml-3 pa-2" style="background-color: #232b2b">
    <v-layout row wrap style="margin-left: unset">
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
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="getAlumniList"
          class="elevation-1"
          disable-pagination
          hide-default-footer
          :loading="loader"
          dark
        >
          <template v-slot:top>
            <v-toolbar>
              <v-toolbar-title>Recent Resigned Employee</v-toolbar-title>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="openAddAlumniDialog"
                style="margin-left: 20px; margin-top: 14px"
                >New Alumni</v-btn
              >
              <v-divider class="mx-4" inset vertical></v-divider>
              <div class="flex-grow-1"></div>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
                @keyup.enter.native="findData(search)"
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
            <v-icon small class="mr-2" @click="editAlumniDialog(item)"
              >edit</v-icon
            >
            <v-icon small class="mr-2" @click="showDeleteDialog(item)"
              >delete</v-icon
            >
          </template>
        </v-data-table>
        <p class="text-center text-white">
          <pagination
        :next="next"
        :prev="prev"
        :totalLength="pagination.TOTALPAGES"
        @pageClicked="pageClicked"
      ></pagination>
         
        </p>
      </v-flex>
    </v-layout>
  </v-card>
</template>
    
    

<script>
import statCards from "@/components/material/StatsCard.vue";
import AddAlumni from "@/components/admin/AddAlumniDialog.vue";
import pagination from "@/components/material/CommonPagination.vue";
import moment from "moment";

export default {
  components: {
    statCards,
    AddAlumni,
    pagination
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
  },
  beforeMount() {
    this.limit = 10;
    this.skip = 0;
    this.loader = true;
    this.getAlumni(3,0)
  },
  destroyed() {
    this.$store.commit("adminModule/setAlumniList", []);
  },
  methods: {
     pageClicked(data) {
       let lim=data*3
      this.getAlumni(3,lim);
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
            for (var i = 0; i < this.getAlumniList.length; i++) {
              this.getAlumniList[i].DATE = moment
                .unix(this.getAlumniList[i].DATE / 1000)
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
      this.pagination.LIMIT += 3;
      this.pagination.OFFSET += this.pagination.LIMIT;
      this.getAlumni(this.pagination.LIMIT, this.pagination.OFFSET);
    },

    prev() {
      this.pagination.LIMIT -= 3;
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
    viewAlumniDialog(data) {
      console.log(data);
      this.dialog = true;
       this.$store.commit("adminModule/showAlumniDialog", JSON.parse(JSON.stringify(data)));
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
  },
  data() {
    return {
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