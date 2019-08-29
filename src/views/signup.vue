<template>

      <v-container>
    <v-layout row class="text-xs-center">
      <v-flex xs4>
       
      </v-flex>
      <v-flex xs4 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4 class="text-center">Register</h4>
            </v-card-title>
            <v-form>
            <v-text-field v-model="CompanyID" name="CompanyID" label="CompanyID"></v-text-field>
            <v-text-field v-model="email" name="email" label="email"></v-text-field>
            <v-text-field v-model="password" name="password" label="Password" type="password"></v-text-field>
            <v-text-field v-model="passwordChck" name="Password" label=" Confirm Password" type="password"></v-text-field>
            <v-card-actions>
              <v-btn primary large block @click="signup()" >Signup</v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
export default {
    data() {
        return {    
            CompanyID: null,
            password: null,
            email:null,
            passwordChck:null
        }
    },
    methods: {
        signup() {
           
            this.$store.dispatch('signup', { 'companyID': this.CompanyID,'email':this.email, 'password': this.password,'passwordChck':this.passwordChck })
        }
    }

}
</script>