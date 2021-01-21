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
    <my-dialog :dialog-data="dialogInfo" @close-dialog="closeDialog">
      <div v-if="dialogInfo.type=='add' || dialogInfo.type=='edit' ">
        <div class="dialog-group">
          <label>VLAN ID:</label>
          <input v-model="formData.vlanId" :disabled="dialogInfo.type=='edit'"/>
          <span>（范围：2-4094。添加ID示例：3，5，7或者10-13）</span>
        </div>
        <div class="dialog-group">
          <label>VLAN描述:</label>
          <input v-model="formData.remark"/>
          <span>（最大支持32个字符）</span>
        </div>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import OperateBtGroup from '../../../common/OperateBtGroup';
import dialog_mix from "@/js/mixins/dialog_mix";
import { mapState, mapMutations } from 'vuex';
import router from '../../../router';
//TODO :表单验证
    export default {
      name: "QVlan",
      //通过混入将外部的方法引入，那些方法可以直接访问这里面的data
      mixins:[dialog_mix],
      data(){
        return {
          pageUrl:{
            set:"setQvlanInfo",
            get:"getQvlanList",
            del:"delQvlanList"
          },
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

          //编辑、添加的表单
          formData: {
            vlanId:"",
            remark:""
          },

          //弹窗对象
          dialogInfo:{
            show:false,
            type:"",
            title:"",
            handle:""
          },
        }
      },

      components:{
        OperateBtGroup
      },

      computed:{
        
      },

      methods:{
        ...mapMutations(["setOperateBts"]),

        

        /* 表格处理函数 */
        customCompFunc(options){
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

        /* 选择表格中的某一行 */
        selectOne(options){
            if (this.selectArr.list.includes(options.rowData)) {
                this.selectArr.list = this.selectArr.list.filter((elem)=>{
                  return elem !== options.rowData;   
                });
            } else {
                this.selectArr.list.push(options.rowData);
            }
        },

        /* 关闭弹窗 */
        closeDialog(){
          this.dialogInfo.show = false;
          for(let i in this.formData){
            this.formData[i] = "";
          }
          if(this.dialogInfo.type == "delete"){
             this.selectArr.list = [];
          }
        },
     
        initTable(){
          this.get(this.pageUrl.get,(res)=>{
            this.tableData.originData = res.data.list;
          })
        },
        
        afterUpdateTable(){

        },

      },

      mounted() {
        //设置表格中的操作按钮有哪几种
        this.setOperateBts("edit,delete");
        this.initTable();
      }
    }
</script>

<style lang = "less" scoped>
@import "../../../css/common.less";

</style>
