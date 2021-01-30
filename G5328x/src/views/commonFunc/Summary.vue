<template>
  <div>
    <div class="sum-status">
      <div class="third-title-box">
        <div class="sum-title">端口状态</div>
      </div>
      <div class="port-setting">
        <div class="portList">
            <div v-for="(item, index) in 24" :key="index" class="portSet" :class="{'portSpace': (index+1)%8 ===0, 'portDown': (index+1)%2 ===0}">
            <label>{{index+1}}</label>
            </div>
            <div style="clear:both"></div>
        </div>
        <div class="port-eg">
            <div class="portEg-box" v-for="(item,index) in portIntroduce" :key="index">
              <span class="portEg" :style="{backgroundImage: 'url(' + item.url + ')'}"></span>
              <span class="portText">{{item.label}}</span>
            </div>
        </div>
        <div class="port2List">
            <div v-for="item in 4" :key="item" class="port2Set">
              <span>{{24+item}}</span>
            </div>
        </div>
      </div>
    </div>
    <div class="sum-status use-status">
      <div class="third-title-box">
        <div class="sum-title">使用占比</div>
      </div>
      <div class="use-info-content">
        <div class="use-time">
          <div class="use-title">系统时间</div>
          <div class="use-info">1981-08-19 04:44:02</div>
          <div class="use-title">运行时间</div>
          <div class="use-info">30455天 3分 53秒</div>
        </div>
        <div class="use-circle">
          
        </div>
        <div class="use-circle">

        </div>
      </div>
    </div>
    <div class="sum-status use-status dev-status">
      <div class="third-title-box">
        <div class="sum-title">设备信息</div>
        <span class="iconfont icon-bianji2 title-icon" @click="editDevInfo()"></span>
      </div>
      <div class="dev-info-content">
        <div>设备名称：{{devInfo.deviceName}}</div>
        <div>设备位置：{{devInfo.deviceLocation}}</div>
        <div>软件版本：{{devInfo.softwareVersion}}</div>
        <div>硬件版本：{{devInfo.hardwareVersion}}</div>
        <div>MAC地址：{{devInfo.mac}}</div>
        <div>管理IP地址：{{devInfo.ip}}</div>
        <div>子网掩码：{{devInfo.mask}}</div>
        <div>网关IP地址：{{devInfo.gateway}}</div>
        <div>首选DNS服务器：{{devInfo.preferredDNS}}</div>
        <div>备选DNS服务器：{{devInfo.alternateDNS}}</div>
        <div>设备序列号：{{devInfo.sn}}</div>
      </div>
    </div>
    <div style="clear:both"></div>
    <my-dialog :dialog-data="dialogInfo">
      <div class="dialog-group">
        <label>设备名称</label>
        <input v-model="formData.deviceName"/>
      </div>
      <div class="dialog-group">
        <label>设备位置</label>
        <input v-model="formData.deviceLocation"/>
      </div>
      <div class="dialog-group">
        <label>IP获取方式</label>
        <select v-model="formData.ipType">
          <option value="auto">自动获取</option>
          <option value="manual">手动分配</option>
        </select>
      </div>
      <div class="dialog-group" v-show="formData.ipType=='manual'">
        <label>IP地址/掩码</label>
        <my-ip v-model="formData.ip"></my-ip>
      </div>
      <div class="dialog-group" v-show="formData.ipType=='manual'">
        <label>网关IP地址</label>
        <div></div>
      </div>
      <div class="dialog-group">
        <label>DNS分配方式</label>
        <select v-model="formData.dnsType" :class="{disabled:formData.ipType=='manual'}">
          <option value="auto">自动获取</option>
          <option value="manual">手动分配</option>
        </select>
      </div>
      <div class="dialog-group" v-show="formData.dnsType=='manual'">
        <label>首选DNS服务器</label>
      </div>
      <div class="dialog-group" v-show="formData.dnsType=='manual'">
        <label>备选DNS服务器</label>
       
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import dialog_mix from "../../js/mixins/dialog_mix";
    export default {
        name: 'Summary',
        mixins: [ dialog_mix ],
      data(){
        return{
          pageUrl:{
            get:"getSysStatus",
            set:"setDeviceInfo"
          },
          portIntroduce:[
            {
              label:"电口",
              url:require("../../assets/img/legend-normal.png")
            },{
              label:"光口",
              url:require("../../assets/img/legend-optical.png")
            },{
              label:"禁用",
              url:require("../../assets/img/legend-disabled.png")
            },{
              label:"未连接",
              url:require("../../assets/img/legend-not-connected.png")
            },{
              label:"1G",
              url:require("../../assets/img/legend-fast.png")
            },{
              label:"10M/100M",
              url:require("../../assets/img/legend-slow.png")
            }
          ],
          port:[],
          devInfo:{},
          formData:{},
        }
      },


      computed:{


      },

      methods:{
        initSum(res){
          this.port = res.data.port;
          this.devInfo = res.data;
          for(let key in this.devInfo){
            this.$set(this.formData, key, this.devInfo[key]);//这样写才可以把formData的属性值监听到，促使dom改变
          }
        },


        editDevInfo(){
          this.dialogInfo.type = "edit";
          this.dialogInfo.title = "设备信息";
          this.dialogInfo.handle = ()=>{
            this.post(this.pageUrl.set,this.formData,()=>{
              this.get("getSysStatus",this.initSum);
            });
            this.dialogInfo.show = false;
          }
          this.dialogInfo.cancel = ()=>{

            for(let key in this.devInfo){
              this.$set(this.formData, key, this.devInfo[key])
            }
            this.dialogInfo.show = false;
          }
          this.dialogInfo.show = true;
        },

      },
      
      mounted() {
        this.get("getSysStatus",this.initSum);
      }

    }
</script>
<style lang="less" scoped>
@import "../../css/common.less";
.sum-status{
  background-color: #fff;
  padding: 22px 32px 12px;
}
.sum-title{
    display: inline-block;
    font-size: 16px;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
}
.port-setting{
    padding: 40px 0;
    height: 120px;
    color: rgb(92, 92, 92);
}
.portList{
  min-width: 860px;
  float: left;

  .portSet{
    width: 50px;
    height: 46px;
    margin-right:15px;
    float: left;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../../assets/img/not-connected.png");
    text-align: center;

    label{
      position: relative;
      top: -25px;
    }
  }
  .portSpace{
      margin-right: 40px;
  }
  .portDown{
      transform: rotate(180deg);
      margin-top: 80px;
      margin-left: -65px;

      label{
          display: inline-block;
          transform: rotate(180deg);
      }
  }

}
.port-eg{
  width: 200px;
  float: left;

  .portEg-box{
    display: inline-block;
    font-size: 12px;

    .portEg{
      width: 16px;
      height: 14px;
      display: inline-block;
      background-repeat: no-repeat;
      background-size: contain;
      vertical-align:middle; 
    }
    .portText{
        vertical-align:middle; 
        margin-right: 5px;
    }
  }
}


.port2List{
  margin-top: 80px;
  .port2Set{
    width: 56px;
    height: 46px;
    margin-right:15px;
    float: left;
    text-align: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("../../assets/img/optical-not-connected.png");
    span{
      position: relative;
      top:50px
    }
  }
}

.use-status{
  box-sizing: border-box;
  width: 63%;
  margin-top: 30px;
  float: left;
}
.dev-status{
  box-sizing: border-box;
  width: 35%;
  margin-left: 2%;
}
.use-info-content{
  display: flex;
  justify-content: start;
  height: 297px;
  
  .use-time{
    padding-bottom: 60px;
    .use-title{
      margin-top:30px;
      font-size: 14px;
      color: gray;
      height: 40px;
      line-height: 40px;
    }
    .use-info{
      font-size: 24px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
.dev-info-content{
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  div{
    margin-bottom: 8px;
  }
}
.title-icon{
  float: right;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.85);
}
</style>