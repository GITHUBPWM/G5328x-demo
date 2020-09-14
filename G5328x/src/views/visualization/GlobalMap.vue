<template>
  <div>
    <div class="content-header">{{$route.meta.label}}</div>
    <div class="dev-list-box">
      <div ref="devContent">
        <div class="dev-box"  v-for="o in devLists">
          <div class="dev-info">
            <i></i>
            <div class="info-box">
              <div class="dev-name">路由器</div>
              <div class="dev-online">在线 10</div>
              <div class="dev-online">离线 10</div>
            </div>
          </div>
        </div>
        <div style="clear: left"></div>
      </div>
      <div v-show="showBtn" class="close"></div>
    </div>
    <div class="dev-status">
    </div>
  </div>
</template>

<script>
  import elementResizeDetectorMaker from 'element-resize-detector';
    export default{
        name: "GlobalMap",
        data(){
          return{
            devLists:[1,1,1,1,1,1,1],
            dev:[{}],
            showBtn:false
          }
        },
        methods:{

        },
        mounted() {
//            this.showBtn = this.$refs.devContent.getBoundingClientRect().height>100;
          let that = this;
          let erd = elementResizeDetectorMaker();
          erd.listenTo(that.$refs.devContent,(element)=>{
              this.showBtn = element.offsetHeight > 100;
          })
        }
    }

</script>

<style  scoped>
@import "../../css/common.css";
  .dev-list-box{
    position: relative;
    width: 100%;
    height: 100px;
    background: #FFFFFF;
    border: 1px solid #E8E8E8;
    overflow: hidden;
  }
  .dev-list-content{
    height: auto;
  }
  .dev-box{
    width: 220px;
    height: 100px;
    float: left;
  }
  .dev-info{
    margin: 0 auto;
    /*i{*/
      /*height: 40px;*/
      /*width: 40px;*/
      /*float: left;*/
    /*}*/
  }
  .dev-status{
    margin-top: 24px;
    width: 100%;
    height: 500px;
    background: #FFFFFF;
    border: 1px solid #E8E8E8;
  }
  .info-box{
    margin-left: 16px;
  }
  .dev-name{
    font-size: 16px;
  }
  .dev-online{
    font-size: 12px;
  }
  .close{
    position: absolute;
    bottom: 0;
    width: 48px;
    height: 16px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 2px 2px 0px 0px;
    border: 1px solid #E8E8E8;
    left: 50%;
    margin-left: -24px;
  }
</style>
