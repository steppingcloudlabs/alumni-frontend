<template>
  <v-card class="mr-5" height="300px" width="100%">
    <v-layout>
      <v-flex xs4></v-flex>
      <v-flex xs4>
        <v-card-title  >Upcoming Events</v-card-title>
      </v-flex>
      <v-flex xs4></v-flex>
    </v-layout>
    <v-divider></v-divider>
    <div>
      <v-layout>
        <v-flex xs4 v-for="(item, i) in 3" :key="i">
          <v-card height="200px" class="mt-3">
            <v-card-title style="margin-left:120px;color:black">Hey</v-card-title>
            <v-card-text
              class="headline font-weight-light"
              style="font-family:Raleway;margin-left:120px;color:black"
            >Hello</v-card-text>
            <v-card-actions style="margin-left:120px;">
                <v-btn color="blue">Read More</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider vertical></v-divider>
    </div>
  </v-card>
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