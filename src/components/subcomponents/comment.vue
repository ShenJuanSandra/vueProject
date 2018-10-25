<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多吐槽120字）" maxlength="120" v-model='msg'></textarea>
        <mt-button type='primary' size="large" @click='postComments'>发表评论</mt-button>

        <div class="cmt-list">
            <div class="item" v-for='item in comments' :key="item.id">
                <div class="cmt-title">
                    第一楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content =='undefined' ?'此用户很懒，嘛都没说':item.content}}
                </div>
            </div>
        </div>

        <mt-button type='danger' size="large" plain @click='getmore'>加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default{
    data(){
        return {
            pageIndex:1,
            comments:[],
            msg:""
        }
    },
    created(){
        this.getComments()
    },
    methods:{
        getComments(){
            this.$http.get("http://027xin.com:8899/api/getcomments/" + this.id+"?pageindex=" + this.pageIndex).then(result=>{
                if(result.body.status ===0){
                    this.comments =this.comments.concat(result.body.message)
                }else{
                    Toast('获取评论数据失败')
                }
            })
        },
        getmore(){
            this.pageIndex++;
            this.getComments()
        },
        postComments(){
            if(this.msg.trim().length ==0){
                Toast('发表内容不能为空')
            }
            this.$http.post("http://027xin.com:8899/api/postcomment/"+this.$route.params.id,{content:this.msg.trim()}).then(result=>{
                if(result.body.status === 0){
                    var cmt ={
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        content:this.msg.trim()
                    }
                    this.comments.unshift(cmt)
                    this.msg=""
                }
            })
        }
    },
    props: ["id"]
}
</script>

<style>
.cmt-container h3{
    font-size: 18px;
}
.cmt-container textarea{
    font-size: 14px;
    height: 85px;
    margin:0;
}
.cmt-container .cmt-list{
    font-size: 13px;
    margin:10px 0;
}
.cmt-container .cmt-list .cmt-title{
    background-color: #ccc;
    line-height: 35px;
}
.cmt-container .cmt-list .cmt-body{
    line-height: 35px;
    text-indent: 2em;
}
</style>
