<template>
  <div>
    <h1 style="color: red">设计一个秒杀倒计时的组件</h1>
    <Spike :startTime="startTime" :endTime="endTime"></Spike>
  </div>
</template>

<script>
import Spike from "./Spike.vue";
import moment from "moment";
export default {
  name: "index",
  components: {
    Spike
  },
  data() {
    return {
      endTime: moment(new Date(Date.now() + 10 * 1000)),
      startTime: moment(new Date(Date.now()))
    };
  }
};
</script>

<style scoped></style>
