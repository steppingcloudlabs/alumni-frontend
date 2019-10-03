<template>
  <v-container>
   
    <v-img
        height="500px"
        src="@/assets/document_bg.jpg"
      >   <core-app-bar ></core-app-bar></v-img>
    <br/>
    <br/>
    <v-row>
      <v-flex xs1></v-flex>
      <v-flex xs4>
         <v-card
            color='#5097DD'
            dark
          >
       <v-card-text class="white--text">
              <div class="headline mb-2">FORM 16 Available now</div>
             You can download your form 16 here.
            </v-card-text>

            <v-card-actions>
              <v-btn text>Download Now</v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>
 <v-flex xs2></v-flex
      >
  <v-flex xs4>
 <v-card
            color="#5097DD"
            dark
          >
       <v-card-text class="white--text">
              <div class="headline mb-2">Pay Slips Available now</div>
             You can download your Pay Slips here.
            </v-card-text>

            <v-card-actions>
              <v-btn text>Download Now</v-btn>
            </v-card-actions>
          </v-card>
  </v-flex>
   <v-flex xs1></v-flex
      >
  
  


     
    </v-row>
  </v-container>
</template>

<script>
  export default {
    components: {
      
      CoreAppBar: () => import('@/components/core/AppBar'),
      
      
    },
    
  }
</script>
