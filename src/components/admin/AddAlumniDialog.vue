<template>
    <v-layout row wrap>
        <v-dialog v-model="showAlumni" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Add Alumni</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" >
                    <v-text-field v-model="alumni.empId" label="Employee Id"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-text-field v-model="alumni.firstName" label="First Name"></v-text-field>
                  </v-col>
                  <v-col cols="12"  md="5">
                    <v-text-field v-model="alumni.lastName" label="Last Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="alumni.paySlipStatus" label="SalarySlipStatus"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="alumni.form16Status" label="Form16Status"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="saveDialog">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            default: false,
        }
    },
    watch: {
      dialog() {
        console.log(this.dialog);
      }
    },
    methods: {
        closeDialog() {
          this.$store.commit('adminModule/closeAlumniDialog')
        },
        saveDialog(){
          this.$store.commit('adminModule/addNewAlumniToList', JSON.parse(JSON.stringify(this.alumni)))
           this.$store.commit('adminModule/closeAlumniDialog')
          
        }
    },
    computed:
    {
      alumni:{
        get(){
            return this.$store.getters['adminModule/getAlumniDialogData']
        },
        set(data) 
            {
                this.$store.commit('adminModule/setShowAlumniDialogData', data)
            }
      },
      showAlumni:{
         get(){
            return this.$store.getters['adminModule/getshowAlumniDialog']
        },
        set(data) 
            {
                this.$store.commit('adminModule/setShowAlumni', setShowAlumniDialog)
            }
      },


    },
    data () {
      return {
        headers: [
          {
            text: 'EmployeeId',
            align: 'left',
            sortable: false,
            value: 'empId',
          },
          { text: 'FirstName', value: 'FirstName' },
          { text: 'LastName', value: 'LastName' },
          { text: 'SalarySlipStatus', value: 'SlipStatus' },
          { text: 'Form16Status', value: 'Form16Status' },
         
          
        ],
        
          
         
         
        
      }
      
    },
}
</script>