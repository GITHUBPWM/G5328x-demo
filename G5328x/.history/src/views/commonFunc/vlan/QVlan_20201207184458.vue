<template>
  <div>

    <div class="form-button-group">
      <button class="btn btn-title"><i class="iconfont icon-tianjia"></i>添加</button>
      <button class="btn disabled"><i class="iconfont icon-shanchu"></i></button>
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
          selectArr:{list:[]}
        }
      },

      components:{
        OperateBtGroup
      },

      methods:{
        customCompFunc(options){
          switch(options.type){
            case "selectAll": break;
            case "checkbox":
              if (this.selectArr.list.includes(options)) {
                  this.selectArr.list = this.selectArr.list.filter((elem)=>{
                    return elem.type !== options.type;
                  });
              } else {
                  this.selectArr.list.push(options);
              }
              
          }

        },

        afterUpdateTable(){

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
