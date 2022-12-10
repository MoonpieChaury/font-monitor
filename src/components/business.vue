<template>
  <div class="business-container">
    <div id="chart_left1" class="chart"></div>
  </div>
</template>

<script>
export default {
  name: "business",
  data() {
    return {};
  },
  mounted() {
    this.getEchartLeft1();
  },
  methods: {
    getEchartLeft1() {
      // 实例化对象
      let myChart = echarts.init(document.getElementById("chart_left1"));
      let cityData = [];
      for (let i = 0; i < 7; i++) {
        cityData.push((Math.random() * 100).toFixed(0));
      }
      let charts = {
        // 按顺序排列从大到小
        cityList: [
          "<1s",
          "1s~2s",
          "2s~2.5s",
          "2.5s~3s",
          "3s~3.5s",
          "3.5s~4s",
          ">4s"
        ],
        // cityData: [130 , 200 , 100 , 40 , 20 , 30 , 10],
        cityData: cityData
      };

      let top10CityList = charts.cityList;
      let top10CityData = charts.cityData;
      let color = [
        "rgba(218,111,227",
        "rgba(14,109,236",
        "rgba(100,255,249",
        "rgba(248,195,248",
        "rgba(110,234,19",
        "rgba(255,168,17",
        "rgba(255,91,6"
      ];

      let lineY = [];
      for (let i = 0; i < charts.cityList.length; i++) {
        let x = i;
        if (x > color.length - 1) {
          x = color.length - 1;
        }
        let data = {
          name: charts.cityList[i],
          color: color[x] + ")",
          value: top10CityData[i],
          itemStyle: {
            normal: {
              show: true,
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                [
                  {
                    offset: 0,
                    color: color[x] + ", 0.3)"
                  },
                  {
                    offset: 1,
                    color: color[x] + ", 1)"
                  }
                ],
                false
              ),
              barBorderRadius: 10
            },
            emphasis: {
              shadowBlur: 15,
              shadowColor: "rgba(0, 0, 0, 0.1)"
            }
          }
        };
        lineY.push(data);
      }

      // 指定配置和数据
      let option = {
        color: color,
        tooltip: {
          trigger: "item"
        },

        grid: {
          borderWidth: 0,
          top: "5%",
          left: "2%",
          right: "2%",
          bottom: "0%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              inside: false,
              textStyle: {
                color: "#24c4ff",
                fontSize: 13
              }
            },
            data: top10CityList
          },
          {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              inside: false,
              textStyle: {
                color: "#24c4ff",
                fontSize: 13
              },
              formatter: (val) => {
                return `${val}`;
              }
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: top10CityData.reverse()
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            zlevel: 2,
            barWidth: "10px",
            data: lineY,
            animationDuration: 1500,
            label: {
              normal: {
                color: "#24c4ff",
                show: false,
                position: [0, "-15px"],
                textStyle: {
                  fontSize: 13
                },
                formatter: (a, b) => {
                  console.log(b);
                  return a.name;
                }
              }
            }
          }
        ]
      };

      // 把配置给实例对象
      myChart.setOption(option, true);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  },
  beforeDestroy() {
  }
};
</script>

<style lang="less" scoped>
.business-container {
  .chart {
    height: 3rem;
  }
}
</style>
