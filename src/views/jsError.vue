<!--js错误页面-->
<template>
  <div class="jsError-page">
    <!--    js error overview-->
    <card-list :cardList="cardList"></card-list>
    <!--    js error chart-->
    <div class="list-container">
      <div class="list-tab">
        <div
          :class="tabActive === 'overview' ? 'list-active' :''"
          class="list-tab-item"
          @click="changeTab('overview')"
        >
          概览
        </div>
        <!--        <div-->
        <!--            class="list-tab-item"-->
        <!--            :class="tabActive === 'errorList' ? 'list-active' :'' "-->
        <!--            @click="changeTab('errorList')"-->
        <!--        >-->
        <!--          错误列表-->
        <!--        </div>-->
      </div>
      <div class="chart-container">
        <time-select @changeDate="changeDate"></time-select>
        <div class="chart-error">
          <js-line :dataList="error"></js-line>
        </div>
      </div>

    </div>

    <!--    js error list( frequent and latest ) -->
    <div class="errorList-container">
      <div class="error-frequent">
        <div class="erList-head">
          <p style="flex: 1">高频错误</p>
          <p style="width: 16%;text-align: center">发生次数</p>
          <p style="width: 12%;  margin-left: 4px; text-align: center">影响人数</p>
          <p style="width: 7%;  margin-left: 4px;  text-align: center">详情</p>
        </div>
        <div v-for="(item , index) in errorList" :key="index" class="erList-item">
          <div class="list-item-con">
            <span class="item-con-head">{{ item.key[0] }}</span>
            <span class="item-con-cont">{{ item.key[1] }}</span>
          </div>
          <div class="list-item-times">
            <p class="item-times-tol">{{ item.docPV }}</p>
            <div class="item-times-imgs">
              <img height="20" src="../assets/img/icon-android.png" width="20">
              <span>{{ item.clientVersion[0] }}</span>
              <img height="15" src="../assets/img/icon-ios.png" width="15">
              <span>{{ item.clientVersion[1] }}</span>
              <img height="15" src="../assets/img/icon-windows.png" width="15">
              <span>{{ item.clientVersion[1] }}</span>
            </div>
          </div>
          <div class="list-item-uv">{{ item.docUV }}</div>
          <Button class="detail" @click="checkLog">查看</Button>
        </div>
        <Page :total="pageSize" show-sizer show-total />
      </div>
      <div class="error-frequent">
        <div class="erList-head">
          <p style="flex: 1">最新错误</p>
          <p style="width: 16%;text-align: center">发生次数</p>
          <p style="width: 12%; margin-left: 4px;text-align: center">影响人数</p>
          <p style="width: 7%;margin-left: 4px; text-align: center">详情</p>
        </div>
        <div v-for="(item , index) in errorList" :key="index" class="erList-item">
          <div class="list-item-con">
            <span class="item-con-head">{{ item.key[0] }}</span>
            <span class="item-con-cont">{{ item.key[1] }}</span>
          </div>
          <div class="list-item-times">
            <p class="item-times-tol">{{ item.docPV }}</p>
            <div class="item-times-imgs">
              <img height="20" src="../assets/img/icon-android.png" width="20">
              <span>{{ item.clientVersion[0] }}</span>
              <img height="15" src="../assets/img/icon-ios.png" width="15">
              <span>{{ item.clientVersion[1] }}</span>
              <img height="15" src="../assets/img/icon-windows.png" width="15">
              <span>{{ item.clientVersion[1] }}</span>
            </div>
          </div>
          <div class="list-item-uv">{{ item.docUV }}</div>
          <Button class="detail" @click="checkLog">查看</Button>
        </div>
        <Page :total="pageSize" show-sizer show-total />
      </div>
    </div>


    <div class="js-cards-data">
      <bar-card :id="'js-net'" :card-list="network"></bar-card>
      <bar-card :id="'js-system'" :card-list="system"></bar-card>
      <bar-card :id="'js-browser'" :card-list="browser"></bar-card>
    </div>

    <Dialog v-if="visi" ref="jsDialog" :type="'jsDetailData'"></Dialog>
  </div>
</template>

<script>
import cardList from "@/components/cardList";
import timeSelect from "@/components/timeSelect";
import barCard from "@/components/barCard";
import jsLine from "@/components/jsLine";
import Dialog from "@/components/dialog";
import { Page } from "view-design";
import { getJsData } from "@/utils/requests";
import { getDetailInfo } from "@/utils/utils";

export default {
  components: {
    cardList,
    timeSelect,
    jsLine,
    barCard,
    Dialog,
    Page
  },
  data() {
    return {
      cardList: [],
      tabActive: "overview",
      //控制弹窗出现
      visi: false,
      pageSize: 5,

      //js error datas
      error: {},
      errorList: [],
      today: [],
      week: [],
      detail: [],
      //datePicker datas
      dateRange: 1,

      //小卡片
      system: [],
      browser: [],
      network: []
    };
  },
  methods: {
    init() {
      this.tabActive = "overview";
      this.getData();
    },
    async getData() {
      const res = await getJsData();
      let data = {};
      if (res.code == 200) {
        // console.log(res.data, ' try mock js call')
        data = res.data;
      }
      this.cardList = data.cardList;
      this.today = data.jsErrToday;
      this.week = data.jsErrWeek;
      // this.list = data.;
      this.errorList = data.jsErrorList.itemList;
      // this.tableHead = data.apiListHead;
      this.system = data.jsSystem;
      this.network = data.jsNetwork;
      this.browser = data.jsBrowser;
      // this.status = data.apiStatusCode;
      this.detail = data.jsDetail;
      // this.getErrorData(jsErrToday);
      this.getErrorData(this.today);
      this.getErrorList();
      this.getErrorDetail();
    },
    changeTab(val) {
      this.tabActive = val;
    },
    changeDate(data) {
      data === 1 ? this.getErrorData(this.today) : this.getErrorData(this.week);
    },
    checkLog() {
      this.visi = true;
      this.$nextTick(() => {
        //init调用的是dialog组件里面的init方法
        this.$refs.jsDialog.init();
      });
    },
    //get the data of js error chart
    getErrorData(res) {
      let todayNumber = [], todayPage = [], todayUser = [], todayTime = [];
      res.itemList.forEach((val) => {
        todayNumber.push(val.docPV);
        todayPage.push(val.page);
        todayUser.push(val.docUV);
      });
      //"key": "2022-11-10 02:00:00",
      if (res.today) {
        res.time.forEach(val => {
          let time = val.split(" ")[1].split(":");
          let hour = time[0][0] === "0" && time[0] != "00" ? time[0][1] : time[0];
          let res = hour + ":" + time[1];
          todayTime.push(res);
        });
      } else {
        res.time.forEach(val => {
          let date = val.split(" ")[0].split("-");
          let res = date[1] + "-" + date[2];
          todayTime.push(res);
        });
      }
      this.error = {
        xData: todayTime,
        yNumber: todayNumber,
        yPage: todayPage,
        yUser: todayUser
      };
      // console.log(this.error, "errorlist");
    },
    getErrorList() {
      // if(!this.errorList)
      //   return;
      this.errorList.forEach((val) => {
        let [head, content] = val.key.split(":");
        val.key = [head, content];
      });
    },

    getErrorDetail() {
      let datas = this.detail;
      let result = [];
      for (let data of datas) {
        let obj = getDetailInfo(data);
        obj["content"] = ["异常内容", data.w_msg];
        obj["page"] = ["页面URL", data.w_url];
        result.push(obj);
      }
      // console.log(datas , result);
      localStorage.setItem("jsDetailData", JSON.stringify(result));
    }

  },
  // created() {
  //   this.getErrorData(jsErrToday);
  //   this.getErrorList();
  // },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.jsError-page {
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
        //width: 400px;
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

      .detail {
        margin-left: 4px;
        border-radius: 4px;
        color: @font-color;
        font-size: 14px;
        width: 7%;
        background-color: #ed4014;
        border: transparent;
        cursor: pointer;
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
          //margin: 0 4px;
          //width: 110px;
          margin-left: 4px;
          width: 16%;

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
          //width: 80px;
          margin-left: 4px;
          width: 12%;
          text-align: center;
        }
      }

      .erList-item:last-child {
        border-bottom: 0px;
      }
    }
  }


  .js-cards-data {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>


<style lang="less">
.jsError-page {
  .ivu-page {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    color: @tit-color;

    .ivu-page-prev,
    .ivu-page-next,
    .ivu-select-selection {
      background-color: @comp-back;
      border: none;
      color: @font-color;

      a {
        color: @font-color;
      }
    }

    .ivu-page-item {
      background-color: @comp-back;
      border: none;

      a {
        font-size: 14px;
        color: @font-color;
      }
    }

    .ivu-page-item-active {
      background-color: @high-light-blue;
      //border: none;
      a {
        color: @comp-back;
        font-weight: bold;
      }
    }

    .ivu-select-dropdown {
      background-color: @comp-back;
      border: 1px solid @body-back;
      padding-top: 0;
      padding-bottom: 0;

      .ivu-select-item {
        color: @tit-color;
        border-bottom: 1px solid @body-back;
      }

      .ivu-select-item-selected {
        color: @high-light-blue;
      }
    }
  }
}
</style>
