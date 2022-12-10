<template>
  <div class="app-footer-container">
    <div class="footer-logo">
      <span class="line"></span>
      <h4 v-html="'2022.12.08 &nbsp;&nbsp;@copyright &nbsp;&nbsp; Author : Lin momo '"></h4>
      <span class="line"></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.app-footer-container {
  //margin: 0;
  .footer-logo {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    justify-content: space-between;

    .line {
      display: inline-block;
      width: 30%;
      border: solid 1px @tit-color;
    }

    h4 {
      color: #AFB2BB;
      font-size: 16px;
    }
  }
}
</style>
