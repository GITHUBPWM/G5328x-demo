<template>
    <div>
      <div class="third-title-box">
        <router-link class="third-title" v-for="item in menuTabs" :to="item.path" @click.native="getWL">{{item.meta.label}}</router-link>
        <div :style="'width:'+$store.state.thirdActiveWidth+';left:'+$store.state.thirdActiveLeft" class="border-active"></div>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ThirdMenu",
        data(){
          return{
            //其实可以不用把这个写在公共方法里了，因为这个组件已经被提出来，能被复用，直接把方法写在这个组件就行
            menuTabs:this.common.getMenuTabs(this.$router,this.$route),
          }
        },
        computed:{

        },
        watch:{

        },

        methods:{
          getWL(){
            this.common.getActiveRect(document,this) ;
          },

        },
        mounted() {
          // this.$store.dispatch('getActiveRect',{document:document,that:this});
          this.common.getActiveRect(document,this) ;
        }
    }
</script>

<style scoped lang="less">
  @import "../css/common.less";
</style>
