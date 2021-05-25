<template>

  <v-layout row wrap class="ml-5 mr-5 mt-1">
   <v-flex xs12>
         <v-btn
              color="primary"
              light
              class="mb-2 newAlumni "
              @click="openAddAdminDialog"
              style="float:right"
              >New Admin</v-btn
            >
   </v-flex>
  
    <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="recentData"
        class="elevation-1"
        disable-pagination
        hide-default-footer
        :loading="loader"
        light
      >
       
        <template v-slot:item.action="{ item }">
          <!-- <v-icon small class="mr-2" @click="viewAlumniDialog(item)">mdi-eye</v-icon> -->
          <!-- <v-icon
            small
            class="mr-2"
            color="#1A265C"
            @click="editAdminDialog(item)"
            >edit</v-icon
          > -->
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
    <AddAdmin></AddAdmin>
  </v-layout>

</template>
    
    

<script>

import AddAdmin from "@/components/admin/addAdminDialog.vue";
import pagination from "@/components/material/CommonPagination.vue";


import moment from "moment";

export default {
  components: {
   
    AddAdmin,
    pagination,
   
  },
  watch: {
    dialog() {
      console.log(this.dialog);
    },
  },
  mounted() {},
  computed: {
    getAdminList: {
      get() {
        return this.$store.getters["adminModule/getAdminList"];
      },
      set(data) {
        this.$store.commit("adminModule/setAdminList", data);
      },
    },
      recentData: {
      get() {
        return this.$store.getters["adminModule/getrecentAdmin"];
      },
      set(data) {
        this.$store.commit("adminModule/setrecentAdmin", data);
      }
    },
   
  },
  beforeMount() {
    this.limit = 10;
    this.skip = 0;
    this.loader = true;
    this.getAdmin(10, 0);
  },
  destroyed() {

      this.$store.commit("adminModule/setAdminList", []);
    this.$store.commit("closeProgressBar", {});
  },
  methods: {
    pageClicked(data) {
      let lim = (data - 1) * 10;
         if(this.getAdminList.length<=lim)
           {
                this.getAdmin(10,lim);
           }
        else
           {
              this.recentData=this.getAdminList.slice(lim,lim+10)
          }
     
    },
    setSelectedAdmin(item) {
      this.selectedAlumni = item;
      this.showMore = true;
    },
    getAdmin(limit, offset) {
       let listlen=this.getAdminList.length
      let vm = this;
      this.$store
        .dispatch("adminModule/getAllAdmin", {
          payload: { limit: limit, offset: offset },
        })
        .then((response) => {
          if (response.data.result.length > 0) {
            this.empty = false;
            vm.loader = false;
           
             if(this.getAdminList.length<offset)
              {
                  this.recentData=this.getAdminList.slice(listlen,listlen+10)
              }
              else
              {
                this.recentData=this.getAdminList.slice(offset-limit)
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
       if(this.getAdminList<=this.pagination.OFFSET)
           {
              this.getAdmin(this.pagination.LIMIT, this.pagination.OFFSET);
           }
        else
           {
              this.recentData=this.getAdminList.slice((this.pagination.OFFSET-this.pagination.LIMIT))
          }
     
    },

    prev() {
      this.pagination.LIMIT -= 0;
      this.pagination.OFFSET -= this.pagination.LIMIT;
       if(this.getAdminList<=this.pagination.OFFSET)
           {
              this.getAdmin(this.pagination.LIMIT, this.pagination.OFFSET);
           }
        else
           {
              this.recentData=this.getAdminList.slice((this.pagination.OFFSET-this.pagination.LIMIT))
          }
     
    },

    closeAdminDialog() {
      this.$store.commit("adminModule/closeAdminDialog");
    },
    showDeleteDialog(data) {
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: "deleteSelectedAdmin",
        deleteActionToDispatch: "deleteAdmin",
      });
    },
    openAddAdminDialog() {
      let alumniData = {
        USER_ID: null,
        FIRST_NAME_PERSONAL_INFORMATION: "",
        LAST_NAME_PERSONAL_INFORMATION: "",
        paySlipStatus: "",
        form16Status: "",
        openFrom: "New",
      };
      this.$store.commit("adminModule/showAdminDialog", alumniData);
    },
  
    viewAdminDialog(data) {
      console.log(data);
      this.dialog = true;
      this.$store.commit(
        "adminModule/showAdminDialog",
        JSON.parse(JSON.stringify(data))
      );
    },
    closeClearanceDialog() {
      this.dialog = false;
    },

    editAdminDialog(data) {
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
        "adminModule/showAdminDialog",
        JSON.parse(JSON.stringify(alumniData))
      );
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
          text: "Email Id",
          align: "left",
          sortable: false,
          value: "EMAIL",
        },
        { text: "FirstName", value: "FIRSTNAME" },
        { text: "LastName", value: "LASTNAME" },
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