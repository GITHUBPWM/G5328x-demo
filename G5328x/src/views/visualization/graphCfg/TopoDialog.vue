<template>
  <transition name="devInfo">
    <div class="devInfoBox" ref="devInfo" v-show="info.show">
      <div class="boxTop"><span class="ico-shanchu" @click="this.$parent.closeTopoDialog"></span></div>
      <div class="boxContent">
        <div class="form-group">
          <div class="title">设备类型</div>
          <select v-model="devType">
            <option v-for="item in this.con_config.devIconCfg" :key="item.name">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <div class="title">设备名</div>
          <input v-model="devName" />
        </div>
        <div class="form-group">
          <div class="title">Mac地址</div>
          <span>{{ info.id }}</span>
        </div>
        <div class="form-group">
          <div class="title">管理IP</div>
          <span>{{ info.ip }}</span>
        </div>
      </div>
      <div class="boxFoot">
        <button @click="editInfo()">确定</button>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["info"],
  data() {
    return {
      devType: "",
      devName: ""
    };
  },
  computed: {},
  watch: {
    info: {
      handler(newV, oldV) {
        this.$refs.devInfo.style.top = this.info.top;
        this.$refs.devInfo.style.left = this.info.left;
        this.devType = this.info.icon.name;
        this.devName = this.info.name;
      },
      deep: true
    }
  },
  methods:{
    editInfo(){
      let formData = {
        id:this.info.id,
        name:this.devName,
        type:this.devType
      }
      this.post("setInfo",formData,()=>{
        
      })
    }
  },

  mounted() {
    this.$refs.devInfo.style.top = this.info.top;
    this.$refs.devInfo.style.left = this.info.left;
  }
};
</script>
<style scoped lang="less">
@import "../../../css/icon.css";
@import "../../../css/common.css";

/** 弹出框显示和隐藏时的动画 */
.devInfo-enter-active {
  transition: all 0.3s;
}
.devInfo-leave-active {
  transition: 0.1s;
}
.devInfo-enter  /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-20px);
}
.devInfo-leave-to {
  opacity: 0;
  transform: 0.3s;
}
/**** */

.devInfoBox {
  position: fixed;
  width: 350px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0px 2px 12px 0px #e0e0e0;

  .common {
    border-bottom: 1px solid rgb(209, 209, 209);
  }

  .boxTop {
    .common;
    height: 30px;
    text-align: right;
    padding-right: 10px;
  }

  .boxContent {
    .common;
    padding: 10px 20px;
    color: #666;
    font-size: 16px;

    select,
    input {
      height: 25px;
      width: 180px;
      outline: none;
      border: 1px solid rgb(184, 184, 184);
      box-sizing: content-box;
      padding-left: 10px;
    }

    span {
      line-height: 25px;
    }
  }

  .boxFoot {
    width: 100%;
    height: 50px;
    display: -ms-flexbox;
    display: -moz-box;
    display: -webkit-flex;
    display: -webkit-box;
    display: flex;
    button {
      width: 56px;
      height: 30px;
      margin: auto;
      background: #d82228;
      color: #fff;
    }
  }
}
.ico-shanchu {
  font-size: 25px;
  color: rgb(170, 170, 170);
}
.form-group {
  margin: 10px 0;
}
.title {
  float: left;
  width: 80px;
  height: 25px;
  line-height: 25px;
}
</style>
