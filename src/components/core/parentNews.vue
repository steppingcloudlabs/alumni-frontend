<template>
<v-layout row wrap>
    <v-flex xs12 lg8 xl8 md8>
        <newsdetail/>
    </v-flex>
  
    <v-flex xs12 lg4 xl4 md4>
      <newslist/>
    </v-flex>


</v-layout>
</template>
<script>
import newsdetail from './newsdetail.vue';
import newslist from './newslist.vue'
export default {
  components:
   { 
       newsdetail, 
       newslist 
       }

}
</script>

