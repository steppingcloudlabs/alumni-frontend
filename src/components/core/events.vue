<template>
  <div style="width:100%">
    <v-layout>
      <v-flex xs4></v-flex>
      <v-flex xs4>
        <v-card-title style="color:white; text-align:center">Upcoming Events</v-card-title>
      </v-flex>
      <v-flex xs4></v-flex>
    </v-layout>
    <v-divider class="mr-5 my-5" style="background:rgb(241, 135, 16);"></v-divider>
    <div class="events-group-container">
      <v-sheet class="mx-auto" elevation="8" max-width="900">
        <v-slide-group show-arrows>
          <v-slide-item
            v-for="(item, i) in getEventList"
            :key="i"
            v-slot:default="{ active, toggle }"
          >
            <v-card class="mt-3 ma-4" color="transparent" min-width="150px">
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
              <!-- <v-card-text py-1
              style="font-family:Raleway;text-align:center;color:white;font-size:10px;"
              >{{item.content}}</v-card-text>-->
              <p class="text-center">
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
    </v-layout>
  </div>
</template>

<script>
export default {
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
    }
  },
  methods: {
    setSelectedEvent(item) {
      this.selectedEvent = item;
      this.showMore = true;
    }
  },
  beforeMount() {
    this.$store.dispatch("adminModule/getAllEvent").then(response => {
      if (response.data.result.length > 0) {
        this.empty = false;
      } else {
        this.empty = true;
      }
    });
  },

  data() {
    return {
      model: {},
      showMore: false,
      empty: false,
      selectedEvent: {},
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
        "deep-purple accent-4"
      ]

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
  }
};
</script>
<style >
div.item {
  vertical-align: top;
  display: inline-block;
  text-align: center;
}
.events-group-container .v-sheet .v-slide-group__prev {
  display: inline !important;
}
.events-group-container .v-sheet .v-slide-group__next {
  display: inline !important;
}
</style>