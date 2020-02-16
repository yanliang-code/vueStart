<!-- 页面 -->
<template>
  <div id="app">
    {{ msg }}
    <div>
        <!-- 
            此item类选择器定义在TodoItem组件内，只要引入到父组件中，父组件加item也会使用子组件的item
            解决此问题两种方法：
              在父组件内定义自己的item类选择器
              在子组件内的style样式加上scoped作用域（加上scoped的样式会加上唯一标识，即使其他组件加上item也无法匹配上）
        -->
        <div class="item">dddd</div>
        <input type="text" v-model="info" />
        <input type="button" @click="handleClick" value="添加" />
        <ul>
          <!-- 默认item没有重复 -->
          <!-- <todo-item v-for="item in list" :key="item" :item="item"></todo-item> -->
          <!-- 通过插槽传递值 -->
          <todo-item v-for="item in list" :key="item" >
            <!-- 作用域插槽 -->
            <!-- 具名插槽 item  itemProps是子组件的v-bind属性值,可用于子组件给父组件传值 -->
            <!-- <template v-slot:item="itemProps" @emitTest="emitTest"> -->
              <!-- 
                html元素属性等于字符串，是html语言
                加上绑定效果后，就是js语言，font-size -> fontSize  style只接受对象形式{ , , , }
              -->
              <!-- <span :style="{fontSize:'20px', color: itemProps.checkItem ? 'red':'blue'}">{{ item }}=={{ itemProps}}</span> -->
            <!-- </template> -->

            <template v-slot:item>
              <div>di222</div>
            </template>
            <template v-slot:item>
              <div>divvvvv</div>
            </template>
            <!-- <div slot="item">di2222</div>
            <div slot="item">divvvvv</div> -->
          </todo-item>
          <!-- 
            总结：
              通过slot插槽可以传递html模板
              通过props只能传递值
           -->
        </ul>
    </div>
</div>
</template>

<!-- 逻辑 -->
<script>
import TodoItem from './components/TodoItem.vue'

export default {
  name: 'App',
  components: {
    TodoItem
  },
  data(){
      return{
          msg:'hello vue',
          info:'',
          list:[],
      }
  },
  // methods需要加s
  methods:{
      handleClick(){
          console.log(this.info);
          // 将目标值添加到列表中
          this.list.push(this.info);
          // 将输入框对应的值清空，v-model同步将视图改变
          this.info =""
      },
      emitTest(param){
        console.log('son send parent==', param);
        return 'return emitTest';
      }
  }
}
</script>

<!-- 样式 -->
<style>
/* .item{
  color: darkgoldenrod;
} */
</style>
