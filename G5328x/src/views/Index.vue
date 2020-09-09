<template>
  <div class="box">
    <div class="left-box">
      <div class="menu-logo"></div>
      <router-link v-for="(item , aindex) in routes" class="menu-div" :to="item.path" >
        <i :class="item.meta.icon"></i>
        <div>{{item.meta.label}}</div>
        <router-link v-for="innerItem in childRoutes(aindex)"  class="child-menu" :class="{open:$route.path.includes(item.path)}" :to="innerItem.path">{{innerItem.meta.label}}</router-link>
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
          }
      },
      computed:{
        routes(){
          return this.$router.options.routes[0].children;
        },
        childRoutes(){
          //计算属性本无法传参，可通过闭包实现
          return function (aindex) {
           return   this.$router.options.routes[0].children[aindex].children;
          }
        }

      },
      methods:{

      },
      mounted() {
        this.$router.push('/');


      }
    }
</script>

<style scoped>
  @import "../css/frame.css";
</style>
