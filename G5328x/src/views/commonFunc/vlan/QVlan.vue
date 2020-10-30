<template>
  <div>
    <div class="form-button-group">
      <button class="btn btn-title">添加</button>
      <button class="btn disabled">删除</button>
    </div>
    <v-table ref="table"  ></v-table>
  </div>
</template>

<script>
    export default {
      name: "QVlan",
      data(){
        return {
          tableData:[],
        }
      },

      mounted() {
        this.$axios.get("/goform/getQvlanList").then((res)=>{
          this.tableData = res.data;
        })
      }

    }
</script>

<style scoped>

</style>
