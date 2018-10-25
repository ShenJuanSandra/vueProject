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
  template: '<App/>'
})
