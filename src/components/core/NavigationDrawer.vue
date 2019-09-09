<template>
  <v-card style="height:100%">
    <v-navigation-drawer id= "app-drawer" permanent style="background:#1A1A1D">
      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon style="color:#66FCF1">
            <i class="fas fa-user text-center nav-icon-wrapper"></i>
          </v-list-item-icon>
          <v-list-item-title style="color:#66FCF1">My Profile</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon style="color:#66FCF1">
            <i class="fas fa-users text-center nav-icon-wrapper"></i>
          </v-list-item-icon>
          <v-list-item-title style="color:#66FCF1">Clearance Portlet</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon style="color:#66FCF1">
            <i class="fas fa-file text-center nav-icon-wrapper"></i>
          </v-list-item-icon>
          <v-list-item-title style="color:#66FCF1">Document Portlet</v-list-item-title>
        </v-list-item>
         <v-list-item link>
          <v-list-item-icon style="color:#66FCF1">
            <i class="fas fa-briefcase text-center nav-icon-wrapper"></i>
          </v-list-item-icon>
          <v-list-item-title style="color:#66FCF1" @click="navtocareers">Careers</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon style="color:#66FCF1">
            <i class="fas fa-comments text-center nav-icon-wrapper"></i>
          </v-list-item-icon>
          <v-list-item-title style="color:#66FCF1">Ask HR</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data()
{
  
},
methods:{
   navtocareers(){
    this.$router.push({ path:'/careers' })

    },

}
};
</script>

<style>
.nav-icon-wrapper {
  color: #717171;
  font-size: 18px;
  margin-left: auto;
  margin-right: auto;
}
</style>
