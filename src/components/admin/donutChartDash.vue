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
          data: [20, 80],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>

<style>
#doughnut-chart {
  height: 315px !important;
}
</style>

