<template>
  <div>
    <el-card class="box-card">
      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState, mapActions } = userModule;
export default {
  name: "DataReport",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getreports"]),
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        // title: { text: "堆叠区域图" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: this.reports.legend,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: this.reports.xAxis,
        yAxis: this.reports.yAxis,
        series: this.reports.series
      });
    },
    
  },
  mounted() {
     this.drawLine();
     //获取report
     this.getreports()
     
  },
  watch: {

  },
  computed: {
    ...mapState(["reports"]),
  },
};
</script>

<style scoped lang='scss'>
</style>