<template>
  <div v-if="len!=0" class="detail-page-container">
    <div class="detail-page-left">
      <div class="detail-header">
        摘要信息
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.date[0] }}</div>
        <div class="detail-content-cont">{{ pageData.date[1] }}</div>
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.page[0] }}</div>
        <div class="detail-content-cont">{{ pageData.page[1] }}</div>
      </div>

      <!--    其他页面的自定义-->
      <!--    api请求页面的-->
      <div v-if="errType==='apiDetailData'" class="detail-custom-wrap">
        <div class="detail-content">
          <div class="detail-content-head">{{ pageData.url[0] }}</div>
          <div class="detail-content-cont">{{ pageData.url[1] }}</div>
        </div>
        <div class="detail-content">
          <div class="detail-content-head">{{ pageData.method[0] }}</div>
          <div class="detail-content-cont">{{ pageData.method[1] }}</div>
        </div>
        <div class="detail-content">
          <div class="detail-content-head">{{ pageData.type[0] }}</div>
          <div class="detail-content-cont">{{ pageData.type[1] }}</div>
        </div>
        <div class="detail-content">
          <div class="detail-content-head">{{ pageData.runtime[0] }}</div>
          <div class="detail-content-cont">{{ pageData.runtime[1] }}</div>
        </div>
        <div class="detail-content">
          <div class="detail-content-head">{{ pageData.respond[0] }}</div>
          <div class="detail-content-cont">{{ pageData.respond[1] }}</div>
        </div>
      </div>
      <!--   js错误页面的-->
      <!--      todo js错误堆栈展示（缺数据）-->
      <div v-if="errType==='jsDetailData'" class="detail-custom-wrap">
        <div class="detail-content">
          <div class="detail-content-head">{{ pageData.content[0] }}</div>
          <div class="detail-content-cont">{{ pageData.content[1] }}</div>
        </div>
      </div>
      <!--   资源加载错误页面的-->
      <div v-if="errType==='resDetailData'" class="detail-custom-wrap">
        <div class="detail-content">
          <div class="detail-content-head">{{ pageData.url[0] }}</div>
          <div class="detail-content-cont">{{ pageData.url[1] }}</div>
        </div>
        <div class="detail-content">
          <div class="detail-content-head">{{ pageData.path[0] }}</div>
          <div class="detail-content-cont">{{ pageData.path[1] }}</div>
        </div>
        <div class="detail-content">
          <div class="detail-content-head">{{ pageData.type[0] }}</div>
          <div class="detail-content-cont">{{ pageData.type[1] }}</div>
        </div>
      </div>


      <!--    页面截图-->
      <div class="detail-content-img">
        <p>页面快照</p>
        <!--      <div class="detail-content-cont">-->
        <img src="../assets/img/bg-2.jpg">
        <!--      </div>-->
      </div>
    </div>
    <!--  右边的固定页面-->
    <div class="detail-page-right">
      <div class="detail-header">
        设备信息
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.equi[0] }}</div>
        <div class="detail-content-cont">{{ pageData.equi[1] }}</div>
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.system[0] }}</div>
        <div class="detail-content-cont">{{ pageData.system[1] }}</div>
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.dpi[0] }}</div>
        <div class="detail-content-cont">{{ pageData.dpi[1] }}</div>
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.client[0] }}</div>
        <div class="detail-content-cont">{{ pageData.client[1] }}</div>
      </div>
      <div class="detail-header">
        网络&位置
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.network[0] }}</div>
        <div class="detail-content-cont">{{ pageData.network[1] }}</div>
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.operator[0] }}</div>
        <div class="detail-content-cont">{{ pageData.operator[1] }}</div>
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.locale[0] }}</div>
        <div class="detail-content-cont">{{ pageData.locale[1] }}</div>
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.ip[0] }}</div>
        <div class="detail-content-cont">{{ pageData.ip[1] }}</div>
      </div>
      <div class="detail-header">
        其他
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.uid[0] }}</div>
        <div class="detail-content-cont">
          <p>{{ pageData.uid[1] }}</p>
          <!--        如果在用户细查页面就直接不显示-->
          <Button v-if="showUser" icon="ios-search" size="small" type="primary" @click="goUserAnalyst">用户路径分析
          </Button>
        </div>
      </div>
      <div class="detail-content">
        <div class="detail-content-head">{{ pageData.UA[0] }}</div>
        <div class="detail-content-cont">{{ pageData.UA[1] }}</div>
      </div>

    </div>
  </div>
</template>

<script>
import { Button } from "view-design";

export default {
  name: "detailPage",
  props: ["detailData", "detailType"],
  components: {
    Button
  },
  data() {
    return {
      pageData: {},
      pageName: "",
      errType: "",
      showUser: true,
      len: 0
    };
  },
  watch: {
    "detailData": function(o, n) {
      this.init();
    },
    "detailType": function(o, n) {
      this.init();
    }
  },
  methods: {
    init() {
      this.pageName = this.$route.name;
      //如果是用户分析就直接不展示前往路径按钮
      this.showUser = this.$route.name === "userAnalysis" ? false : true;
      this.errType = this.detailType;
      this.getData();
    },
    getData() {
      this.pageData = this.detailData;
      this.len = Object.keys(this.pageData).length;
    },
    goUserAnalyst() {
      //去详情页就保存当前查看的用户信息，到那边再取出来
      localStorage.setItem("userAnalyst", JSON.stringify(this.pageData));
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.detail-page-container {
  display: flex;
  justify-content: space-between;
  //height: 200px;
  color: @tit-color;
  font-size: 17px;
  font-weight: 500;
  margin: 0 16px 16px;
  //padding: 10px 0;
  background-color: @comp-back;

  .detail-content {
    display: flex;
    justify-content: space-between;

    font-size: 16px;
    color: @tit-color;
    margin: 6px 0;
    padding-left: 16px;

    .detail-content-head {
      //width: 30%;
    }

    .detail-content-cont {
      width: 75%;
    }
  }

  .detail-page-left {
    flex: 1;
    border-right: 2px solid @comp-back;

    .detail-content-cont {
      width: 85%;
    }

    .detail-content-img {
      font-size: 16px;
      font-weight: 500;
      //color: @font-color;
      padding: 0 0 26px 16px;
      //border-bottom: 1px dashed @font-color;
      img {
        margin-top: 10px;
        width: 100%;
        //height: 100%;
      }
    }
  }

  .detail-page-right {
    max-width: 400px;
    width: 40%;
    padding: 0 0 0 40px;
    //min-width: 20%;
    //background-color: green;
  }

  .detail-header {
    //font-size: 16px;
    font-weight: 500;
    color: @font-color;
    padding: 6px 0 6px 16px;
    border-bottom: 1px dashed @font-color;
  }
}
</style>
