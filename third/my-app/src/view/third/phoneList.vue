<template>
  <div class="border">
      <!-- v-for = (值， 索引) in 数组目标 -->
    <ListInput v-for="(key, index) in list" :key="index">
    <!-- <ListInput v-for="(key) in list" :key="key"> -->
      <button @click="() => handleDelete(key)">删除</button>
    </ListInput>
    <button @click="handleAdd">添加</button>
  </div>
</template>
<script>
import ListInput from "./ListInput.vue";
let key = 1;
export default {
  components: {
    ListInput
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    handleAdd() {
      this.list.push(key++);
    },
    handleDelete(key) {
      console.log(key);
      // findIndex 遍历value 值；如果为true，则返回index;
      const index = this.list.findIndex(k => k === key);
      console.log(index);
      // arrayObject.splice(index,howmany,item); 返回被删除的项目，直接改变原始数组；
      this.list.splice(index, 1);
      console.log(this.list);
    }
  }
};
</script>
