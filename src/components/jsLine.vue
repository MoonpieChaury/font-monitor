<template>
  <div id="jsLine" class="com-jsLine">
  </div>
</template>

<script>
export default {
  name: "jsLine",
  props: ["dataList"],
  data() {
    return {
      options: [],
      units: ["次", "人", "页"]
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
      let chartDom = document.getElementById("jsLine");
      let myChart = this.$echarts.init(chartDom);
      myChart.clear();
      // myChart.resize();
      myChart.setOption(this.options, true);
      // myChart.resize();
    },
    setOption() {
      let th = this;
      let option = {
        color: ["#3569FD", "#F47D36", "#2DC61B"],
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
          data: ["错误次数", "影响页面数", "影响用户数"],
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
            name: "错误次数",
            type: "bar",
            data: this.dataList.yNumber
          },
          {
            name: "影响用户数",
            type: "line",
            yAxisIndex: 1,
            data: this.dataList.yUser
          },
          {
            name: "影响页面数",
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
  }
};
</script>

<style lang="less" scoped>
.com-jsLine {
  width: 1430px;
  height: 300px;
}
</style>
