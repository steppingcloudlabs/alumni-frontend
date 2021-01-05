<template>
  <div class="events" style="width: 95%;  height: 550px">
    <v-card-title style="color: white; text-align: center"
      >Upcoming Events</v-card-title
    >
    <v-divider
      class="mr-5 mb-2"
      style="background: rgb(241, 135, 16)"
    ></v-divider>
    <div v-if="showeventBar==true" >
      <v-layout style="margin-top:25%">
        <v-flex xs5>
        </v-flex>
          <v-flex xs5>
             <v-progress-circular class="text--center" color="orange" indeterminate size="44"></v-progress-circular>
        </v-flex>
   
      <v-flex xs2>
        </v-flex>
      </v-layout>
    </div>
    <div v-else>
    <div v-if="getEventList.length">
      <v-col v-for="(item, i) in getEventList" :key="i" cols="12">
        <v-card>
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.PHOTO"></v-img>
            </v-avatar>
            <div>
              <v-card-title class="headline" v-text="item.TITLE"></v-card-title>
              <v-card-text v-text="item.DATE"></v-card-text>
              <v-card-text class="py-0" v-text="item.CONTENT"></v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
      <div style="margin-bottom:30px!important">
      <pagination
        :next="next"
        :prev="prev"
        :totalLength="pagination.TOTALPAGES"
        @pageClicked="pageClicked"
      ></pagination>
      </div>
    </div>
    <div v-else>
      <p class="white--text text-center">
        No Events Available
        <v-img
          style="margin-right: auto; margin-left: auto"
          width="100"
          height="100"
          src="@/assets/waiting.gif"
        ></v-img>
      </p>
    </div>
    </div>
    <!--     
    <div class="events-group-container">
      <v-sheet color="transparent"  class="mx-auto" elevation="8" width="1145px" v-if="!empty">
        <v-slide-group show-arrows>
          <v-slide-item
            v-for="(item, i) in getEventList"
            :key="i"
            v-slot:default="{ active, toggle }"
          >
            <v-card class="mt-3 ma-4" color="White" min-width="150px">
              <v-img
                src="@/assets/calender.png"
                width="100"
                style="margin-top:10px; margin-left:auto;margin-right:auto;"
              >
                <p
                  class="mb-1 mt-5"
                  style="text-align: center; margin-top:10px; font-size:15px;  color:black"
                >August</p>
                <p style="text-align: center;  font-size:20px; font-weight:300;color:black">19</p>
              </v-img>
              <p class="subtitle-1 mt-2 mb-2" style="text-align:center; color:black;">{{item.title}}</p>
          <v-card-text py-1
              style="font-family:Raleway;text-align:center;color:white;font-size:10px;"
    >{{item.content}}</v-card-text>-->
    <!-- <p class="text-center">
                <v-btn
                  style="color: rgb(241, 135, 16); font-weight: 200;"
                  @click="setSelectedEvent(item)"
                  outlined
                >Read More</v-btn>
              </p>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-divider vertical></v-divider>
    </div>
    <v-layout row wrap class="ma-0" v-if="showMore">
      <v-flex xs12>
        <v-card class="mr-4">
          <v-img
            :src="selectedEvent.photo"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>
              {{ selectedEvent.title }}
              <v-spacer></v-spacer>
              <v-icon color="white" @click="showMore=false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text style="color:white;font-size:10px" class="pb-0">{{selectedEvent.date}}</v-card-text>
            <v-card-text style="color:white">
              <div>{{ selectedEvent.content }}</div>
            </v-card-text>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>-->
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
        return this.$store.getters["userModule/getEventList"];
      },
      set(data) {
        this.$store.commit("userModule/setEventList", this.data);
      },
    },
    // showEvent: {
    //   get() {
    //     return this.$store.getters["adminModule/getshowEventDialog"];
    //   },
    //   set(data) {
    //     this.$store.commit("adminModule/setShowEvent", data);
    //   },
    // },
  },
  methods: {
    pageClicked(data) {
      let lim=(data-1)*2
      this.getEvents(2,lim);
    },
    setSelectedEvent(item) {
      this.selectedEvent = item;
      this.showMore = true;
    },
    getEvents(limit, offset) {
      // this.$store.commit("showProgressBar", {});
      this.showeventBar=true
      let vm=this
      this.$store
        .dispatch("userModule/getAllEvent", {
          payload: { limit: limit, offset: offset },
        })
        .then((response) => {
          // this.$store.commit("closeProgressBar", {});
          this.showeventBar=false
          if (response.data.result.length > 0) {
            vm.empty = false;
           
            for (var i = 0; i < vm.getEventList.length; i++) {
              vm.getEventList[i].DATE = moment
                .unix(this.getEventList[i].DATE / 1000)
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
    },

    prev() {
      this.pagination.LIMIT -= 0;
       this.pagination.OFFSET -= this.pagination.LIMIT;
      this.getEvents(this.pagination.LIMIT, this.pagination.OFFSET);
    },
  },
  beforeMount() {
    this.getEvents(2, 0);
    // this.$store
    //   .dispatch("adminModule/getAllEvent", { payload: {} })
    //   .then(response => {
    //     if (response.data.result.length > 0) {
    //       this.empty = false;
    //       for (var i = 0; i < this.getEventList.length; i++) {
    //         this.getEventList[i].date = moment
    //           .unix(this.getEventList[i].date / 1000)
    //           .format("LL");
    //       }

    //     } else {
    //       this.empty = true;
    //     }
    //   });
  },

  data() {
    return {
      showeventBar:false,
      model: {},
      pagination: {
        LIMIT: 2,
        OFFSET: 0,
        TOTALPAGES:0
      },
      showMore: false,
      empty: false,
      selectedEvent: {},
      showEvents: false,
      colors: [
        "indigo",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
        "indigo",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
        "indigo",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
        "indigo",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],

      //  {
      //     id: 3,
      //     eventTitle: "Hello asdf",
      //     eventDescription: "AFGdnbvfbfjnbmkvmvckmdfvnfjvnjvjvnjcjjf",
      //     eventLocation: "USA",
      // },
      // {
      //     id: 4,
      //     eventTitle: "Hello asdf",
      //     eventDescription: "AFGdnbvfbfjnbmkvmvckmdfvnfjvnjvjvnjcjjf",

      //     eventLocation: "USA",
      // },
      // {
      //     id: 5,
      //     eventTitle: "Hello asdf",
      //     eventDescription: "AFGdnbvfbfjnbmkvmvckmdfvnfjvnjvjvnjcjjf",

      //     eventLocation: "USA",
      // },
    };
  },
};
</script>
<style >
div.item {
  vertical-align: top;
  display: inline-block;
  text-align: center;
}
.events {
  margin-left: unset;
  margin-right: unset;
}
/* .events-group-container .v-sheet .v-slide-group__prev {
  display: flex !important;
}
.events-group-container .v-sheet .v-slide-group__next {
  display: flex !important; */
/* } */
</style>