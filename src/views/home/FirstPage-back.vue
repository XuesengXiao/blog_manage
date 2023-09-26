<template>
  <div>
    <div class="chart-container">
      <v-chart :option="chartOption"></v-chart>
    </div>
  </div>
</template>
<script>
import vChart from "vue-echarts";
export default {
  data() {
    return {
      chartOption: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    };
  },
  components: {
    vChart,
  },
};
</script>
<style scoped>
.chart-container {
  width: 50%;
  height: 50vh;
}
</style>
