<template>
   
        <div class="mui-numbox" data-numbox-min='1' style="height:25px">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number"  @change="countChanged" ref="count" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
   
</template>

<script>
import mui from '../../assets/mui/js/mui.min.js'
export default{
    mounted(){
        mui(".mui-numbox").numbox();
    },
    data(){
        return {

        }
    },
    methods:{
         countChanged() {
       
        }
    }
}
</script>

<style>

</style>
