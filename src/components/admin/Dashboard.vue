<template>
  <v-card class="ml-3 pa-2" style="background-color:#232B2B;">
    <v-layout row wrap style="margin-left:unset">
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
                style="margin-left: 20px; margin-top: 14px;"
              >New Alumni</v-btn>
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
            <v-icon small class="mr-2" @click="editAlumniDialog(item)">edit</v-icon>
            <v-icon small class="mr-2" @click="showDeleteDialog(item)">delete</v-icon>
          </template>
        </v-data-table>
        <p class="text-center text-white" v-if="getAlumniList.length">
          <v-btn v-if="showMore" color="blue" style="margin-top:10px" @click="getMore">Load More</v-btn>
        </p>
      </v-flex>
    </v-layout>
  </v-card>
</template>
    
    

<script>
import statCards from "@/components/material/StatsCard.vue";
import AddAlumni from "@/components/admin/AddAlumniDialog.vue";
import moment from "moment";

export default {
  components: {
    statCards,
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
    this.limit = 10;
    this.skip = 0;
    this.loader = true;
    this.$store
      .dispatch("adminModule/getAllAlumni", {
        payload: {
          skip: 0,
          limit: this.limit
        }
      })
      .then(response => {
        if (
          response.data.status == 200 &&
          response.data.result.length < this.limit
        ) {
          this.showMore = false;
        } else {
          this.showMore = true;
        }

        this.loader = false;
      });
  },
  destroyed() {
    this.$store.commit("adminModule/setAlumniList", []);
  },
  methods: {
    getMore() {
      this.limit = this.limit;
      this.skip = this.skip + this.limit;
      this.loader = true;
      this.showMore = false;
      let actionToCall = "getMoreAlumni";
      this.$store
        .dispatch("adminModule/getMoreData", {
          actionToCall: actionToCall,
          limit: this.limit,
          skip: this.skip
        })
        .then(response => {
          if (
            response.data.status == 200 &&
            response.data.result.length < this.limit
          ) {
            this.showMore = false;
          } else {
            this.showMore = true;
          }
          this.loader = false;
        });
    },
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
        user_id: null,
        first_name_personal_information: "",
        last_name_personal_information: "",
        paySlipStatus: "",
        form16Status: "",
        openFrom: "New"
      };
      this.$store.commit("adminModule/showAlumniDialog", alumniData);
    },
    viewAlumniDialog(data) {
      console.log(data);
      this.dialog = true;
      // this.$store.commit("adminModule/showAlumniDialog", JSON.parse(JSON.stringify(data)));
    },
    closeClearanceDialog() {
      this.dialog = false;
    },

    editAlumniDialog(data) {
      console.log(data);
      let alumniData = JSON.parse(JSON.stringify(data));
      if (data.date_of_resignation) {
        alumniData.date_of_resignation = moment
          .unix(data.date_of_resignation / 1000)
          .toISOString()
          .substr(0, 10);
      }
      if (data.date_of_birth) {
        alumniData.date_of_birth = moment
          .unix(data.date_of_birth / 1000)
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
          skip: 0,
          limit: 2,
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