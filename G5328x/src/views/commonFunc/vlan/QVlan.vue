<template>
  <div>
    <div class="form-button-group">
      <button class="btn btn-title" @click="addRows()"><i class="iconfont icon-tianjia"></i>添加</button>
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

    export default {
      name: "QVlan",
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
        ...mapMutations(["setDialogCfg"]),

        /* 表格处理函数 */
        customCompFunc(options){
          switch(options.type){
            case "selectAll": this.selectAll(options); break;
            case "checkbox":  this.selectOne(options); break;
            case "delete": this.deleteRows(options); break;
            case "edit": this.editRows(options); break;
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

        deleteRows(options){
          //TODO:不能直接改变state的状态
            this.dialogCfg.show = true;
            this.dialogCfg.title = "";
            this.dialogCfg.type = "confirm";
            this.dialogCfg.handle = () =>{
                  //单行删除或批量删除
                  let postData = options.rowData || this.selectArr;
                  this.$axios.post("/goform/delQvlanList",postData).then(()=>{
                      this.$axios.get("/goform/getQvlanList").then((res)=>{
                          this.tableData.originData = res.data.list;
                      });
                      this.dialogCfg.show = false;
                      this.selectArr.list = [];
                  });
            };
        },

        editRows(options){
          this.dialogCfg.show = true;
          this.dialogCfg.type = "edit";
          this.dialogCfg.title = "编辑802.1QVLAN";
          this.dialogCfg.defaultData = options.rowData;
          this.dialogCfg.operateForm = this.getOperateForm("edit") ;
          this.dialogCfg.handle = () =>{
                this.$axios.post("/goform/setQvlanInfo",this.dialogCfg.defaultData).then(()=>{
                    this.$axios.get("/goform/getQvlanList").then((res)=>{
                        this.tableData.originData = res.data.list;
                    });
                    this.dialogCfg.show = false;
                });
          };
        },

        addRows(){
          this.dialogCfg.show = true;
          this.dialogCfg.type = "add";
          this.dialogCfg.title = "添加802.1QVLAN";
          this.dialogCfg.defaultData = this.formData;
          this.dialogCfg.operateForm = this.getOperateForm("add") ;
          this.dialogCfg.handle = () =>{
              this.$axios.post("/goform/setQvlanInfo",this.dialogCfg.defaultData).then(()=>{
                    this.$axios.get("/goform/getQvlanList").then((res)=>{
                        this.tableData.originData = res.data.list;
                    });
                    this.dialogCfg.show = false;
                });
          };
        },
        
        afterUpdateTable(){

        },

        /* 生成操作表单 */ 
        getOperateForm(type,rowData){
          let operateForm = [];

          switch(type) {
            case "add": //表格添加操作需要的字段
              for(let i=0,len=this.tableData.columns.length; i < len; i++){
                if(this.tableData.columns[i].title == "操作"){
                  continue;
                }
                operateForm.push(this.tableData.columns[i]);
              }
              return operateForm;
            case "edit": //表格操作需要的字段
              for(let i=0,len=this.tableData.columns.length; i < len; i++){
                if(this.tableData.columns[i].title == "操作"){
                  continue;
                }
                operateForm.push(this.tableData.columns[i]);
              }
              return operateForm;
          }
          
        }



      },

      mounted() {
        this.$axios.get("/goform/getQvlanList").then((res)=>{
          this.tableData.originData = res.data.list;
        })
      }

    }
</script>

<style lang = "less" scoped>
@import "../../../css/common.less";

</style>
