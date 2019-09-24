<template>
   <v-container
        class="fill-height"
        fluid
      >
      <div>
    <v-card
      class="mx-auto"
     
      width=max-width
      height=auto
    >
      <v-img
        
        class="white--text"
        height="200px"
        src="@/assets/back5.jpg"
      >
        <v-card-title class="align-end fill-height"><v-avatar
            class="profile"
            color="grey"
            size="164"
            tile
          >
            <v-img src="@/assets/avatar/download.jpg"></v-img>
          </v-avatar>{{user.firstname +' '+user.lastname}}</v-card-title>
      </v-img>
     

      <v-card-text>
        <v-form>
            <v-container class="py-0">
              <v-row><v-col
                  cols="12"
                  md="6"
                >
 <v-card elevation="0"
outlined
 hover
 height="400px"
  >
      <v-card-title >Personal information</v-card-title>
               <v-row>
                    <v-col
                        cols="12"
                        md="1"
                      >
                      </v-col>
                    <v-col
                      cols="12"
                      md="5"
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
                          md="5"
                        >
                          <v-text-field
                          v-model=user.lastname
                            label="Last Name"
                            class="purple-input"
                            readonly
                          />
                          
                        </v-col>
                        <v-col
                          cols="12"
                          md="1"
                        >
                        </v-col>
                        <v-col
                          cols="12"
                          md="1"
                        >
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
                        <v-col cols="12"
                        md="4"
                        > <v-text-field
                          v-model=user.nationality
                            label="Nationality"
                            class="purple-input"
                            readonly
                          />
                        </v-col>
        </v-row>
      </v-card>
  </v-col>

<v-col cols="12"  md="6">
    <v-card elevation="0"
    outlined
    hover
     height="400px" >
      <v-card-title >Company Details</v-card-title>
      <v-row>
              <v-col cols="12"
                md="1"></v-col>
                <v-col cols="12"
                md="10">
                  <v-text-field
                  v-model="user.position"
                    label="Position"
                    class="purple-input"
                    readonly
                  />
                </v-col>
               <v-col cols="12"
                md="1"></v-col>

                 <v-col cols="12"
                md="1"></v-col>
                <v-col cols="12"
                md="5">
                  <v-text-field
                  v-model="user.employeeId"
                    label="EmployeeId"
                    class="purple-input"
                    readonly
                  />
                </v-col>
               
                <v-col
                  cols="12"
                  md="5"
                >
                  <v-text-field
                  v-model="user.managerid"
                    label="ManagerId"
                    class="purple-input"
                    readonly
                  />
                </v-col>
                 <v-col cols="12"
                md="1"></v-col>

                 <v-col cols="12"
                md="1"></v-col>
                <v-col
                  cols="12"
                  md="5"
                >
          
          <v-text-field
            v-model="user.lastworking"
            label="Last Working"
            prepend-icon="event"
            readonly
           
          ></v-text-field>
       
                </v-col>

                <v-col 
                  cols="12"
                  md="5">
       
          <v-text-field
            v-model="user.relieving"
            label="Reliving Date"
            prepend-icon="event"
            readonly
            
          ></v-text-field>
        
                </v-col>
                
                <v-col cols="12"
                md="1"></v-col>
      </v-row>
    </v-card>
  </v-col>
      <v-col
        cols="12"
         md="6">
                          
 <v-card
 elevation="0"
outlined
 hover
   height="400px"
>
 <v-card-title >Contact Details</v-card-title>
 <v-row>
    <v-col
                  cols="12"
                  md="1"
                ></v-col>
      
                <v-col
                  cols="12"
                  md="6"
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
                    type="number"
                  />
                </v-col>
                 <v-col
                  cols="12"
                  md="1"
                ></v-col>
 </v-row>
 </v-card>
                </v-col>
 
  <v-col cols="12"  md="6">
    <v-card elevation="0"
    outlined
    hover
     height="400px"
  
   >
      <v-card-title >Address Details</v-card-title>
      <v-row>
              <v-col cols="12"
                md="1"></v-col>
                <v-col cols="12"
                md="10">
                  <v-text-field
                  v-model=user.address
                    label="Address"
                    class="purple-input"
                  />
                </v-col>
               <v-col cols="12"
                md="1"></v-col>
                
                <v-col cols="12"
                md="1"></v-col>
                <v-col
                  cols="12"
                  md="5"
                >
                  <v-text-field
                  v-model=user.city
                    label="City"
                    class="purple-input"
                  />
                </v-col>
                 <v-col 
                  cols="12"
                  md="5"
                >
                  <v-text-field
                     v-model=user.postalcode
                    class="purple-input"
                    label="Postal Code"
                    
                  />
                </v-col>
             <v-col cols="12"
                md="1"></v-col>

                <v-col cols="12"
                md="1"></v-col>
                <v-col
                  cols="12"
                  md="5"
                >
                  <v-text-field
                  v-model=user.country
                    label="Country"
                    class="purple-input"
                  />
                </v-col>
                <v-col cols="12"
                md="1"></v-col>
      </v-row>
    </v-card>
  </v-col>
  
 
  

  
               
              </v-row>
            </v-container>
          </v-form>
       
        </v-card-text>
     
    </v-card>
      </div>
   </v-container>
</template>


<script>
  export default {
    data:()=>(
    {
      user:{
        username:"",
        firstname:"",
        lastname:"",
        address:"",
        city:"",
        country:"india",
        postalcode:"",
        me:"",
        email:"",
        position:"",
        mobile:"",
        DOB:"",
        avatar:'download',
        employeeId:'',
        managerid:'',
        relieving:'',
        lastworking:'',
        nationality:'',
      },
      
      
      menu1:'false',
      menu2: 'false',
    }),
    beforeMount() {
      this.initializeUserData();
    
    },
    watch:{
     user(){
       this.initializeUserData();
     }
    },
    methods:{
      initializeUserData(){
        this.user.position = this.userData.designation_job_information;
        this.user.employeeId = this.userData.user_id;
        this.user.managerid=this.userData.manager_job_information;
        this.user.relieving=new Date(this.userData.relieving_date).getDate() + '/' + new Date(this.userData.relieving_date).getMonth() +'/' + new Date(this.userData.relieving_date).getFullYear();
  
        this.user.lastworking =new Date(this.userData.last_working_day_as_per_notice_period).getDate() + '/' + new Date(this.userData.last_working_day_as_per_notice_period).getMonth() +'/' + new Date(this.userData.last_working_day_as_per_notice_period).getFullYear();
      
        this.user.firstname=this.userData.first_name_personal_information;
        this.user.lastname=this.userData.last_name_personal_information;
        this.user.nationality=this.userData.nationality_personal_information;
        this.user.city=this.userData.city_addresses;
        this.user.email=this.userData.personal_email_id;
        this.user.mobile=this.userData.phone_number_phone_information;


      }
    },
    computed: {
      userData() {
        return this.$store.getters.getUserData;
      }
    }
  //
  }
</script>
<style>

.purple-input.label {
 font-family: 'Raleway';
 color: white !important;
 

 }
 
</style>
  
