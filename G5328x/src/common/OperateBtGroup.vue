<template>
    <div class="operate-btn">
        <button><i class="iconfont icon-bianji2"></i></button>
        <button @click="$emit('on-custom-comp',{type:'delete'})"><i class="iconfont icon-shanchu"></i></button>
    </div>
</template>
<script>

export default {
    name: 'OperateBtGroup',
    data(){
        return {
            
        }
    },

}
</script>


<style lang="less" scoped>
  @import "../css/common.less";

</style>
