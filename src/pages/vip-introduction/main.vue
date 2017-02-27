<template>
  <header>
    <img src="./assets/header.png" alt="">
    <h1>好近会员<span>4大</span>服务 快速搭建你的会员体系</h1>
  </header>
  <section>
    <div>
      <div class="logo l">
        <img src="./assets/list1.png" alt="">
        <h2>会员集点</h2>
      </div>
      <div class="content first">
        <h3 class="first">有趣的会员玩法</h3>
        <p>推广新品&打造爆品</p>
        <p>一周增加<span class="first">3倍</span>回头客</p>
      </div>
    </div>
    <img src="./assets/path1.png" alt="">
    <div>
      <div class="content second">
        <h3 class="second">你的营销神器</h3>
        <p>大幅降低拉客成本</p>
        <p>流水提升<span class="second">两成</span>以上</p>
      </div>
      <div class="logo r">
        <img src="./assets/list2.png" alt="">
        <h2>红包营销</h2>
      </div>
    </div>
    <img src="./assets/path2.png" alt="">
    <div>
      <div class="logo l">
        <img src="./assets/list3.png" alt="">
        <h2>会员管理</h2>
      </div>
      <div class="content third">
        <h3 class="third">支付即会员</h3>
        <p>随时掌握会员消费动态</p>
        <p>优惠活动直达顾客</p>
      </div>
    </div>
    <img src="./assets/path1.png" alt="">
    <div>
      <div class="content fourth">
        <h3 class="fourth">更懂你的店</h3>
        <p>经营走势，一目了然</p>
        <p>顾客流失，提前知晓</p>
      </div>
      <div class="logo r">
        <img src="./assets/list4.png" alt="">
        <h2>经营分析</h2>
      </div>
    </div>
  </section>
  <a @click="this.redirect()">立即开通</a>
</template>
<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../styles/common";
  body {
    background: #fff url("./assets/bg.png") center top no-repeat;
    background-size: 100%;
  }
  header {
    img {
      display: block;
      width: 466px;
      height: 330px;
      margin: 66px auto 44px;
    }
    h1 {
      font-size: 28px;
      color: #606470;
      position: relative;
      text-align: center;
      margin-bottom: 48px;
      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 94px;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background-color: #7E4CEF;
        top: 10px;
      }
      &:after {
        content: '';
        display: block;
        position: absolute;
        right: 94px;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background-color: #7E4CEF;
        top: 10px;
      }
      span {
        color: #8B62E9;
      }
    }
  }
  section {
    padding-bottom: 128px;
    > div {
      display: flex;
      padding: 0 100px;
      .logo {
        flex: 1;
        &.l {
          margin-right: 52px;
        }
        &.r {
          margin-left: 52px;
        }
        img {
          width: 114px;
          height: 114px;
          display: block;
          margin: 0 auto;
        }
        h2 {
          font-size: 32px;
          color: #4A4A4A;
          text-align: center;
          margin-top: 6px;
        }
      }
      .content {
        width: 358px;
        height: 160px;
        border-radius: 10px;
        text-align: center;
        padding: 18px 0 16px;
        &.first {
          background: #F1EBFF;
        }
        &.second {
          background: #FFEAE7;
        }
        &.third {
          background: #EBF1FF;
        }
        &.fourth {
          background: #E3F6F2;
        }
        h3 {
          font-size: 30px;
          line-height: 1.42;
          &.first {
            color: #6E3BE2;
          }
          &.second {
            color: #E3260E;
          }
          &.third {
            color: #5B8DFF;
          }
          &.fourth {
            color: #1EB593;
          }
        }
        p {
          font-size: 28px;
          line-height: 1.42;
          color: #606470;
          span {
            &.first {
              color: #6E3BE2;
            }
            &.second {
              color: #E3260E;
            }
          }
        }
      }
    }
    > img {
      display: block;
      width: 402px;
      height: 40px;
      margin: 6px auto;
    }
  }
  a {
    display: block;
    width: 100%;
    height: 88px;
    line-height: 88px;
    background: #FF8100;
    color: #fff;
    font-size: 32px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
<script type="text/ecmascript-6">
  import bridgeNative from '../../methods/bridge/native'
  export default {
    data () {
      return {
        hasNative: true,  // bridge 模式
        bridge: null,
        res: ''
      }
    },
    created () {
      this.bridge = bridgeNative
    },
    methods: {
      // 页面跳转
      redirect () {
        // var url = (util.isAPP ? '/templates/' : './') + 'activity-detail.html'
        let url = 'nearmcht://view-member-pay'
        let params = ''
        this.bridge.redirectToNative(url, params)
      }
    },
    events: {
    }
  }
</script>
