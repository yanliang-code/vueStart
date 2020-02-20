<template>
  <div class="border2">
    <input v-model="phone" type="number" />
    <!-- 此slot标签存放引用此组件时，放入此组件内的组件 -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: ""
    };
  }
};
</script>
