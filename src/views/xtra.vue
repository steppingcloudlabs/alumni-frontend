<template>

      <v-container>
    <v-layout row class="text-xs-center">
      <v-flex xs4>
       
      </v-flex>
      <v-flex xs4 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Login</h4>
            </v-card-title>
            <v-form>
            <v-text-field v-model="username" name="Username" label="Username"></v-text-field>
            <v-text-field v-model="password" name="Password" label="Password" type="password"></v-text-field>
            <v-card-actions>
              <v-btn primary large block @click="login">Login</v-btn>
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
            username: null,
            password: null
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', { 'email': this.username, 'password': this.password }).then((response) => {
                if (response && response.status && response.status == "Login Successful") {
                    this.$router.push({ path:'/profile' })
                }
            })
        }
    }
}
</script>

