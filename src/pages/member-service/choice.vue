<template>
  <div>
    <p class="title"><span>请选择服务类型</span></p>
    <div v-link="{path: '/card'}" class="btn-wrap">
      <div class="icon-wrap">
        <img src="./assets/card.png" alt="">
      </div>
      <p>会员服务</p>
    </div>
    <div v-link="{path: '/diancan'}" class="btn-wrap">
      <div class="icon-wrap">
        <img src="./assets/diancan.png" alt="">
      </div>
      <p>点餐服务</p>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../styles/_main";
  *{
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
  }
  .title {
    padding-top: 90px;
    text-align: center;
    font-size: 34px;
    color: #A7A9AE;
    margin: 0;
    >span {
      position: relative;
      &:before {
        display: block;
        content: '';
        width: 60px;
        height: 2px;
        background: #A7A9AE;
        position: absolute;
        left: -75px;
        top: 19px;
      }
      &:after {
        display: block;
        content: '';
        width: 60px;
        height: 2px;
        background: #A7A9AE;
        position: absolute;
        right: -75px;
        top: 19px;
      }
    }
  }
  .btn-wrap {
    height: 430px;
    width: 100%;
    padding: 1px;
    .icon-wrap {
      width: 250px;
      height: 250px;
      margin:94px auto 0 auto;
      >img {
        width: 250px;
        height: 250px;
      }
    }
    p {
      margin-top: 30px;
      text-align: center;
      font-size: 34px;
      color: #8A8C92;
    }
  }
</style>
<script>
  export default {
  }
</script>

