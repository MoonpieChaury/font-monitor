<template>
  <!--  日志的详情列表-->
  <div class="detail-list-container">
    <div class="list-th list-header">
      <p class="list-column1">生成时间</p>
      <p class="list-column2">网络类型</p>
      <p class="list-column2">运营商</p>
      <p class="list-column2">客户端</p>
      <p class="list-column3">详细</p>
    </div>
    <div
      v-for="(item, index) in listData.slice(0, 9)"
      :key="index"
      class="list-body"
    >
      <div class="list-th" @click="showHide(index)">
        <div class="list-column1">
          <p>{{ item[0] }}</p>
        </div>
        <div class="list-column2">
          <p>{{ item[1] }}</p>
        </div>
        <div class="list-column2">
          <p>{{ item[2] }}</p>
        </div>
        <div class="list-column2">
          <p>{{ item[3] }}</p>
        </div>
        <div ref="listArrow" class="list-column3">
          <div class="list-detail"></div>
        </div>
      </div>
      <div ref="listDetail" style="display: none">
        <detail-page
          :detail-data="itemData[index]"
          :detail-type="itemType"
        ></detail-page>
      </div>
    </div>
    <Page :total="pageSize" show-sizer show-total />
  </div>
</template>

<script>
import { Page } from "view-design";
import DetailPage from "@/components/detailPage";

export default {
  name: "detailList",
  props: ["detailType"],
  components: {
    // Icon,
    DetailPage,
    Page
  },
  data() {
    return {
      //列表数据
      listData: [],
      //传入详细页面的数据
      // detailData:[],
      //展示详情页的是什么类型
      itemType: "",
      itemData: [],
      pageSize: 0
    };
  },
  watch: {
    //监听不要用箭头函数！！！！
    detailType: function(o, n) {
      this.init();
    }
  },
  methods: {
    init() {
      if (!this.detailType) {
        return;
      }
      let key = this.detailType;
      this.itemData = JSON.parse(localStorage.getItem(key));
      this.itemType = key;
      this.getList(this.itemData);
      // this.getDetail();
      // console.log(key,this.itemData,'init成功');
    },
    //只是列表
    getList(res) {
      let datas = res;
      let item = [];
      for (let data of datas) {
        item.push([
          data.date[1],
          data.network[1],
          data.operator[1],
          data.client[1]
        ]);
      }
      this.listData = item;
      this.pageSize = this.listData.length;
      // console.log(this.listData,'getlist成功');
    },
    // getDetail(){
    //   let datas = this.itemData;
    //   let item = [];
    //   // for(let data of datas) {
    //   //   item.push([data.date[1] , data.network[1] , data.operator[1] , data.client[1]]);
    //   // }
    //   this.listData = item;
    // },
    //折叠和翻转
    showHide(index) {
      // console.log(this.$refs.listArrow[0].style);
      if (this.$refs.listDetail[index].style.display === "none") {
        this.$refs.listDetail[index].style.display = "block";
        this.$refs.listArrow[index].style.transform = "rotate(-90deg)";
      } else {
        this.$refs.listDetail[index].style.display = "none";
        this.$refs.listArrow[index].style.transform = "rotate(0deg)";
      }
    }
  },
  mounted() {
    this.init();
    // console.log(this.detailType);
  }
};
</script>

<style lang="less" scoped>
.detail-list-container {
  background-color: @body-back;
  color: @tit-color;
  font-size: 14px;
  //padding: 10px;
  width: 100%;

  height: 510px;
  overflow-y: scroll;

  .list-th {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    height: 45px;
    color: @tit-color;
    //border-bottom: 1px solid gray;
    font-size: 16px;
    //background-color: @list-head;
    //font-size: 16px;
    //font-weight: 500;
    cursor: pointer;
  }

  .list-body {
    border-bottom: 1px solid gray;

    .list-detail {
      background: url("../assets/img/icon-arrow.png") no-repeat 30% 50%;
      width: 12px;
      height: 12px;
    }
  }

  .list-body:nth-child(10) {
    border-bottom: transparent;
  }

  .list-column1 {
    flex: 1;
    text-align: center;
  }

  .list-column2 {
    width: 18%;
    text-align: center;
  }

  .list-column3 {
    width: 4%;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .list-header {
    background-color: @list-head;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
<style lang="less">
.detail-list-container {
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
