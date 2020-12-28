<template>
  <div>
    <div v-if="!this.empty">
      <v-layout row wrap mt-4 v-for="(item,i) in getEventList" :key="i">
        <v-flex xs4 class="px-5">
          <v-img height="200px" v-if="getEventList[i].PHOTO" :src="getEventList[i].PHOTO"></v-img>
          <v-img height="200px" v-else src="@/assets/news.png"></v-img>
        </v-flex>
        <v-flex xs8>
          <v-card-title class="pt-0">{{getEventList[i].TITLE}}</v-card-title>
          <v-card-text style="font-size:15px">{{getEventList[i].CONTENT}}</v-card-text>
        </v-flex>
        <v-flex xs12>
          <v-card-actions>
            <v-flex xs10></v-flex>
            <v-flex xs1>
              <v-icon @click="showDeleteDialog(getEventList[i])">mdi-delete</v-icon>
            </v-flex>
            <v-flex xs1>
              <v-icon @click="showEventDialog(i)">edit</v-icon>
            </v-flex>
          </v-card-actions>
        </v-flex>
        <v-flex xs12 class="mt-5">
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="pb-5 pt-5">
        <v-flex xs12 class="mr-5 text-right">
          <pagination
        :next="next"
        :prev="prev"
        :totalLength="pagination.TOTALPAGES"
        @pageClicked="pageClicked"
      ></pagination>
        </v-flex>
      </v-layout>
    </div>
    <div v-else style="margin-bottom: 30px;
    margin-left: 350px;
    margin-right: 200px;">
      <span class="subtitle-1 mr-5 ml-5">No Events to Show</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import pagination from "@/components/material/CommonPagination.vue";
export default {
   components: {
    pagination,
  },
  computed: {
    getEventList: {
      get() {
        return this.$store.getters["adminModule/getEventList"];
      },
      set(data) {
        this.$store.commit("adminModule/setEventList", this.data);
      }
    },
    showEvent: {
      get() {
        return this.$store.getters["adminModule/getshowEventDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowEvent", data);
      }
    },
    eventListLength() {
      return this.$store.getters["adminModule/getEventList"].length;
    }
  },
  watch: {
    eventListLength() {
      if (this.eventListLength == 0) {
        this.count = 0;
        this.empty = true;
      } else {
        this.empty = false;
        this.count = 1;
      }
    }
  },
  data() {
    return {
      pagination: {
        LIMIT: 3,
        OFFSET: 0,
        
      },
      showMore: false,
      empty: false,
      selectedEvent: {},
      showEvents: false,
    };
  },
  methods: {
       pageClicked(data) {
      this.getEvents(data);
    },
    setSelectedEvent(item) {
      this.selectedEvent = item;
      this.showMore = true;
    },
    getEvents(limit, offset) {
      let vm=this
      this.$store
        .dispatch("adminModule/getAllEvent", {
          payload: { limit: limit, offset: offset },
        })
        .then((response) => {
          if (response.data.result.length > 0) {
            this.empty = false;
                   vm.$store.commit("closeProgressBar", {});
            for (var i = 0; i < vm.getEventList.length; i++) {
              vm.getEventList[i].DATE = moment
                .unix(vm.getEventList[i].DATE / 1000)
                .format("LL");
            }
            vm.pagination = response.data.pagination;
            vm.pagination = Object.assign( {}, this.someObject, response.data.pagination);
            console.log(vm.pagination)
          } else {
            vm.empty = true;
          }
        });
    },
    next() {
      this.pagination.LIMIT += 0;
      this.pagination.OFFSET += this.pagination.LIMIT;
      this.getEvents(this.pagination.LIMIT, this.pagination.OFFSET);
     // this.pagination.OFFSET += 1;
    },

    prev() {
      this.pagination.LIMIT -= 0;
      this.pagination.OFFSET -=this.pagination.LIMIT;
      this.getEvents(this.pagination.LIMIT, this.pagination.OFFSET);
    //  this.pagination.OFFSET -=1
    },
    showEventDialog(index) {
      this.$store.commit(
        "adminModule/showEventDialog",
        JSON.parse(JSON.stringify(this.getEventList[index]))
      );
    },
    showDeleteDialog(data) {
      this.$store.commit("showDeleteDialog", {
        objectToDelete: data,
        commitToCall: "deleteSelectedEvents",
        deleteActionToDispatch: "deleteEvents"
      });
    }
  },
  beforeMount() {
    this.limit = 10;
    (this.showMore = true), this.$store.commit("showProgressBar", {});
   this.getEvents(3,0)
  }
};
</script>