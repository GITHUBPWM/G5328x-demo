<template>
  <div class="main-content" :class="{'no-bg':noBg}">
    <router-view></router-view>
  </div>

</template>

<script>
    export default {
        name: "pageIndex",
        data(){
          return{

          }
        },

        computed:{
          noBg(){
            return  this.$route.path =='/commonFunc/summary';
          }
        },
        
    }
</script>

<style scoped lang="less">
  @import "../css/common.less";
  .no-bg{
    background-color: #f2f2f2;
    padding: 0;
  }
</style>
