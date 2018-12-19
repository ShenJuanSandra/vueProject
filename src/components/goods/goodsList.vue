<template>
<div class="goods-list">
    <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
        <img :src="item.img_url" alt="">
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
            <p class="price">
            <span class="now">￥{{item.sell_price}}</span>
            <span class="old">￥{{item.market_price}}</span>
            </p>
            <p class="sell">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
            <span>呃呃呃呃呃876呃呃呃</span>
            <span>嗡嗡hahahahahahh</span>
            <span>2</span>
            <span>3</span>
            </p>
        </div>
    </router-link>
    <mt-button type="danger" size="large" @click='getmore'>加载更多</mt-button>
</div>
</template>

<script>
export default {
    data(){
        return {
            pageindex:1,
            goodslist:[]
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            this.$http.get("http://027xin.com:8899/api/getgoods?pageindex=" + this.pageindex).then(result=>{
                if(result.body.status ===0){
                    this.goodslist =this.goodslist.concat(result.body.message)
                }
            })
        },
        getmore(){
            this.pageindex++;
            this.getGoodsList()
        }
    }
}
</script>

<style>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
}
.goods-list .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
}
.goods-list img{
    width: 100%;
}
.goods-list .title{
    font-size: 14px;
}
.goods-list .info{
    background-color: #eee;
}
.goods-list .info  p{
    margin: 0;
    padding: 5px;
}
.goods-list .info .now{
    color: red;
    font-weight: bold;
    font-size: 16px;
}
.goods-list .info .old{
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
}
.goods-list .info .sell{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
</style>
