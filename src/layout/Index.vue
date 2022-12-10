<!--网站页面上中下结构总布局-->
<template>
  <div class="app-layout-container">
    <Navbar class="app-navbar"></Navbar>
    <app-main class="app-main"></app-main>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from "./Navbar";
import Footer from "./Footer";
import AppMain from "./AppMain.vue";

export default {
  components: { Navbar, AppMain, Footer }
};
</script>
<style lang="less" scoped>
.app-layout-container {
  position: relative;
  //padding: 0 20px;
  //background-color: #2e2e2f;
  overflow-y: scroll;
  overflow-x: hidden;

  .app-navbar {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 4;
  }

  .app-main {
    margin-top: 70px;
  }
}
</style>
