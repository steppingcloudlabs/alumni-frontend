<template>
  <v-layout row wrap>
      <v-row>
          <updatedcarousel/>
      </v-row>
      <v-row>
          <newsletter/>
      </v-row>
  </v-layout> 
</template>

<script>
  import updatedcarousel from "@/components/updatedDesign/updatedCarsol.vue";
  import newsletter from "@/components/updatedDesign/Newslettersubscription.vue";
export default {
  components:{
     updatedcarousel,
     newsletter
  }
}
</script>