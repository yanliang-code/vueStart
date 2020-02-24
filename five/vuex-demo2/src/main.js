import Vue from 'vue'
import App from './App.vue'
import miniVuex from './mini-vuex'
// 让miniVuex内内部可以访问到vue
Vue.use(miniVuex);
Vue.config.productionTip = false

const Store = new miniVuex.Store({
    state:{
        count:0
    },
    mutations:{
        increment(state){
            state.count++;
        }
    }
})
// 为了vue实例能够访问到$store，直接给其原型上赋值
// vuex内部并不是如此方法实现的此效果
Vue.prototype.$store = Store;
new Vue({
  render: h => h(App),
}).$mount('#app')
