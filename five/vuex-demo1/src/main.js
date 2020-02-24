import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
    state:{
        count:0,
    },
    mutations:{
        // 调用此方法时，默认会将当前store内的响应式数据传入
        increment(state){
            console.log('mutations state==', state);
            state.count++;
        }
    },
    actions:{
        // 调用此方法时，除了默认会将当前store内的响应式数据传入，还有一些方法
        increment(obj){
            console.log('obj==', obj);
            setTimeout(() => {
                alert('加1时的异步操作')
                // obj.state.count++ // 不要对state进行更改操作，应该通过commit交给mutations去处理
                obj.commit('increment');
            }, 1000);
        }
    },
    // 相当于vue中compute计算属性，依赖state内的响应式数据
    getters:{
        // 当state.count数据发生变化，会触发doubleCount函数，默认会将当前store内的响应式数据传入
        doubleCount(state){
            console.log('getters state==', state);
            return state.count * 2;
        }
    }
})


new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
