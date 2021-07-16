<template>
  <v-carousel
  
    style="margin-top: -48px; padding-bottom: 10px"
    class="homeCarousel"
    hide-delimiter-background
    show-arrows-on-hover
    cycle
  >
    <v-carousel-item v-for="(slide, i) in getDynamicImage" :key="i" :src="getDynamicImage[i].url">
      <!-- <v-overlay :absolute="true" color="black"> -->
      <v-row class="fill-height" align="center" justify="center"> </v-row>
      <!-- </v-overlay> -->
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  computed:
  {
     getDynamicImage: {
      get() {
        return this.$store.getters["userModule/getDynamicImage"];
      },
      set(data) {
        this.$store.commit("userModule/setDynamicImage", data);
      },
    },
    // items()
    // {
    //   return [
    //     {
    //       src: this.getDynamicImage[1]["url"],
    //       text: "test",
    //     },
    //     {
    //       src: this.getDynamicImage[2]["url"],
    //     },
    //     {
    //       src: this.getDynamicImage[3]["url"],
    //     },
    //     {
    //       src: this.getDynamicImage[4]["url"],
    //     },  
    //   ]
    //   }
    
  },
  data() {
    return {
      // items: [
      //   {
      //     src: "http://localhost:8000/user/setting/theme/getDynamicImage?query=LANDINGIMAGE1",
         
      //   },
      //   {
      //     src: "http://localhost:8000/user/setting/theme/getDynamicImage?query=LANDINGIMAGE1",
      //   },
      //   {
      //     src: "http://localhost:8000/user/setting/theme/getDynamicImage?query=LANDINGIMAGE1",
      //   },
      //   {
      //     src: "http://localhost:8000/user/setting/theme/getDynamicImage?query=LANDINGIMAGE1",
      //   },  
      //   // {
      //   //   src: require("@/assets/shutterstock/landing1.jpg"),
      //   // src: require("@/assets/compresspng/landingF-min.png"),
      //   // }
      // ],
    };
  },
  beforeMount()
  {
     this.getImages()
  },
  methods:
  {
    async getImages()
    {
      let final=[]
      let query=["LANDINGIMAGE1","LANDINGIMAGE2","LANDINGIMAGE3","LANDINGIMAGE4"]
      for(let i=0;i<query.length;i++)
      {
        let x = await this.$store.dispatch("userModule/getDynamicImage", query[i]);
        final.push(x.result)
      }
      let resolvedArray = await Promise.all(final);
      console.log(resolvedArray)
      this.getDynamicImage=resolvedArray
    }
  }
  
};
</script>
<style >
.v-responsive__content {
  width: 100% !important;
}
.homeCarousel,.v-image
{
height: 700px;
}

@media screen and (max-width: 992px) {
  .homeCarousel,.v-image
{
height: 600px !important;
}
}

/* On screens that are 600px or less, set the background color to olive */
 @media screen and (max-width: 640px) {
 .homeCarousel,.v-image
{
height: 200px !important;
}
} 
</style>