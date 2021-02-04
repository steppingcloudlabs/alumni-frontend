 
<!--<template >
  <v-layout row wrap class="ma-0" style="background: #f5f5f5;padding-left:45px;padding-bottom:40px">
    <v-flex xs12>
    <p
      class="headline font-weight-bold"
      style="text-align: center; margin-top: 2%;padding-right:45px"
    >
      Empower your Alumni Network
    </p>
    </v-flex>

    <v-flex
      xs12
      sm3
      md3
      lg3
      xl3
      class="pa-2"
      v-for="(card, i) in cards"
      :key="i"
      style="text-align:center"
    >
     
        <img :src="card.pic"  style="height:100px" />

        <v-card-text
          class="black--text title-headline text-muted"
         
        >
          {{ card.text }}
        </v-card-text>
    
    </v-flex>
  </v-layout>
</template>-->

<template>
<div class="text-center" style="width:100%">
   <p
      class="headline font-weight-bold"
      style="text-align: center;color:black; margin-top: 2%;padding-right:45px"
    >
      Empower your Alumni Network
    </p>
  <div class="section-tube pt-4 bg-dotted-lines ">
    <div class="container text-center ">
     
      <v-row class="text-center">
        <v-col>
          <img src="@/assets/icon/icon-achiever.png" class="icon-colorful">
          <p class="text-sm text-muted mt-1 mb-1">Find talent through rehire and referrals from alumni</p>
        </v-col>
        <v-col>
          <img src="@/assets/icon/icon-trophy.png" class="icon-colorful mt-md-5 pt-md-5 mt-4 pt-4">
          <p class="text-sm text-muted mt-1 mb-1">Enhance employer branding by engaging your alumni</p>
        </v-col>
        <v-col>
          <img src="@/assets/icon/icon-helpdesk.png" class="icon-colorful">
          <p class="text-sm text-muted mt-1 mb-1">One-stop Exits Helpdesk for all the alumni queries</p>
        </v-col>
        <v-col>
          <img src="@/assets/icon/icon-email.png" class="icon-colorful mt-md-5 pt-md-5 mt-4 pt-4">
          <p class="text-sm text-muted mt-1 mb-1">Regular Updates about the Company To All Alumni</p>
        </v-col>
      </v-row>
    </div>
  </div>
</div>
</template>










<script>
export default {
  data() {
    return {
      cards: [
        {
          icon: "mdi-account-search",
          text: "Online Directory",
          pic: require("@/assets/icondesign/searchDir.png"),
        },
        {
          icon: "mdi-home-modern",
          text: "Company Profile",
          pic: require("@/assets/icondesign/CompanyProfile.png"),
        },
        {
          icon: "mdi-view-dashboard",
          text: "Job Board",
          pic: require("@/assets/icondesign/job.png"),
        },
        {
          icon: "mdi-newspaper",
          text: "News & Event",
          pic: require("@/assets/icondesign/news.png"),
        },
        {
          icon: "mdi-home-map-marker",
          text: "Maps",
          pic: require("@/assets/icondesign/maps.png"),
        },
        {
          icon: "mdi-file-document",
          text: "Document Center",
          pic: require("@/assets/icondesign/docs.png"),
        },
        {
          icon: "mdi-comment-question-outline",
          text: "Ask HR",
          pic: require("@/assets/icondesign/AskHR.png"),
        },
        {
          icon: "mdi-account-check",
          text: "Recommended Job Oppurtunities",
          pic: require("@/assets/icondesign/RecOpp.png"),
        },
      ],
    };
  },
  methods: {
    navtologin() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style>
.div-15 {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 215px;
  height: 52px;
  color: rgba(0, 0, 0, 1);
  font-size: 40px;
  letter-spacing: 53%;
  text-align: left;
  font-family: Roboto;
}
.featCard {
  font-size: 25px;
  /* padding-bottom: 20px; */
  border: 10px solid white;
  background-color: #f5f5f5;
  height: 100%;
  width: 250px;
  box-shadow: 15px 15px 40px -10px #808080 !important;
}
.bg-dotted-lines {
    background-image: url(https://www.vaave.com/media/dotted-lines.png);
    background-position: center 0px;
    background-repeat: no-repeat;
    width: 100%;
}
.icon-colorful {
    width: 100%;
    max-width: 85px;
}
.text-muted {
    color: #aaaaaa !important;
    font-size: 0.8em !important;
}
.section-tube {
    padding: 80px 0;
    position: relative;
}
</style>