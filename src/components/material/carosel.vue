<template>
  <v-carousel
    class="mr-5 news-carousel-wrapper"
    cycle
    hide-delimiter-background
    show-arrows-on-hover
    hide-delimiters
    @change="resetHeight()"
    cover
  >
      <div v-if="shownewsBar == true">
      <v-layout style="margin-top: 25%">
        <v-flex xs6> </v-flex>
        <v-flex xs6>
          <v-progress-circular
            class="text--center"
            color="orange"
            indeterminate
            size="44"
          ></v-progress-circular>
        </v-flex>

        <v-flex xs2> </v-flex>
      </v-layout>
    </div>
    <div v-else>
    <div v-if="!this.empty">
      
      <v-carousel-item
        v-for="(item, i) in getNewsList"
        :key="i"
      
        
      >
      <v-card >
      <v-card-text class="news-card headline font-weight-bold" style="text-align:center;font-family: Raleway; font-size: 30px;color:black"> 
           {{ item.TITLE }}
          </v-card-text>
          <v-card-text class="news-card"  style="text-align:center;color:black;padding:0px">{{ item.DATE }}</v-card-text>
          
          <v-img :src="getNewsList[i].PHOTO" height="250px">
            <!-- <div style="width:100%;height:35px;background-color:white;opacity:0.5"></div>
             <div style="width:100%;height:35px;background-color:white;opacity:0.5;position:absolute;bottom:0"></div> -->
          </v-img>
          
          <v-card-text
            class="title font-weight-light d-none d-sm-flex news-card"
            style="
              font-family: Raleway !important;
              text-align: center;  
              color:black;
              height:112px;
            "
            v-if="item.CONTENT"
          >
            <p style="text-align: center;width: 100%;">
              {{item.CONTENT.substring(0, 200)}}
            </p>
            <!-- <button
              v-if="!showMore && item.CONTENT.length > len"
              @click="myFunction(i)"
              id="myBtn"
            >
              Read more
            </button>
            <button v-if="showMore" @click="myFunction(i)" id="myBtn">
              Read less
            </button> -->
          </v-card-text>
          <!-- </v-card> -->
         
        </v-card>
      </v-carousel-item>
    </div>
    <div v-else>
      <v-carousel-item>
        <v-sheet color="grey" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div
              class="subtitle-1"
              style="margin-right: auto; margin-left: auto"
            >
              No News Available
              <v-img
                width="100"
                height="100"
                src="@/assets/waiting.gif"
              ></v-img>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </div>
    </div>
  </v-carousel>
</template>
<!--<template>
  <v-carousel
    class="mr-5 news-carousel-wrapper"
    :height="heightCarousel"
    hide-delimiter-background
    show-arrows-on-hover
    hide-delimiters
    cycle
    @change="resetHeight()"
    cover
  >
    <div v-if="!this.empty">
      <v-carousel-item
        v-for="(item, i) in getNewsList"
        :key="i"
        :src="getNewsList[i].PHOTO"
      >
        <v-card class="px-5 py-5" color="transparent" height="100%">
          <v-card-title>
            <span
              class="headline font-weight-bold"
              style="font-family: Raleway; font-size: 30px"
              >{{ item.TITLE }}</span
            >
          </v-card-title>
          <v-card-text>{{ item.DATE }}</v-card-text>
          <v-card-text
            class="title font-weight-light d-none d-sm-flex"
            style="
              font-family: Raleway !important;
              text-align: justify;
              color: white;
            "
            v-if="item.CONTENT"
          >
            <p>
              {{ item.CONTENT.substring(0, len) }}
             
            </p>
          
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
            <div
              class="subtitle-1"
              style="margin-right: auto; margin-left: auto"
            >
              No News Available
              <v-img
                width="100"
                height="100"
                src="@/assets/waiting.gif"
              ></v-img>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </div>
  </v-carousel>
</template>-->

<script>
import moment from "moment";
export default {
  computed: {
    getNewsList: {
      get() {
        return this.$store.getters["userModule/getNewsList"];
      },
      set(data) {
        this.$store.commit("userModule/setNewsList", this.data);
      },
    },
    showNews: {
      get() {
        return this.$store.getters["adminModule/getshowNewsDialog"];
      },
      set(data) {
        this.$store.commit("adminModule/setShowNews", data);
      },
    },
  },
  beforeMount() {
    
        this.shownewsBar = true;
      
    this.$store
      .dispatch("userModule/getAllNews", { payload: { offset: 0, limit: 10 } })
      .then((response) => {
        this.shownewsBar=false
        this.len = 390;
        (this.limit = 1), (this.skip = 0), (this.heightCarousel = 350);
        if (response.data.result.length > 0) {
          this.empty = false;
          for (var i = 0; i < this.getNewsList.length; i++) {
            this.getNewsList[i].DATE = moment
              .unix(this.getNewsList[i].DATE / 1000)
              .format("LL");
          }
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
        this.heightCarousel = 150 + this.len / 2;
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
    },
  },

  data() {
    return {
      shownewsBar: false,
      iteration: 1,
      limit: 1,
      skip: 0,
      heightCarousel: 550,
      len: 390,
      showMore: false,
      empty: false,
      

     
       
    };
  },
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
.news-card
{
  background-color:#F7F7F7  !important;
  /* opacity:0.8  !important */
}
/* .news-carousel-wrapper .v-responsive__content {
  background: rgb(0, 0, 0, 0.5);
} */
.news-carousel-wrapper,.v-image
{
height: 700px;
}

@media screen and (max-width: 992px) {
  .news-carousel-wrapper,.v-image
{
height: 600px !important;
}
}

/* On screens that are 600px or less, set the background color to olive */
 @media screen and (max-width: 640px) {
 .news-carousel-wrapper,.v-image
{
height: 200px !important;
}
} 
</style>