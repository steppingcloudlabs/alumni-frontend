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
    <div>
      <v-slide-group multiple show-arrows>
        <v-slide-item
          v-for="(item, i) in getEventList"
          :key="i"
          v-slot:default="{ active, toggle }"
        >
          <v-layout>
            <v-flex xs6>
              <v-card class="mt-3" color="transparent">
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
                <p
                  class="subtitle-1 mt-2 mb-2"
                  style="text-align:center; color:black; color:white"
                >{{item.title}}</p>
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
            </v-flex>
          </v-layout>
        </v-slide-item>
      </v-slide-group>
      <v-divider vertical></v-divider>
    </div>
    <v-layout row wrap class="ma-0">
      <v-flex xs12>
        <v-card class="mr-4">
          <v-card-title>{{ selectedEvent.title }}</v-card-title>
          <v-card-text>{{ selectedEvent.content }}</v-card-text>
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
</style>