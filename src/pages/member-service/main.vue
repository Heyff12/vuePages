<template>
  <div id="app" v-cloak>
    <router-view keep-alive></router-view>
    <div class="slogan"></div>
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
  #app {
    min-height: 100%;
    position: relative;
  }
  .slogan{
    width: 382px;
    height: 40px;
    position: absolute;
    left: 50%;
    margin-left: -191px;
    bottom: 40px;
    background: url("assets/slogan.svg") no-repeat center center;
    background-size: 100% 100%;
  }
</style>
<script>
  export default {
  }
</script>
