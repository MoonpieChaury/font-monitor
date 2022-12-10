<template>
  <div id="pageWaterfall" class="com-barLine"></div>
</template>

<script>
export default {
  name: "pageWaterfall",
  props: ["dataList"],
  data() {
    return {
      options: [],
      //透明柱子
      transparent: [0, 10, 30, 60, 100],
      //实际柱子
      yAxisData: [10, 20, 30, 40, 50],
      //显示间隔
      yInterval: [10, 30, 60],
      xAxisData: []
    };
  },
  watch: {
    dataList: function(o, n) {
      this.init();
    }
  },
  methods: {
    init() {
      this.getData();
      this.setOption();
      // console.log(this.dataList , 'com datalist');
      let chartDom = document.getElementById("pageWaterfall");
      let myChart = this.$echarts.init(chartDom);
      myChart.clear();
      // myChart.resize();
      myChart.setOption(this.options, true);
      // myChart.resize();
    },
    getData() {
      this.transparent = this.dataList.xData;
      this.yAxisData = this.dataList.yDataTime;
      this.xAxisData = this.dataList.yDataType;
      this.yInterval = this.dataList.xInterval;
    },
    setOption() {
      let th = this.yInterval;
      let option = {
        textStyle: {
          fontSize: 15,
          // color: '#AFB2BB',
          color: "#fff",
          fontWeight: 500
        },
        grid: {
          top: 20,
          left: 100,
          width: "auto",
          containLabel: false
        },
        xAxis: {
          position: "top",
          type: "value",
          interval: 1,
          // color:'#fff',
          // fontsize: 12,
          splitLine: {
            show: false
          },
          axisLabel: {
            // fontsize:20,
            // show:false,
            formatter: (item, index) => {
              let keys = [], values = [];
              for (let key in th) {
                keys.push(key);
                values.push(th[key]);
              }
              if (item === values[0]) {
                return keys[0] + " : " + item + " ms";
              } else if (item === values[1]) {
                return keys[1] + " : " + item + " ms";
              } else if (item === values[2]) {
                return keys[2] + " : " + item + " ms";
              }
            }
          }
        },
        yAxis: [
          {
            type: "category",
            inverse: "true",
            // axisPointer: {
            //   show: true,
            //   type: "shadow",
            //   triggerTooltip: false,
            // },
            axisLabel: {
              align: "left",
              margin: 70
            },
            // data: [
            //   "Total",
            //   "Rent",
            //   "Utilities",
            //   "Transportation",
            //   "Meals",
            //   "Other",
            // ],
            data: this.xAxisData
          },
          {
            type: "category",
            inverse: "true",
            // data: [
            //   "2900 ms",
            //   "1200 ms",
            //   "300 ms",
            //   "200 ms",
            //   "900 ms",
            //   "300 ms",
            // ],
            axisLabel: {
              align: "left",
              margin: 14,
              formatter: function(value) {
                return value + " ms";
              }
            },
            axisPointer: {
              show: true,
              type: "shadow",
              triggerTooltip: false,
              label: { show: false }
            },
            data: this.yAxisData
          }
        ],
        series: [
          {
            name: "type",
            type: "bar",
            stack: "Total",
            itemStyle: {
              borderColor: "transparent",
              color: "transparent"
            },
            // data: [0, 2900, 4100, 4400, 4600, 5500],
            data: this.transparent
          },

          {
            name: "time",
            type: "bar",
            stack: "Total",
            label: {
              show: false
            },
            itemStyle: {
              normal: {
                //这里设置每个柱子颜色不一样
                color: function(params) {
                  // 定义一个颜色数组colorList
                  const colorList = ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de",
                    "#3ba272", "#fc8452", "#9a60b4"];
                  return colorList[params.dataIndex];
                }
              }
            },
            // data: [2900, 1200, 300, 200, 900, 300],
            data: this.yAxisData
          }
        ]
      };
      this.options = option;
    }
  },
  mounted() {
    this.init();
    // console.log(this.dataList , 'com datalist');
  }
};
</script>

<style lang="less" scoped>
.com-barLine {
  width: 1380px;
  height: 320px;
}
</style>
