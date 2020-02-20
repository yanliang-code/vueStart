<template>
    <div>
        <input type="button" value="点击" @click="buttonClick"/>>
        <pictureCom 
            v-for="(data, index) in datas" 
            :key="index" 
            :showDatas="datas[index]"
            :imgSrc="imgSrc[index] ? imgSrc[index] : imgSrc[0]"></pictureCom>
        
    </div>
</template>

<script>
import pictureCom from "./picture.vue";
export default {
    data(){
        return{
            data1:[],
            datas:[{id:'111', name:'类型', value:'小喵'},{id:'222', name:'类型', value:'小狗'},{id:'333', name:'类型', value:'小兔'},{id:'444', name:'类型', value:'小鱼'}],
            // datas:[{id:'111', name:'类型', value:'小喵'},{id:'222', name:'类型', value:'小狗'},{id:'333', name:'类型', value:'小兔'},{id:'444', name:'类型', value:'小鱼'}],
            imgSrc:['https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg']
        }
    },
    components:{
        pictureCom
    },
    methods:{
        buttonClick(){
            console.log('点击!!!!');
            // this.imgSrc.push("https://b-gold-cdn.xitu.io/v3/static/img/submit-icon.53f4253.svg");
            this.datas.splice(2,1);
        }
    }
}
</script>