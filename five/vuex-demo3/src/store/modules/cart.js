import shop from '../../api/shop'
import { CART, PRODUCTS } from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
// 购物车模块的响应式数据
const state = {
    // 购物车中的商品(商品id,数量)
  items: [],
    // 购物车当前状态
  checkoutStatus: null
}

// getters
const getters = {
    // 购物车中所有商品(名称,价格.数量)
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },
// 计算购物车中所有商品的总价格
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0) 
  }
}

// actions
// 默认actions的参数一:Store对象    参数二:调用此函数时传入的参数
const actions = {
    // 结算清单
  checkout ({ commit, state }, products) {
    //   在清算前先保留一份结算清单
    const savedCartItems = [...state.items]
    commit(CART.SET_CHECKOUT_STATUS, null)
    // empty cart
    // 清空购物车
    commit(CART.SET_CART_ITEMS, { items: [] })
    // 请求后台购买清单上的商品
    shop.buyProducts(
      products,
    //   购买成功改变购物车状态
      () => commit(CART.SET_CHECKOUT_STATUS, 'successful'),
      () => {
        //   购买失败改变购物车状态
        commit(CART.SET_CHECKOUT_STATUS, 'failed')
        // rollback to the cart saved before sending the request
        // 购买失败,购物车恢复之前商品
        commit(CART.SET_CART_ITEMS, { items: savedCartItems })
      }
    )
  },
    // 加入购物车(参数一采用解构赋值)
  addProductToCart ({ state, commit }, product) {
    commit(CART.SET_CHECKOUT_STATUS, null)
    // 库存数量大于0
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.id)
    //   购物车中不存在,放入购物车;若存在,增加对应商品在购物车中的数量
      if (!cartItem) {
        commit(CART.PUSH_PRODUCT_TO_CART, { id: product.id })
      } else {
        commit(CART.INCREMENT_ITEM_QUANTITY, cartItem)
      }
      // remove 1 item from stock
      //  调用产品模块,告知其需要减去库存 
      //  调用不同模块的mutation,root需要置为true,指定的函数名需要加上命名空间
      commit(`products/${PRODUCTS.DECREMENT_PRODUCT_INVENTORY}`, { id: product.id }, { root: true })
    }
  },
  test(){
      console.log('test hahahah!!!!');
  }
}

// mutations
const mutations = {
    // 将指定产品放入购物车
  [CART.PUSH_PRODUCT_TO_CART] (state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
  },
//  增加指定商品在购物车中的数量
  [CART.INCREMENT_ITEM_QUANTITY] (state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },
//   改变购物车内容
  [CART.SET_CART_ITEMS] (state, { items }) {
    state.items = items
  },
// 改变当前购物车的状态
  [CART.SET_CHECKOUT_STATUS] (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
