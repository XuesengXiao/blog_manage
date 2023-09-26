<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div class="chart-container">
            <v-chart :option="option7Days"></v-chart>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div class="chart-container">
            <v-chart :option="visitorofCity"></v-chart>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div class="chart-container">
            <v-chart :option="userofGender"></v-chart>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div class="chart-container">
            <v-chart :option="userofAge"></v-chart>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import vChart from "vue-echarts"
export default {
  data() {
    return {
      option7Days: {},
      visitorofCity: {},
      userofGender: {},
      userofAge: {},
    }
  },
  components: {
    vChart,
  },
  beforeMount() {
    this.axios
      .get("/statistics")
      .then((res) => {
        console.log(res)
        // 图一转换数据
        let visitofLast7Days = res.data.visitofLast7Days
        let data = []
        let count = []
        visitofLast7Days.forEach((ele) => {
          data.push(ele.date)
          count.push(ele.count)
        })
        this.option7Days = {
          title: {
            text: "最近7天访问量",
          },
          tooltip: {},
          legend: {
            data: ["访问量"],
          },
          xAxis: {
            data: data,
          },
          yAxis: {},
          series: [
            {
              name: "访问量",
              type: "bar",
              data: count,
            },
          ],
        }
        // 图二转换数据
        const visitorofCity = res.data.visitorofCity
        let pieData = []
        visitorofCity.forEach((item) => {
          pieData.push({ value: item.count, name: item.city })
        })
        this.visitorofCity = {
          title: {
            text: "城市访问量",
            subtext: "Fake Data",
            left: "left",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "right",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: pieData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        }
        // 图三转换数据
        const userofGender = res.data.userofGender
        let genData = []
        userofGender.forEach((item) => {
          genData.push({ value: item.count, name: item.gender })
        })
        this.userofGender = {
          title: {
            text: "用户性别比例",
            left: "left",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            top: "5%",
            left: "right",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: genData,
            },
          ],
        }
        // 图四修改数据
        const userofAge = res.data.userofAge
        let ageData = []
        userofAge.forEach((item) => {
          ageData.push({ value: item.count, name: item.age })
        })
        this.userofAge = {
          title: {
            text: "用户年龄比例",
            left: "left",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            top: "5%",
            left: "right",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: ageData,
            },
          ],
        }
      })
      .catch((err) => {
        console.error(err)
      })
  },
}
</script>
<style scoped>
.chart-container {
  height: 40vh;
}
</style>
