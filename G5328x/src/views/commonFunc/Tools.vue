<template>
  <div class="circle-box">  
    <svg width="200px" height="200px">
      <circle cx="100" cy="100" r="90" :stroke="bgColor" />
    </svg>
    <svg width="200px" height="200px">
      <circle cx="100" cy="100" r="90" stroke-linecap='round' :stroke="useColor" :stroke-dasharray="`${dasharray} 600`" />
    </svg>
    <div class="use-num" :style="{color:useColor}">{{usePercent}}</div>
   </div>
</template>
<script>
  import dialog_mix from "../../js/mixins/dialog_mix";
    export default {
        name: 'Summary',
      data(){
        return{
          usePercent:0,
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
        initSum(res){
          this.usePercent = res.data.cpuPercent;
          //后台传的百分比，用圆周长*百分比就等于虚线长度 
          this.dasharray =parseInt(res.data.cpuPercent.split('%')[0])*2*Math.PI;
          this.bgColor = this.circleColor(parseInt(res.data.cpuPercent.split('%')))[1];
          this.useColor = this.circleColor(parseInt(res.data.cpuPercent.split('%')))[0];
        },

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

      mounted() {
        this.get("getSysStatus",this.initSum);
        setInterval(()=>{
          this.get("getSysStatus",this.initSum);
        },5000)
      }

    }
</script>
<style lang="less" scoped>
.circle-box{
  position: relative;
  svg{
    position: absolute;
    top: 0;
    left: 0;
    fill: none;
    stroke-width: 10px;

    &:nth-child(2){
      transform: rotate(-90deg);
      circle {
        transition: stroke-dasharray .5s;
      }
    }
  }
  .use-num{
    width: 200px;
    height: 20px;
    line-height: middle;
    position: absolute;
    text-align: center;
    top: 80px;
    font-size: 30px;
  }
}

</style>