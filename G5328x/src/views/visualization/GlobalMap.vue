<template>
  <div>
    <div class="content-header">{{$route.meta.label}}</div>
    <div class="dev-list">
      <div class="dev-box">
        <div class="dev-info" v-for="(item,index) in devLists">
          <i :class=""></i>
        </div>
      </div>
    </div>
    <div class="dev-status">

    </div>
  </div>
</template>

<script>
    export default {
        name: "GlobalMap",
        data(){
          return{
            devLists:[1,1,1,1,1],
            dev:[{}]
          }
        },
        mounted() {

        }
    }

</script>

<style scoped>
@import "../../css/common.css";
.dev-list{
  width: 100%;
  height: 100px;
  background: #FFFFFF;
  border: 1px solid #E8E8E8;
  overflow: hidden;
}
.dev-box{
  width: 220px;
  height: 100px;
}
.dev-info{
  margin: 0 auto;
}
.dev-status{
  margin-top: 24px;
  width: 100%;
  height: 500px;
  background: #FFFFFF;
  border: 1px solid #E8E8E8;
}
</style>
