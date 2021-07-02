<template>
  <v-card
    class="mx-auto text-center pa-5 mr-7"
    color="primary"
    dark
    max-width="100%"
    
  >
               <div class="row">
              <div class="col-sm-4">
                <v-btn-toggle
                    v-model="toggle_exclusive_option"
                    mandatory
                    style="float:left;"
                    @change="initBigChart(toggle_exclusive_option,toggle_exclusive)"
                 >
          <v-btn small  style="btngrp"  v-for="(option) in bigLineChartCategoriesoption"  :key="option">
           {{option}}
          </v-btn>  
                </v-btn-toggle>
              
              </div>
                <div class="col-sm-4">
                      <h2 class="card-title text-center">Performance</h2>
                </div>
              <div class="col-sm-4">
                
                 <v-btn-toggle
          v-model="toggle_exclusive"
          mandatory
          style="float:right;"
         @change="initBigChart(toggle_exclusive_option,toggle_exclusive)"
        >
          <v-btn small   style="btngrp"  v-for="(option) in bigLineChartCategories"  :key="option">
           {{option}}
          </v-btn>
         
        </v-btn-toggle>
              </div>
            </div>
             <div class="chart-area">
            <bar-chart style="height:250px"
                       chart-id="blue-bar-chart"
                       ref="blue"
                       :chart-data="blueBarChart.chartData"
                       :gradient-stops="blueBarChart.gradientStops"
                       :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>

   
  </v-card>
</template>

<script>
import BarChart from '@/components/admin/chart/BarChart';
import * as chartConfigs from '@/components/admin/chart/config';
import config from '@/config';
  export default {
    components:
    {
      BarChart,
    },
     mounted()

    {    var rotIndex=new Date().getDay()
            this.leftRotate(7,rotIndex)

          this.$store.dispatch("adminModule/documentDownloadCount",{}).then((response)=>{
         if(response.data.status==200)
         {
            for(let i=0;i<response.data.result[0].MONTHCOUNT.length;i++)
            {
                this.downloadData[1][response.data.result[0].MONTHCOUNT[i].MONTHASNUMBER-1]=response.data.result[0].MONTHCOUNT[i].TOTALCOUNT
            }
             for(let i=0;i<response.data.result[0].YEARLYCOUNT.length;i++)
            {
                this.downloadData[2][i]=response.data.result[0].YEARLYCOUNT[i].TOTALCOUNT
                this.labels[2][i]=response.data.result[0].YEARLYCOUNT[i].YEARASNUMBER
            }
            

             for(let i=0;i<response.data.result[0].WEEKCOUNT.length;i++)
            {
               let ind=this.labels[0].indexOf(response.data.result[0].WEEKCOUNT[i].DAYNAME)
               this.downloadData[0][ind]=response.data.result[0].WEEKCOUNT[i].TOTALCOUNT
            }
             
         }
      })  
         this.$store.dispatch("adminModule/documentUploadCount",{}).then((response)=>{
         if(response.data.status==200)
         {
            for(let i=0;i<response.data.result[0].MONTHCOUNT.length;i++)
            {
                this.uploadData[1][response.data.result[0].MONTHCOUNT[i].MONTHASNUMBER-1]=response.data.result[0].MONTHCOUNT[i].TOTALCOUNT
            }
             for(let i=0;i<response.data.result[0].YEARLYCOUNT.length;i++)
            {
                this.uploadData[2][i]=response.data.result[0].YEARLYCOUNT[i].TOTALCOUNT
                this.labels[2][i]=response.data.result[0].YEARLYCOUNT[i].YEARASNUMBER
            }
            

             for(let i=0;i<response.data.result[0].WEEKCOUNT.length;i++)
            {
               let ind=this.labels[0].indexOf(response.data.result[0].WEEKCOUNT[i].DAYNAME)
               this.uploadData[0][ind]=response.data.result[0].WEEKCOUNT[i].TOTALCOUNT
            }
             this.initBigChart(0,0)
         }
      })
        this.$store.dispatch("adminModule/openTicketCount",{}).then((response)=>{
         if(response.data.status==200)
         {
            for(let i=0;i<response.data.result[0].MONTHCOUNT.length;i++)
            {
                this.openData[1][response.data.result[0].MONTHCOUNT[i].MONTHASNUMBER-1]=response.data.result[0].MONTHCOUNT[i].TOTALCOUNT
            }
             for(let i=0;i<response.data.result[0].YEARLYCOUNT.length;i++)
            {
                this.openData[2][i]=response.data.result[0].YEARLYCOUNT[i].TOTALCOUNT
                this.labels[2][i]=response.data.result[0].YEARLYCOUNT[i].YEARASNUMBER
            }
            

             for(let i=0;i<response.data.result[0].WEEKCOUNT.length;i++)
            {
               let ind=this.labels[0].indexOf(response.data.result[0].WEEKCOUNT[i].DAYNAME)
               this.openData[0][ind]=response.data.result[0].WEEKCOUNT[i].TOTALCOUNT
            }
             
         }
      })
      this.$store.dispatch("adminModule/closeTicketCount",{}).then((response)=>{
         if(response.data.status==200)
         {
            for(let i=0;i<response.data.result[0].MONTHCOUNT.length;i++)
            {
                this.closeData[1][response.data.result[0].MONTHCOUNT[i].MONTHASNUMBER-1]=response.data.result[0].MONTHCOUNT[i].TOTALCOUNT
            }
             for(let i=0;i<response.data.result[0].YEARLYCOUNT.length;i++)
            {
                this.closeData[2][i]=response.data.result[0].YEARLYCOUNT[i].TOTALCOUNT
                this.labels[2][i]=response.data.result[0].YEARLYCOUNT[i].YEARASNUMBER
            }
            

             for(let i=0;i<response.data.result[0].WEEKCOUNT.length;i++)
            {
               let ind=this.labels[0].indexOf(response.data.result[0].WEEKCOUNT[i].DAYNAME)
               this.closeData[0][ind]=response.data.result[0].WEEKCOUNT[i].TOTALCOUNT
            }
             
         }
      })
    },
    methods:
    {
       leftRotate(n, k)
        {           
                    /* To get the starting point of rotated array */
                        let mod = k % n;
                         let arr= [ "SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY" ]
                        // Prints the rotated array from start position
                        for (let i = 0; i < n; i++)
                            this.labels[0][i]=(arr[(mod + i) % n]);
                    
                        
       },

        initBigChart(optionIndex,index) {
            let lab
            let data
            let data1
            let label1
            let label2
           lab=this.labels[index]
           if(optionIndex==0)
           {
              data=this.downloadData[index]
              data1=this.uploadData[index]
              label1="Download"
              label2="Upload"
           }
           else
           {
              data=this.openData[index]
               data1=this.closeData[index]
                label1="Open"
              label2="Close"
           }

        let chartData = {
          datasets: [{
              label: label1,
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              
              data: data,
            },
            {
              label: label2,
              fill: true,
              borderColor: config.colors.teal,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
            
              data: data1,
            }
          ],
          
          labels: lab,
        }
        console.log(this.blueBarChart.chartData)
        this.$refs.blue.reload(chartData);
        //this.blueBarChart.chartData = chartData;
        console.log("test")
         console.log(this.blueBarChart.chartData)
        
       
      }
    
    },
    data: () => ({
            downloadData:[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[]],
            uploadData:[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[]],
             openData:[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[]],
            closeData:[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[]],
            labels:[[],['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],[]],
            toggle_exclusive:0,
            toggle_exclusive_option:0,
             bigLineChartCategories:["Week","Month","Year"],
              bigLineChartCategoriesoption:["Document","Tickets"],
       blueBarChart: {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURUSDAY', 'FRIDAY', 'SATURDAY','SUNDAY'],
            datasets: []
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
        }
      
    }),
  }
</script>
<style >

</style>