<template>
  <div id="app" v-cloak>
    <router-view keep-alive></router-view>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../../styles/_main";
  *{
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
  }
</style>
<script>
    export default {
    }
</script>
