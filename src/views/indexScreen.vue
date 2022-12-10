<!--实时大屏-->
<template>
  <div class="brand-container">
    <div class="wrap">
      <header>
        <div class="weather">
          <span class="tem" @click="goIndex">返回</span>
        </div>
        <h2>实时监控大屏</h2>
        <div class="showTime">
          <span class="time">{{ nowTime }}</span>
          <span class="date">
            <span>{{ week }}</span>
            <span>{{ date }}</span>
          </span>
        </div>
      </header>

      <section class="mainbox">
        <div class="item left">
          <div class="panel">
            <h2>JS异常</h2>
            <income />
            <div class="panel-footer"></div>
          </div>
          <div class="panel">
            <h2>API请求</h2>
            <double-bar-chart ref="chart6"></double-bar-chart>
            <div class="panel-footer"></div>
          </div>
          <div class="panel">
            <h2>页面访问速度</h2>
            <business />
            <div class="panel-footer"></div>
          </div>
        </div>

        <div class="item center">
          <div class="resume">
            <div class="resume-hd">
              <ul>
                <li>
                  <countTo
                    :duration="2000"
                    :endVal="490"
                    :startVal="startVal"
                    separator=""
                  ></countTo>
                </li>
                <li>
                  <countTo
                    :duration="2000"
                    :endVal="300"
                    :startVal="startVal"
                    separator=""
                  ></countTo>
                </li>
                <li>
                  <countTo
                    :duration="2000"
                    :endVal="10"
                    :startVal="startVal"
                    separator=""
                  ></countTo>
                </li>
              </ul>
            </div>
            <div class="resume-bd">
              <ul>
                <li>今日访问量(PV)</li>
                <li>今日用户量(UV)</li>
                <li>最近24h警报</li>
              </ul>
            </div>
          </div>
          <div class="map">
            <div id="chart_map" class="chart"></div>
            <div class="map1"></div>
            <div class="map2"></div>
            <div class="map3"></div>
          </div>
        </div>

        <div class="item right">
          <div class="panel">
            <h2>新旧用户比例</h2>
            <ring ref="chart9" :data="userRing"></ring>
            <div class="panel-footer"></div>
          </div>
          <div class="panel">
            <h2>跳出率</h2>
            <bar-chart
              id="left_3"
              ref="chart3"
              :config="configData2"
            ></bar-chart>
            <div class="panel-footer"></div>
          </div>
          <div class="panel">
            <h2>平均停留时间</h2>
            <area-chart
              id="left_1"
              ref="chart1"
              :config="cnfigData1"
            ></area-chart>
            <div class="panel-footer"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import "@/utils/flexible";
import "@/utils/china";
import countTo from "vue-count-to";
import business from "@/components/business";
import income from "@/components/income";
import AreaChart from "@/components/areaChart";
import doubleBarChart from "@/components/doubleBarChart";
import ring from "@/components/ring";
import barChart from "@/components/barChart";
import { mapData, userRing } from "@/mock/staticData";

export default {
  name: "indexScreen",
  components: {
    countTo,
    business,
    income,
    barChart,
    AreaChart,
    ring,
    doubleBarChart
  },
  data() {
    return {
      nowTime: "",
      week: "",
      date: "",
      imgSrc: "",
      startVal: 0,
      userRing: userRing,
      cnfigData1: {
        color: "#24c4ff",
        name: ["（min）", "（min）"],
        data: [
          {
            name: "昨日",
            color: ["#9e70ff", "#6e5eff"],
            data: [150, 212, 121, 254, 230, 120, 240]
          },
          {
            name: "今日",
            color: ["#48cefd", "#5356f1"],
            data: [250, 130, 123, 219, 238, 130, 110]
          }
        ]
      },
      configData2: {
        data: [213, 190, 137, 99, 63, 196, 248, 212, 248, 112]
      }
    };
  },
  computed: {},
  created() {
  },
  mounted() {
    this.nowTimes();
    this.getEchart();
  },
  methods: {
    goIndex() {
      this.$router.push({
        path: "/jsError"
      });
    },

    timeFormate(timeStamp) {
      //显示当前时间
      let newDate = new Date(timeStamp);
      let year = newDate.getFullYear();
      let month =
        newDate.getMonth() + 1 < 10
          ? "0" + (newDate.getMonth() + 1)
          : newDate.getMonth() + 1;
      let date =
        newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
      let hh =
        newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
      let mm =
        newDate.getMinutes() < 10
          ? "0" + newDate.getMinutes()
          : newDate.getMinutes();
      let ss =
        newDate.getSeconds() < 10
          ? "0" + newDate.getSeconds()
          : newDate.getSeconds();
      let week = newDate.getDay();
      let weeks = ["日", "一", "二", "三", "四", "五", "六"];
      let getWeek = "星期" + weeks[week];
      this.week = getWeek;
      this.date = year + "." + month + "." + date;
      this.nowTime = hh + ":" + mm + ":" + ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
    getEchart() {
      // 初始化地图数据
      let myChart = echarts.init(document.getElementById("chart_map"));
      let option = {
        title: {
          text: "活跃用户分布地域图",
          subtext: "PS : 根据ip地址计算，仅供参考",
          // left: "center",
          top: 25,
          left: 10,
          textStyle: {
            // color: "#7ef0ff",
            color: "white",
            fontSize: 30
          },
          subtextStyle: {
            top: 5,
            color: "#75deef",
            fontSize: 12
          }
        },
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            let arr = params.name + ":";
            if (params.value) {
              arr += params.value;
            } else {
              arr += 0;
            }
            return arr + "人";
          }
        },
        visualMap: {
          min: 0,
          max: 500,
          left: 40,
          bottom: 60,
          text: ["人数"],
          calculable: true,
          inRange: {
            color: ["rgba(117,222,239,0)", "rgba(117,222,239,1)"]
          },
          textStyle: {
            color: "white",
            fontsize: 12
          }
        },

        series: [
          {
            type: "map",
            map: "china",
            data: mapData,
            roam: false,
            //放大我们的地图
            zoom: 1.1,
            top: 100,
            label: {
              // 默认文本标签样式
              normal: {
                color: "white",
                show: true
              }
              // emphasis: {
              //   show: true,
              // },
            },
            itemStyle: {
              normal: {
                // areaColor:'',
                areaColor: "rgba(43, 196, 243, 0)",
                borderColor: "#75deef",
                borderWidth: 1
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            }
          }
        ]
      };

      myChart.setOption(option);

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  },
  beforeDestroy() {
    // clearInterval(this.timer);
  }
};
</script>

<style lang="less" scoped>
html {
  overflow-y: clip !important;
}

.brand-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: @comp-back;

  .wrap {
    //background: url(../assets/img/brand/bg.jpg) no-repeat #000;
    background-size: cover;
    line-height: 1.15;

    header {
      position: relative;
      height: 1rem;
      background: url(../assets/img/head_bg.png) no-repeat top center;
      background-size: 100% 100%;

      h2 {
        color: #7ef0ff;
        font-size: 0.475rem;
        text-align: center;
        line-height: 0.75rem;
        letter-spacing: 1px;
      }

      .weather {
        position: absolute;
        left: 1.375rem;
        top: 0.35rem;
        font-size: 0.25rem;
        color: rgba(126, 240, 255, 0.7);

        img {
          width: 0.45rem;
        }

        span {
          display: inline-block;
        }

        .tem {
          //margin: 0 0.1rem 0 0.2rem;
          cursor: pointer;
        }
      }

      .showTime {
        position: absolute;
        right: 1.375rem;
        top: 0.5rem;
        color: rgba(126, 240, 255, 0.7);
        display: flex;

        .time {
          font-size: 0.28rem;
          margin-right: 0.18rem;
        }

        .date {
          span {
            display: block;

            &:nth-child(1) {
              font-size: 0.12rem;
              text-align: right;
            }

            &:nth-child(2) {
              font-size: 0.14rem;
            }
          }
        }
      }
    }

    .mainbox {
      min-width: 1024px;
      max-width: 1920px;
      padding: 0 0.125rem 0;
      display: flex;

      .item {
        flex: 3;

        &.center {
          flex: 5;
          margin: 0 0.125rem 0.1rem;
          overflow: hidden;

          .resume {
            background: rgba(101, 132, 226, 0.1);
            padding: 0.1875rem;

            .resume-hd {
              position: relative;
              border: 1px solid rgba(25, 186, 139, 0.17);

              ul {
                display: flex;
                //li-line {
                //  content: "";
                //  position: absolute;
                //  height: 50%;
                //  width: 1px;
                //  background: rgba(255, 255, 255, 0.2);
                //  top: 25%;
                //}
                li {
                  position: relative;
                  flex: 1;
                  text-align: center;
                  height: 1.2rem;
                  line-height: 1.2rem;
                  font-size: 0.65rem;
                  color: #ffeb7b;
                  padding: 0.05rem 0;
                  font-family: "DIGITALDREAMFAT";
                  font-weight: bold;

                  &:nth-child(2) {
                    &:after {
                      content: "";
                      position: absolute;
                      height: 50%;
                      width: 1px;
                      background: rgba(255, 255, 255, 0.2);
                      top: 25%;
                      right: 0;
                    }

                    &:before {
                      content: "";
                      position: absolute;
                      height: 50%;
                      width: 1px;
                      background: rgba(255, 255, 255, 0.2);
                      top: 25%;
                      left: 0;
                    }
                  }
                }
              }

              &:before {
                content: "";
                position: absolute;
                width: 30px;
                height: 10px;
                border-top: 2px solid #02a6b5;
                border-left: 2px solid #02a6b5;
                top: 0;
                left: 0;
              }

              &:after {
                content: "";
                position: absolute;
                width: 30px;
                height: 10px;
                border-bottom: 2px solid #02a6b5;
                border-right: 2px solid #02a6b5;
                right: 0;
                bottom: 0;
              }
            }

            .resume-bd {
              ul {
                display: flex;

                li {
                  flex: 1;
                  height: 0.5rem;
                  line-height: 0.5rem;
                  text-align: center;
                  font-size: 0.225rem;
                  color: rgba(255, 255, 255, 0.7);
                  padding-top: 0.125rem;
                }
              }
            }
          }
        }

        .map1,
        map-style {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6.475rem;
          height: 6.475rem;
          background: url(../assets/img/map.png) no-repeat;
          background-size: 100% 100%;
          opacity: 0.3;
        }

        .map {
          position: relative;
          height: 10.125rem;

          .chart {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            height: 10.125rem;
            width: 100%;
          }

          .map2 {
            //@extend map-style;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-size: 100% 100%;
            width: 8.0375rem;
            height: 8.0375rem;
            background-image: url(../assets/img/lbx.png);
            opacity: 0.6;
            -webkit-animation: rotate 15s linear infinite;
            animation: rotate 15s linear infinite;
            z-index: 2;
          }

          .map3 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            //background: url(../assets/img/brand/map.png) no-repeat;
            background-size: 100% 100%;
            opacity: 0.3;
            width: 7.075rem;
            height: 7.075rem;
            background-image: url(../assets/img/jt.png);
            -webkit-animation: rotate1 10s linear infinite;
            animation: rotate1 10s linear infinite;
          }
        }

        .panel {
          position: relative;
          height: 3.875rem;
          border: 1px solid rgba(25, 186, 139, 0.17);
          background: @comp-back url(../assets/img/line.png);
          padding: 0 0.1875rem 0;
          margin-bottom: 0.1875rem;

          &:before {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: 10px;
            height: 10px;
            border-top: 2px solid #02a6b5;
            border-left: 2px solid #02a6b5;
          }

          &:after {
            position: absolute;
            top: 0;
            right: 0;
            content: "";
            width: 10px;
            height: 10px;
            border-top: 2px solid #02a6b5;
            border-right: 2px solid #02a6b5;
          }

          .panel-footer {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;

            &:before {
              position: absolute;
              bottom: 0;
              left: 0;
              content: "";
              width: 10px;
              height: 10px;
              border-bottom: 2px solid #02a6b5;
              border-left: 2px solid #02a6b5;
            }

            &:after {
              position: absolute;
              bottom: 0;
              right: 0;
              content: "";
              width: 10px;
              height: 10px;
              border-bottom: 2px solid #02a6b5;
              border-right: 2px solid #02a6b5;
            }
          }

          h2 {
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: right;
            color: #fff;
            //color: #7ef0ff;
            font-size: 16px;
            font-weight: 500;
            padding-right: 20px;

            a {
              margin: 0 0.1875rem;
              color: #fff;
              text-decoration: none;
            }
          }

          .chart {
            height: 3rem;
          }
        }
      }

      .right {
        .panel {
          h2 {
            text-align: left;
            padding-left: 20px;
          }
        }
      }
    }
  }
}

@-webkit-keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@-webkit-keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}

@media screen and (min-width: 1920) {
  html {
    font-size: 80px !important;
  }
}
</style>
