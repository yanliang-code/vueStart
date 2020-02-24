<template>
  <div id="app">
    <h1>购物车示例</h1>
    <p>账号: {{email}}</p>
    <hr>
    <h2>产品</h2>
    <ProductList/>
    <hr>
    <ShoppingCart/>
  </div>
</template>

<script>
// mapState为语法糖,为了让我们简化取store内的响应式数据代码,还能实现想要的效果
import { mapState } from 'vuex'
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'

export default {
  computed: mapState({
    email: state => state.userInfo.email
  }),
  components: { ProductList, ShoppingCart },
}
</script>
