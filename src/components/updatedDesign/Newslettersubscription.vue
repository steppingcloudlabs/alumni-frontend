<template>
  <v-parallax
    height="600"
    style="width: 100%"
    src="@/assets/shutterstock/parallax.jpg"
  >
    <v-overlay :absolute="true" color="black">
      <p class="text--center">
        <span style="font-size: 25px"
          >Don’t Miss Awesome Newsletter From Us!!
        </span>
        <span style="font-size: 10px">
          <v-text-field
            class="text--center"
            v-model="email"
            single-line
            color="white"
            label="Your Email Address"
          ></v-text-field>
        </span>
      </p>

      <p style="text-align: center">
        <v-btn x-large tile color="#E4BA18" elevation="2"> Subscribe</v-btn>
      </p>
    </v-overlay>
  </v-parallax>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      // image:require("@/assets/dashboard.jpg")
    };
  },
};
</script>
<style >
/* For desktop: */
.col-1 {
  width: 8.33%;
}
.col-2 {
  width: 16.66%;
}
.col-3 {
  width: 25%;
}
.col-4 {
  width: 33.33%;
}
.col-5 {
  width: 41.66%;
}
.col-6 {
  width: 50%;
}
.col-7 {
  width: 58.33%;
}
.col-8 {
  width: 66.66%;
}
.col-9 {
  width: 75%;
}
.col-10 {
  width: 83.33%;
}
.col-11 {
  width: 91.66%;
}
.col-12 {
  width: 100%;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="col-"] {
    width: 100%;
  }
  .span {
    font-size: 10px !important;
  }
}
</style>