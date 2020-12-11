<template>
    <div v-show="$root.show" class="helpInfo-box">
        <div id = "summary">系统概览</div>
        <div id = "tools">管理维护</div>
        <div id = "qvlan">802.1Q VLAN</div>
        <div id = "member">端口成员</div>
        <div id = "snoop">HDCP侦听</div>
        <div id = "global">全局设置</div>
        <div id = "instance">实例信息</div>
        <div id = "queue">QoS调度</div>
        <div id = "dscp">DSCP</div>
        <div id = "globalMap">全局地图</div>
        <div id = "deviceList">设备列表</div>
    </div>
</template>
<script>
export default {

    data(){
        return{
            
        }
    },

    mounted(){

    }
}
</script>
<style scoped lang="less">
.helpInfo-box{
  position: absolute;
  width: 400px;
  height: 600px;
  top: 30px;
  left:50%;
  margin-left:-200px
}
</style>