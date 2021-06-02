<script>
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  props: {
    extraOptions: Object,
    gradientColors: {
      type: Array,
      default: () => ['rgba(72,72,176,0.2)', 'rgba(72,72,176,0.0)', 'rgba(119,52,169,0)'],
      validator: val => {
        return val.length > 2;
      }
    },
    gradientStops: {
      type: Array,
      default: () => [1, 0.4, 0],
      validator: val => {
        return val.length > 2;
      }
    }
  },
  data: () => ({
    chartdata: {
      labels: ["Active", "Inactive"],
      datasets: [
        {
          labels: ["Active", "Inactive"],
          backgroundColor: ["#fd5d93", "#2dce89"],
          data: [90,10],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
       tooltips: {
      backgroundColor: '#f5f5f5',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
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
            this.chartdata.datasets[0].data[0]=response.data.result[1].COUNT
            this.chartdata.datasets[0].data[1]=response.data.result[0].COUNT
            this.$data._chart.update()
          } 
        });
    }
  }
};
</script>

<style>

</style>

