import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './bus'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dayjs from 'dayjs'
import echarts from "echarts"

dayjs().format();
Vue.use(ElementUI)
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
