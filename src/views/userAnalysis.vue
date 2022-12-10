<!--用户概览页面-->
<template>
  <div class="user-analysis-container">
    <div class="search-header">
      <div class="search-input">
        <div class="user-input-wrap">
          <Input v-model="value" placeholder="请输入用户ID查找"></Input>
        </div>
        <div class="date-input-wrap">
          <Date-picker
            placeholder="选择日期和时间"
            type="datetime"
          ></Date-picker>
        </div>
        <div class="date-input-search-btn">
          <Button icon="ios-search" type="error">搜索</Button>
        </div>
      </div>
    </div>

    <!--    <Hot/>-->
    <!--    <dv-border-box-11 title="dv-border-box-11"-->
    <!--    >dv-border-box-11-->
    <!--    </dv-border-box-11>-->
  </div>
</template>

<script>
// import Hot from "@/components/Hot";
import { Input, Button, DatePicker } from "view-design";

export default {
  components: {
    Input,
    Button,
    DatePicker
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.user-analysis-container {
  .search-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 280px;
    margin-top: -60px;
    background-size: auto 100%;
    background: url("../assets/img/bg-header.webp") no-repeat 50%;

    .search-input {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
<style lang="less">
.user-analysis-container {
  .user-input-wrap {
    .ivu-input {
      height: 45px;
      width: 500px;
      padding-left: 20px;
      font-size: 18px;
      border-radius: 8px;
    }

  }

  .date-input-wrap {
    margin-left: 8px;

    .ivu-input {
      height: 45px;
      width: 400px;
      font-size: 18px;
      padding: 0 20px;
      border-radius: 8px;
    }

    .ivu-input-suffix i {
      line-height: 45px;
    }
  }

  .date-input-search-btn {

    .ivu-btn {
      margin-left: 10px;
      outline: 0;
      height: 45px;
      font-size: 18px;
      border-radius: 8px;
    }
  }
}
</style>
