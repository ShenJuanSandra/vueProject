// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// 2.2 安装vue-resource
Vue.use(VueResource)

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入网站。肯定会调用main.js，在调用的时候，先从本地存储中，把购物车中的数据读取出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
  state:{// this.$store.state.~~~~
    car: car  //将购物车中的数据用一个数组存储起来
  },
  mutations:{// this.$store.commit('方法的名称','按需传递唯一的参数')
      addToCar(state,goodsinfo){
        //点击加入购物车，把商品信息保存到store中的car上
        //分析：
        //1.如果购物车中，之前已经有这个对象对应的商品了，那么，只需要更新数量
        //2.如果没有，则直接把商品数据push到car
        //假设再购物车中没有找到对应的商品
        var isflag = false
        state.car.some(item=>{
          if(item.id === goodsinfo.id){
            item.count += parseInt(goodsinfo.count)
            isflag= true
            return true  //退出循环
          }
        })
        if(!isflag){
          state.car.push(goodsinfo)
        }

        //当更新car之后，把car数组存储到本地的localStorage中
        localStorage.setItem('car',JSON.stringify(state.car))
      }
  },
  getters:{ // this.$store.getters.~~~
    //相当于计算属性 filter
    getAllCount(state){
      var c =0;
      state.car.forEach(item=>{
        c += item.count
      })
      return c
    }
  }
})
 
// defalut install
Vue.use(VuePreview)

//导入时间格式化插件
import moment from 'moment'
//定义一个全局时间的过滤器
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

Vue.config.productionTip = false

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import './assets/mui/css/mui.min.css'
import './assets/mui/css/icons-extra.css'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
