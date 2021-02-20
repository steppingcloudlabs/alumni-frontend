<template>
  <v-layout>
      <v-flex xs12 class="mt-5" >
      
          <v-card  style="color:white;margin:auto" flat>
              <v-card-title style="background-color:#1A265C" >SFTP Details</v-card-title>
         
          
       
          <v-form  class="mb-5" v-model="valid"  ref="form" lazy-validation>
    <v-container >
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="Add URL"
            v-model="url"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
     
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="Username"
            v-model="username"
             :rules="nameRules"
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
            v-model="password"
             :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
     
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="Port"
            v-model="port"
             :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
      
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            
            
            label="Path"
            v-model="path"
             :rules="nameRules"
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
      @click="updateSFTP"
    >
      Submit
    </v-btn>
  <v-btn 
      style="margin-top:10px"
      color="#1A265C"
      dark
      class="ml-5 mb-5"
   
      @click="cancel"
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
 
  methods:{
    cancel()
    { this.url="",
       this.username="",
        this.password="",
       this.path="",
        this.port=""
        this.$refs.form.reset()

    },
    updateSFTP()
    {
      if(this.$refs.form.validate())
      {
            this.$store.commit("showProgressBar",{})

    let data=
    {
      payload:{
        URL:this.url,
        USERNAME:this.username,
        PASSWORD:this.password,
        PATH:this.path,
        PORT:this.port

      }
    }
    this.$store.dispatch("adminModule/createSFTP",data).then((response)=>
    {
      this.$store.commit("closeProgressBar",{})
      if(response.status=="200")
      {
        this.$store.commit("showSnackbar",{message:"SFTP Credentials Stored Succesfully",color:"success",heading:"Sucess",duration:3000})
      }
      else
      {
         this.$store.commit("showSnackbar",{message:response.result,color:"success",heading:"Sucess",duration:3000})
      }
    })
    this.cancel()
    }
      }
     
   
  },
     data() {
    return {
       valid: true,
        nameRules: [
        v => !!v || 'Field is required',
       
      ],
      url:"",
      path:"",
      username:"",
      port:"",
      password:"",

  };
     }


}
</script>

<style>

</style>