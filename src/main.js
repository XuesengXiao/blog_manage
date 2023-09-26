import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import VueRouter from "vue-router";
import axios from "./common/axiosInstance";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/index.css";
import "echarts";
import store from "./store/index";

// 全局使用axios,把axios设置到Vue原型链
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
