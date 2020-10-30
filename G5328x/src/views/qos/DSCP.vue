<template>
  <div>
    <div class="dscpEn-group">
      <span class="name">DSCP</span>
      <span id="dscpEn" class="iconfont icon"  @click="changeDscpEn" :class="[dscpEnOn? 'icon-huadongxuanze-zuo':'icon-huadongxuanze-you']"></span>
      <span  @click="changeDscpEn">{{ dscpEnOn?'开启':'关闭'}}</span>
    </div>
    <div class="table-group">
      <table v-for="o in 4" class="inner-table cos-priority">
        <thead>
          <tr><td>DSCP值</td><td>Cos优先级</td></tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in CosPriority.slice((o-1)*16,(o)*16)"><td>{{index+(o-1)*16}}</td><td>{{item}}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

    export default {
        name: "DSCP",
        data(){
          return{
            dscpEnOn:false,
            CosPriority:[]
          }
        },
        computed:{

        },
        methods:{
          changeDscpEn(){
            this.dscpEnOn = !this.dscpEnOn;

          }

        },
        mounted() {
          this.$axios.get('/goform/getDscpQueueInfo').then((res)=>{

            this.CosPriority = res.data.dscpQueue;

          });

        }
    }
</script>

<style scoped>
  @import "../../css/common.css";
  @import "../../css/page.css";
</style>
