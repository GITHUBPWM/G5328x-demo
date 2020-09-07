<template>
  <div class="box">
    <div class="left-box">
      <div class="menu-logo"></div>
      <!--为什么通过函数才能用index, 直接赋值取不到-->
      <div v-for="(item , index) in menu" class="menu-div" @click="changeMenu(index,item.path)">
        <div>{{item.label}}</div>
        <div v-show="showMenu === index">
          <div v-for="(innerItem,innerIndex) in menu[index].childMenu" class="menu-div child-menu" @click="changeMenu(index,innerItem.path)">{{innerItem.label}}</div>
        </div>
      </div>

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
  name: 'App',
  data(){
      return{
        showMenu:0,
        menu:[{label:"常用功能",path:"/summary",childMenu:[{label:"系统概览",path:"/"},{label:"端口管理",path:"/portManage"},{label:"VLan划分",path:"/vlan"},{label:"管理维护",path:"/manageMaintain"}]},
          {label:"交换设置",path:"/changeSetting",childMenu:[{label:"啊啊啊",path:"/"},{label:"啊啊啊",path:"/port"}]},
          {label:"路由设置",path:"/routerSetting",childMenu:[{label:"啊啊啊",path:"/"},{label:"啊啊啊",path:"/port"}]},
          {label:"Qos策略",path:"/qos",childMenu:[{label:"啊啊啊",path:"/"},{label:"啊啊啊",path:"/port"}]},
          {label:"网络安全",path:"/netSafe",childMenu:[{label:"啊啊啊",path:"/"},{label:"啊啊啊",path:"/port"}]},
          {label:"设备管理",path:"/devManage",childMenu:[{label:"啊啊啊",path:"/"},{label:"啊啊啊",path:"/port"}]},
          {label:"可视化",path:"/visual",childMenu:[{label:"啊啊啊",path:"/"},{label:"啊啊啊",path:"/port"}]},
          ]
      }
  },
  methods:{
    changeMenu(index,path){
        this.showMenu = index;
        this.$router.push(path);
      }
  }
}
</script>

<style>
  @import "./css/main.css";
  a{color:#2d374b;text-decoration:none}
  a:hover{color:#cd0200;text-decoration:underline}
  em{font-style:normal}
  li{list-style:none}
  img{border:0;vertical-align:middle}
  table{border-collapse:collapse;border-spacing:0}

</style>
