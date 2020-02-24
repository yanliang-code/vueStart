<template>
  <div>
    <!-- vue router 提供我们的全局组件 底层可以认为是个a链接 -->
    <router-link to="/foo">Go to Foo</router-link>
    <br />
    <!-- 动态传入值  12 -->
    <router-link to="/user/12">Go to /user/12</router-link>
    <br />
    <router-link to="/user/12/profile">Go to /user/12/profile</router-link>
    <br />
    <router-link to="/other">Go to 404</router-link>
    <br />
    <router-link to="/a">Go to a 重定向到 bar</router-link>
    <br />
    <!-- 
        点击a链接是在原有路径上拼接上href的路径
        fullPath：拼接后的路径  path：点击跳转的路径
     -->
    <a href="#/foo">Go to Foo</a>
    <br />
    <!-- api方式进行路由跳转 -->
    <button @click="$router.push('foo')">Go to Foo</button>
    <p>id: {{ id }}</p>
    <p>{{ routerInfo }}</p>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    routerInfo() {
      const { fullPath, path, name, params, query, meta } = this.$route;
      return {
        fullPath,
        path,
        name,
        params,
        query,
        meta
      };
    }
  }
};
</script>
