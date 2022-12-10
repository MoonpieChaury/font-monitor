<!--页面详情描述-->
<template>
  <div class="page-info-page">
    <!--    page info overview-->
    <card-list :cardList="cardList"></card-list>
    <!--    page error chart-->
    <div class="list-container">
      <div class="list-tab">
        <div class="list-tab-item list-active">性能均值</div>
      </div>
      <div class="chart-container">
        <time-select @changeDate="changeDate"></time-select>
        <div class="chart-error">
          <page-line :dataList="error"></page-line>
        </div>
      </div>
    </div>

    <div class="errorList-container">
      <!--      <div class="error-frequent">-->
      <!--        <div class="erList-head">-->
      <!--          <p style="flex: 1">高频错误</p>-->
      <!--          <p style="width: 150px; text-align: center">发生次数</p>-->
      <!--          <p style="width: 80px; text-align: center">影响人数</p>-->
      <!--        </div>-->
      <!--        <div-->
      <!--            class="erList-item"-->
      <!--            v-for="(item, index) in errorList"-->
      <!--            :key="index"-->
      <!--        >-->
      <!--          <div class="list-item-con">-->
      <!--            <span class="item-con-head">{{ item.key[0] }}</span>-->
      <!--            <span class="item-con-cont">{{ item.key[1] }}</span>-->
      <!--          </div>-->
      <!--          <div class="list-item-times">-->
      <!--            <p class="item-times-tol">{{ item.docPV }}</p>-->
      <!--            <div class="item-times-imgs">-->
      <!--              <img-->
      <!--                  src="../assets/img/icon-android.png"-->
      <!--                  width="20"-->
      <!--                  height="20"-->
      <!--              />-->
      <!--              <span>{{ item.clientVersion[0] }}</span>-->
      <!--              <img src="../assets/img/icon-ios.png" width="15" height="15"/>-->
      <!--              <span>{{ item.clientVersion[1] }}</span>-->
      <!--              <img-->
      <!--                  src="../assets/img/icon-windows.png"-->
      <!--                  width="15"-->
      <!--                  height="15"-->
      <!--              />-->
      <!--              <span>{{ item.clientVersion[1] }}</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="list-item-uv">{{ item.docUV }}</div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="error-frequent">-->
      <!--        <div class="erList-head">-->
      <!--          <p style="flex: 1">最新错误</p>-->
      <!--          <p style="width: 150px; text-align: center">发生次数</p>-->
      <!--          <p style="width: 80px; text-align: center">影响人数</p>-->
      <!--        </div>-->
      <!--        <div-->
      <!--            class="erList-item"-->
      <!--            v-for="(item, index) in errorList"-->
      <!--            :key="index"-->
      <!--        >-->
      <!--          <div class="list-item-con">-->
      <!--            <span class="item-con-head">{{ item.key[0] }}</span>-->
      <!--            <span class="item-con-cont">{{ item.key[1] }}</span>-->
      <!--          </div>-->
      <!--          <div class="list-item-times">-->
      <!--            <p class="item-times-tol">{{ item.docPV }}</p>-->
      <!--            <div class="item-times-imgs">-->
      <!--              <img-->
      <!--                  src="../assets/img/icon-android.png"-->
      <!--                  width="20"-->
      <!--                  height="20"-->
      <!--              />-->
      <!--              <span>{{ item.clientVersion[0] }}</span>-->
      <!--              <img src="../assets/img/icon-ios.png" width="15" height="15"/>-->
      <!--              <span>{{ item.clientVersion[1] }}</span>-->
      <!--              <img-->
      <!--                  src="../assets/img/icon-windows.png"-->
      <!--                  width="15"-->
      <!--                  height="15"-->
      <!--              />-->
      <!--              <span>{{ item.clientVersion[1] }}</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="list-item-uv">{{ item.docUV }}</div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>

    <div class="chart-waterfall">
      <div class="waterfall-title">页面加载瀑布图</div>
      <div class="waterfall-chart">
        <page-waterfall :dataList="water"></page-waterfall>
      </div>
    </div>

    <div class="cards-data">
      <bar-card :id="'page-net'" :card-list="network"></bar-card>
      <bar-card :id="'page-system'" :card-list="system"></bar-card>
      <bar-card :id="'page-browser'" :card-list="browser"></bar-card>
    </div>
  </div>
</template>

<script>
import cardList from "@/components/cardList";
import pageLine from "@/components/pageLine";
import timeSelect from "@/components/timeSelect";
import barCard from "@/components/barCard";
import pageWaterfall from "@/components/pageWaterfall";
import { getPageData } from "@/utils/requests";

export default {
  components: {
    cardList,
    timeSelect,
    pageLine,
    barCard,
    pageWaterfall
  },
  data() {
    return {
      cardList: [],
      tabActive: "",

      //error datas
      error: {},
      water: {},
      today: [],
      week: [],
      list: [],
      waterfall: [],

      //datePicker range
      dateRange: 1,

      system: [],
      browser: [],
      network: []
    };
  },
  methods: {
    init() {
      this.tabActive = "overview";
      this.getPageInfo();
    },
    //接口调用整个页面的数据
    async getPageInfo() {
      const res = await getPageData();
      let data = {};
      if (res.code == 200) {
        // console.log(res.data, ' try mock js call')
        data = res.data;
      }
      this.cardList = data.pageCardList;
      this.today = data.pageToday;
      this.week = data.pageWeek;
      this.list = data.pageList;
      this.waterfall = data.pageWater;
      this.system = data.pageSystem;
      this.network = data.pageNetwork;
      this.browser = data.pageBrowser;
      this.getErrorData(this.today);
      this.getWaterfallData(this.waterfall);
    },
    changeTab(val) {
      this.tabActive = val;
    },
    changeDate(data) {
      this.dateRange = data;
      data === 1 ? this.getErrorData(this.today) : this.getErrorData(this.week);
      console.log(data, this.dateRange, "date");
    },
    //处理概览折线图数据
    getErrorData(data) {
      let legend = [
        "首字节",
        "DOM Ready",
        "页面完全加载",
        "DNS查询",
        "TCP连接",
        "SSL建连",
        "请求响应",
        "内容传输",
        "DOM解析",
        "资源加载"
      ];
      //"key": "2022-11-10 02:00:00",
      let firstByte = [],
        domReady = [],
        pageReady = [],
        dns = [],
        tcp = [],
        ssl = [],
        //请求响应
        ttfb = [],
        //内容传输
        ctdl = [],
        //dom解析
        dprs = [],
        //资源加载
        res = [],
        xAxis = [];
      // console.log(data);
      data.forEach((val) => {
        firstByte.push(val.t0);
        domReady.push(val.t1);
        pageReady.push(val.t2);
        dns.push(val.dns);
        tcp.push(val.tcp);
        ssl.push(0);
        //请求响应
        ttfb.push(val.ttfb);
        //内容传输
        ctdl.push(val.ctdl);
        //dom解析
        dprs.push(val.dprs);
        //资源加载
        res.push(val.res);
      });
      if (this.dateRange === 1) {
        data.forEach((val) => {
          let time = val.key.split(" ")[1].split(":");
          let hour =
            time[0][0] === "0" && time[0] != "00" ? time[0][1] : time[0];
          let timer = hour + ":" + time[1];
          xAxis.push(timer);
        });
      } else {
        data.forEach((val) => {
          let date = val.key.split(" ")[0].split("-");
          let timer = date[1] + "-" + date[2];
          xAxis.push(timer);
        });
      }
      // console.log(data.length , xAxis);
      let yAxis = [
        firstByte,
        domReady,
        pageReady,
        dns,
        tcp,
        ssl,
        //请求响应
        ttfb,
        //内容传输
        ctdl,
        //dom解析
        dprs,
        //资源加载
        res
      ];
      this.error = {
        leg: legend,
        yData: yAxis,
        xData: xAxis
      };
    },

    getWaterfallData(data) {
      let yDataType = [
        "DNS查询",
        "TCP连接",
        "SSL建连",
        "请求响应",
        "内容传输",
        "DOM解析",
        "资源加载"
      ];

      let list = [];
      for (let key in data) {
        list.push(data[key]);
      }
      let xInterval = {
        "首字节": list[0],
        "DOM Ready": list[1],
        "页面完全加载": list[2]
      };
      let yDataTime = list.slice(3);
      let xData1 = [0];
      for (let i = 1, sum = 0; i < yDataTime.length; i++) {
        sum += yDataTime[i - 1];
        xData1.push(sum);
      }
      this.water = {
        "xInterval": xInterval,
        "yDataType": yDataType,
        "yDataTime": yDataTime,
        "xData": xData1
      };
      console.log(this.water);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.page-info-page {
  //padding-top: 16px;

  .list-container {
    background-color: @comp-back;
    margin-top: 20px;
    border-radius: 8px;

    .list-tab {
      display: flex;

      .list-tab-item {
        font-size: 16px;
        font-weight: 600;
        color: @font-color;
        padding: 14px 20px 10px;
        margin-right: 20px;
        border-bottom: 4px solid transparent;
        cursor: pointer;
      }

      .list-active {
        border-bottom: 4px solid @high-light-blue;
      }
    }

    .chart-container {
      padding: 20px;

      .chart-timeSelect {
        display: flex;
        //justify-content: space-between;
        align-items: center;

        .chart-showTime {
          color: @tit-color;
          font-weight: 600;
          font-size: 18px;
          margin-right: 50px;
        }
      }

      .chart-error {
        margin-top: 16px;
        height: 250px;
      }
    }
  }

  .errorList-container {
    margin-top: 26px;
    display: flex;
    justify-content: space-between;
    color: @tit-color;

    .error-frequent {
      padding: 8px 0;
      background-color: @comp-back;
      font-size: 16px;
      border-radius: 8px;
      width: 48%;

      .erList-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        border-bottom: 2px solid @high-light-blue;
        color: @font-color;
        font-weight: 600;
        padding: 8px 20px;
      }

      .erList-item {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid @body-back;
        cursor: pointer;

        .list-item-con {
          flex: 1;

          .item-con-head {
            color: @high-light-blue;
            //max-width: 400px;
            font-weight: 600;
            text-overflow: ellipsis;
          }
        }

        .list-item-times {
          margin: 0 20px;
          width: 110px;

          .item-times-tol {
            font-size: 18px;
            font-weight: 600;
            text-align: center;
          }

          .item-times-imgs {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
          }
        }

        .list-item-uv {
          width: 80px;
          text-align: center;
        }
      }

      .erList-item:last-child {
        border-bottom: 0px;
      }
    }
  }

  .chart-waterfall {
    //margin-top: 26px;
    background-color: @comp-back;
    border-radius: 8px;
    color: @font-color;

    .waterfall-title {
      font-size: 16px;
      font-weight: 600;
      padding: 14px 20px 10px;
      margin-right: 20px;
    }

    .waterfall-chart {
      margin-top: -10px;
      height: 280px;
    }
  }

  .cards-data {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
