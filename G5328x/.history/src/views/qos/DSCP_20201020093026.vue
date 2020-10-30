<template>
  <div>
    <div class="dscpEn-group">
      <span class="name">DSCP</span>
      <span id="dscpEn" class="iconfont" :class="[dscpEnOn? icon-huadongxuanze-zuo:icon-huadongxuanze-you]" @click="changeDscpEn"></span>
      <label for="dscpEn">关闭</label>

    </div>
  </div>
</template>

<script>
    export default {
        name: "DSCP",
        data(){
          return{
            dscpEnOn:false,
          }
        },
        computed:{

        },
        methods:{
          changeDscpEn(){


          }

        },
    }
</script>

<style scoped>
  @import "../../css/common.css";
  @import "../../css/page.css";
</style>
