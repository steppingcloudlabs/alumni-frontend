<template>
  <v-parallax
    height="600"
    style="width: 100%"
    src="@/assets/shutterstock/parallax.jpg"
  >
    <v-overlay :absolute="true" color="blue">
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

         <p style="text-align:center">
                <v-btn x-large tile color="orange" elevation="2"> Subscribe</v-btn>
         </p>
       
      
    </v-overlay>
  </v-parallax>
</template>

<script>
export default {
  data() {
    return {
           
     email:""
      // image:require("@/assets/dashboard.jpg")
    };
  },
}
</script>
<style lang="sass">

</style>