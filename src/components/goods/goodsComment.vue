<template>
    <div>
        <cmtbox :id="$route.params.id"></cmtbox>
    </div>
</template>

<script>
//导入评论组件
import comment from '../subcomponents/comment.vue'
export default{
    data(){
        return {}
    },
    components:{
        cmtbox:comment
    }
}
</script>

<style>

</style>
