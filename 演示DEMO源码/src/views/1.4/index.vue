<template>
  <div>
    <p>
      <button @click="handleNameChange">change this.name</button>
      <button @click="handleInfoChange">change this.info</button>
      <button @click="handleListChange">change this.list</button>
    </p>
    <PropsAndData :name="name" :info="info" :list="list" />
    <br />
    <proxy :info="test"></proxy>
  </div>
</template>
<script>
import PropsAndData from "./PropsAndData";
import proxy from "./Proxy.vue";
let name = "world";
export default {
  components: {
    PropsAndData,
    proxy
  },
  data() {
    this.name = name;
    return {
      test: {
        name: "yanliang"
      },
      info: {},
      // info: {
      //   number: undefined
      // },
      list: []
    };
  },
  methods: {
    handleNameChange() {
      this.name = "vue" + Date.now();
      console.log("this.name 发生了变化，但是并没有触发子组件更新", this.name);
    },
    handleInfoChange() {
      this.info.number = 1;
      // this.$set(this.info, 'number', 1)
      console.log("this.info 发生了变化，但是并没有触发子组件更新", this.info);
    },
    handleListChange() {
      this.list.push(1, 2, 3);
      console.log("this.list 并没有发生变化，但是触发了子组件更新", this.list);
    }
  }
};
</script>
