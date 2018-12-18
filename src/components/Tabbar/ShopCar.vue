<template>
    <div class="shopcar-container">
      <!-- 商品列表区域 -->
      <div class="goods-list">
        <div class="mui-card" v-for="item in goodslist" :key="item.id">
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              <mt-switch></mt-switch>
              <img :src="item.thumb_path" alt="">
              <div class="info">
                <h1>{{ item.title }}</h1>
                <p>
                  <span class="price">￥{{ item.sell_price }}</span>
                  <numbox></numbox>
                  <a href="#">删除</a>
                </p>
              </div>
            </div>
          </div>
			  </div>
      </div>
      
      <!-- 结算区域 -->
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
					</div>
				</div>
			</div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcarNumBox.vue'
export default {
  name: 'shopcar',
  data () {
    return {
      goodslist:[]
    }
  },
  created(){
    this.getGoodsList()
  },
  methods:{
    getGoodsList(){
      //获取购物车商品列表
      var idArr = []
      this.$store.state.car.forEach(item=>idArr.push(item.id));
      //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
      if(idArr.length<=0){
        return
      }
      this.$http.get('http://027xin.com:8899/api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
        if(result.body.status ===0){
          this.goodslist = result.body.message
        }
      })
    }
  },
  components:{
    numbox
  }
}    
</script>

<style scoped>
.shopcar-container{
  background-color: #eee;
  overflow: hidden;
}
.shopcar-container img{
  width: 60px;
  height: 60px;
}
.shopcar-container h1{
  font-size: 13px;
  margin-bottom: 8px;
}
.shopcar-container .price{
  color:red;
  font-weight: bold;
}
.mui-card-content-inner{
  display: flex;
  align-items: center;
}
.mui-card-content-inner a{
  font-size: 12px;
}
</style>