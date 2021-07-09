<template>
     <v-card type="chart" color="primary" class="pa-5 mb-7" dark>
        
            <div class="row">
              <div class="col-sm-4">
                <v-btn-toggle
                    v-model="toggle_exclusive_option"
                    mandatory
                    style="float:left;"
                    @change="initBigChart(toggle_exclusive_option,toggle_exclusive)"
                 >
          <v-btn small  style="btngrp" :selected="bigLineChart.activeIndex === index" :class="{active: bigLineChart.activeIndex === index}" v-for="(option, index) in bigLineChartCategoriesoption"  :key="option">
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
          <v-btn small   style="btngrp" :selected="bigLineChart.activeIndex === index" :class="{active: bigLineChart.activeIndex === index}" v-for="(option, index) in bigLineChartCategories"  :key="option">
           {{option}}
          </v-btn>
         
        </v-btn-toggle>
              </div>
            </div>
          
          <div class="chart-area">
            <line-chart style="height:250px !important"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </v-card>
</template>

<script>
import LineChart from '@/components/admin/chart/LineChart';
 import * as chartConfigs from '@/components/admin/chart/config';
import config from '@/config';
export default {
    components:
    {
       LineChart
    },
    data()
    {
        return{
            loginData:[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[]],
            signupData:[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[]],
            labels:[[],['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],[]],
            toggle_exclusive:0,
            toggle_exclusive_option:0,
             bigLineChartCategories:["Week","Month","Year"],
              bigLineChartCategoriesoption:["Login","Signup"],
              bigLineChart: {
          allData: [
            [100, 70, 90, 70, 85, 60, 75],
            [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
            [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 190]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [{ }],
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        }
        }
    },
    beforeMount()
    {
     
    },
    mounted()
    {    var rotIndex=new Date().getDay()
            this.leftRotate(7,rotIndex)
         this.$store.dispatch("adminModule/loginCount",{}).then((response)=>{
         if(response.data.status==200)
         {
            for(let i=0;i<response.data.result[0].MONTHCOUNT.length;i++)
            {
                this.loginData[1][response.data.result[0].MONTHCOUNT[i].MONTHASNUMBER-1]=response.data.result[0].MONTHCOUNT[i].TOTALCOUNT
            }
             for(let i=0;i<response.data.result[0].YEARLYCOUNT.length;i++)
            {
                this.loginData[2][i]=response.data.result[0].YEARLYCOUNT[i].TOTALCOUNT
                this.labels[2][i]=response.data.result[0].YEARLYCOUNT[i].YEARASNUMBER
            }
            

             for(let i=0;i<response.data.result[0].WEEKCOUNT.length;i++)
            {
               let ind=this.labels[0].indexOf(response.data.result[0].WEEKCOUNT[i].DAYNAME)
               this.loginData[0][ind]=response.data.result[0].WEEKCOUNT[i].TOTALCOUNT
            }
             this.initBigChart(0,0)
         }
      })
        this.$store.dispatch("adminModule/signUpCount",{}).then((response)=>{
         if(response.data.status==200)
         {
            for(let i=0;i<response.data.result[0].MONTHCOUNT.length;i++)
            {
                this.signupData[1][response.data.result[0].MONTHCOUNT[i].MONTHASNUMBER-1]=response.data.result[0].MONTHCOUNT[i].TOTALCOUNT
            }
             for(let i=0;i<response.data.result[0].YEARLYCOUNT.length;i++)
            {
                this.signupData[2][i]=response.data.result[0].YEARLYCOUNT[i].TOTALCOUNT
                this.labels[2][i]=response.data.result[0].YEARLYCOUNT[i].YEARASNUMBER
            }
            

             for(let i=0;i<response.data.result[0].WEEKCOUNT.length;i++)
            {
               let ind=this.labels[0].indexOf(response.data.result[0].WEEKCOUNT[i].DAYNAME)
               this.signupData[0][ind]=response.data.result[0].WEEKCOUNT[i].TOTALCOUNT
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
           lab=this.labels[index]
           if(optionIndex==0)
           {
               data=this.loginData[index]
           }
           else
           {
               data=this.signupData[index]
           }

        let chartData = {
          datasets: [{
           
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: data
          }
          ],
          
          labels: lab,
        }
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
    },
    }

</script>

<style >
.card-category {
    color: #9A9A9A;
    margin-bottom: 5px;
    font-weight: 300;
}
.card-title {
    color: #ffffff;
    font-weight: 100;
    margin-bottom: .75rem;
    font-size: 1.6875rem;
}



.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn--active {
       color: #4D4D4D !important;
       
    opacity: 1;
}
</style>