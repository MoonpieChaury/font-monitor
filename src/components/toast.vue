<template>
  <div v-show="visible" class="toast">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      message: "", // 消息文字
      duration: 2000, // 显示时长，毫秒
      closed: false, // 用来判断消息框是否关闭
      timer: null, // 计时器
      visible: false // 是否显示
    };
  },
  mounted() {
    this.startTimer();
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.destroyElement();
      }
    }
  },
  methods: {
    destroyElement() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    startTimer() {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.closed = true;
          clearTimeout(this.timer);
        }
      }, this.duration);
    }
  }
};
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  top: 15vh;
  left: 50%;
  min-width: 20vw;
  //max-width: 100vw;
  font-size: 14px;
  text-align: center;
  padding: 5px 0;
  border-radius: 40px;
  background-color: @high-light-pink;
  color: @comp-back;
  //letter-spacing: 3px;
  transform: translate(-50%, 0);
}
</style>
