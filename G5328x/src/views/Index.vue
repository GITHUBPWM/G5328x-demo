<template>
  <div class="box">
    <div class="left-box">
      <div class="menu-logo"></div>
      <router-link v-for="(item , index) in menu" class="menu-div" :to="item.path">
        <div @click="changeMenu(index,item)">{{item.label}}</div>
        <div :id="index" class="child-menu-box" >
          <router-link v-for="(innerItem,innerIndex) in menu[index].childMenu" :to="innerItem.path"  class="menu-div child-menu">{{innerItem.label}}</router-link>
        </div>
      </router-link>

    </div>
    <div class="right-box">
      <div class="right-header">
        <span>设备型号：G5328XV1.0</span>
        <button class="header-bt-box header-bt2">[W9*f2!</button>
        <button class="header-bt-box header-bt1">保存配置</button>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Index",
      data(){
          return{
            showMenu:0,
            menu:[{label:"常用功能",path:"/commonFunc",childMenu:[{label:"系统概览",path:"/commonFunc/summary"},{label:"管理维护",path:"/commonFunc/tools"}]},
              {label:"交换设置",path:"/switch",childMenu:[{label:"HDCP侦听",path:"/switch/snoop"}]},
              {label:"Qos策略",path:"/qos",childMenu:[{label: "QoS策略",path: "/qos/queue"}]},
              {label:"可视化",path:"/visualization",childMenu:[{label:"全局地图",path:"/visualization/globalMap"}]}],
            currentOpen:0
          }
      },
      methods:{
        changeMenu(index,item){
          // 导航菜单栏样式切换
          if(this.currentOpen !== index){
            document.getElementById(this.currentOpen).style.height = "0";
            document.getElementById(index).style.height =  (item.childMenu.length)*40 +"px";
            this.currentOpen = index;
          }
        },


      },
      mounted() {
        this.$router.push('/');
        document.getElementById(this.currentOpen).style.height = this.menu[0].childMenu.length*40 +"px";
      }
    }
</script>

<style scoped>
  @import "../css/main.css";
</style>
