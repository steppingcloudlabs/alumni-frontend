<template>
<div>
    <v-img
        height="500px"
        src="@/assets/back5.jpg"
      >   <core-app-bar ></core-app-bar></v-img>
      <v-row>
          
          <v-col cols="12" md="8">
               <v-toolbar
           elevation='0'
         color="#5097DD"
         class="white--text" >
<v-toolbar-title  class="headline mb-2">News </v-toolbar-title>
</v-toolbar>
            <v-card width="750px">
            
    <v-card
      v-for="(item,i) in 7"
      :key="i"
    >
    <v-list-item three-line>
    <v-list-item-avatar
        tile
        size="50"
        color="grey"
      ></v-list-item-avatar>

      
      <v-list-item-content>
        <v-list-item-title class="headline mb-2">Headline</v-list-item-title>
        <v-list-item-subtitle>News Description Here</v-list-item-subtitle>
      </v-list-item-content>

      
    </v-list-item>
    </v-card>
  </v-card>
          </v-col>
          <v-col cols="12" md="4">
              <v-row>
               <v-card
            color='#5097DD'
            dark
          >
       <v-card-text class="white--text">
              <div class="headline mb-2">Clearance Status</div>
                You can download your form 16 here.
            </v-card-text>

            <v-card-actions>
              <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Check Here</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Clearance Status</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>Status</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>F&F status</v-list-item-title>
              <v-list-item-subtitle>Your F&F status is pending</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Payslips</v-list-item-title>
              <v-list-item-subtitle>Your payslips are available</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
              </v-row>
              <v-row><br/><br/><br/></v-row>
          <v-row>
            <v-card
            color='#5097DD'
            dark
            height="150px"
            width="270px"
          >
       <v-card-text class="white--text">
              <div class="headline mb-2">Other Status</div>
                hello.
            </v-card-text>
            </v-card>
          </v-row>
          <v-row><br/><br/><br/></v-row>
          <v-row>
            <v-card
            color='#5097DD'
            dark
            height="150px"
            width="270px"
          >
       <v-card-text class="white--text">
              <div class="headline mb-2">Other Status</div>
                hello.
            </v-card-text>
            </v-card>
          </v-row>
          </v-col>

      </v-row>
</div>
</template>

<script>
  export default {
    components: {
      
      CoreAppBar: () => import('@/components/core/AppBar'),
      
      
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
  }
</script>
<style >
.row{
    margin-left: 30px;
    margin-right: initial
}

</style>