<template>
  <div>
    info: {{ info }}
    <input :value="info.name" @input="handleChange" />
  </div>
</template>

<script>
// 引入外部方法
import proxy from "./Proxy.js";
export default {
  props: {
    info: Object
  },
  created() {
    console.log("proxy.vue created===", this.info);
    console.log("proxy.vue created===", proxy);
    this.temp = { name: "" };
    // Object.keys({name:'peter',age:13}) => ["name", "age"]
    Object.keys(this.temp).forEach(key => {
      // 给info对象加了一层代理层
      // 可能vue底层,会给所有props传递来的值进行proxy函数的包装
      proxy(this.info, this.temp, key);
    });
  },
  methods: {
    handleChange(e) {
      // 获取info的name属性,会触发proxy内的get函数
      console.log("获取info的name属性==", this.info.name);
      // 设置info的name属性,会触发proxy内的set函数
      this.info.name = e.target.value;
      this.$forceUpdate();
      //this.$emit("change", e.target.value);
    }
  }
};
</script>
