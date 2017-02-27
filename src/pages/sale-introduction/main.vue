<template>
  <main>
    <div class="banner">
      <img src="./assets/banner.png" alt="">
    </div>
    <div class="arrow-1"></div>
    <p class="color-orange">发布特卖商品有什么好处？</p>
    <p>顾客直接在线抢购，到店兑换，打造明星商品，短时间聚集大量人气！</p>
    <a name="autoscroll"></a>
    <div class="arrow-1"></div>
    <p class="color-orange">好近如何帮你推广？</p>
    <p>好近拥有千万消费者粉丝，多入口、多方式曝光你的特卖商品！</p>
    <div class="content">
      <img src="./assets/content.png" alt="">
    </div>
  </main>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
      }
    },
    ready () {
      if (window.location.search) {
        window.location.hash = '#autoscroll'
      }
    },
    attached () {
    },
    methods: {
    }
  }

</script>

<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../styles/common";

  p,img{
    line-height: 1;
    margin: 0;
  }

  html, body {
    position: relative;
    height: 100%;
  }
  body {
    background: #FFF2E2;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
  }
  main {
    position: relative;
    padding: 1px;
    padding-bottom: 30px;
    .banner{
      width: 570px;
      height: 692px;
      margin: 36px auto 0 auto;
      img {
        width: 570px;
        height: 692px;
      }
    }
    >p {
      padding: 0 50px;
      line-height: 1.3;
      text-align: center;
      font-size: 30px;
      color: #2F323A;
      font-weight: 300;
      margin-top: 22px;
    }
    >p.color-orange {
      font-size: 32px;
      color: #FF8100;
      font-weight: 700;
      margin-top: 22px;
    }
    .content {
      width: 690px;
      height: 2698px;
      margin: 34px auto;
      img {
        width: 690px;
        height: 2698px;
      }
    }
  }
  .arrow-1{
    width: 37px;
    height: 29px;
    position: relative;
    left: 50%;
    margin-left: -18.5px;
    margin-top: 24px;
    opacity: 1;
    background: url("./assets/arrow.png") no-repeat center center;
    background-size: 100% 100%;
    animation: start 1s infinite ease;
    -webkit-animation: start 1s infinite ease;
  }
  @keyframes start{
    0% {
      transform: translate(0,-0.06667rem);
    }
    35% {
      transform: translate(0, 0.1333rem);
    }
    100% {
      transform: translate(0,-0.06667rem);
    }
  }
  @-webkit-keyframes start{
    0% {
      transform: translate(0,-0.06667rem);
    }
    35% {
      transform: translate(0, 0.1333rem);
    }
    100% {
      transform: translate(0,-0.06667rem);
    }
  }
</style>
