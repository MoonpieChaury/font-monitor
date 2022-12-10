import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueParticles from "vue-particles";
import { DatePicker } from "view-design";
import "view-design/dist/styles/iview.css";
import * as echarts from "echarts";
import dataV from "@jiaminghi/data-view";
import "default-passive-events";
import "./mock/mockServe.js";
// 引入全局的样式文件
import "./assets/css/reset.less";
import Toast from "@/utils/toast";
import "@/utils/utils";


// 在别的组件中使用 this.$echarts
Vue.prototype.$echarts = echarts;
//toast
Vue.prototype.$toast = Toast;

Vue.config.productionTip = false;

//边框
Vue.use(dataV);
//粒子动态事件
Vue.use(vueParticles);

Vue.use(DatePicker);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
