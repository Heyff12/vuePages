<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="./assets/1.png" alt="">
      </div>
      <div class="swiper-slide">
        <img src="./assets/2.png" alt="">
      </div>
      <div class="swiper-slide">
        <img src="./assets/3.png" alt="">
      </div>
      <div class="swiper-slide">
        <img src="./assets/4.png" alt="">
        <div>
          <a href="http://qianfang.mikecrm.com/uKgI9y" class="go" @click="goDoor">免费申请试用</a>
          <a href="http://m.youku.com/video/id_XMTcxODgzOTU2MA==.html?x=" class="help" @click="moreHelp">更多帮助</a>
          <p>如有问题，请电话联系客服4000-360-280</p>
          <p> 或 黄经理1861-090-1061</p>
        </div>
      </div>
    </div>
  </div>
  <div class="arrow" v-show="arrow"></div>
</template>

<script type="text/ecmascript-6">
  /*global Swiper, _hmt */
  import config from '../../methods/config'
  import util from '../../methods/util'
  if (util.isAPP) {
    var bridge = require('../../methods/bridge/native')
  } else {
    bridge = require('../../methods/bridge/web')
  }
  export default {
    components: {
    },
    data () {
      return {
        res: {},
        arrow: true
      }
    },
    ready () {
      this.initSwiper()
      this.$http({
        url: 'https://o2.qfpay.com/merchant/v1/profile',
        method: 'JSONP',
        data: {
          format: 'jsonp'
        }
      }).then((res) => {
        if (res.data.respcd === '0000') {
          this.res = Object.assign(this.res, res.data.data)
          bridge.request({
            url: config.aHost + 'api/b/dcIntroCount',
            method: 'POST',
            data: this.res,
            callback: () => {}
          })
        }
      })
    },
    attached () {
    },
    methods: {
      goDoor () {
        _hmt.push(['_trackEvent', 'diancan-intro', 'click-diancan-intro-shangmen', 'click'])
      },
      moreHelp () {
        _hmt.push(['_trackEvent', 'diancan-intro', 'click-diancan-intro-gengduohelp', 'click'])
      },
      initSwiper () {
        let _this = this
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          direction: 'vertical',
          parallax: true,
          speed: 500,
          resistanceRatio: 0,
          nextButton: '.arrow',
          observer: true,
          onSlideChangeEnd: function (swiper) {
            if (swiper.activeIndex === 3) {
              _this.arrow = false
            } else {
              _this.arrow = true
            }
          }
        })
      }
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
    background: #fff;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
  }
  .swiper-container {
    /*display: none;*/
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    position: relative;
    box-sizing: border-box;
    text-align: center;
    > div {
      position: absolute;
      bottom: 40px;
      left: 0;
      right: 0;
      .go {
        display: block;
        margin: 0 auto;
        width: 628px;
        height: 88px;
        line-height: 88px;
        background-color: #FF8100;
        font-size: 34px;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        text-decoration: none;
      }
      .help {
        font-style: normal;
        display: block;
        text-align: center;
        margin: 20px auto 10px;
        text-decoration: underline;
        color: #A38B77;
        font-size: 34px;
      }

      p {
        color: #FF8100;
        font-size: 26px;
        text-align: center;
        line-height: 1.42;
      }
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }

  }
  .arrow{
    width: 50px;
    height: 26px;
    position: absolute;
    left: 50%;
    margin-left: -25px;
    bottom: 0.56rem;
    opacity: 1;
    background: url("./assets/arrow.png") no-repeat center center;
    background-size: 100% 100%;
    animation: start 1.5s infinite ease;
    -webkit-animation: start 1.5s infinite ease;
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
