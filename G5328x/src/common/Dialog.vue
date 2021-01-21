<template>
  <div class="dialog-mask" v-show="dialogData.show">
    <div class="dialog-box">
      <div class="dialog-title"> {{dialogData.title}} <i @click="$emit('close-dialog')" class="iconfont icon-guanbi"></i></div>

      <!-- 提示确认框 -->
      <div v-if="dialogData.type === 'delete'" class="confirm-box">
          <div class="dialog-content">确定要删除选中项吗？</div>
      </div>

      <!-- 添加/编辑信息框 -->
      <div v-else-if="dialogData.type === 'add' || dialogData.type === 'edit'" class="operate-box">
        <slot></slot>
      </div>

      <div class="dialog-bt-group">
          <button class="btn btn-cancel" @click="$emit('close-dialog')">取消</button>
          <button class="btn btn-title" @click="dialogData.handle">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:["dialogData"],
  data() {
    return {

    };
  },

  computed:{

  },

  methods:{
    
  },

  mounted() {
      this.post();
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
        padding:20px 0;
        text-align: center     
    }
}

.confirm-box{
    height: 70px;
    width: 360px;
    line-height: 70px;
}

.operate-box{
  border-top: 1px solid rgb(224, 224, 224);
  border-bottom: 1px solid  rgb(224, 224, 224);
  padding: 10px 0;
}
.dialog-content{
  width: 100%;
}

.dialog-group{
  color: rgb(94, 94, 94);
  padding: 15px 160px;
  font-size: 14px;
  text-align: left;

  label{
    display: inline-block;
    min-width: 100px;
    text-align: right;
    margin-right: 20px;
  }

  input{
    height: 25px;
    width: 250px;
    border: 1px solid rgb(192, 192, 192);
    padding-left: 10px;
    padding-right: 10px;
  }

  span{
    display: inline-block;
    margin-left: 10px;
    color: grey;
  }
}

</style>