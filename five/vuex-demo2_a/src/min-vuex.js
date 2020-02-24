
let Vue;
// 参数_Vue：就是之前import进的Vue（现已注释）
function install (_Vue) {
  Vue = _Vue;
   // 给组件实例挂载$store(与生命周期类型，冒泡调用，先父，在子)
  function vuexInit () {
    var options = this.$options;
    // 组件实例中有store配置
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    // 判断当前组件实例的父组件是否有$store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
  // 全局混入，注册指定的钩子函数，在每个组件实例时，先会执行此钩子函数
  Vue.mixin({ beforeCreate: vuexInit });
}

const Store = function Store (options = {}) {
  const {state = {}, mutations={}, getters={}} = options
  const computed = {}
  const store = this
  store.getters = {};
  for (let [key, fn] of Object.entries(getters)) {
      // 此computed会注册到vue实例中
    computed[key] = function () { 
        return fn(store.state, store.getters); 
    };
    // 只要用户使用this.$store.getters获取任意属性，都会走下面的get方法
    Object.defineProperty(store.getters, key, {
      get: function () { 
        // 计算属性会作为属性挂载到vue实例上
          return store._vm[key]; 
      },
    });
  }
  this._vm = new Vue({
    data: {
      $$state: state
    },
    computed,
  })
  this._mutations = mutations
}
Store.prototype.commit = function(type, payload){
  if(this._mutations[type]) {
    this._mutations[type](this.state, payload)
  }
}
Object.defineProperties(Store.prototype, { 
  state: { 
    get: function(){
      return this._vm._data.$$state
    } 
  }
});
export default {Store, install}