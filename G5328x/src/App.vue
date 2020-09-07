<template>
  <div class="box">
    <div class="left-box">
      <div class="menu-logo"></div>

    </div>
    <div class="right-box">
      <div class="right-header">
        <span>设备型号：G5328XV1.0</span>
        <button class="header-bt-box">[W9*f2!</button>
        <button class="header-bt-box">保存配置</button>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
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
