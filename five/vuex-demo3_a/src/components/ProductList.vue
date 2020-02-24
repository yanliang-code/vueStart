<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.title }} - {{ product.price }}
      <br />
      <div>
        数量：
        <select v-model="numbers[product.id]">
            <!-- 按库存量为上限，循环遍历产生数量选项（选中后会自动v-model到指定变量上） -->
          <option v-for="n in product.inventory" :key="n" :value="n">{{
            n
          }}</option>
        </select>
      </div>
      <button :disabled="!product.inventory" @click="addProductToCart(product)">
        加入购物车
      </button>
      <!-- <div>{{ testComputed }}</div> -->
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      numbers: {},
    //   testWatch:'1111'
    };
  },
  beforeCreate(){
      console.log('beforeCreate===', this);
    //   beforeCreate周期内给data内响应式数据赋值没用，在beforeCreate后created前此期间会按照data内定义的赋值
    //   this.testWatch = 'hahah';
  },
  created() {
    this.$store.dispatch("products/getAllProducts");
    // created周期由于data内数据初始化完成，可以修改值，修改后会在mounted结束后，先触发watch、再触发computed
    // this.testWatch = 'hahah';
    // console.log("created==", this);
  },
  beforeMount() {
    // console.log("beforeMount==", this);
  },
  mounted() {
    // console.log("mounted==", this);
  },
  watch: {
    // 添加 immediate: true 后该回调将会在侦听开始之后被立即调用
    products: {
      handler: function(val) {
        //   默认产品变量有赋值，触发此方法，给每个产品id对应值赋值为1
        // 上面的template中下拉选v-model此变量，默认下拉选都为1
        val.forEach(product => {
          if (this.numbers[product.id] === undefined) {
            //  target：要更改的数据源(可以是对象或者数组)
            //  key：要更改的具体数据（属性key，数组下标）
            //  value ：重新赋的值（新值）
            this.$set(this.numbers, product.id, 1);
          }
        });
        console.log('this.numbers===', this.numbers);
      },
      //加上此属性，他会在初始化watch监听的时候就触发依次（在data中声明后赋值就会触发）
      // created函数之前会会进行数据观测以及监听器的加载，此时设置，监听器会立刻执行，之后在执行created
      immediate: true
    },
    // testWatch:{
    //     handler:function(params) {
    //         console.log('params===', params);
    //     },
    //     immediate:true
    // }
  },
  computed: {
    ...mapState({
        products: state => state.products.all
    }),
    // computed内声明的计算属性在beforeCreate前挂载到组件实例上
    // 在created前，由于data内响应式数据已经挂载到组件实例上了，computed挂载到组件上的变量也就有值了
    // mounted结束后，才触发computed函数
    // testComputed(){
    //     return this.testWatch;
    // }
  },
  // computed: {
  //   products(){
  //     return this.$store.state.products.all
  //   }
  // },
  // methods: mapActions('cart', [
  //   'addProductToCart'
  // ]),
  methods: {
    //   加入购物车时通过product的id在numbers对象中找到加入数量
    addProductToCart(product) {
      this.$store.dispatch("cart/addProductToCart", {
        product,
        number: this.numbers[product.id]
      });
      //  最后再置为1
      this.numbers[product.id] = 1;
    }
  }
};
</script>
