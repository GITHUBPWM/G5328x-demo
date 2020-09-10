<template>
  <div class="main-content">
    <div class="third-title-box">
      <router-link class="third-title" v-for="item in menuTabs" :to="item.path" @click.native="getWL">{{item.meta.label}}</router-link>
      <div :style="'width:'+$store.state.thirdActiveWidth+';left:'+$store.state.thirdActiveLeft" class="border-active"></div>
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
          }
      },
      computed:{

      },
    watch:{

    },

    methods:{
       getWL (){
           window.console.log(this);
         this.$store.dispatch('getActiveRect',{document:document,that:this});
      },

    },

    mounted() {
      this.$store.dispatch('getActiveRect',{document:document,that:this});
    }
  }
</script>

<style scoped>
  @import "../../css/common.css";
</style>
