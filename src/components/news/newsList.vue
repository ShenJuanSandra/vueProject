<template>
<div>
<ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for="(item,index) in newsList" :key="index">
        <router-link :to="'/home/newsinfo/'+item.id">
            <img class="mui-media-object mui-pull-left" :src="item.img_url">
            <div class="mui-media-body">
                <h1>{{item.title}}</h1>
                <p class="mui-ellipsis">
                    <span>发表时间：{{item.add_time | dataFormat}}</span>
                    <span>点击次数：{{item.click}}次</span>
                </p>
            </div>
        </router-link>
    </li>
</ul>
</div>
    
</template>

<script>
import { Toast } from "mint-ui";
export default{
    data(){
        return {
            newsList:[]
        }
    },
    created(){
        this.getNewsList()
    },
    methods:{
        getNewsList(){
            this.$http.get('http://027xin.com:8899/api/getnewslist').then(result=>{
                if(result.body.status ==0){
                    //成功了
                    this.newsList =result.body.message
                }else{
                    //失败了
                    Toast("获取新闻列表失败！");
                }
            })
        }
    }
}
</script>

<style>
.mui-table-view li h1{
    font-size:14px;
}
.mui-table-view .mui-ellipsis{
    font-size:13px;
    color:#226aff;
    display: flex;
    justify-content: space-between;
}
</style>

