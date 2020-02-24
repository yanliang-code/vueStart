<template>
  <div id="app">
      <!-- 直接通过挂在到实例下的属性区 -->
      <div>{{$store.state.count}}</div>
      <!-- 组件内部通过计算属性倒手 -->
      <div>{{count}}</div>
      <!-- 使用store内的getters属性 -->
      <div>{{$store.getters.doubleCount}}</div>
      <br />
      <!-- 不需要异步操作直接commit，会调用store对象内的mutations下的increment函数 -->
      <input type="button" value="加1" @click="$store.commit('increment')" />
      <!-- 
          需要在increment函数中使用异步操作的，调用store对象内的actions下的increment函数
          最终执行完action下的increment函数需要手动执行mutations下的increment函数
       -->
      <input type="button" value="异步操作加1" @click="$store.dispatch('increment')" />
  </div>
</template>

<script>
// import myCounter from "./a.js"
export default {
  name: 'App',

  computed:{
      count(){
        //   不能对import的变量进行赋值 
        //   myCounter += 1;
          return this.$store.state.count;
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
