<template>
  <div class="nav-container">
    <nav>
      <div class="logo" @click="goHome"></div>
      <div class="right-wrap">
        <router-link routerLinkActive="router-link-active" to="/indexScreen">实时大屏</router-link>
        <!--        <router-link to="/admin">运营数据</router-link>-->
        <router-link to="/userAnalysis">用户细查</router-link>
        <router-link to="/jsError">js报错</router-link>
        <router-link to="/apiError">api请求</router-link>
        <router-link to="/resourceError">资源异常</router-link>
        <router-link to="/pageInfo">页面性能</router-link>
        <router-link to="/login">登出</router-link>
        <!--        <button @click="loginOut" class="login-btn">"navBar.logout") }}</button>-->
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: "navbar",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  methods: {
    init() {
    },
    loginOut() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    goHome() {
      if (this.$route.path.includes("/indexScreen")) return;
      this.$router.push("/indexScreen");
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.nav-container {
  //box-shadow: 0 3px 5px 0 #7e8c8d;
  //background-color: #1B223B;
  //border-bottom: 1px solid #7A8499;
  background-color: @comp-back;
  border-radius: 4px;
  padding: 3px 20px;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 0 auto;

    .router-link-active {
      color: @high-light-blue;
      font-weight: 500;
    }

    a {
      font-size: 16px;
      color: @tit-color;
    }

    .logo {
      //flex: 1;
      width: 50px;
      height: 34.58px;
      cursor: pointer;
      background: url("../assets/img/logo.png") no-repeat center;
      background-size: contain;
    }

    .right-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      max-width: 600px;
      //button {
      //  padding: 3px 5px;
      //  background: #00DBC7;
      //  color: #7e8c8d;
      //  font-size: 14px;
      //  border-radius: 8px;
      //  //border: solid 1px #00DBC7;
      //  line-height: normal;
      //}
    }
  }
}
</style>
