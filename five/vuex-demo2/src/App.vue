<template>
  <div id="app">
      <div>$store.state.count</div>
      <div>{{count}}</div>
      <input type="button" value="加1" @click="$store.commit('increment')"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    count() {
      return this.$store.state.count
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
