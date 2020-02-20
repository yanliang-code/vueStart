<template>
  <div>
    <button @click="handleClick" :disabled="disabled">
      {{ btnText }}
    </button>
    <span>{{ tip }}</span>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Spike",
  props: {
    startTime: {
      required: true,
      validator: val => {
        return moment.isMoment(val);
      }
    },
    endTime: {
      required: true,
      validator: val => {
        return moment.isMoment(val);
      }
    }
  },
  data() {
    return {
      start: false,
      end: false,
      done: false,
      tip: "",
      timeGap: 0,
      btnText: ""
    };
  },
  computed: {
    //   是否禁用通过计算属性来动态变化
    disabled() {
      //当三个异号的时候disable返回真，不可点击，
      // 初始化通过this.updateState确定disable的状态
      return !(this.start && !this.end && !this.done);
    }
  },
  //  加上async的函数，函数内加await的异步请求会变成同步请求
  async created() {
    const serverTime = await this.getServerTime();
    this.timeGap = Date.now() - serverTime; //当前时间和服务器时间差
    // 先更新一次状态
    this.updateState();
    // 之后每秒更新一个状态
    this.timeInterval = setInterval(() => {
      this.updateState();
    }, 1000);
  },
  // 每次触发重新渲染页面时，都会判断需要停止更新状态的定时器
  updated() {
    if (this.end || this.done) {
      clearInterval(this.timeInterval);
    }
  },
  methods: {
    //   点击参加活动 
    handleClick() {
      alert("提交成功");
      this.done = true;
      this.btnText = "已参加过活动";
    },
    getServerTime() {
      //模拟服务器时间
      return new Promise(resolve => {
        setTimeout(() => {
          //当前时间慢10秒就是服务器时间
          resolve(new Date(Date.now() - 10 * 1000).getTime()); //跟本地时间差
        }, 0);
      });
    },
    updateState() {
      // 本地当前时间 - 时间差（固定的） == 此时服务器上的时间
      const now = moment(new Date(Date.now() - this.timeGap)); //当前服务器时间
      const diffStart = this.startTime.diff(now); //开始时间和服务器时间之差
      const diffEnd = this.endTime.diff(now); //结束时间和服务器时间之差
      //   正在进行
      if (diffStart < 0) {
        this.start = true;
        this.tip = "秒杀已开始";
        this.btnText = "参加";
        // 前期预热
      } else {
        this.tip = `距离秒杀开始还剩${Math.ceil(diffStart / 1000)}秒`;
        this.btnText = "活动未开始";
      }
      //   结束
      if (diffEnd <= 0) {
        this.end = true;
        if (!this.btnText === "已参加过活动" || this.btnText === "参加") {
          this.tip = "秒杀已结束";
          this.btnText = "活动已结束";
        }
      }
    }
  },
  beforeDestroy() {
    //  停止更新页面显示状态的定时器
    clearInterval(this.timeInterval);
  }
};
</script>

<style scoped>
button[disabled] {
  cursor: not-allowed;
}
</style>
