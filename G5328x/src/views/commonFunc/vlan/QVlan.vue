<template>
  <div>

    <div class="form-button-group">
      <button class="btn btn-title"><i class="iconfont icon-tianjia"></i>添加</button>
      <button class="btn disabled"><i class="iconfont icon-shanchu"></i></button>
<!--      <v-button :title="'Add'" css="icon-add btn-primary"></v-button>-->
    </div>
    <v-table ref="table"  :tableOptions="tableData" @on-custom-comp="customCompFunc" :callback="afterUpdateTable"></v-table>
  </div>
</template>

<script>
    export default {
      name: "QVlan",
      data(){
        return {
          tableData:{
            key: "qvlan",
            css: "",
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
                // componentName: "OperateBtGroup",
              }
            ]
          },
        }
      },

      methods:{
        customCompFunc(){

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
