<template>
<div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{newsInfo.title}}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
    <span>发表时间：{{newsInfo.add_time | dataFormat}}</span>
    <span>点击：{{newsInfo.click}}</span>
    </p>
    <hr>
    <h3>111111</h3>
    <h4>222222</h4>
    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>
    <!-- 评论区域 -->
    <comment-box v-bind:id="this.id"></comment-box>
</div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from '../subcomponents/comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo:{}
    };
  },
  created(){
      this.getNewsInfo()
  },
  methods:{
      getNewsInfo(){
          this.$http.get("http://027xin.com:8899/api/getnew/" + this.id).then(result=>{
              if(result.body.status ===0){
                  this.newsInfo =result.body.message[0]
              }else{
                  Toast('获取新闻详情失败')
              }   
          })
      }
  },
  components:{
      'comment-box': comment
  }
}
</script>

<style>
.newsinfo-container{
    padding:0 4px;
}
.newsinfo-container .title{
    font-size:16px;
    text-align: center;
    margin:15px 0;
    color:red;
}
.newsinfo-container .subtitle{
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
}
.newsinfo-container .content img{
    width: 100%;
}
</style>

