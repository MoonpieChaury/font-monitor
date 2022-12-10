<template>
  <div class="income-container">
    <div id="chart_left3" class="chart"></div>
  </div>
</template>

<script>
export default {
  name: "income",
  data() {
    return {};
  },
  mounted() {
    this.getEchartLeft3();
  },
  methods: {
    getEchartLeft3() {
      let myChart = echarts.init(document.getElementById("chart_left3"));
      let data = {
        x: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
        y: ["30", "20", "25", "18", "32", "23", "40", "19", "23"]
      };

      let option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "#11367a",
          textStyle: {
            color: "#6dd0e3",
            fontSize: 10
          },
          borderColor: "#1B81BC",
          axisPointer: {},
          formatter: (value) => {
            return value[0].name + "<br>JS报错：" + value[0].value + "次";
          }
        },
        grid: {
          top: "5%",
          left: "2%",
          right: "2%",
          bottom: "0%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: false,
              lineStyle: {
                color: "#092b5d"
              }
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#24c4ff",
                margin: 15
              },
              formatter: (data) => {
                return data;
              }
            },
            axisTick: {
              show: false
            },
            data: data.x
          }
        ],
        yAxis: [
          {
            min: 0,
            max: 50,
            splitLine: {
              show: false,
              lineStyle: {
                color: "#092b5d"
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#092b5d"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#24c4ff"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "",
            type: "line",
            symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 8,
            lineStyle: {
              normal: {
                color: "#7c80f4" // 线条颜色
              },
              borderColor: "rgba(0,0,0,.4)"
            },
            itemStyle: {
              color: "rgba(14,30,73,1)",
              borderColor: "#646ace",
              borderWidth: 2
            },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: [" {a|{c}}"].join(","),
                rich: {
                  a: {
                    color: "#fff",
                    align: "center"
                  }
                }
              }
            },
            smooth: true,
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。
                // 如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(124, 128, 244,.3)"
                    },
                    {
                      offset: 1,
                      color: "rgba(124, 128, 244, 0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: data.y
          }
        ]
      };

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
.income-container {
  .chart {
    height: 3rem;
  }
}
</style>
