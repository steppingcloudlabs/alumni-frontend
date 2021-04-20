<script>
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  data: () => ({
    chartdata: {
      labels: ["Active", "Inactive"],
      datasets: [
        {
          labels: ["Active", "Inactive"],
          backgroundColor: ["#172151", "#f87879"],
          data: [90,10],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  beforeMount()
  {
   this.getstat()
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
  methods:
  {
    getstat()
    {
       this.$store
        .dispatch("adminModule/getUserStatus", {
         
        })
        .then((response) => {
          if (response.data.result.length > 0) {
            this.chartdata.datasets[0].data[0]=response.data.result[2].COUNT
            this.chartdata.datasets[0].data[1]=response.data.result[1].COUNT
            this.$data._chart.update()
          } 
        });
    }
  }
};
</script>

<style>
#doughnut-chart {
  height: 335px !important;
}
</style>

