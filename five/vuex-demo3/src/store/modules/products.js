import shop from '../../api/shop'
import {PRODUCTS} from '../mutation-types'

// initial state
const state = {
    // 商场拥有的所有产品
  all: []
}

// getters
const getters = {}

// actions
const actions = {
    // 获取所有产品
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
        // 调用mutation将后台响应的数据赋值给Store内的变量
      commit(PRODUCTS.SET_PRODUCTS, products)
    })
  }
}

// mutations
const mutations = {
    // 赋值给Store内响应式数据
  [PRODUCTS.SET_PRODUCTS] (state, products) {
    state.all = products
  },

//  减少库存
  [PRODUCTS.DECREMENT_PRODUCT_INVENTORY] (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
    // 开启命名空间
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}