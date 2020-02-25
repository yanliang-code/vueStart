import Vue from "vue";
// 1.引入组件库
import Antd from "ant-design-vue";
// 2.组件库中组件使用个数很少，可以按需引入组件
// import Button from "ant-design-vue/lib/button"
// 3.使用插件babel进行按需加载，可以不指定路径，在{}内写多个组件名，并且不用引入样式
// import { Button } from "ant-design-vue"
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 1.引入组件库样式(less形式的css，需要使用css-loader加载，在vue.config.js中配置)
import "ant-design-vue/dist/antd.less"
// 2.按需引入css
// import"ant-design-vue/lib/button/style"
console.log('router==', router);
Vue.config.productionTip = false;
// 让Antd能访问到Vue，使得Antd中的组件库可以全局注册
Vue.use(Antd);
// Vue.use(Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
