import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Tabbar/Home.vue'
import Member from '@/components/Tabbar/Member.vue'
import shopCar from '@/components/Tabbar/ShopCar.vue'
import search from '@/components/Tabbar/Search.vue'
import newList from '@/components/news/newsList.vue'
import newInfo from '@/components/news/newsInfo.vue'
import photoList from '@/components/photos/photos.vue'
import photoInfo from '@/components/photos/photoInfo.vue'
import goodsList from '@/components/goods/goodsList.vue'
import goodsInfo from '@/components/goods/goodsInfo.vue'
import goodsDesc from '@/components/goods/goodsDesc.vue'
import goodsComment from '@/components/goods/goodsComment.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { path:'/', redirect:'/home'},
    { path: '/home', component: Home},
    { path: '/member', component: Member},
    { path: '/shopcar',component: shopCar},
    { path: '/search',component: search},
    { path:'/home/newslist',component:newList},
    { path:'/home/newsinfo/:id',component:newInfo},
    { path:'/home/photolist',component:photoList},
    { path:'/home/photoinfo/:id',component:photoInfo},
    { path:'/home/goodslist',component:goodsList},
    { path:'/home/goodsinfo/:id',component:goodsInfo},
    { path:'/home/goodsdesc/:id',component:goodsDesc,name:'goodsdesc'},
    { path:'/home/goodscomment/:id',component:goodsComment,name:'goodscomment'}
  ],
  linkActiveClass:'mui-active'
})
