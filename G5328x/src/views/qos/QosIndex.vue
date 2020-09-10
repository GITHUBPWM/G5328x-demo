<template>
  <div class="main-content">
    <div class="third-title-box">
      <router-link class="third-title" v-for="item in menuTabs" :to="item.path" @click.native="getWL">{{item.meta.label}}</router-link>
      <div :style="'width:'+width+';left:'+left" class="border-active"></div>
    </div>
    <div style="margin-top: 100px">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
        name: "QosIndex",
      data(){
          return{
            menuTabs:this.common.getMenuTabs(this.$router,this.$route),
            width: 0,
            left:0,
          }
      },
      computed:{
        getTitleWidth(){

          console.log( document.querySelector(".router-link-exact-active").getBoundingClientRect().width)
          return document.querySelector(".router-link-exact-active").getBoundingClientRect().width+"px";
        },

        getTitleLeft(){
          this.$nextTick(()=>{
            let boxLeft = document.querySelector(".third-title-box").getBoundingClientRect().left;
            return  document.querySelector(".router-link-exact-active").getBoundingClientRect().left+"px";
          })

        }

      },
    watch:{

    },

    methods:{
       getWL (){
         if(document.querySelector(".router-link-exact-active")){
           this.$nextTick(()=>{
             this.width = document.querySelector(".router-link-exact-active").getBoundingClientRect().width+"px";
             let boxLeft = document.querySelector(".third-title-box").getBoundingClientRect().left;
             this.left =  document.querySelector(".router-link-exact-active").getBoundingClientRect().left-boxLeft+"px";
           })
         }
      },

    },

    mounted() {
          //如果该页面有被选中的link才会执行，不然当前路由指向别的页面时，本页面并没有class为router-link-exact-active的元素，所以会报错
          // if(document.querySelector(".router-link-exact-active")){
          //   this.$nextTick(()=>{
          //     this.width = document.querySelector(".router-link-exact-active").getBoundingClientRect().width+"px";
          //     let boxLeft = document.querySelector(".third-title-box").getBoundingClientRect().left;
          //     this.left =  document.querySelector(".router-link-exact-active").getBoundingClientRect().left-boxLeft+"px";
          //   })
          // }


          // setTimeout(()=>{  console.log(document.querySelector(".router-link-exact-active"));},3000)

      // this.getWL();
      // console.log(document);
      // this.nextTick(()=>{
     console.log(this.common.getActiveRect(document,this));

    }
  }
</script>

<style scoped>
  @import "../../css/common.css";
</style>
