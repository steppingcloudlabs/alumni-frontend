<template>
<div >
  <v-layout row  wrap px-5 py-2 class="elevation-9" 
   style="background:#1A1A1D"
  >
    <v-flex xs9  >
      <img :src="companyData.titan.companyLogo" height="50" />
       </v-flex>
       
       
       
        <v-flex xs1>
       <v-list-item link >
      <v-list-item-title class="list-item-12"  style="font-size:12px;color:#66FCF1;"   @click=navtoHome>Home</v-list-item-title> 
    </v-list-item>
    </v-flex>
    
      <v-flex xs1 v-if="$route.path == '/home'">
   <v-menu   bottom
      origin="center center"
      transition="scale-transition"
      color="#1A1A1D">
      <template v-slot:activator="{ on }">
        <v-list-item link >
      <v-list-item-title  v-on="on" class="list-item-12"  style="font-size:12px;color:#66FCF1;"  >Login</v-list-item-title>
    </v-list-item> 
      </template>
      <v-list>
        <v-list-item link
          v-for="(item, index) in items"
          :key="index"
        :to="item.nav"
        
        >
          <v-list-item-title  >{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-flex>
   



    <v-flex xs1  v-if="$route.path == '/home'">
    <v-list-item link >
      <v-list-item-title class="list-item-12"  style="font-size:12px;color:#66FCF1;"  @click=navtosignup>Signup</v-list-item-title>
    </v-list-item> 
    </v-flex>

  </v-layout>
 
<landingimage v-if="$route.path == '/home'" ></landingimage>

</div>
</template>



<script>

import data from "@/assets/data";
import landingimage from "@/components/core/landingimage";

export default {
   components: {
    
    landingimage,
  },
  data() {
    return {
      companyData: data,
      paths:[
        {
          path:'/profile'
        },
         {
          path:'/clearance'
        },
         {
          path:'/careers'
        },
         {
          path:'/documents'
        },
      ],
       items: [
        { title: 'Admin' ,nav:'/admin'},
        { title: 'Alumni',nav:'/signin' },
       
      ],
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

    },
     navtocareers(){
    this.$router.push({ path:'/careers' })

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
