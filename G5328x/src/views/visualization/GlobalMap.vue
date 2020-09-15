<template>
  <div>
    <div class="content-header">{{$route.meta.label}}</div>
    <div class="dev-list-box" :class="{open:isOPen}">
      <div ref="devContent">
        <div class="dev-box"  v-for="(item,index) in devLists" >
            <i class="iconfont" :class="getIcon(index)"></i>
            <div class="info-box">
              <div class="dev-num">{{item}}</div>
              <div class="dev-name">{{con_config.devIconCfg[index].name}}</div>
<!--              <div class="dev-online">在线 10</div>-->
<!--              <div class="dev-online">离线 10</div>-->
            </div>
        </div>
        <div style="clear: left"></div>
      </div>
      <div v-show="showBtn" class="close iconfont" :class="{rotate:isOPen}" @click="isOPen=!isOPen"></div>
    </div>
    <div class="dev-status">
      <div class="status-header">
        {{aaa}}
      </div>
    </div>
  </div>
</template>

<script>
  import elementResizeDetectorMaker from 'element-resize-detector';
  import b28 from '../../lang/b28n_async'

  export default{
        name: "GlobalMap",
        data(){
          return{
            devLists:null,
            showBtn:false,
            isOPen:false,
            TopoDeviceListInfo:[],
            aaa:""
          }
        },
        computed:{

        },
        watch:{

        },
        methods:{
          getIcon(item){
            return this.con_config.devIconCfg[item].iconClass;
          }

        },
        mounted() {

          let that = this;
          let erd = elementResizeDetectorMaker();
          erd.listenTo(that.$refs.devContent,(element)=>{
            this.showBtn = element.offsetHeight > 100;
            this.isOPen = this.isOPen&&(!(element.offsetHeight <= 100));
          });

          this.$axios.get('/goform/getTopoDeviceStatistics').then((res)=>{this.devLists = res.data;});
          this.$axios.get('/goform/getTopoDeviceListInfo').then((res)=>{this.TopoDeviceListInfo = res.data;});
          this.aaa = window._("Switch");
          window.console.log(window._);
          window.console.log(document);
          window.console.log("-------------------------")
          window.console.log(this.con_config.devIconCfg[2].name);
        }
    }

</script>

<style lang="less" scoped>
  @import "../../css/common.less";
  @import "../../css/visualization/globalMap.less";
</style>
