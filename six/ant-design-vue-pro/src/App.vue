<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <!-- 路由匹配的组件显示位置 -->
    <router-view />
  </div>
</template>

<style lang="less">

</style>
