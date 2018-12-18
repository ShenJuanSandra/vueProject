<template>
    <div class="goodsinfo-container">
    <transition
      @before-enter="beforeEnter"
      @enter="enter" 
      @after-enter="afterEnter">
      <div class="ball" v-show="flag" ref="ball"></div>
    </transition>
        <!-- 商品轮播区 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :imageList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!-- 商品购买区 -->
        <div class="mui-card">
            <div class="mui-card-header">{{detailInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>市场价:<del>￥{{detailInfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now-price">￥{{detailInfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<goodsinfonum @getcount="getSelectedCount" :max="detailInfo.stock_quantity"></goodsinfonum></p>
                    <p><mt-button style="float:left"  type="primary" size="small">立即购买</mt-button>
                    <mt-button style="float:left" type="danger" size="small" @click="addCar" ref="shopcar1" :disabled="tag">加入购物车</mt-button>
                    <mt-button style="float:left;display:none" type="danger" size="small" ref="shopcar2" :disabled="tag">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <p>商品货号：{{detailInfo.goods_no}}</p> 
                   <p>库存情况：{{detailInfo.stock_quantity}}件</p>
                   <p>上架时间：{{detailInfo.add_time | dataFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import { Toast } from 'mint-ui'
import goodsinfoNumbox from '../subcomponents/goodsinfoNumbox.vue'
export default{
    data(){
        return {
            id:this.$route.params.id,
            lunbotu:[],
            detailInfo:[],
            flag:false,
            selectedCount:1,
            tag:false,
            ct:null
        }
    },
    created(){
        this.getlunbotu(),
        this.getGoodsDetail()
    },
    methods:{
        getlunbotu(){
            this.$http.get("http://027xin.com:8899/api/getthumimages/" + this.id).then(result=>{
                if(result.body.status===0){
                    result.body.message.forEach((item,index)=>{
                        item.img =item.src
                    })
                    this.lunbotu =result.body.message
                }else{
                    Toast('获取轮播图失败')
                }
            })
        },
        getGoodsDetail(){
            this.$http.get("http://027xin.com:8899/api/goods/getinfo/" + this.id).then(result=>{
                if(result.body.status ===0){
                    this.detailInfo=result.body.message[0]
                    console.log(this.detailInfo)
                }
            })
        },
        goDesc(id){
            //点击使用编程式导航跳转到图文详情页面
            this.$router.push({name:"goodsdesc",params:{id}})
        },
        goComment(id){
            this.$router.push({name:"goodscomment",params:{id}})
        },
        addCar(){
            var btn = this.$refs.shopcar1.$el;
            var btn2 = this.$refs.shopcar2.$el;
            btn.style.border = "1px solid red"
            btn.style.display = "none"
            btn2.style.display = "block"
            
            this.ct = setTimeout(function(){
                btn.style.display = "block";
                btn2.style.display = "none"
            },1000)
            
            this.flag=!this.flag
            //获取到点击的按钮让其禁用
            this.tag = true
            var goodsinfo = {
                id: this.id,
                count: this.selectedCount,
                price: this.detailInfo.sell_price,
                selected: true
            }
            this.$store.commit('addToCar',goodsinfo)
        },
        beforeEnter(el){
            el.style.transform = "translate(0, 0)"
        },
        enter(el,done){
            el.offsetWidth // 强制让页面重绘
            //获取到小球的位置
            const ballPosit = this.$refs.ball.getBoundingClientRect();
            //获取到购物车数字的位置
            const badgePosit = document.getElementById('badge').getBoundingClientRect()
            const x =badgePosit.left - ballPosit.left;
            const y =badgePosit.top - ballPosit.top;
            el.style.transform = `translate(${x}px,${y}px)`
            el.style.transition="all 1s cubic-bezier(.4,-0.3,.1,.68)"
            done()
        },
        afterEnter(el){
            this.flag = !this.flag
            this.tag = false
            console.log(123123)
        },
        getSelectedCount(count) {
        // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
        this.selectedCount = count;
        console.log("父组件拿到的数量值为： " + this.selectedCount);
        }
    },
    components:{
        swiper:swiper,
        goodsinfonum:goodsinfoNumbox
    }
}
</script>

<style scoped>
.goodsinfo-container .now-price{
    color:red;
    font-size: 16px;
    font-weight: bold;
}
.mui-card-footer, .mui-card-header{
    display:block;
}
.mui-card-footer button{
    margin:10px 0;
}
.goodsinfo-container .ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index:99;
    left: 150px;
    top: 409px;
}
</style>
  
