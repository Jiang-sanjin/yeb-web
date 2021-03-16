/**
 *  vuex配置   状态管理，存储想要的数据
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {   
    routes:[]
  },
  mutations: { 

    // 初始化路由   供menus.js调用存放菜单
    initRoutes(state,data){
      state.routes = data
    }
  },
  actions: {
  },
  modules: {
  }
})
/*
state ：全局state对象,用于保存所有组件的公共数据
getters ：监听state值的最新状态（计算属性）
mutations ：唯一可以改变state值的方法(同步执行)
actions ：异步执行mutations方法
modules ：模块化Vuex
* */

export default store;