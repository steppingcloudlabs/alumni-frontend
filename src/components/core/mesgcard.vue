<template>
 <v-parallax
    height="600"
    style="width:100%"
    src="@/assets/shutterstock/msg.jpg"
  >
<v-overlay :absolute="true" color="black">
  <v-card flat tile min-height="550px" color="transparent"  style="padding-top:3%;padding-bottom:5%;" >
    <v-card-title >
      <p class=" font-weight-bold"  style="margin:auto; font-size:25px">Message from Director's Desk</p>
    </v-card-title>
    <v-layout row wrap style="padding-top:3%;">
      <v-flex xs4 sm4 md4 lg4 xl4>
        <div style="margin-left:18%; ">
        <v-img  style="border-radius:10%" height="350px" width="300px" src="@/assets/director.jpg"></v-img>
      </div>
      </v-flex>
      
      <v-flex xs8 sm8 md8 lg8 xl8>
        <v-card max-width="100%" elevation="0" color="transparent" style="margin-left:3%;margin-right:6%">
          <v-card-title >
            <span class="title font-weight-light" style="margin-top:-25px;">Testing Heading</span>
          </v-card-title>

          <v-card-text style="margin-top:2%">
            
          {{message}}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</v-overlay>
 </v-parallax>

  <!-- <div class="d-flex flex-no-wrap justify-space-between" style="margin: 0 100px;">
    <div>
      <v-card-title style="margin:10px" class="headline white--text">Message From Director</v-card-title>

      <v-card-text class="white--text" style="margin:10px; padding-right: 100px;" v-text="message"></v-card-text>
      <v-card-text
        style="margin:10px; padding-right: 100px; font-size:20px; color: orange; letter-spacing:1px;"
        v-text="ceoName"
      ></v-card-text>
    </div>
    <div class="item">
      <v-avatar class="ma-3" style="border-radius: 50%;" size="250" tile>
        <v-img src="@/assets/director.jpg"></v-img>
      </v-avatar>
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      message:
        "Welcome to our new Stepping Cloud Alumni digital platform. We believe you will find it provides greatly enhanced capability for communicating with one another and staying abreast of our many alumni activities. I am very proud of our alumni organization. I believe it is unique in keeping us together and through our chapters, Foundation and individual members making a positive contribution to our communities.",
      ceoName: "Tausif Rahman",
      // image:require("@/assets/dashboard.jpg")
    };
  },
};
</script>
<style>
div.item {
  vertical-align: top;
  display: inline-block;
  text-align: center;
}
.caption {
  display: block;
}
.d-flex.flex-no-wrap.justify-space-between {
  /* background-image: url("/assets/login.jpg"); */
  background-size: cover;
}
</style>