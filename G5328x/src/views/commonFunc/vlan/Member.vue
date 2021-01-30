<template>
    <div>
        <!-- TODO:设置 -->
        <div class="form-button-group">
            <button class="btn btn-title" @click="setting()"><i class="iconfont icon-shezhi1"></i>&nbsp;&nbsp;设置</button>
        </div>
        <v-table ref="table" 
            :tableOptions="tableData" 
            @on-custom-comp="customCompFunc" 
            :callback="afterUpdateTable">
        </v-table>
        <my-dialog :dialog-data="dialogInfo">
            <!-- TODO:端口选择、联动等各种规格 -->
            <div class="port-setting" v-show="dialogInfo.type == 'setting'">
                <div class="portList">
                    <div v-for="item in portSum" :key="item" class="portSet" :class="{'portSpace': item%8 ===0, 'portDown': item%2 ===0}">
                    <label>{{item}}</label>
                    </div>
                    <div style="clear:both"></div>
                </div>
                <div style="text-align:left">
                    <span class="portEg"></span>
                    <span class="portText">未选</span>
                    <span class="portEg"></span>
                    <span class="portText">已选</span>
                    <span class="portEg"></span>
                    <span class="portText">汇聚端口</span>
                    <div class="port2List">
                        <div v-for="item in port2Sum" :key="item" class="port2Set">
                        </div>
                        <input type="checkbox" id="portAll" @click="selectAllPort()">
                        <label for="portAll">全选</label>
                    </div>
                </div>
            </div>

            <div class="dialog-group" v-show="dialogInfo.type == 'edit'">
                <label>端口</label>
                <span>{{formData.portNum}}</span>
            </div>
            <div class="dialog-group">
                <label>链路类型</label>
                <select v-model="formData.linkType" value="access" >
                    <option value="trunk">Trunk</option>
                    <option value="access">Access</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>
            <div class="dialog-group">
                <label>PVID</label>
                <input v-model="formData.pvid"/>
                <span class="span-msg">（范围：1-4094，请填写单个数值）</span>
            </div>
            <div class="dialog-group" v-show="formData.linkType == 'hybrid'">
                <label>Untagged</label>
                <input v-model="formData.untagged"/>
                <span class="span-msg">（范围：1-4094，示例3，5，7或10-13，设置前请先创建VLAN ID）</span>
            </div>
            <!-- TODO：提示信息过长的媒体查询处理 -->
            <div class="dialog-group" v-show="formData.linkType !== 'access'">
                <label>Tagged</label>
                <input v-model="formData.tagged"/>
                <span class="span-msg">（范围：1-4094，示例3，5，7或10-13，设置前请先创建VLAN ID）</span>
            </div>
        </my-dialog>
    </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';
    import OperateBtGroup from '../../../common/OperateBtGroup';
    import dialog_mix from "../../../js/mixins/dialog_mix";
    export default {
        name: "Member",
        mixins: [ dialog_mix ],
        data(){
            return{
                pageUrl:{
                    set:"setPortMemberInfo",
                    get:"getPortMemberList"
                },
                tableData:{
                    key: "member",
                    css: "",
                    columns: [
                    {
                        title: "端口",
                        field: "portNum"
                    },
                    {
                        title: "链路类型",
                        field: "linkType"
                    },
                    {
                        title: "PVID",
                        field: "pvid"
                    },
                    {
                        title: "Tagged",
                        field: "tagged"
                    },
                    {
                        title: "Untagged",
                        field: "untagged",
                    },
                    {
                        title: "操作",
                        componentName: OperateBtGroup,
                    }
                    ]
                },
                         
                formData: {
                    portNum:"",
                    linkType:"",
                    pvid:"",
                    tagged:"",
                    untagged:""
                },
                portSum:24,
                port2Sum:4,

                allPort:false
            }
        },

        computed:{
            ...mapState(["operateBts","dialogCfg"])
        },

        methods:{
            ...mapMutations(["setOperateBts"]),

            afterUpdateTable(){

            },

            //TODO: 跟别的页面的edit一样的
            edit(options){
                for(let key in options.rowData){
                    this.formData[key] = options.rowData[key];
                }
                this.dialogInfo.handle = ()=>{
                    this.post(this.pageUrl.set,this.formData,()=>{
                        this.initTable();
                        this.dialogInfo.cancel();
                    })
                }
                this.dialogInfo.cancel = ()=>{
                    for(let i in this.formData){
                    this.formData[i] = "";
                    }
                    this.dialogInfo.show = false;
                }
            },
            

            setting(){
                this.formData.linkType = "access";
                this.dialogInfo.title = "设置端口成员";
                this.dialogInfo.type = "setting";

                this.dialogInfo.handle = () =>{
                    this.post(this.pageUrl.set,this.formData,()=>{
                        this.initTable();
                        this.dialogInfo.cancel();
                    })
                },
                this.dialogInfo.cancel = ()=>{
                    for(let i in this.formData){
                        this.formData[i] = "";
                    }
                    this.dialogInfo.show = false;
                }
                this.dialogInfo.show = true;
            },

            selectAllPort(){
            }


        },

        mounted(){
            this.setOperateBts("edit");
            this.initTable();
        }
    }
</script>

<style lang="less" scoped>
@import "../../../css/common.less";
.port-setting{
    padding: 40px 30px;
    width: 86%;
    height: 90px;
    margin:0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #f5f5f5;
    color: gray;
    font-size: 12px;
 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

}
.portSet{
    width: 32px;
    height: 30px;
    margin-right:8px;
    float: left;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../../../assets/img/not-selected.png");

    label{
      position: relative;
      top: -20px;
    }
}
.portSpace{
    margin-right: 30px;
}
.portDown{
    transform: rotate(180deg);
    margin-top: 50px;
    margin-left: -40px;

    label{
        display: inline-block;
        transform: rotate(180deg);
    }
}
.portEg{
    width: 20px;
    height: 18px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("../../../assets/img/not-selected.png");
    vertical-align:middle; 

    &:nth-child(3){
        background-image: url("../../../assets/img/legend-selected.png");
    }

    &:nth-child(5){
        background-image: url("../../../assets/img/legend-group.png");
    }
   
}
.portText{
    vertical-align:middle; 
    margin-right: 5px;
}
.port2List{
    margin-top: 34px;
    input{
        vertical-align: middle;
        margin-left: 20px;
    }
    label{
        vertical-align: middle;
    }
}
.port2Set{
    width: 32px;
    height: 30px;
    margin-right:8px;
    float: left;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("../../../assets/img/optical-not-selected.png");
}

</style>
