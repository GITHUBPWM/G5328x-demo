<template>
  <router-view></router-view>
</template>

<script>
import b28 from '../static/lang/b28n_async'
export default {
  name: 'App'
}
</script>
<style>
  /*初始化css*/
  html{
    height: 100%;
  }
  body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,button,input,textarea,select{margin:0;padding:0}
  body{
    height: 100%;
    /*min-height: 600px;*/
    /*min-width: 800px;*/
    font-family: "PingFang SC", "Microsoft Yahei", "Hiragino Sans GB", arial, sans-serif;
  }
  button,input{
    background: none;
    outline: none;
  }

  button{
    border: none;
  }
  
  a{text-decoration:none;}
  em{font-style:normal}
  li{list-style:none}
  img{border:0;vertical-align:middle}
  table{border-collapse:collapse;border-spacing:0}
</style>

