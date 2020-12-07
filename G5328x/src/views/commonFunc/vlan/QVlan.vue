<template>
  <div>
    <div class="form-button-group">
      <button class="btn btn-title"><i class="iconfont icon-tianjia"></i>添加</button>
      <button class="btn btn-cancel" :class="{disabled: selectArr.list.length === 0}" @click="delSelect()"><i class="iconfont icon-shanchu"></i></button>
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
                field: "vlanId"
              },
              {
                title: "VLAN描述",
                field: "remark",
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
        customCompFunc(options){
          switch(options.type){
            case "selectAll": 
            console.log(options)
            //TODO:这rowsData怎么全是一样的
              this.selectArr.list = options.rowsData;
              for(let i in this.tableData.originData){
                // this.selectArr.list.push(this.tableData.originData[i]);
              }
              console.log(this.selectArr.list)
              break;
            case "checkbox":
         
              if (this.selectArr.list.includes(options.rowData)) {
                  this.selectArr.list = this.selectArr.list.filter((elem)=>{
                    return elem !== options.rowData;
                  });
              } else {
                  this.selectArr.list.push(options.rowData);
              }
                   console.log(this.selectArr.list)
              break;
            case "delete":
              this.dialogCfg.show = true;
              this.dialogCfg.handle = () =>{
                  var postData = (this.isSelectAll&&this.tableData.originData) || this.selectArr;
                  this.$axios.post("/goform/delQvlanList",postData).then(()=>{
                      this.$axios.get("/goform/getQvlanList").then((res)=>{
                          this.tableData.originData = res.data.list;
                      });
                      this.dialogCfg.show = false;
                      this.selectArr.list = [];
                  });
              };

              
              break;
            case "edit":
              break;
          }

        },

        afterUpdateTable(){

        },

        delSelect(){
          var options = {type:"delete"};
          this.customCompFunc(options);
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
