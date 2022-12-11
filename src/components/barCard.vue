<template>
  <!--  小卡片 ，饼图和列表 -->
  <div class="bar-card-container">
    <div class="bar-card-head">
      <span>{{ cardList.title }}</span>
      <div class="bar-card-change">
        <Button
          :disabled="barDis"
          size="small"
          style="margin-right: 5px"
          type="primary"
          @click="changeChart('bar')"
        >饼图
        </Button
        >
        <Button
          :disabled="listDis"
          size="small"
          type="primary"
          @click="changeChart('list')"
        >列表
        </Button
        >
      </div>
    </div>
    <div v-bind:id="id" class="bar-card-charts"></div>
  </div>
</template>

<script>
import { Button } from "view-design";

export default {
  name: "barCard",
  props: ["id", "cardList"],
  components: {
    Button
  },
  watch: {
    cardList: function(o, n) {
      this.init();
    }
  },
  data() {
    return {
      options: [],
      seriesData: [],
      total: 0,
      barDis: true,
      listDis: false
    };
  },
  methods: {
    init() {
      this.formatData();
      this.setOption();
      let dom = document.getElementById(this.id);
      let mychart = this.$echarts.init(dom);
      // console.log(dom , mychart , this.options);
      mychart.clear();
      // window.addEventListener('resize' , function (){
      //   mychart.resize();
      // });
      mychart.setOption(this.options);
    },
    setOption() {
      let label = "";
      if (this.id === "user-base") {
        label = "{name|总时长(min)}";
      } else {
        label = "{name|总次数(次)}";
      }
      let option = {
        title: {
          //  显示总数
          zlevel: 0,
          text: [label, "{value|" + this.total + "}"].join("\n"),

          top: "center",
          left: "center",
          textStyle: {
            color: "#cccaca",
            fontWeight: 400,
            rich: {
              value: {
                // color: '#f5f3f3',
                fontSize: 18,
                fontWeight: 600,
                padding: [10, 0, 5, 0]
              },
              name: {
                fontSize: 16
              }
            }
          }
        },
        color: [
          "#3569FD",
          "#F47D36",
          "#04A5B5",
          "#F15F81",
          "#F47D36",
          "#795CED",
          "#2DC61B"
        ],
        left: 0,
        top: 20,
        zlevel: 1,
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 14,
            color: "#f5f3f3"
          },
          backgroundColor: "rgba(27,34,59,0.42)",
          formatter: function(e) {
            let data = e.data.tooltip;
            let arr = "<b>" + e.name + "</b>" + "</br>";
            for (let key in data) {
              arr += key + " : " + data[key] + "</br>";
            }
            // console.log(e.data.tooltip);
            return arr;
          }
        },
        legend: {
          left: "center",
          width: "400",
          textStyle: {
            color: "#AFB2BB",
            fontSize: 14
          }
        },
        label: {
          color: "#AFB2BB",
          fontSize: 15,
          fontWeight: 500
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "50%"],
            data: this.seriesData,
            itemStyle: {
              normal: {
                borderWidth: 4, //设置border的宽度有多大
                borderColor: "rgba(27,34,59,1)"
              },
              emphasis: {
                // itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
                // },
              }
            }
          }
        ]
      };
      this.options = option;
    },
    // drawChart(){
    //
    // }
    formatData() {
      // let value = {};
      let data = [],
        total = 0;
      const mapping = {
        succPV: "成功次数",
        docPV: "次数",
        succRate: "成功率",
        visTime: "停留时间"
      };
      if (!this.cardList.itemList) {
        return;
      }
      if (this.id === "user-base") {
        this.cardList.itemList.forEach((i) => {
          total += i.visTime;
        });
        this.total = total;
        this.cardList.itemList.forEach((val) => {
          let value = {};
          let rate = (val.succRate * 100).toFixed(2) + "%";
          for (let key in val) {
            if (key === "succRate") {
              value[mapping[key]] = rate;
            } else if (key === "key") {
              continue;
            } else {
              value[mapping[key]] = val[key];
            }
          }
          value["占比"] = ((val.visTime / total) * 100).toFixed(2) + "%";
          let obj = {
            value: val.visTime,
            name: val.key,
            tooltip: value
          };
          data.push(obj);
        });
      } else {
        this.cardList.itemList.forEach((i) => {
          total += i.docPV;
        });
        this.total = total;
        this.cardList.itemList.forEach((val) => {
          let value = {};
          let rate = (val.succRate * 100).toFixed(2) + "%";
          for (let key in val) {
            if (key === "succRate") {
              value[mapping[key]] = rate;
            } else if (key === "key") {
              continue;
            } else {
              value[mapping[key]] = val[key];
            }
          }
          value["占比"] = ((val.docPV / total) * 100).toFixed(2) + "%";
          let obj = {
            value: val.docPV,
            name: val.key,
            tooltip: value
          };
          data.push(obj);
        });
      }

      this.seriesData = data;
      // console.log(data);
    },
    changeChart(type) {
      if (type === "list") {
        this.barDis = false;
        this.listDis = true;
      } else {
        this.listDis = false;
        this.barDis = true;
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.bar-card-container {
  margin-top: 26px;
  width: 49%;
  height: 400px;
  border-radius: 8px;
  background-color: @comp-back;
  padding: 0 20px;

  .bar-card-head {
    font-size: 18px;
    font-weight: bolder;
    color: @font-color;
    padding: 20px 0 0;
    display: flex;
    justify-content: space-between;

    .bar-card-change {
      z-index: 1;
      //width: 100px;
      cursor: pointer;
      //border-radius: 3px;
      //padding: 6px 4px;
      //background-color: @list-head;
      //border: 1px solid @high-light-blue;
      span {
        cursor: pointer;
      }
    }
  }

  .bar-card-charts {
    width: 640px;
    height: 420px;
    margin-top: -25px;
  }
}
</style>
