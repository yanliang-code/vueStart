import RouterDemo from "./components/RouterDemo";
import RouterChildrenDemo from "./components/RouterChildrenDemo";

const routes = [
    // 最简单的配置列表
  { path: "/foo", component: RouterDemo, name: "1" },
  { path: "/bar", component: RouterDemo, name: "2" },
    // 嵌套路由配置  
  // 当 /user/:id 匹配成功，
  // RouterDemo 会被渲染在 App 的 <router-view /> 中
  {
    path: "/user/:id",
    component: RouterDemo,
    name: "3",
    // 此处将props设置为true，证明可以传递参数
    // 跳转此路由时，传入值赋值为id变量，通过props传入指定组件内（默认也会放到$route内的params属性里）
    props: true,
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // RouterChildrenDemo 会被渲染在 RouterDemo 的 <router-view/> 中（子路由加载前，父路由也会加载，父子路由信息中name都为子路由的name）
        path: "profile",
        component: RouterChildrenDemo,
        name: "3-1"
      },
      {
        // 当 /user/:id/posts 匹配成功
        // RouterChildrenDemo 会被渲染在 RouterDemo 的 <router-view/> 中
        path: "posts",
        component: RouterChildrenDemo
      }
    ]
  },
    //  重定向，路由匹配到/a时，重定向到/bar下
  { path: "/a", redirect: "/bar" },
    //   上面配置的路径都没有匹配上，给他整到404页面
  { path: "*", component: RouterDemo, name: "404" }
];

export default routes;
