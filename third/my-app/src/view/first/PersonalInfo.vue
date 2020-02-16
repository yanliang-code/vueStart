<template>
    <div>
        <!-- <select></select> -->
        <input
            :value="phoneInfo.phone"
            type="number"
            placeholder="手机号"
            @input="handlePhoneChange"
        />
        <input
            :value="zipCode"
            type="number"
            placeholder="邮编"
            @input="handleZipCodeChange"
        />
        <input type="button" value="点击" @click="clickButton"/>
        <span v-if="showMessage">{{ message }}</span>
    </div>
</template>

<script>
export default{
    name:"PersonalInfo",
    // v-model中子组件默认的接收参数（这里进行针对的修改）
    // 双向绑定的机制
    model:{
        prop:"phoneInfo", // 默认 value
        event:"change" //默认 input
    },
    props:{
        phoneInfo: Object,
        zipCode: String,
        required: Boolean,
        // 父页面传验证函数属性
        validate: Function,
        message: String
    },
    data(){
        return{
            showMessage:false
        }
    },
    watch:{
        "phoneInfo.phone":function(val){
            // 新值验证是否合法
            this.handleValidate(val);
        }
    },
    methods:{
        handleValidate(val){
            this.showMessage = !this.validate(val);
        },
        handleAreaCodeChange(e){
            this.$emit("change",{
                ...this.phoneInfo,
                areaCode: e.target.value
            });
        },
        handlePhoneChange(e){
            this.$emit("change",{
                ...this.phoneInfo,
                phone: e.target.value
            });
            // emit后，相关变量没有同步为视图上的值
            console.log('子组件phoneInfo===', this.phoneInfo);
        },
        handleZipCodeChange(e){
            this.$emit("update:zipCode", e.target.value);
        },
        // 点击时，获取相关变量就变为视图上的值了
        clickButton(){
            console.log('点击按钮==', this.phoneInfo);
        }
    }
}
</script>