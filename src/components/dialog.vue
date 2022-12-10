<template>
  <div class="dialog-container">
    <modal v-model="detailVisible" width="90%">
      <p slot="header">日志列表</p>
      <detail-list :detail-type="showType"></detail-list>
      <p slot="footer"></p>
    </modal>
  </div>
</template>

<script>
import { Modal } from "view-design";
import DetailList from "@/components/detailList";

export default {
  name: "Dialog",
  components: {
    Modal,
    DetailList
  },
  props: [
    "type"
  ],
  data() {
    return {
      detailVisible: true,
      showType: ""
    };
  },
  methods: {
    init() {
      this.detailVisible = true;
      //data是父组件弹窗传递过来的值
      // console.log(data);
      this.showType = this.type;
    }
  },
  watch: {
    "type": function(o, n) {
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less">
.dialog-container {
  width: 100%;
  height: 100%;
}


.ivu-modal-content {
  background-color: @body-back;
  color: @tit-color;
  border-radius: 10px;

  .ivu-modal-close {
    i {
      color: #ffffff;
    }
  }

  .ivu-modal-header {
    border-color: transparent;

    p {
      color: @font-color;
      font-size: 18px;
      font-weight: 500;
    }
  }

  .ivu-modal-footer {
    border-color: transparent;
    padding: 0 0 10px 0;
    margin: 0;
  }

  .ivu-modal-body {
    padding: 0;
  }
}

</style>
