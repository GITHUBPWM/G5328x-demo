<template>
    <div class="operate-btn">
        <button v-show="operateBts.indexOf('edit')!==-1" @click="$emit('on-custom-comp',{type:'edit',rowData:rowData})"><i class="iconfont icon-bianji2"></i></button>
        <button v-show="operateBts.indexOf('delete')!==-1" @click="$emit('on-custom-comp',{type:'delete',rowData:rowData})"><i class="iconfont icon-shanchu"></i></button>
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
        ...mapState(["operateBts"]),
        
        
    },

    mounted(){
       
    }

}
</script>


<style lang="less" scoped>
  @import "../css/common.less";

</style>
