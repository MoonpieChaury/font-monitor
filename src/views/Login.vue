<template>
  <div class="login-container">
    <div class="layer">
      <div class="some-space">
        <div class="form">
          <h2>前端性能监控平台</h2>
          <div class="item">
            <i class="iconfont icon-user"></i>
            <input
              v-model="userName"
              autocomplete="off"
              class="input"
              placeholder="请输入用户名"
              type="text"
            />
          </div>
          <div class="item">
            <i class="iconfont icon-password"></i>
            <input
              v-model="userPwd"
              autocomplete="off"
              class="input"
              maxlength="20"
              placeholder="请输入密码"
              type="password"
              @keyup.enter="login"
            />
          </div>
          <button :disabled="isLoginAble" class="loginBtn" @click.stop="login">
            立即登录
          </button>
          <div class="tip">默认用户名：admin ，默认密码：123456</div>
        </div>
      </div>
    </div>

    <vue-particles
      :clickEffect="true"
      :hoverEffect="true"
      :lineLinked="true"
      :lineOpacity="0.6"
      :linesDistance="150"
      :linesWidth="1"
      :moveSpeed="3"
      :particleOpacity="0.7"
      :particleSize="4"
      :particlesNumber="80"
      clickMode="push"
      color="#6495ED"
      hoverMode="grab"
      linesColor="#6495ED"
      shapeType="circle"
    >
    </vue-particles>

    <bgAnimation />
  </div>
</template>

<script>
import bgAnimation from "@/components/bgAnimation";
import { getUserData } from "@/utils/requests";

export default {
  name: "Login",
  components: { bgAnimation },
  data() {
    return {
      userName: "admin",
      userPwd: "123456",
      visible: false
    };
  },
  computed: {
    isLoginAble() {
      return !(this.userName && this.userPwd);
    }
  },
  mounted() {
    // this.getData();
  },
  methods: {
    login() {
      if (this.userName == "admin" && this.userPwd == "123456") {
        this.$router.push({
          path: "/indexScreen"
        });
      } else {
        this.$toast("请输入正确的用户名和密码");
      }
      this.confirm();
    },
    confirm() {
      this.getData();
      localStorage.setItem("user", this.userName);
      localStorage.setItem("token", "limolstoken");
      this.visible = false;
      // console.log("点击确定");
    },
    async getData() {
      const res = await getUserData();
      let datas = {};
      if (res.code == 200) {
        // console.log(res.data, ' try mock js call')
        datas = res.data;
      }
      // let  = res;
      let item = [];
      // console.log(datas);
      for (let data of datas) {
        // console.log(data);
        item.push([
          data.uid[1],
          data.date[1],
          data.ip[1],
          data.locale[1]
        ]);
      }
      // this.listData = item;
      // this.pageSize = this.listData.length;
      localStorage.setItem("userAnalysis", JSON.stringify(item));
      // console.log(item , 'logiin');
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  .layer {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  #particles-js {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  .some-space {
    color: white;
    font-weight: 100;
    letter-spacing: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1001;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);

    -ms-animation: cloud 2s 3s ease-in infinite alternate;
    -moz-animation: cloud 2s 3s ease-in infinite alternate;
    -webkit-animation: cloud 2s 3s ease-in infinite alternate;
    -o-animation: cloud 2s 3s ease-in infinite alternate;
    -webkit-animation: cloud 2s 3s ease-in infinite alternate;
    animation: cloud 2s 3s ease-in infinite alternate;

    .form {
      width: 460px;
      height: auto;
      background: rgba(36, 36, 85, 0.5);
      margin: 0 auto;
      padding: 35px 30px 25px;
      box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
      border-radius: 10px;

      .item {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        border-bottom: 1px solid #d3d7f7;

        i {
          color: #d3d7f7;
          margin-right: 10px;
        }
      }

      h2 {
        text-align: center;
        font-weight: normal;
        font-size: 26px;
        color: #d3d7f7;
        padding-bottom: 35px;
      }

      .input {
        font-size: 16px;
        line-height: 30px;
        width: 100%;
        color: #d3d7f7;
        outline: none;
        border: none;
        background-color: rgba(0, 0, 0, 0);
        padding: 10px 0;
      }

      .loginBtn {
        width: 100%;
        padding: 12px 0;
        border: 1px solid #d3d7f7;
        font-size: 16px;
        color: #d3d7f7;
        cursor: pointer;
        background: transparent;
        border-radius: 4px;
        margin-top: 10px;

        &:hover {
          color: #fff;
          background: #0090ff;
          border-color: #0090ff;
        }
      }

      .tip {
        font-size: 12px;
        padding-top: 20px;
      }
    }
  }
}

input::-webkit-input-placeholder {
  color: #d3d7f7;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #d3d7f7;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #d3d7f7;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #d3d7f7;
}

@-ms-keyframes cloud {
  0% {
    -ms-transform: translate(-50%, -50%);
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    -ms-transform: translate(-50%, -40%);
  }
}

@-moz-keyframes cloud {
  0% {
    -moz-transform: translate(-50%, -50%);
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    -moz-transform: translate(-50%, -40%);
  }
}

@-o-keyframes cloud {
  0% {
    -o-transform: translate(-50%, -50%);
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    -o-transform: translate(-50%, -40%);
  }
}

@-webkit-keyframes cloud {
  0% {
    -webkit-transform: translate(-50%, -50%);
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    -webkit-transform: translate(-50%, -40%);
  }
}

@keyframes cloud {
  0% {
    transform: translate(-50%, -50%);
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -40%);
  }
}
</style>
