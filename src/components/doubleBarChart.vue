<template>
  <div class="doubleBarChart"></div>
</template>

<script>
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
            fontSize: 12
          },

          formatter: function(params) {
            let str = params[0].name.split(".");
            let str1 = str[0] + "月" + str[1] + "日";
            params.forEach((item) => {
              str1 += `<br> ${item.seriesName}: ${item.value}` + "次";
            });
            return str1;
          }
        },
        legend: [
          {
            // top: '10',
            left: "0",
            itemWidth: 7,
            itemHeight: 7,
            textStyle: {
              color: "#5CB1C1"
            }
          }
        ],
        grid: {
          top: "8%",
          left: "3%",
          right: "2%",
          bottom: "8%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              interval: 0,
              color: "#61B9C8",
              fontSize: 12
            },
            axisLine: {
              symbol: ["none", "arrow"],
              symbolSize: [6, 6],
              symbolOffset: [0, 5],
              lineStyle: {
                color: "#122C49"
              }
            },
            axisTick: { show: false },
            data: [
              "10.1",
              "10.4",
              "10.7",
              "10.10",
              "10.13",
              "10.16",
              "10.19",
              "10.21",
              "10.24",
              "10.27"
            ]
          }
        ],
        yAxis: {
          type: "value",
          min: 0,
          max: 300,
          axisLabel: {
            color: "#61B9C8",
            fontSize: 12,
            showMaxLabel: false
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [6, 6],
            symbolOffset: [0, 5],
            lineStyle: {
              color: "#122C49"
            }
          },
          axisTick: {
            length: 3
          },
          nameTextStyle: {
            color: "#61B9C8",
            fontSize: 12,
            align: "right",
            padding: [0, 6, 0, 0]
          },
          splitLine: { show: false }
        },
        series: [
          {
            name: "成功次数",
            type: "bar",
            barWidth: 7,
            stack: "总数",
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
                    color: "#FC9386" // 0% 处的颜色
                  },
                  {
                    offset: 0.4,
                    color: "#F87B86" // 40% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#F36087" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }, //背景渐变色
              barBorderRadius: [3.5, 3.5, 0, 0]
            },
            data: [101, 102, 150, 114, 190, 100, 120, 190, 143, 80]
          },
          {
            name: "失败次数",
            type: "bar",
            barWidth: 7,
            stack: "总数",
            itemStyle: {
              color: "#8C14EA",
              barBorderRadius: [3.5, 3.5, 0, 0]
            },
            data: [120, 132, 101, 134, 90, 130, 110, 90, 130, 120]
          }
        ]
      };
      let myChart = this.$echarts.init(this.$el);
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
.doubleBarChart {
  width: 400px;
  height: 200px;
}
</style>
