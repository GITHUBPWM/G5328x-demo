<template>
  <div>
    <div>QOSindex</div>
    <router-link  v-for="item in routes" :to="item.path">{{item.meta.label}}</router-link>
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

          }
      },
      computed:{
          routes(){
            //获取重定位过来的父路由
            return this.$router.options.routes[0].children.filter((item) => {
              return item.path === this.$route.redirectedFrom;
            })[0].children;
          }
      },

      mounted() {

console.log(this.$router.options.routes[0].children.filter((item) => {
  return item.path === this.$route.redirectedFrom;
}))
      }
    }
</script>

<style scoped>

</style>
