import Vue from 'vue'
import Vuex from './min-vuex'
import App from './App.vue'
// vue底层会在miniVuex中找install方法，存在则进行调用，在这里可以给vue注入$store
Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  // actions: {
  //   increment({commit}) {
  //     setTimeout(()=>{
  //       // state.count++ // 不要对state进行更改操作，应该通过commit交给mutations去处理
  //       commit('increment')
  //     }, 3000)
  //   }
  // },
  getters: {
    doubleCount(state) {
        // 此值变化后，vue内部监听到他的变化，computed中有依赖他的函数就会被执行
        // 相对应的计算属性值就动态变化了
      return state.count * 2
    }
  }
})
// 注入stre变量
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
