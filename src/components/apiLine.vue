<template>
  <div id="apiLine" class="com-barLine">
  </div>
</template>

<script>
export default {
  name: "apiLine",
  props: ["dataList"],
  data() {
    return {
      options: [],
      units: ["次", "次", "%"]
    };
  },
  watch: {
    dataList: function(o, n) {
      this.init();
    }
  },
  methods: {
    init() {
      this.setOption();
      // console.log(this.dataList , 'com datalist');
      let chartDom = document.getElementById("apiLine");
      let myChart = this.$echarts.init(chartDom);
      myChart.clear();
      // myChart.resize();
      myChart.setOption(this.options, true);
      // myChart.resize();
    },
    setOption() {
      let th = this;
      let option = {
        color: ["#2DC61B", "#F15F81", "#3569FD"],
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
              relVal += "<br/>" + params[i].marker + params[i].seriesName + ": "
                + params[i].value + " " + th.units[i];
            }
            return relVal;
          }
        },
        legend: {
          data: ["成功次数", "失败次数", "失败率"],
          textStyle: {
            color: "#AFB2BB",
            fontsize: 12
          }
        },
        xAxis: [
          {
            type: "category",
            data: this.dataList.xData,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: "dataMax",
            // interval: 50,
            splitLine: false

          },
          {
            type: "value",
            min: 0,
            max: "dataMax",
            // interval: 50,
            splitLine: false
          }
        ],
        series: [
          {
            name: "成功次数",
            type: "bar",
            //堆叠
            stack: "count",
            data: this.dataList.yNumber
          },
          {
            name: "失败次数",
            type: "bar",
            stack: "count",
            itemStyle: {
              borderRadius: [2, 2, 0, 0]
            },
            data: this.dataList.yUser
          },
          {
            name: "失败率",
            type: "line",
            yAxisIndex: 1,
            data: this.dataList.yPage
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
  width: 1430px;
  height: 300px;
}
</style>
