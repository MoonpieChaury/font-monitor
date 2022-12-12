<!--页面性能-->
<template>
  <div class="resourceError-page">
    <!--    error overview-->
    <card-list :cardList="cardList"></card-list>
    <!--    error chart-->
    <div class="list-container">
      <div class="list-tab">
        <div class="list-tab-item list-active">概览</div>
      </div>
      <div class="chart-container">
        <time-select @changeDate="changeDate"></time-select>
        <div class="chart-error">
          <bar-line :dataList="error"></bar-line>
        </div>
      </div>
    </div>

    <!--    概括列表统计-->
    <div class="errorList-container">
      <div class="error-frequent">
        <div class="erList-head">
          <p style="flex: 1">高频异常</p>
          <p style="width: 10%; margin-left: 4px; text-align: center">类型</p>
          <p style="width: 12%; margin-left: 4px; text-align: center">发生次数</p>
          <p style="width: 12%; margin-left: 4px; text-align: center">影响人数</p>
          <p style="width: 7%; margin-left: 4px; text-align: center">详情</p>
        </div>
        <div
          v-for="(item, index) in errorList"
          :key="index"
          class="erList-item"
        >
          <div class="list-item-con">
            <span class="item-con-head">{{ item.key }}</span>
            <!--            <span class="item-con-cont">{{ item.key[1] }}</span>-->
          </div>

          <div class="list-item-type">
            <img
              v-if="item.type === '图片'"
              height="28"
              src="../assets/img/icon-img.png"
              width="28"
            />
            <img
              v-if="item.type === 'JS'"
              height="32"
              src="../assets/img/icon-js.png"
              width="32"
            />
            <img
              v-if="item.type === 'CSS'"
              height="30"
              src="../assets/img/icon-css.png"
              width="30"
            />
          </div>
          <div class="list-item-times">
            <p class="item-times-tol">{{ item.docPV }}</p>
          </div>
          <div class="list-item-uv">{{ item.docUV }}</div>
          <Button class="detail" @click="checkLog">查看</Button>
        </div>
        <Page :total="pageSize" show-sizer show-total />
      </div>
      <div class="error-frequent">
        <div class="erList-head">
          <p style="flex: 1">最新异常</p>
          <p style="width: 10%; margin-left: 4px; text-align: center">类型</p>
          <p style="width: 12%; margin-left: 4px; text-align: center">发生次数</p>
          <p style="width: 12%; margin-left: 4px; text-align: center">影响人数</p>
          <p style="width: 7%; margin-left: 4px; text-align: center">详情</p>
        </div>
        <div
          v-for="(item, index) in errorList"
          :key="index"
          class="erList-item"
        >
          <div class="list-item-con">
            <span class="item-con-head">{{ item.key }}</span>
          </div>
          <div class="list-item-type">
            <img
              v-if="item.type === '图片'"
              height="28"
              src="../assets/img/icon-img.png"
              width="28"
            />
            <img
              v-if="item.type === 'JS'"
              height="32"
              src="../assets/img/icon-js.png"
              width="32"
            />
            <img
              v-if="item.type === 'CSS'"
              height="30"
              src="../assets/img/icon-css.png"
              width="30"
            />
          </div>
          <div class="list-item-times">
            <p class="item-times-tol">{{ item.docPV }}</p>
          </div>
          <div class="list-item-uv">{{ item.docUV }}</div>
          <Button class="detail" @click="checkLog">查看</Button>
        </div>
        <Page :total="pageSize" show-sizer show-total />
      </div>
    </div>
    <div class="resource-cards-data">
      <bar-card :id="'resource-status'" :card-list="type"></bar-card>
      <bar-card :id="'resource-net'" :card-list="network"></bar-card>
      <bar-card :id="'resource-browser'" :card-list="browser"></bar-card>
    </div>
    <Dialog v-if="visi" ref="resDialog" :type="'resDetailData'"></Dialog>
  </div>
</template>

<script>
import cardList from "@/components/cardList";
import barLine from "@/components/jsLine";
import timeSelect from "@/components/timeSelect";
import Dialog from "@/components/dialog";
import BarCard from "@/components/barCard";
import { getResourceData } from "@/utils/requests";
import { getDetailInfo } from "@/utils/utils";
import { Page } from "view-design";


export default {
  components: {
    cardList,
    timeSelect,
    barLine,
    Dialog,
    BarCard,
    Page
  },
  data() {
    return {
      cardList: [],
      tabActive: "apiOverview",
      pageSize: 10,

      // error datas
      error: {},
      errorList: [],
      today: [],
      week: [],
      detail: [],

      // //datePicker datas
      dateRange: 1,
      visi: false,


      //cardList data
      network: [],
      type: [],
      browser: []
    };
  },
  methods: {
    init() {

      this.getData();
    },
    async getData() {
      const res = await getResourceData();
      let data = {};
      if (res.code == 200) {
        // console.log(res.data, ' try mock js call')
        data = res.data;
      }
      this.cardList = data.resourceCardList;
      this.today = data.resourceToday;
      this.week = data.resourceWeek;
      this.errorList = data.resourceList.itemList;
      this.network = data.resourceNetwork;
      this.type = data.resourceType;
      this.browser = data.resourceBrowser;
      this.detail = data.resourceDetail;
      this.getErrorData(this.today);
      // this.getErrorList();
      this.getErrorDetail();
    },
    changeTab(val) {
      this.tabActive = val;
      // console.log(val , 'change');
    },
    changeDate(data) {
      data === 1
        ? this.getErrorData(this.today)
        : this.getErrorData(this.week);
    },

    checkLog() {
      this.visi = true;
      this.$nextTick(() => {
        //init调用的是dialog组件里面的init方法
        this.$refs.resDialog.init();
      });
    },
    //画概览折线图
    getErrorData(res) {
      let todayNumber = [],
        todayPage = [],
        todayUser = [],
        todayTime = [];
      res.itemList.forEach((val) => {
        todayNumber.push(val.docPV);
        todayPage.push(val.page);
        todayUser.push(val.docUV);
      });
      //"key": "2022-11-10 02:00:00",
      if (res.today) {
        res.time.forEach((val) => {
          let time = val.split(" ")[1].split(":");
          let hour =
            time[0][0] === "0" && time[0] != "00" ? time[0][1] : time[0];
          let res = hour + ":" + time[1];
          todayTime.push(res);
        });
      } else {
        res.time.forEach((val) => {
          let date = val.split(" ")[0].split("-");
          let res = date[1] + "/" + date[2];
          todayTime.push(res);
        });
      }
      this.error = {
        xData: todayTime,
        yNumber: todayNumber,
        yPage: todayPage,
        yUser: todayUser
      };
      // console.log(this.error , 'errorlist');
    },

    // getErrorList() {
    //   //format the error content
    //   let itemList = [];
    //   // apiList.itemList.forEach((val) => {
    //   //   let rate = (val.succRate * 100).toFixed(2) + " %";
    //   //   let runtime = val.rt + " ms";
    //   //   let obj = {
    //   //     rt: runtime,
    //   //     docPV: val.docPV,
    //   //     rate: rate,
    //   //     key: val.key,
    //   //     status: val.status,
    //   //   };
    //   //   itemList.push(obj);
    //   // });
    //   // this.tableData = itemList;
    //   // console.log(this.tableData);
    // },

    getErrorDetail() {
      let datas = this.detail;
      let result = [];
      let resType = ["", "css文件", "图片", "js文件"];
      for (let data of datas) {
        let obj = getDetailInfo(data);
        obj["path"] = ["DOMPath", data.w_xpath];
        obj["url"] = ["资源URL", data.w_res + "?" + data.w_param];
        obj["type"] = ["资源类型", resType[parseInt(data.w_type)]];
        obj["page"] = ["页面URL", data.w_url];
        result.push(obj);
      }
      // console.log(datas , result);
      localStorage.setItem("resDetailData", JSON.stringify(result));
    }
  },

  // created() {
  //   this.getErrorData(resourceToday);
  //   this.getErrorList();
  // },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.resourceError-page {
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
            font-weight: 600;
            text-overflow: ellipsis;
          }
        }

        .list-item-type {
          width: 10%;
          text-align: center;
        }

        .list-item-times {
          //margin: 0 20px;
          width: 12%;

          .item-times-tol {
            font-size: 16px;
            //font-weight: 600;
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
          width: 12%;
          text-align: center;
        }
      }

      .erList-item:last-child {
        border-bottom: 0px;
      }
    }
  }

  .resource-cards-data {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>


<style lang="less">
.resourceError-page {
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
