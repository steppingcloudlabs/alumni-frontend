<template>
<div>
    <v-parallax  src="@/assets/background1.jpg"></v-parallax>

 <v-toolbar
  elevation='0'
  color="#1A1A1D"
    >
<v-toolbar-title  style="font-family: Raleway;color:#66FCF1">Recommended Careers</v-toolbar-title>
</v-toolbar>
  
  <v-data-table

    :headers="headers"
    :items="jobs"
    :sort-by="['date']"
    :sort-desc="[true]"
    hide-default-header
    hide-default-footer
    
    multi-sort
    class="scroll"

    height="200px"
    dark
    style="background:#1A1A1D;border-bottom:none;"
  ></v-data-table>
</div>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'POSTION',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'LOCATION', value: 'location' },
          { text: 'DEPARTMENT', value: 'department' },
          { text: 'DATE', value: 'date' },
          
        ],
        jobs: [
          {
            name: 'associate consultant',
            location: 'new delhi',
            department: 'integration',
            date: '24-12-2018',
           
          },
          {
             name: 'associate consultant',
            location: 'new delhi',
            department: 'integration',
            date: '24-12-2018',
           
          },
          {
            name: 'associate consultant',
            location: 'new delhi',
            department: 'integration',
            date: '24-12-2018',
           
          },
          {
             name: 'associate consultant',
            location: 'new delhi',
            department: 'integration',
            date: '24-12-2018',
           
          },
          {
             name: 'associate consultant',
            location: 'new delhi',
            department: 'integration',
            date: '24-12-2018',
           
          },
          {
            name: 'associate consultant',
            location: 'new delhi',
            department: 'integration',
            date: '24-12-2018',
           
          },
          {
            name: 'associate consultant',
            location: 'new delhi',
            department: 'integration',
            date: '24-12-2018',
            
          },
         
         
        ],
      }
    },
  }
</script>
<style >
.scroll {
      overflow-y: auto;
     background:"#66FCF1";
    
    }
.v-data-table{
 border-top:'none';
}
</style>