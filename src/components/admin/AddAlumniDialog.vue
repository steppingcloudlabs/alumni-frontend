<template>
    <v-layout row wrap>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Add Alumni</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" >
                    <v-text-field v-model="jobs[0].empid" label="Employee Id"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-text-field v-model="jobs[0].FirstName" label="First Name"></v-text-field>
                  </v-col>
                  <v-col cols="12"  md="5">
                    <v-text-field v-model="jobs[0].LastName" label="Last Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="jobs[0].SlipStatus" label="SalarySlipStatus"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="jobs[0].Form16Status" label="Form16Status"></v-text-field>
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
            this.$emit('closeAlumniDialog');
        },
        saveDialog(){
            this.$emit('saveAlumniData',this.jobs[0])
        }
    },
    data () {
      return {
        headers: [
          {
            text: 'EmployeeId',
            align: 'left',
            sortable: false,
            value: 'empid',
          },
          { text: 'FirstName', value: 'FirstName' },
          { text: 'LastName', value: 'LastName' },
          { text: 'SalarySlipStatus', value: 'SlipStatus' },
          { text: 'Form16Status', value: 'Form16Status' },
         
          
        ],
        jobs: [
          {
            empid: '',
            FirstName: '',
            LastName: '',
            SlipStatus: '',
            Form16Status:''
           
          },
          
         
         
        ],
      }
      
    },
}
</script>