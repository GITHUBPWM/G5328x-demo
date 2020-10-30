<template>
  <div>

    <div class="form-button-group">
      <button class="btn btn-title">添加</button>
      <button class="btn disabled">删除</button>
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
          alert("更新表格");
        }

      },

      mounted() {
        this.$axios.get("/goform/getQvlanList").then((res)=>{
          this.tableData.originData = res.data.list;
        })
      }

    }
</script>

<style scoped>

</style>
