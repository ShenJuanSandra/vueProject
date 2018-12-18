<template>
    <div class="goodsInfoDesc">
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            id:this.$route.params.id,
            info:{}
        }
    },
    created(){
        this.getGoodsInfo()
    },
    methods:{
        getGoodsInfo(){
            this.$http.get("http://027xin.com:8899/api/goods/getdesc/" + this.id).then(result=>{
                if(result.body.status ===0){
                    this.info =result.body.message[0]
                    console.log(this.info)
                }
            })
        }
    }
}  
</script>

<style>
.goodsInfoDesc{
    padding:4px;
}
.goodsInfoDesc h3{
    font-size: 16px;
    color:#226aff;
    text-align: center;
    margin:10px 0;
}
.goodsInfoDesc .content img{
    width:100%;
    vertical-align: top;
}
.goodsInfoDesc .content p{
    margin: 0;
}
</style>
