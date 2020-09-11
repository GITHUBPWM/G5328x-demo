<template>
  <div class="main-content">
    <ThirdMenu></ThirdMenu>
  </div>
</template>

<script>
  import ThirdMenu from "../../common/ThirdMenu";
  export default {
        name: "QosIndex",
    components: {ThirdMenu},


    mounted() {
      this.common.getActiveRect(document,this) ;
    }
  }
</script>

<style scoped>
  @import "../../css/common.css";
</style>
