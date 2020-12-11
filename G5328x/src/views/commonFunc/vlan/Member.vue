<template>
    <div>
        <div class="form-button-group">
            <button class="btn btn-title" @click="setting()"><i class="iconfont icon-shezhi1"></i>&nbsp;&nbsp;设置</button>
        </div>
        <v-table ref="table" 
            :tableOptions="tableData" 
            @on-custom-comp="customCompFunc" 
            :callback="afterUpdateTable">
        </v-table>
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
                        field: "pvid",
                        msg: "（范围：1-4094，请填写单个数值）"
                    },
                    {
                        title: "Tagged",
                        field: "tagged",
                        msg: "（范围：1-4094，示例3，5，7或10-13，设置前请先创建VLAN ID）"
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
                operateBt:["edit"],
            }
        },

        computed:{
            ...mapState(["operateBts","dialogCfg"])
        },

        methods:{
            ...mapMutations(["setOperateBts"]),

             customCompFunc(options){
                 options.dataUrl = {
                     set:"setPortMemberInfo",
                     get:"getPortMemberList"
                 }
                switch(options.type){
                    case "selectAll": this.selectAll(options); break;
                    case "checkbox":  this.selectOne(options); break;
                    case "delete": this.deleteRows(options); break;
                    case "edit": this.editOrAddRows(options); break;
                }
            },
        
            afterUpdateTable(){

            },

        },

        mounted(){
            this.$axios.get("/goform/getPortMemberList").then((res)=>{
                this.tableData.originData = res.data.list;
            })
            this.setOperateBts("edit");
        }
    }
</script>

<style lang="less" scoped>
@import "../../../css/common.less";
</style>
