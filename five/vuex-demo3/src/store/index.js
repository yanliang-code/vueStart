import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 用户信息放到根节点上
    userInfo: {
      email: "xxxxxx@qq.com"
    }
  },
// 引入其他模块stroe
  modules: {
    cart,
    products
  },
})