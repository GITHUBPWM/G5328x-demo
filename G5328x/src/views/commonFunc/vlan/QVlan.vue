<template>
  <div>
    <div class="content-header">{{$route.meta.label}}</div>
    <div class="form-button-group">
      <button class="btn btn-title">添加</button>
      <button class="btn disabled">删除</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "QVlan"
    }
</script>

<style scoped>

</style>
