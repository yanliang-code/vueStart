import Vue from 'vue'
// 根组件
import App from './App.vue'

Vue.config.productionTip = false
// 入口文件
// 将App.vue组件渲染并挂载到../public/indx.html中id为app位置
new Vue({
  render: h => h(App),
}).$mount('#app')
