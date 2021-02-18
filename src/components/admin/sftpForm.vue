<template>
  <v-layout>
      <v-flex xs12 class="mt-5" >
      
          <v-card  style="color:white;margin:auto" flat>
              <v-card-title style="background-color:#1A265C" >SFTP Details</v-card-title>
         
          
       
          <v-form v-model="valid" class="mb-5">
    <v-container >
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="Add URL"
            required
          ></v-text-field>
        </v-col>
     
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="Username"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            
            type="password"
            label="Password"
            required
          ></v-text-field>
        </v-col>
     
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="Port"
            required
          ></v-text-field>
        </v-col>
      
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            
            
            label="Path"
            required
          ></v-text-field>
        </v-col>
      </v-row>

    </v-container>
    <v-btn
      style="margin-top:10px"
      color="#1A265C"
      dark
     class="mr-5 mb-5"
      
    >
      Submit
    </v-btn>
  <v-btn 
      style="margin-top:10px"
      color="#1A265C"
      dark
      class="ml-5 mb-5"
   
      
    >
      Cancel
    </v-btn>
  </v-form>
    </v-card>
      </v-flex>
  </v-layout>
</template>

<script>
export default {

}
</script>

<style>

</style>