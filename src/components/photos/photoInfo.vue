<template>
<div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time | dataFormat }}</span>
      <span>点击：{{photoinfo.click}} 次</span>
    </p>
    <hr>
    

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>
    <div class="thumbs">
        <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="index"> -->
        <!-- 缩略图区域 -->
        <vue-preview class="preview-img" height="100" :slides="slide1"></vue-preview>
    </div>
    
    <h3>哈哈哈哈哈哈哈哈哈哈</h3>
    <h1>亿亿亿亿亿亿亿亿亿亿</h1>
    <!-- 放置一个现成的 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
</div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from '../subcomponents/comment.vue' 
export default{
    data(){
        return{
            id: this.$route.params.id, // 从路由中获取到的 图片Id
            photoinfo: {}, // 图片详情
            list:[],
            slide1: [
          {
            src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          }
        ]
        }
    },
    created(){
        this.getPhotoInfo()
        this.getInfoImg()
    },
    methods:{
        getPhotoInfo(){
            this.$http.get("http://027xin.com:8899/api/getimageInfo/" + this.id).then(result=>{
                if(result.body.status ===0){
                    this.photoinfo =result.body.message[0]
                }else{
                    Toast('获取图片详情失败')
                }
            })
        },
        getInfoImg(){
            this.$http.get("http://027xin.com:8899/api/getthumimages/" + this.id).then(result=>{
                if(result.body.status ===0){
                    // console.log(result.body)
                     // 循环每个图片数据，补全图片的宽和高
                    result.body.message.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                        item.msrc =item.src
                    });
                    // 把完整的数据保存到 list 中
                    this.slide1 = result.body.message;
                }else{
                    Toast('获取图片详情失败')
                }
            })
        }
    },
    components:{
        'cmt-box':comment
    }
}
</script>

<style>
.photoinfo-container{
    padding:3px;
}
.photoinfo-container h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
}
.photoinfo-container .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
.photoinfo-container .content {
    font-size: 13px;
    line-height: 30px;
}
.thumbs{
    display: flex;
}
.thumbs img {
    margin: 10px;
    height: 100px;
    /* display: inline-block; */
    box-shadow: 0 0 8px #999;
}
.thumbs figure{
    margin: 0;
    /* width: 33.33%; */
    display: inline-block;
}
</style>

