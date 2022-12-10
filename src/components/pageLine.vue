<template>
  <div id="pageLine" class="com-barLine"></div>
</template>

<script>
export default {
  name: "pageLine",
  props: ["dataList"],
  data() {
    return {
      options: [],
      leg: [],
      // firstByte: [123, 123, 123, 123],
      // domReady: [13, 23, 13, 23],
      // pageReady: [11, 11, 11, 11],
      // dns: [22, 22, 22, 22],
      // tcp: [33, 33, 33, 33],
      // ssl: [12, 22, 20, 32],
      // //请求响应
      // ttfb: [54, 52, 34, 12],
      // //内容传输
      // ctdl: [24, 0, 45, 6],
      // //dom解析
      // dprs: [45, 66, 23, 23],
      // //资源加载
      // res: [12, 34, 65, 65],
      xAxis: [],
      yAxis: []
    };
  },
  watch: {
    dataList: function(o, n) {
      this.init();
    }
  },
  methods: {
    init() {
      this.leg = this.dataList.leg;
      this.yAxis = this.dataList.yData;
      this.xAxis = this.dataList.xData;
      this.setOption();
      let chartDom = document.getElementById("pageLine");
      let myChart = this.$echarts.init(chartDom);
      myChart.clear();
      // myChart.resize();
      myChart.setOption(this.options, true);
    },
    setOption() {
      if (!this.leg) {
        return;
      }
      let seriesData = [];
      for (let i = 0; i < this.leg.length; i++) {
        let obj = {
          name: this.leg[i],
          type: "line",
          data: this.yAxis[i]
        };
        seriesData.push(obj);
      }
      let option = {
        // color: ['#2DC61B', '#F15F81', '#3569FD',],
        // type: 'line',
        textStyle: {
          fontSize: 12,
          color: "#AFB2BB",
          fontWeight: 500
        },
        grid: {
          left: 40,
          top: 40
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "@font-color"
            }
          },
          backgroundColor: "rgba(27,34,59,0.8)",
          borderColor: "rgba(27,34,59,1)",
          textStyle: {
            fontSize: 14,
            color: "#f5f3f3"
          },
          formatter: function(params) {
            let relVal = params[0].name;
            for (let i = 0, l = params.length; i < l; i++) {
              relVal += "<br/>" + params[i].marker + params[i].seriesName + ": " + params[i].value + " ms";
            }
            return relVal;
          }
        },
        legend: {
          data: this.leg,
          textStyle: {
            color: "#AFB2BB",
            fontsize: 12
          }
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxis,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            min: "dataMin",
            max: "dataMax",
            // interval: 50,
            splitLine: false
          }
        ],
        series: seriesData
      };
      // console.log(seriesData, option);
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
  width: 1430px;
  height: 300px;
}
</style>
