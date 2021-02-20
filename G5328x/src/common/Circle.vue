<template>
  <div class="circle-box">  
    <svg width="200px" height="200px">
      <circle cx="100" cy="100" r="90" :stroke="bgColor" />
    </svg>
    <svg width="200px" height="200px">
      <circle cx="100" cy="100" r="90" stroke-linecap='round' :stroke="useColor" :stroke-dasharray="`${dasharray} 600`" />
    </svg>
    <div class="use-num" :style="{color:useColor}">{{useNum}}</div>
    <div class="use-name">{{useName}}</div>
   </div>
</template>
<script>
    export default {
      name: 'Summary',
      props:["usePercent","useName","useNum"],
      data(){
        return{
          percentColor:{
            blue:["rgb(26, 143, 255)","#ddeeff"],
            red:["rgb(255, 96, 96)","#ffe7e7"],
            yellow:["rgb(254, 202, 87)","#fff7e6"]
          },
          dasharray:0,
          bgColor:"",
          useColor:""
        }
      },

      methods:{
         /** 圆环颜色获取 */
        circleColor(num){
            if(num >= 90 && num < 100){
              return this.percentColor.red;
            } else if (num >= 50 && num < 90){
              return this.percentColor.yellow;
            } else if (num >= 0 && num < 50){
              return this.percentColor.blue;
            }
        }
      },

      watch:{
        usePercent:function(){
           //后台传的百分比，用圆周长*百分比就等于虚线长度 
          this.dasharray =(this.usePercent/100)*2*Math.PI*90;
          this.bgColor = this.circleColor(this.usePercent)[1];
          this.useColor = this.circleColor(this.usePercent)[0];
        }
      }

    }
</script>
<style lang="less" scoped>
.circle-box{
  position: relative;
  width: 200px;
  height: 200px;
  svg{
    position: absolute;
    top: 0;
    left: 0;
    fill: none;
    stroke-width: 14px;

    &:nth-child(2){
      transform: rotate(-90deg);
      circle {
        transition: stroke-dasharray .5s;
      }
    }
  }
  .use-num{
    position: absolute;
    width: 100%;
    top: 60px;
    text-align: center;
    font-size: 35px;
  }
  .use-name{
    position: absolute;
    top: 110px;
    width: 100%;
    text-align: center;
    color: rgb(167, 167, 167);
    font-size: 20px;
  }
  
}

</style>