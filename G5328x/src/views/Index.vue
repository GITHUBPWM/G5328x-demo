<template>
  <div class="box">
    <div class="left-box">
      <div class="menu-logo"></div>
      <router-link v-for="(item , aindex) in routes" class="menu-div" :to="item.path" :class="{before:item.path!=='/qos'}">
        <i :class="item.meta.icon"></i>
        <div class="menu-label">{{item.meta.label}}</div>
        <router-link v-if="item.path!=='/qos'" v-for="innerItem in childRoutes(aindex)"  class="child-menu" :class="{open:$route.path.includes(item.path)}" :to="innerItem.path">{{innerItem.meta.label}}</router-link>
      </router-link>

    </div>
    <div class="right-box">
      <div class="right-header">
        <span>设备型号：G5328XV1.0</span>
        <select class="header-bt-box header-bt2" id="select-lang"></select>
        <button class="header-bt-box header-bt2">[W9*f2!</button>
        <button class="header-bt-box header-bt1">保存配置</button>
      </div>
<!--      <i class="iconfont icon-icon-"></i>-->
      <div class="container"><router-view></router-view></div>
      <div class="right-foot">
        <a href="https://ip-com.com.cn/default.html">官网：ip-com.com.cn</a>
        <span>| ©2020 深圳市和为顺网络技术有限公司 | 服务热线：400-665-0066</span>
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
           return this.$router.options.routes[0].children[aindex].children;
          }
        }

      },
      methods:{

      },
      beforeMount(){
        setSupportLang("cn,en,zh");//不能放在mounted里，必须放在页面dom渲染之前，不然页面会闪，因为这个操作会reload页面。
      },
      mounted() {
        this.$router.push('/');
        B.setTextDomain("translate");//setTextDomain的时候不传lang过去，就会根据cookie里设置的blanguage值来翻译页面。
      }
    }
</script>

<style scoped>
  @import "../css/frame.css";
</style>
