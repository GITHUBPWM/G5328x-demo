<template>
    <div class="operate-btn">
        <button @click="$emit('on-custom-comp',{type:'edit',rowData:rowData})"><i class="iconfont icon-bianji2"></i></button>
        <button @click="$emit('on-custom-comp',{type:'delete',rowData:rowData})"><i class="iconfont icon-shanchu"></i></button>
    </div>
</template>
<script>

import { mapState } from 'vuex'

export default {
    props:["rowData"],

    name: 'OperateBtGroup',
    data(){
        return {
            
        }
    },

    computed:{
        
        
    },

    mounted(){
       
    }

}
</script>


<style lang="less" scoped>
  @import "../css/common.less";

</style>
