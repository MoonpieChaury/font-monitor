<template>
  <div class="barChart"></div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    setChart() {
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "#11367a",
          textStyle: {
            color: "#6dd0e3",
            fontSize: 10
          },
          formatter: "{b}: 网站平均跳出率{c}%"
        },
        // legend: {
        //     left: "11%",
        //     top: "15%",
        //     itemWidth: 7,
        //     itemHeight: 7,
        //     textStyle: {
        //         color: '#5CB1C1',
        //     }
        // },
        grid: {
          top: "-10",
          bottom: "35%",
          left: "10%",
          right: "10",
          containLabel: false
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              symbol: ["none", "arrow"],
              symbolSize: [6, 6],
              symbolOffset: [0, 10],
              lineStyle: {
                color: "#122C49"
              }
            },
            axisTick: { show: false },
            axisLabel: {
              color: "#24c4ff",
              fontSize: 12,
              interval: 0
            },
            data: [
              "12点",
              "13点",
              "14点",
              "15点",
              "16点",
              "17点",
              "18点",
              "19点",
              "20点",
              "21点"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            max: 23,
            min: 0,
            interval: 5,
            axisLine: {
              symbol: ["none", "arrow"],
              symbolSize: [6, 6],
              lineStyle: {
                color: "#122C49"
              }
            },
            axisLabel: {
              color: "#24c4ff",
              showMaxLabel: false,
              fontSize: 12
            },
            splitLine: {
              show: false
            },
            // name: "(%)",
            nameGap: -5,
            nameTextStyle: {
              color: "#24c4ff",
              fontSize: 12,
              align: "right",
              padding: [0, 10, 0, 0]
            }
          }
        ],
        series: [
          {
            // name: ,
            type: "bar",
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#50A2F6" // 0% 处的颜色
                  },
                  {
                    offset: 0.4,
                    color: "#9490F9" // 40% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#DF7DFD" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              } //背景渐变色
            },
            barWidth: 10,
            barCategoryGap: 10,
            data: [10, 20, 6, 2, 4, 20, 19, 9, 11, 15]
          }
        ]
      };
      let myChart = echarts.init(this.$el);

      myChart.clear();
      myChart.resize();
      myChart.setOption(option);
    }
  },
  mounted() {
    this.setChart();
  }
};
</script>

<style lang="less" scoped>
.barChart {
  width: 400px;
  height: 250px;
}
</style>
