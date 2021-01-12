<template>
  <v-layout row wrap class="ma-0" style="height:450px;padding-bottom:5%">
      <v-flex xs12 style="text-align:center;margin-top:5%">
          <span class="headline font-weight-bold">Our Features</span>
      </v-flex>
    <v-flex
      style="margin-top:1%"
      xs4
      class="pa-5"
      v-for="(card, i) in cards"
      :key="i"
       >
       <v-card flat tile>
           <v-card-title>
                    <v-icon large left> {{card.icon}}</v-icon>
                    <br/>
                    <span class="title font-weight-light">{{card.text}}</span>
           </v-card-title>
           <v-card-text>
                    "Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam."
           </v-card-text>
       </v-card>
      
    </v-flex>
    <v-flex xs12 style="text-align:center">
          <v-btn x-large tile  color="orange" @click="navtologin" >LOG IN TO ALUMNI DASHBOARD</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data() {
    return {
      cards: [
        {
          icon: "mdi-message",
          text:"Message"
        },
        { icon: "mdi-account-outline", text: "Update My Information" },
        { icon: "mdi-account-search", text: "Search Alumni Directory" }
      ]
    };
   
  },
   methods:{
        navtologin() {
      this.$router.push({ path: "/login" });
    },  
    }
};
</script>
