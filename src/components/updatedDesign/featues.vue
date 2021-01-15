<template>
  <v-layout row wrap class="ma-0" style="height:600px;padding-bottom:5%">
      <v-flex xs12 style="text-align:center;margin-top:8%">
          <span class="headline font-weight-bold">Our Features</span>
      </v-flex>   
    <v-flex
      style="margin-top:1%"
      xs12 sm4 md4 lg4 xl4
      class="pa-5"
      v-for="(card, i) in cards"
      :key="i"
       >
       <v-card  style=" font-size: 20px;
      border-radius: 10px;
      box-shadow:  15px 15px 40px -10px #D3D3D3;
      margin-top:5px;
      background-color:white;
      text-align: center;
      ">
         
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
    <v-flex xs12 sm12 md12 lg12 xl12 style="text-align:center;">
          <v-btn x-large tile  color="#E4BA18" style="margin-top:20px;"  @click="navtologin" >LOG IN TO ALUMNI DASHBOARD</v-btn>
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
</style>