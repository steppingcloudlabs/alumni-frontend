<template>
  <v-carousel  class=" mr-5" cycle height="300px" hide-delimiter-background show-arrows-on-hover hide-delimiters>
    <div v-if="!this.empty">
    <v-carousel-item v-for="(item, i) in getEventList" :key="i" src="@/assets/dash1.jpg">
      
      <v-card :color="colors[i]" height="100%">
        <v-card-title>
          <v-icon large left>mdi-bullhorn</v-icon>
          <span class="title font-weight-bold"  style="font-family:Raleway;">{{item.title}}</span>
        </v-card-title>
        <br />
        <br />
        <v-card-text class="headline font-weight-light" style="font-family:Raleway;">{{item.content}}</v-card-text>
        <br />
        <br />
       
        <v-card-actions>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
              class="mb-5"
              bottom
              absolute
              icon
              >
              <v-icon bottom class="mr-1">mdi-map-marker</v-icon>
              </v-btn>
              {{item.eventLocation}}
            </v-list-item-title>
          
         
          </v-list-item-content>
        </v-card-actions>
      </v-card>
    </v-carousel-item>
    </div>
    <div v-else>
       <v-carousel-item>
      <v-sheet
        color="grey"
        height="100%"
        
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="subtitle-1" style="    margin-right: 200px;">No Events Available <v-img  width="100"
      height="100" src="@/assets/waiting.gif"></v-img></div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    </div>
  </v-carousel>
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
      empty:false,
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

      event: [
        {
          id: 1,
          eventTitle: "Alumni Meet",
          eventDescription:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

          eventLocation: "New Delhi"
        },
        {
          id: 2,
          eventTitle: "Annual Sports Event",
          eventDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          eventLocation: "USA"
        }
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
      ]
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