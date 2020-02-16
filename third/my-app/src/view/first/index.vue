<template>
    <div>
        <!-- 
            通过vue提供的v-model实现双向绑定 
            当多个属性需要双向绑定时，第二个以及第二个以外需要使用修饰符sync
        -->
        <PersonalInfo 
            v-model="phoneInfo" 
            :zip-code.sync="zipCode"
            required
            :validate="validate"
            message="手机号为空或者不合法"    
        ></PersonalInfo>
        
        <!-- <PersonalInfo
            :phone-info="phoneInfo"
            :zip-code="zipCode"
            @change="val => {phoneInfo = val}"
            @update:zipCode="val => {zipCode = val}"
        ></PersonalInfo> -->

        <!-- 
            通过单向数据流实现v-model双向绑定的效果
            上面第一种方法的v-model编译后就是第二种写法的样子
            v-model是语法糖

            v-model -> @change
            :zip-code.sync -> @update:zipCode
         -->
        <!-- <PersonalInfo
            :phoneInfo="phoneInfo"
            :zipCode="zipCode"
            @change="changePare"
            @update:zipCode="zipCodePare"
        ></PersonalInfo> -->
        <!-- phoneInfo、phone-info都可以匹配子组件props中的phoneInfo -->
        <!-- <PersonalInfo
            :phone-info="phoneInfo"
            :zip-code="zipCode"
            @change="changePare"
            @update:zipCode="zipCodePare"
        ></PersonalInfo> -->

        phoneInfo: {{ phoneInfo }}
        <br/>
        zipCode: {{ zipCode }  
    </div>
</template>

<!-- 
    双向数据流实现原理：
        父组件将指定属性值传递给子组件，子组件会在使用父组件传来值的控件上加change等事件，这样
        修改子组件内的控件视图值就会触发事件，通过emit告知父组件，给v-model的相应变量赋值；此外，
        改变子组件的数据值，会触发单向数据流，更新视图，触发事件，之后同修改控件视图值
    注意：改变控件视图值，触发emit事件后，子组件的数据值不会立刻改变；但在下一次触发其他事件时，显示已改变
 -->

<script>
import PersonalInfo from "./PersonalInfo.vue"
export default{
    components:{
        PersonalInfo
    },
    data(){
        return{
            phoneInfo:{
                areaCode:'+86',
                phone:""
            },
            zipCode:""       
        }
    },
    methods:{
        changePare(val){
            this.phoneInfo = val;
        },
        zipCodePare(val){
            this.zipCode = val;
        },
        validate(phone){
            // 非空以及简单数字与位数校验
            return phone && /^1[0-9]{10}$/.test(phone);
        }
    }
}
</script>