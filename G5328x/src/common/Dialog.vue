<template>
  <div class="dialog-mask">
    <div class="dialog-box">
      <div class="dialog-title">
        {{dialogCfg.title}}
        <i @click="cancel()" class="iconfont icon-guanbi"></i>
      </div>
      <!-- 提示确认框 -->
      <div v-if="dialogCfg.type === 'confirm'" class="confirm-box">
          <div class="dialog-content">确定要删除选中项吗？</div>
      </div>
      <!-- 添加/编辑信息框 -->
      <div v-else-if="dialogCfg.type === 'add' || dialogCfg.type === 'edit'" class="operate-box">
        <div v-for="(item,index) in dialogCfg.operateForm" :key="index" class="dialog-group">
            <label>{{item.title}}:</label>
            <input v-model="dialogCfg.defaultData[item.field]"/>
            <span>{{item.msg}}</span>
        </div>
      </div>

      <!-- <div v-else-if="dialogCfg.type === 'edit'" class="operate-box">
        <div v-for="(item,index) in dialogCfg.operateForm" :key="index" class="dialog-group">
            <label>{{item.title}}:</label>
            <input/>
            <span>{{item.msg}}</span>
        </div>
      </div> -->
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
  }

  span{
    display: inline-block;
    margin-left: 10px;
    color: grey;
  }
}

</style>