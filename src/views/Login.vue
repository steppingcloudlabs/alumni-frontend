<template>
<div id='core-login'  >
  <v-app id="inspire" style="background:#1A1A1D" class="back" >
   
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
      
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12" 
            color="#282828"
            dark>
              <v-toolbar
                flat
              >
                <v-toolbar-title class=" text-center" style="font-family: Raleway;color:#66FCF1" >Login </v-toolbar-title>
                <div class="flex-grow-1"></div>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                    
                    
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                 
                </v-form>
              </v-card-text>
              <v-card-actions> 
               <div class="error" v-if="!$v.password.minLength">{{onblur()}}</div>
               <v-btn  block v-on: @click="login" style="color:#66FCF1">Login</v-btn>
                
              </v-card-actions>
              <v-card-text class="text-center" ><router-link to="/forgotpassword" style="color:#66FCF1">Forgot Password</router-link></v-card-text>
              <div class="flex-grow-1"></div>
              <v-card-text  class="text-center" >Not Registered? <router-link to="/signup" style="color:#66FCF1">SignUp</router-link></v-card-text>
               
              
             
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
   
</div>

</template>
<script>

import md5 from 'crypto-js/md5'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import { constants } from 'crypto';

export default {
    data() {
        return {    
            username: null,
            password: null,
        }
    },
    mounted() {
      // console.log(md5("Rahil").toString()),
      console.log(this.test)
      this.test = "My New Data"
      console.log(this.test)
    },
     validations: {
    password: {
      required,
      minLength: minLength(6)
    },   
  },
  computed: {
    test: {
      get() {
        return this.$store.getters['userModule/getTest'];
      },
      set(data) {
        this.$store.commit('userModule/setTest', data)
      }
    }
  },
    methods: {
        login() {
          
            this.$store.dispatch('userModule/login', { 'email': this.username, 'password': this.password }).then((response) => {
                if (response && response.status && response.status == 200 && response.message && response.message.Status == "Login Successful") {
                  this.$router.push({ path:'/profile/user-profile' })
                }
                else if (response && response.status && response.status == 200 && response.data && response.data.Status == "User doesn't Exist") {
                  this.snackbar = true;
                }
            })
        },
        onblur(){
          
          this.$store.commit('showSnackbar', { color: 'red', duration: 3000, message: "Password must have at least 6 letters.", heading: "Error" })
        }
       
    
    
    }
}
</script>
<style >
a {  text-decoration: none;
color: #66FCF1}

.back {
 
  background-color: #cccccc;
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}


</style>

