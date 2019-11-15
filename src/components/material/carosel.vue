<template>
  <v-carousel
    class="mr-5 news-carousel-wrapper"
    :height="heightCarousel"
    hide-delimiter-background
    show-arrows-on-hover
    hide-delimiters
    @change="resetHeight()"
  >
    <div v-if="!this.empty">
      <v-carousel-item
        v-for="(item, i) in getNewsList"
        :key="i"
        :src="getNewsList[i].photo"
        style="background-color:rgba(0,0,0,0.5)"
      >
        <v-card class="px-5 py-5" color="transparent" height="100%">
          <v-card-title>
            <span
              class="headline font-weight-bold"
              style="font-family:Raleway;font-size:30px"
            >{{item.title}}</span>
          </v-card-title>
          <v-card-text>{{item.date}}</v-card-text>
          <v-card-text
            class="title font-weight-light"
            style="font-family:Raleway !important;text-align:justify;color:white"
          >
            <p>
              {{item.content.substring(0,len)}}
              <span
                id="dots"
                v-if="!showMore && item.content.length>len"
              >...</span>
            </p>
            <button
              v-if="!showMore && item.content.length>len"
              @click="myFunction(i)"
              id="myBtn"
            >Read more</button>
            <button v-if="showMore" @click="myFunction(i)" id="myBtn">Read less</button>
          </v-card-text>
          <br />
          <br />
        </v-card>
      </v-carousel-item>
    </div>
    <div v-else>
      <v-carousel-item>
        <v-sheet color="grey" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="subtitle-1" style="margin-right: auto;
    margin-left: auto;">
              No News Available
              <v-img width="100" height="100" src="@/assets/waiting.gif"></v-img>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </div>
  </v-carousel>
</template>

<script>
import moment from "moment";
export default {
  computed: {
    getNewsList: {
      get() {
        return this.$store.getters["adminModule/getNewsList"];
      },
      set(data) {
        this.$store.commit("adminModule/setNewsList", this.data);
      }
    },
    showNews: {
      get() {
        return this.$store.getters["adminModule/getshowNewsDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowNews", data);
      }
    }
  },
  beforeMount() {
    this.$store.commit("showProgressBar", {});
    this.$store.dispatch("adminModule/getAllNews").then(response => {
      this.len = 390;
      this.heightCarousel = 350;
      if (response.data.result.length > 0) {
        this.empty = false;
      } else {
        this.empty = true;
      }
    });
    this.$store.commit("closeProgressBar", {});
  },
  methods: {
    myFunction(data) {
      if (!this.showMore) {
        this.showMore = true;
        this.len = this.getNewsList[data].content.length;
        this.heightCarousel = 50 + this.len / 2;
      } else {
        this.showMore = false;
        this.len = 390;
        this.heightCarousel = 350;
      }
    },
    resetHeight() {
      this.heightCarousel = 350;
      this.showMore = false;
      this.len = 390;
    }
  },

  data() {
    return {
      heightCarousel: 350,
      len: 390,
      showMore: false,
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
          eventTitle: "Annual Sports News",
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
#more {
  display: none;
}
div.item {
  vertical-align: top;
  display: inline-block;
  text-align: center;
}
.news-carousel-wrapper .v-responsive__content {
  background: rgb(0, 0, 0, 0.5);
}
</style>