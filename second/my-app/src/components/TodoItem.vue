
<template>
    <!-- 通过props传递获取值 -->
    <!-- <li class="item">{{ item }}</li> -->

    <!--  -->
    <li class="item">
        <input type="checkbox" v-model="checkItem" />
        <input type="button" value="emit" @click="emitClick" />
        <!-- 
            具名插槽，父组件中的指定名称的html模板，会放在子组件相同名称的位置上 
            子组件可通过赋值v-bind给父组件传值，v-bind赋值必须是对象形式
        -->
        <slot name="item" v-bind="{checkItem}"></slot>
    </li>
</template>


<script>
// 向外开放接口
export default{
    props:['item'],
    data(){
        return{
            checkItem:false
        }
    },
    methods:{
        emitClick(){
            console.log("this===", this);
            let pare = this.$emit('emitTest','ffff');
            console.log('pare===', pare);
        }
    }
}
</script>

<style scoped>
    .item{
            color: red;
        }
</style>