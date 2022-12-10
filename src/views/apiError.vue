<!--api错误页面-->
<template>
  <div class="apiError-page">
    <!--    api error overview-->
    <card-list :cardList="cardList"></card-list>
    <!--    api error chart-->
    <div class="list-container">
      <div class="list-tab">
        <div
          :class="tabActive === 'apiOverview' ? 'list-active' :''"
          class="list-tab-item"
          @click="changeTab('apiOverview')"
        >
          概览
        </div>
        <div
          :class="tabActive === 'apiError' ? 'list-active' :'' "
          class="list-tab-item"
          @click="changeTab('apiError')"
        >
          失败列表
        </div>
      </div>
      <div class="chart-container">
        <time-select @changeDate="changeDate"></time-select>
        <div class="chart-error">
          <api-line :dataList="error"></api-line>
        </div>
      </div>

    </div>

    <!--    api error list( frequent and latest ) -->
    <!--    <div class="errorList-container">-->
    <!--      <div class="error-frequent">-->
    <!--        <Table :columns="tableHead" :data="tableData">-->
    <!--          <template slot-scope="{ row, index }" slot="action">-->
    <!--            <Button type="primary" size="small" style="margin-right: 5px" @click="selectRow(index)">{{selected}}</Button>-->
    <!--            <Button type="error" size="small" @click="selectRow(index)">查看</Button>-->
    <!--          </template>-->
    <!--        </Table>-->
    <!--      </div>-->

    <!--    </div>-->
    <!--    <Page :total="pageTotal" show-sizer/>-->
    <list :data="this.tableData" :head="this.tableHead" :pageFrom="tabActive"></list>
    <div class="api-cards-data">
      <bar-card :id="'api-status'" :card-list="status"></bar-card>
      <bar-card :id="'api-net'" :card-list="network"></bar-card>
      <bar-card :id="'api-system'" :card-list="system"></bar-card>
      <bar-card :id="'api-browser'" :card-list="browser"></bar-card>
    </div>

  </div>
</template>

<script>
import cardList from "@/components/cardList";
import timeSelect from "@/components/timeSelect";
import list from "@/components/list";
import BarCard from "@/components/barCard";
import apiLine from "@/components/apiLine";
import { getApiData } from "@/utils/requests";
import { getDetailInfo } from "@/utils/utils";

export default {
  components: {
    cardList,
    timeSelect,
    apiLine,
    list,
    BarCard
    // Table,
    // Page,
    // Button,
  },
  data() {
    return {
      cardList: [],
      tabActive: "apiOverview",

      // error datas
      error: {},
      today: [],
      week: [],
      detail: [],

      // //datePicker datas
      dateRange: 1,


      tableHead: [],
      list: [],
      errList: [],
      tableData: [],
      selected: "筛选",
      pageTotal: 100,

      //cardList data
      network: [],
      system: [],
      browser: [],
      status: []

    };
  },
  methods: {
    init() {
      this.getData();
    },

    async getData() {
      const res = await getApiData();
      let data = {};
      if (res.code == 200) {
        // console.log(res.data, ' try mock js call')
        data = res.data;
      }
      this.cardList = data.apiCardList;
      this.today = data.apiToday;
      this.week = data.apiWeek;
      this.list = data.apiList;
      this.errList = data.apiErrList;
      this.tableHead = data.apiListHead;
      this.system = data.apiSystem;
      this.network = data.apiNetwork;
      this.browser = data.apiBrowser;
      this.status = data.apiStatusCode;
      this.detail = data.apiDetail;
      this.getErrorData(this.today);
      this.getErrorList();
      this.getErrorDetail();
    },
    changeTab(val) {
      this.tabActive = val;
      this.getErrorList();
      // this.tableHead =
      // console.log(val , 'change');
    },
    changeDate(data) {
      data.dateRange === 1 ? this.getErrorData(this.today) : this.getErrorData(this.week);
    },
    //get the data of api error chart
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
      // console.log(this.error, 'errorlist');
    },
    getErrorList() {
      //format the error content
      let datas = this.tabActive === "apiOverview" ? this.list : this.errList;
      if (!datas) {
        return;
      }
      let itemList = [];
      datas.itemList.forEach((val) => {
        let rate = (val.succRate * 100).toFixed(2) + "%";
        let runtime = val.rt + " ms";
        let obj = {
          "rt": runtime,
          "docPV": val.docPV,
          "rate": rate,
          "key": val.key,
          "status": val.status
        };
        itemList.push(obj);
      });
      this.tableData = itemList;
      // console.log(this.tableData);
    },
    getErrorDetail() {
      let datas = this.detail;
      let result = [];
      for (let data of datas) {
        let obj = getDetailInfo(data);
        obj["method"] = ["请求方法", data.w_method];
        obj["type"] = ["请求类型", "xhr"];
        obj["runtime"] = ["请求耗时", data.w_rt];
        obj["respond"] = ["响应码", data.w_rc ? data.w_rc : "null"];
        obj["url"] = ["API URL", data.w_res + "?" + data.w_param];
        obj["page"] = ["页面URL", data.w_url];
        result.push(obj);
      }
      // console.log(datas , result);
      localStorage.setItem("apiDetailData", JSON.stringify(result));
    }
  },
  // created() {
  //   this.getErrorData(apiToday);
  //   this.getErrorList();
  // },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.apiError-page {
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

  .api-cards-data {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>

<!--<style lang="less">-->
<!--.apiError-page {-->
<!--  //display: flex;-->
<!--  .errorList-container {-->
<!--    display: flex;-->
<!--    justify-content: space-between;-->


<!--    //ive-table stuff-->
<!--    .ivu-table-header {-->
<!--      background-color: @comp-back;-->
<!--    }-->

<!--    .ivu-table th {-->
<!--      background-color: @comp-back;-->
<!--      border-bottom: 2px solid @high-light-blue;-->
<!--    }-->

<!--    .ivu-table-header thead tr th {-->
<!--      //border-bottom: 2px solid @high-light-blue;-->
<!--      background-color: @comp-back;-->
<!--      color: @font-color;-->
<!--      font-weight: bolder;-->
<!--      font-size: 18px;-->
<!--    }-->

<!--    .ivu-table-column:first-child {-->
<!--      width: 900px;-->
<!--    }-->

<!--    .ivu-table td {-->
<!--      background-color: @comp-back;-->
<!--      //border: 1px solid transparent;-->
<!--      border: none;-->
<!--      border-bottom: 1px solid @body-back;-->
<!--    }-->

<!--    .ivu-table {-->
<!--      border: 1px solid @comp-back;-->
<!--    }-->

<!--    .ivu-table::before {-->
<!--      height: 0;-->
<!--    }-->

<!--    .ivu-table {-->
<!--      .ivu-table-tbody tr:last-child td {-->
<!--        border: 1px solid transparent;-->
<!--      }-->
<!--    }-->

<!--    .ivu-table-header {-->
<!--      colgroup {-->
<!--        display: flex;-->
<!--        justify-content: space-between;-->
<!--      }-->

<!--      colgroup col:first-child {-->
<!--        flex: 1;-->
<!--      }-->

<!--      colgroup col {-->
<!--      }-->

<!--      tr {-->
<!--        display: flex;-->
<!--        justify-content: space-between;-->

<!--        th:first-child {-->
<!--          flex: 1;-->
<!--          text-align: left;-->
<!--        }-->

<!--        th {-->
<!--          width: 13% !important;-->
<!--          text-align: center;-->
<!--          font-size: 18px;-->
<!--          font-weight: 800;-->
<!--        }-->

<!--        //th:last-child {-->
<!--        //  width: 19% !important;-->
<!--        //}-->
<!--      }-->
<!--    }-->

<!--    .ivu-table-body {-->
<!--      colgroup {-->
<!--        display: flex;-->
<!--        justify-content: space-between;-->
<!--        align-items: center;-->
<!--      }-->

<!--      colgroup col:first-child {-->
<!--        flex: 1;-->
<!--      }-->

<!--      .ivu-table-row {-->
<!--        display: flex;-->
<!--        justify-content: space-between;-->
<!--        align-items: center;-->

<!--        td:first-child {-->
<!--          flex: 1;-->
<!--          text-align: left;-->
<!--        }-->

<!--        td {-->
<!--          width: 13% !important;-->
<!--          text-align: center;-->
<!--          font-size: 16px;-->
<!--          font-weight: 400;-->
<!--          color: @tit-color;-->
<!--          height: 50px;-->
<!--        }-->

<!--        //td:last-child {-->
<!--        //  width: 19% !important;-->
<!--        //}-->
<!--      }-->
<!--      .ivu-table-cell {-->
<!--        line-height: 50px;-->
<!--      }-->
<!--    }-->


<!--    //ivu-page setting-->
<!--  }-->

<!--  //ivu-page stuff-->
<!--  .ivu-page {-->
<!--    margin-top: 16px;-->
<!--    display: flex;-->
<!--    justify-content: flex-end;-->
<!--    color: @tit-color;-->

<!--    .ivu-page-prev, .ivu-page-next, .ivu-select-selection {-->
<!--      background-color: @comp-back;-->
<!--      border: none;-->
<!--      color: @font-color;-->

<!--      a {-->
<!--        color: @font-color;-->
<!--      }-->
<!--    }-->

<!--    .ivu-page-item {-->
<!--      background-color: @comp-back;-->
<!--      border: none;-->

<!--      a {-->
<!--        color: @font-color;-->
<!--      }-->

<!--    }-->

<!--    .ivu-page-item-active {-->
<!--      background-color: @high-light-blue;-->
<!--      //border: none;-->
<!--      a {-->
<!--        color: @comp-back;-->
<!--        font-weight: bold;-->
<!--      }-->
<!--    }-->

<!--    .ivu-select-dropdown {-->
<!--      background-color: @comp-back;-->
<!--      border: 1px solid @body-back;-->
<!--      padding-top: 0;-->
<!--      padding-bottom: 0;-->

<!--      .ivu-select-item {-->
<!--        color: @tit-color;-->
<!--        border-bottom: 1px solid @body-back;-->
<!--      }-->

<!--      .ivu-select-item-selected {-->
<!--        color: @high-light-blue;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
