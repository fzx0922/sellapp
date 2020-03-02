import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 1.创建一个vuex的数据仓库，用来存放所有需要交互的数据
// 2.store:每个vuex最核心的部分，数据仓库（用来存储所有的交互数据）
export default new Vuex.Store({
    // 通过state这个属性来管理数据
    state:{
        num:0,
        goodslist:[]
    },
    // 通过mutations里面的小函数来修改数据
    // 每一个mutations都会接受一个形参state，就指向上面的state
    mutations:{
        changeList(state,newArr){
            state.goodslist=newArr
        },
        changeNum(state,val){
         
                
                
       
            // console.log(num,i);
            
            state.num+=val
        },
    },
    // getters:{
    //     singNum(state){
    //         return state.num
    //     }
    // }
    
})
// mutation函数必须手动触发！
// 参数1.要触发的mutation的名字，参数2 要传入的参数

