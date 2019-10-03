<template>
  <v-layout row wrap>
     <v-img
        height="500px"
        src="@/assets/back5.jpg"
      >  </v-img>
    <v-flex xs12>
<v-data-table
    :headers="headers"
    :items="getAlumniList"
    class="elevation-1"
    hide-default-footer
    >
    <template v-slot:top>
        <v-toolbar>
            <v-toolbar-title>Recent Resigned Employee</v-toolbar-title>
       
            <v-divider 
            class="mx-4"
            inset
            vertical></v-divider>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" dark class="mb-2" @click="openAddAlumniDialog">New Alumni</v-btn>
         </v-toolbar>    
 
    </template>

    </v-data-table>
    
    </v-flex>
    

  </v-layout>
    
    </template>
    
    

<script>
import AddAlumni from '@/components/admin/AddAlumniDialog.vue'
export default {
   components: {
     AddAlumni
    },
    watch: {
      dialog() {
        console.log(this.dialog);
      }
    },
    mounted() {
    },
    computed:{
         getAlumniList:{
           get() {
                return this.$store.getters['adminModule/getAlumniList']
            },
            set(data) {
                this.$store.commit('adminModule/setAlumniList', this.data)
            }
         }
    },
    methods: {
      closeAlumniDialog() {
        this.$store.commit('adminModule/closeAlumniDialog')
      },
      openAddAlumniDialog(){
        let alumniData = {
            empId: null,
            firstName: "",
            lastName: "",
            paySlipStatus: "",
            form16Status: ""
        }
        this.$store.commit('adminModule/showAlumniDialog', alumniData)
      },
      
     },
  data(){

  return{
     dialog:false,
     headers: [
          {
            text: 'EmployeeId',
            align: 'left',
            sortable: false,
            value: 'empId',
          },
          { text: 'FirstName', value: 'firstName' },
          { text: 'LastName', value: 'lastName' },
          { text: 'SalarySlipStatus', value: 'paySlipStatus' },
          { text: 'Form16Status', value: 'form16Status' },
        
          
          
        ],
        

        }
    
      }
}

</script>