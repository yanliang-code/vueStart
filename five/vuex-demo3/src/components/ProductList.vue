<template>
<!-- 产品列表 -->
  <ul>
    <li
      v-for="product in products"
      :key="product.id">
      {{ product.title }} - {{ product.price }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product )">
        加入购物车
      </button>
    </li>
  </ul>
</template>

<script>
// mapActions为语法糖,为了让我们简化调用store内actions中的函数,还能实现想要的效果
import { mapState, mapActions } from 'vuex'

export default {
    // computed本身接受的就是对象,mapState加工后返回的也是对象
  computed: mapState({
    // 此处this指向vuex内,若不使用箭头函数,this指向vue实例
    // 此处的state是index内的根状态,state.products是products模块内的数据状态
    // products: state => state.products.all,
    products: state => {
        return state.products.all;
    }
  }),
  // computed: {
  //   products(){
  //     return this.$store.state.products.all
  //   }
  // },

    // 与computed一致
    // 可以指定具体模块下的方法
  methods: mapActions('cart', [
    'addProductToCart'
  ]),
  // methods: {
  //   addProductToCart(product){
  //     this.$store.dispatch('cart/addProductToCart', product)
  //   }
  // },
  created () {
    this.$store.dispatch('products/getAllProducts');
  }
}
</script>
