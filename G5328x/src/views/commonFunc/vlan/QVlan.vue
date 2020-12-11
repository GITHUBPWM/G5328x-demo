<template>
  <div>
    <div class="form-button-group">
      <button class="btn btn-title" @click="customCompFunc({type:'add'})"><i class="iconfont icon-tianjia"></i>添加</button>
      <button class="btn btn-title" :disabled="selectArr.list.length === 0" :class="{disabled: selectArr.list.length === 0}" @click="customCompFunc({type:'delete'})"><i class="iconfont icon-shanchu"></i></button>
    </div>
    <v-table ref="table" 
        :tableOptions="tableData" 
        @on-custom-comp="customCompFunc" 
        :callback="afterUpdateTable">
    </v-table>
  </div>
</template>

<script>
import OperateBtGroup from '../../../common/OperateBtGroup';
import { mapState, mapMutations } from 'vuex';
import dialog_mix from "../../../js/mixins/dialog_mix";
import router from '../../../router';
//TODO :表单验证
    export default {
      name: "QVlan",
      //通过混入将外部的方法引入，那些方法可以直接访问这里面的data
      mixins: [ dialog_mix ],
      data(){
        return {
          tableData:{
            key: "qvlan",
            css: "",
            selectBox: true,
            columns: [
              {
                title: "VLAN ID",
                field: "vlanId",
                msg: "（范围：2-4094。添加ID示例：3，5，7或者10-13）"
              },
              {
                title: "VLAN描述",
                field: "remark",
                msg: "（最大支持32个字符）"
              },
              {
                title: "IPv4地址",
                field: "ip",
              },
              {
                title: "子网掩码",
                field: "mask",
              },
              {
                title: "操作",
                componentName: OperateBtGroup,
              }
            ]
          },
          // selectArr用于存放用户选择的条目
          selectArr:{
            list:[]
          },

          formData: {gateway: "",ip: "",ipType: "",mask: "",remark: "",threeLayersEn: 0,vlanId: ""}
        }
      },

      components:{
        OperateBtGroup
      },

      computed:{
        ...mapState(["dialogCfg"]),
      },

      methods:{
        ...mapMutations(["setDialogCfg","setOperateBts"]),

        /* 表格处理函数 */
        customCompFunc(options){
          options.dataUrl = {
            set:"setQvlanInfo",
            get:"getQvlanList",
            del:"delQvlanList"
          };
          switch(options.type){
            case "selectAll": this.selectAll(options); break;
            case "checkbox":  this.selectOne(options); break;
            case "delete": this.deleteRows(options); break;
            case "edit": 
            case "add":
            this.editOrAddRows(options); break;
          }
        },

        selectAll(options){
            this.selectArr.list=[];
            for(let i in options.rowsData){
              this.selectArr.list.push(options.rowsData[i]);
            }
        },

        selectOne(options){
            if (this.selectArr.list.includes(options.rowData)) {
                this.selectArr.list = this.selectArr.list.filter((elem)=>{
                  return elem !== options.rowData;   
                });
            } else {
                this.selectArr.list.push(options.rowData);
            }
        },

     
        afterUpdateTable(){

        },

      },

      mounted() {
        this.$axios.get("/goform/getQvlanList").then((res)=>{
          this.tableData.originData = res.data.list;
        });
        this.setOperateBts("edit,delete");
      }


    }
</script>

<style lang = "less" scoped>
@import "../../../css/common.less";

</style>
