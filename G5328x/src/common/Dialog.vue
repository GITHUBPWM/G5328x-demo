<template>
  <div class="dialog-mask">
    <div class="dialog-box">
      <div class="dialog-title">
        {{dialogCfg.title}}
        <i class="iconfont icon-guanbi"></i>
      </div>
      <!-- 提示确认框 -->
      <div class="confirm-box" v-if="dialogCfg.type === 'comfirm'">
          <div class="dialog-content">确定要删除选中项吗？</div>
      </div>
      <!-- 添加信息框 -->
      <div v-else-if="dialogCfg.type === 'add'">
        <div v-for="(item,index) in dialogCfg.operateForm" :key="index">
          <div class="item-label"></div>
        </div>
      </div>
      <div class="dialog-bt-group">
          <button class="btn btn-cancel" @click="cancel()">取消</button>
          <button class="btn btn-title" @click="dialogCfg.handle">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dialogCfg"],
  data() {
    return {

    };
  },

  methods:{
    
    /* 取消操作 */
    cancel(){
      this.dialogCfg.show = false;
    },
  },

  mounted() {

  },
};
</script>

<style scoped lang="less">
@import "../css/common.less";
.dialog-mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialog-box {
    position: relative;
    background: #fff;
    // 父元素宽度由子元素决定
    display: inline-block;
    text-align: center;

    .dialog-title{
        position: relative;
        top: 0;
        left: 0;
        padding: 0 30px;
        height: 40px;
        line-height: 40px;
      .iconfont{
        float: right;
      }
    }

    .dialog-bt-group{ 
        width: 100%;
        margin-bottom: 30px;
        text-align: center     
    }
}

.confirm-box{
    height: 70px;
    width: 360px;
    line-height: 70px;
}

.dialog-content{
  width: 100%;
}
</style>