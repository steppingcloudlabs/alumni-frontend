<template>

      <v-app id="inspire" style="background:#1A1A1D" >
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
                <v-toolbar-title class=" text-center" style="color:#66FCF1">SignUp</v-toolbar-title>
                <div class="flex-grow-1"></div>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-row>
                    <v-col>
                      <v-text-field
                    label="Companyname"
                    name="Company"
                    prepend-icon="domain"
                    type="text"
                    v-model="Companyname"
                  ></v-text-field>
                  
                    </v-col>
                    <v-col>
                    <v-text-field
                    label="EmployeeId"
                    name="EmployeeId"
                    prepend-icon="person"
                    type="text"
                    v-model="EmployeeId"
                  ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                    label="Email"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                   <v-text-field
                    id="Cnfpassword"
                    label="Confirm Password"
                    name="Cnfpassword"
                    prepend-icon="lock"
                    type="password"
                    v-model="Cnfpassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn  block @click="signup" style="color:#66FCF1">Signup</v-btn>
              </v-card-actions>
              <v-row class="text center">
                 
             
              <v-card-text><v-icon style="color:#66FCF1">person</v-icon>  Already have account? <router-link
                   to="/signin" style="color:#66FCF1">LogIn</router-link></v-card-text>
              
              </v-row>  
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
    data() {
        return {    
            Companyname: null,
            EmployeeId:null,
            email:null,
            Cnfpassword:null,
            password: null,
        }
    },
    methods: {
        signup() {
          this.$store.dispatch('signup', { 'email':this.email, 'password': this.password ,'companyname':this.Companyname,'userid':this.EmployeeId}).then((response) => {
            if (response && response.message && response.message.token && response.status == 200) {
              console.log(response)
              this.$router.push({ path:'/signin' })

            }
          })
        },
        // signup() {
        //     this.$store.dispatch('signup', { 'email':this.email, 'password': this.password ,'companyname':this.Companyname,'userid':this.EmployeeId}).then((response) => {
        //       if (response && response.token) {
        //         this.$router.push({ path:'/signin' })
        //       }
        //     })
        // }
    }
}
</script>
<style >
a {  text-decoration: none;}
.v-card {
    font-size: 10px;
    font-style: inherit;
    
  }
</style>