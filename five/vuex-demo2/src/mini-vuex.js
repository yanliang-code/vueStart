import Vue from "vue";
// Store的构造函数
const Store = function Store(options = {}) {
    const {state={}, mutations={}} = options;
    // 借助vue将state内的数据变成响应式数据
    this._vm = new Vue({
        data:{
            $$state:state
        }
    })
    this._mutations = mutations;
}
// commit方法 --> 调用mutation内指定方法
Store.prototype.commit = function(type, payLoad) {
    if(this._mutations[type]){
        this._mutations[type](this.state, payLoad);
        // this._mutations[type](type, payLoad);
    }
}
// 每次获取state属性时，内部会去vue实例中data拿取数据
Object.defineProperties(Store.prototype, {
    state:{
        get:function() {
            return this._vm._data.$$state;
        }
    }
})
// 对外的接口 
export default { Store }