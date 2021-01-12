<template>
  <v-parallax
    height="600"
    style="width: 100%"
    src="@/assets/shutterstock/parallax.jpg"
  >
    <v-overlay :absolute="true" color="blue">
      <p class="text--center">
        <span style="font-size: 25px"
          >Don’t Miss Awesome Newsletter From Us!!</span
        >
        <span style="font-size: 10px">
          <v-text-field
            v-model="email"
            single-line
            color="white"
            label="Your Email Address"
          ></v-text-field>
        </span>
        <v-btn
  color="primary"
  elevation="2"
>Subscribe</v-btn>
      </p>
    </v-overlay>
  </v-parallax>
</template>