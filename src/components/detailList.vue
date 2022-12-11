<template>
  <!--  日志的详情列表-->
  <div class="detail-list-container">
    <div class="list-th list-header">
      <p class="list-column1">{{ listHead[0] }}</p>
      <p class="list-column2">{{ listHead[1] }}</p>
      <p class="list-column2">{{ listHead[2] }}</p>
      <p class="list-column2">{{ listHead[3] }}</p>
      <p class="list-column3">{{ listHead[4] }}</p>
    </div>
    <div
      v-for="(item, index) in listData"
      :key="index"
      class="list-body"
    >
      <div class="list-th">
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
        <!--        列表操作相关的改动区-->
        <div v-if="listHead[4]!='操作'" ref="listArrow" class="list-column3" @click="showHide(index)">
          <div class="list-detail"></div>
        </div>
        <div v-else class="list-column3 list-check" @click="goUserPath(index)">路径</div>
      </div>
      <div v-if="listHead[4]!='操作'" ref="listDetail" style="display: none">
        <detail-page
          :detail-data="itemData[index]"
          :detail-type="itemType"
        ></detail-page>
      </div>
    </div>
    <Page :total="pageSize" show-sizer show-total @on-change="changePage" />
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
      listHead: [],
      //列表数据(每10页展示）
      listData: [],
      //列表总数据
      listDataAll: [],
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
      if (key === "userAnalysis") {
        this.listHead = ["用户ID", "生成时间", "IP地址", "用户位置", "操作"];
        this.listDataAll = this.itemData;
        this.pageSize = this.listDataAll.length;
      } else {
        this.listHead = ["生成时间", "网络类型", "运营商", "客户端", "详细"];
        this.getList(this.itemData);
      }
      // this.getDetail();
      // console.log(key,this.itemData,'init成功');
      //获取展示的前10页数据
      this.changePage(1);
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
      this.listDataAll = item;
      // this.listData = item;
      this.pageSize = this.listDataAll.length;
      // console.log(this.listData,'getlist成功');
    },
    changePage(index) {
      let end = Math.min(index * 10, this.pageSize);
      let start = index * 10 - 10;
      this.listData = this.listDataAll.slice(start, end);
      console.log(start, end, this.listData);
    },
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
    },
    goUserPath(index) {
      this.$emit("changeTab");
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

  height: 560px;
  overflow-y: scroll;

  .list-th {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    height: 45px;
    color: @font-color;
    //border-bottom: 1px solid gray;
    font-size: 16px;
  }

  .list-body {
    border-top: 1px solid gray;

    .list-detail {
      background: url("../assets/img/icon-arrow.png") no-repeat 30% 50%;
      width: 12px;
      height: 12px;
    }
  }

  .list-body:nth-child(2) {
    border-top: transparent;
  }

  .list-column1 {
    flex: 1;
    text-align: center;
  }

  .list-column2 {
    width: 20%;
    text-align: center;
  }

  .list-column3 {
    width: 7%;
    text-align: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  .list-check {
    color: @high-light-pink;
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
