<template>
<div >
  <v-layout row  wrap px-5 py-2 class="elevation-9" 
   style="background:#1A1A1D"
  >
    <v-flex xs9>
      
      <img :src="companyData.titan.companyLogo" height="50" />
       </v-flex>
        <v-flex xs1>
       <v-list-item link >
      <v-list-item-title class="list-item-12"  style="font-size:12px;color:#66FCF1;"   @click=navtoHome>Home</v-list-item-title> 
    </v-list-item>
  
    </v-flex>
      <v-flex xs1>
    <v-list-item  link >
      <v-list-item-title class="list-item-12"  style="font-size:12px;color:#66FCF1;" v-if="$route.path == '/home'" @click=navtologin>Login</v-list-item-title> 
    </v-list-item>
    </v-flex>
    <v-flex xs1>
    <v-list-item link >
      <v-list-item-title class="list-item-12"  style="font-size:12px;color:#66FCF1;"  v-if="$route.path == '/home'" @click=navtosignup>Signup</v-list-item-title>
    </v-list-item>
    </v-flex>
  </v-layout>
 
</div>
</template>



<script>

import data from "@/assets/data";

export default {
  data() {
    return {
      companyData: data
    };
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    navtologin(){
    this.$router.push({ path:'/signin' })

    },

navtosignup(){
    this.$router.push({ path:'/signup' })

    },
    navtoHome(){
    this.$router.push({ path:'/home' })

    }
  }
};
</script>

<style>
.vertical-align-content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

  .list-item-12{
    font-family: 'Raleway';
    color: beige;
    
  }
  
</style>
