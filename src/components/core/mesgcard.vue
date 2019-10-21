<template>
  <div class="d-flex flex-no-wrap justify-space-between" style="margin: 0 100px;">
    <div>
      <v-card-title style="margin:10px" class="headline white--text">Message From Director</v-card-title>

      <v-card-text class="white--text" style="margin:10px; padding-right: 100px;" v-text="message"></v-card-text>
      <v-card-text  style="margin:10px; padding-right: 100px; font-size:20px; color: orange; letter-spacing:1px;" v-text="ceoName"></v-card-text>
    </div>
    <div class="item">
      <v-avatar class="ma-3" style="border-radius: 50%;" size="250" tile>
        <v-img src="@/assets/director.jpg"></v-img>
      </v-avatar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message:
        "Welcome to our new Stepping Cloud Alumni digital platform. We believe you will find it provides greatly enhanced capability for communicating with one another and staying abreast of our many alumni activities. I am very proud of our alumni organization. I believe it is unique in keeping us together and through our chapters, Foundation and individual members making a positive contribution to our communities.",
      ceoName: "Tausif Rahman"
      // image:require("@/assets/dashboard.jpg")
    };
  }
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
  background-image: url("/assets/login.jpg");
  background-size: cover;
}
</style>