<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <AllView></AllView>
  </div>
</template>

<script>
import AllView from './components/AllView.vue'

export default {
  name: 'App',
  components: {
    AllView
  }
}
</script>

<style>
#app{
  text-align: center;
}
</style>
