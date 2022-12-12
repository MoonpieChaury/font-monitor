<!--用户概览页面-->
<template>
  <div class="user-analysis-container">
    <div class="search-header">
      <div class="search-input">
        <div class="user-input-wrap">
          <Input v-model="uid" placeholder="请输入用户ID查找"></Input>
        </div>
        <div class="date-input-wrap">
          <Date-picker
            placeholder="选择日期和时间"
            type="datetime"
            v-model="date"
          ></Date-picker>
        </div>
        <div class="date-input-search-btn">
          <Button icon="ios-search" type="error">查找</Button>
        </div>
      </div>
    </div>

    <div class="user-tab-wrap">
      <div
        :class="tabActive === 'log' ? 'tab-active' : ''"
        class="tab-item"
        @click="changeTab('log')"
      >
        用户列表
      </div>
      <div
        :class="tabActive === 'path' ? 'tab-active' : ''"
        class="tab-item"
        @click="changeTab('path')"
      >
        用户路径
      </div>
    </div>
    <detail-list
      v-if="tabActive === 'log'"
      :detail-type="'userAnalysis'"
      @goPath="goUserPath"
    ></detail-list>
    <div v-else class="user-path-container">
      <div class="user-path-base-container">
        <div class="base-user-info">
          <p class="user-info-title">用户基本信息</p>
          <div v-if="userInfo.length" class="user-info-con-wrap">
            <div
              v-for="(item, index) in userInfo"
              :key="index"
              class="user-info-content"
            >
              <div class="info-title">{{ item[0] }}</div>
              <div class="info-content">{{ item[1] }}</div>
            </div>
          </div>
        </div>
        <bar-card :id="'user-base'" :card-list="visitTime"></bar-card>
      </div>
      <ul v-if="len" class="user-time-line-container">
        <li v-for="(item , index) in pathList" :key="index" class="time-line-item">
          <div class="time-line-item-left">
            <img :src="require(`../assets/img/${item.listHead[0]}.png`)" />
            <span>{{ item.listHead[1] }}</span>
          </div>
          <div class="time-line-item-right">
            <div class="time-line-item-tail"></div>
            <div class="time-line-item-head" @click="showHide(index)">
              <img ref="userArrow" src="../assets/img/icon-arrow.png" />
              <span class="item-head-brief">{{ item.listHead[2] }}</span>
              <span class="time-line-item-time">{{ item.listHead[3] }}</span>
            </div>
            <div v-if="item.listContent.length" ref="contentDetail" class="time-line-item-content-wrap"
                 style="display: none">
              <div
                v-for="(data, i) in item.listContent"
                :key="i"
                class="time-line-item-content"
              >
                <div class="time-line-item-title">{{ data[0] }}</div>
                <div v-if="data[0] === '错误堆栈'" class="time-line-item-value">
                  <div v-for="(stack,ind) in data[1]" :key="ind">
                    <span style="color: red">At &nbsp;</span>
                    <span>{{ stack }}</span>
                  </div>
                </div>

                <div v-else class="time-line-item-value">{{ data[1] }}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DetailList from "@/components/detailList";
import BarCard from "@/components/barCard";
import {
  Input,
  Button,
  DatePicker
} from "view-design";
import { getUserPath } from "@/utils/requests";

export default {
  components: {
    Input,
    Button,
    DatePicker,
    DetailList,
    BarCard
  },
  data() {
    return {
      value: "",
      tabActive: "log",
      visitTime: [],
      userInfo: [],
      userPath: {},
      pathList: [],
      len: 0,
      uid: "",
      date: ""
    };
  },
  methods: {
    changeTab(val) {
      this.tabActive = val;

    },
    init() {
      if (this.$route.params.uid) {
        let pa = this.$route.params;
        this.goUserPath(pa.uid, pa.date);
      }
      this.getUserData();
    },

    async getUserData() {
      const res = await getUserPath();
      let data = {};
      if (res.code == 200) {
        // console.log(res.data, ' try mock js call')
        data = res.data;
      }
      this.visitTime = data.vis_time;
      this.userInfo = data.info;
      this.userPath = data.path;
      this.processPath();
    },
    processPath() {
      let data = this.userPath;
      data.forEach((val) => {
        let listHead = [], listContent = [];
        listContent.push(["发生页面", val.page]);
        if (val.type === "js") {
          let stack = val.err_stack.split("at ");
          stack.shift();
          // console.log(stack);
          listHead = [val.icon, "JS错误", val.err_content, val.time];
          listContent.push(["状态码", val.code]);
          listContent.push(["错误堆栈", stack]);
        } else if (val.type === "api") {
          listHead = [val.icon, "API请求", val.api_url, val.time];
          listContent.push(["API", val.api_url]);
          listContent.push(["请求方法", val.method]);
          listContent.push(["状态码", val.code]);
        } else if (val.type === "click") {
          listHead = [val.icon, "点击", val.dom, val.time];
          listContent.push(["DOM Path", val.dom]);
        } else if (val.type === "load") {
          listHead = [val.icon, "页面访问", val.page, val.time];
        } else if (val.type === "res") {
          listHead = [val.icon, "资源加载", val.r_url, val.time];
          listContent.push(["状态码", val.code]);
          listContent.push(["资源URL", val.r_url]);
          listContent.push(["资源类型", val.r_type]);
        } else if (val.type === "dom") {
          listHead = [val.icon, "页面加载", val.content, val.time];
        }
        this.pathList.push({
          "listHead": listHead,
          "listContent": listContent,
          "type": val.type
        });
      });
      this.len = Object.keys(this.pathList).length;
      // console.log(this.pathList);
    },
    showHide(index) {
      // console.log(index);
      if (this.$refs.contentDetail[index].style.display === "none") {
        this.$refs.contentDetail[index].style.display = "block";
        this.$refs.userArrow[index].style.transform = "rotate(-90deg)";
      } else {
        this.$refs.contentDetail[index].style.display = "none";
        this.$refs.userArrow[index].style.transform = "rotate(0deg)";
      }
    },
    goUserPath(uid, date) {
      this.tabActive = "path";
      this.uid = uid;
      this.date = date;
    }
  },
  mounted() {
    this.init();
  }
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

  .user-path-base-container {
    //height: 420px;
    display: flex;
    margin-top: -24px;
    justify-content: space-between;

    .base-user-info {
      flex: 1;
      background-color: @comp-back;
      border-radius: 8px;
      margin: 26px 20px 12px 0;
      height: 400px;
      color: @tit-color;
      font-size: 16px;
      padding-left: 20px;

      .user-info-title {
        font-size: 18px;
        font-weight: 500;
        color: @font-color;
        margin: 20px 0 16px;
      }

      .user-info-content {
        display: flex;
        justify-content: space-between;
        padding: 3px 0;
        font-size: 16px;

        .info-title {
          font-weight: 500;
          color: @font-color;
        }

        .info-content {
          width: 85%;
        }
      }
    }
  }

  .user-time-line-container {
    background-color: @comp-back;
    border-radius: 8px;
    margin-top: 10px;
    padding: 20px 20px;
    //height: 900px;
    .time-line-item {
      margin-bottom: 26px;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 500;
      color: @tit-color;

      .time-line-item-left {
        background-color: @comp-head;
        border-radius: 8px;
        padding: 7px 10px;
        //width: 13%;
        //width: 180px;
        height: 36px;
        display: flex;
        justify-content: space-between;
        //margin-right: 40px;
        z-index: 100;

        img {
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }

        span {
          color: @font-color;
        }
      }

      .time-line-item-right {
        //flex: 1;
        width: 85%;
        background-color: @comp-head;
        border-radius: 8px;
        padding: 7px 20px;
        position: relative;

        .time-line-item-head {
          display: flex;
          justify-content: space-between;
          color: @font-color;
          cursor: pointer;

          img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }

          .item-head-brief {
            flex: 1;
          }
        }

        .time-line-item-content-wrap {
          padding: 10px 0 0 28px;

          .time-line-item-content {
            display: flex;
            justify-content: space-between;
            padding: 3px 0;
            font-size: 16px;

            .time-line-item-title {
              font-weight: 500;
              color: @font-color;
            }

            .time-line-item-value {
              width: 85%;
              white-space: normal;
              word-wrap: break-word;
              word-break: break-All;
            }
          }
        }
      }


    }
  }

  //时间轴
  .time-line-item-tail {
    position: absolute;
    top: 37px;
    left: -160px;
    height: calc(100% - 10px);
    z-index: 2;
    //content: "";
    border-left: 2px solid @tit-color;
  }

  .time-line-item:last-child {
    .time-line-item-tail {
      height: 0;
      border-left: transparent;
    }
  }
}
</style>
<!--iview组件的样式要修改不能在scoped中-->
<style lang="less">
.user-analysis-container {
  .user-input-wrap {
    .ivu-input {
      height: 45px;
      width: 400px;
      padding-left: 20px;
      font-size: 18px;
      border-radius: 8px;
    }
  }

  .date-input-wrap {
    margin-left: 15px;

    .ivu-input {
      height: 45px;
      width: 300px;
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
      margin-left: 15px;
      outline: 0;
      height: 45px;
      font-size: 18px;
      border-radius: 8px;
    }
  }

  .user-tab-wrap {
    display: flex;
    margin: -20px 0 15px;

    .tab-item {
      font-size: 16px;
      font-weight: 600;
      color: @font-color;
      padding: 14px 20px 5px;
      margin-right: 20px;
      border-bottom: 4px solid transparent;
      cursor: pointer;
    }

    .tab-active {
      border-bottom: 4px solid @high-light-blue;
    }
  }

}
</style>
