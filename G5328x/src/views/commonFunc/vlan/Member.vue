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
        <my-dialog :dialog-data="dialogInfo" @close-dialog="closeDialog">
            <div class="dialog-group">
                <label>端口</label>
                <span>{{formData.portNum}}</span>
            </div>
            <div class="dialog-group">
                <label>链路类型</label>
                <select v-model="formData.linkType">
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
            }
        },

        computed:{
            ...mapState(["operateBts","dialogCfg"])
        },

        methods:{
            ...mapMutations(["setOperateBts"]),

            afterUpdateTable(){

            },

            setting(){

            },

        },

        mounted(){
            this.setOperateBts("edit");
            this.initTable();
        }
    }
</script>

<style lang="less" scoped>
@import "../../../css/common.less";
</style>
