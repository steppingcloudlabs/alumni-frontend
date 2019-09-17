<template>
  <v-container
    fill-height
    fluid
  >
  
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card
            color="#385F73"
            dark
          >
           <v-card-text class="white--text">
              <div class="headline mb-2">My Profile</div>
             
            </v-card-text>
        </v-card>
       
          <v-form>
            <v-container class="py-0">
              <v-row>
                

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="User Name"
                    v-model=user.username
                    readonly
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  v-model=user.email
                    label="Email Address"
                    class="purple-input"
                  />
                </v-col>
                 <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  v-model=user.mobile
                    label="Contact No"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                  v-model=user.firstname
                    label="First Name"
                    class="purple-input"
                    readonly
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                  v-model=user.lastname
                    label="Last Name"
                    class="purple-input"
                    readonly
                  />
                </v-col>
                <v-col cols="12"
                md="4"
                > <v-text-field
                  v-model=user.DOB
                    label="DOB"
                    class="purple-input"
                    readonly
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                  v-model=user.address
                    label="Adress"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  v-model=user.city
                    label="City"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  v-model=user.country
                    label="Country"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                     v-model=user.postalcode
                    class="purple-input"
                    label="Postal Code"
                    
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    v-model=user.me
                  />
                </v-col>

               
              </v-row>
            </v-container>
          </v-form>
       
        
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block elevation-6"
            size="130"
          >
             <img 
             src="@/assets/avatar/download.jpg">

          </v-avatar>
          <v-card-text class="text-center">
            <h6 class="overline mb-3">
              {{user.position}}
            </h6>

            <h4 class="font-weight-light">
              {{user.firstname+" "+user.lastname}}
            </h4>
         
               <v-btn color="success">Update Picture</v-btn>
          
           

           
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
  export default {
    data:()=>(
    {
      user:{
        username:"test1",
        firstname:"stepping",
        lastname:"cloud",
        address:"mohan estate",
        city:"delhi",
        country:"india",
        postalcode:"202001",
        me:"qwerrtyuyijgjgjbnjvnccnxxnv",
        email:"test1@stepping.in",
        position:"software engg",
        mobile:"987654322",
        DOB:"20/12/1996",
        avatar:'download'
      }
    }),
    beforeMount() {
      initializeUserData();
    
    },
    watch:{
     user(){
       initializeUserData();
     }
    },
    methods:{
      initializeUserData(){
        user=this.$store.getters.getUserData();
      }
    }
   //
  }
</script>
