<template>
  <div class="swiper-container" v-show="!noData && onload" :class="{'is-load': onload}">
    <div class="parallax-bg" data-swiper-parallax="-50%"></div>
    <div class="swiper-wrapper">
      <div class="swiper-slide page1">
        <div class="main-pic-wrap scale-up"></div>
        <h1 class="page1-title will-up">开店不容易 好近陪你做生意</h1>
        <div class="page1-content-wrap will-up">
          <p class="page1-content">
            <span class="page1-content-number">2016</span>
            <span class="point"></span>
            好近红包数据
          </p>
        </div>
        <p class="page1-tip will-up">快来看看好近红包为你赚了多少钱</p>
        <div class="arrow"></div>
      </div>
      <div class="swiper-slide page2">
        <div class="flex-row part1">
          <div class="flex-row-sub text-left style1-content will-up">
            <p class="font-30"><span class="font-48 color-00FFDC">{{reportData.jdate | formatTime "yyyy"}}</span>年<span class="font-48 color-00FFDC">{{reportData.jdate | formatTime "MM"}}</span>月<span class="font-48 color-00FFDC">{{reportData.jdate | formatTime "dd"}}</span>日</p>
            <p class="font-30">你与好近熊相遇在茫茫人海中～</p>
          </div>
          <div class="flex-row-sub part1-pic ball-scale-ripple-multiple fade-in">
            <img src="./assets/part-1.png" alt="">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="line line1">
              <div class="dot dot-left"></div>
              <div class="dot dot-right"></div>
            </div>
          </div>
        </div>
        <div class="flex-row part2">
          <div class="flex-row-sub part2-pic ball-scale-ripple-multiple fade-in">
            <img src="./assets/part-2.png" alt="">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="line line2">
              <div class="dot dot-left"></div>
              <div class="dot dot-right"></div>
            </div>
          </div>
          <div class="flex-row-sub text-left style2-content will-up ">
            <p class="font-30">共产生<span class="font-48 color-00FFDC">{{reportData.tx_cnt}}</span>笔微信交易</p>
            <p class="font-30">总收入<span class="font-48 color-00FFDC">{{reportData.total_amt | formatCurrency}}</span>元</p>
          </div>
        </div>
        <div class="flex-row part3">
          <div class="flex-row-sub text-left style1-content will-up">
            <p class="font-30">好近平台给你补贴<span class="font-48 color-00FFDC">{{reportData.coupon_amt | formatCurrency}}</span>元</p>
            <p class="font-30">就问你一句壕不壕，壕不壕！</p>
          </div>
          <div class="flex-row-sub part3-pic ball-scale-ripple-multiple fade-in">
            <img src="./assets/part-3.png" alt="">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
        <div class="arrow"></div>
      </div>
      <div class="swiper-slide page3">
        <div class="flex-row part4">
          <div class="flex-row-sub part4-pic ball-scale-ripple-multiple fade-in">
            <img src="./assets/part-4.png" alt="">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="line line4">
              <div class="dot dot-left"></div>
              <div class="dot dot-right"></div>
            </div>
          </div>
          <div class="flex-row-sub text-left style2-content will-up">
            <p class="font-30">你一共创建了<span class="font-48 color-00FFDC">{{reportData.act_cnt}}</span>红包活动</p>
            <p class="font-30"><span class="font-48 color-00FFDC">{{reportData.c_cnt}}</span>位顾客已使用</p>
          </div>
        </div>
        <div class="flex-row part5">
          <div class="flex-row-sub text-left  style1-content will-up">
            <p class="font-30">你只花了<span class="font-48 color-00FFDC">{{reportData.self_amt | formatCurrency}}</span>元</p>
            <p class="font-30">就成功刺激再消费<span class="font-48 color-00FFDC">{{reportData.self_tx_amt | formatCurrency}}</span>元</p>
          </div>
          <div class="flex-row-sub part5-pic ball-scale-ripple-multiple fade-in">
            <img src="./assets/part-5.png" alt="">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="line line5">
              <div class="dot dot-left"></div>
              <div class="dot dot-right"></div>
            </div>
          </div>
        </div>
        <div class="flex-row part6">
          <div class="flex-row-sub part6-pic ball-scale-ripple-multiple fade-in">
            <img src="./assets/part-6.png" alt="">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
          <div class="flex-row-sub text-left style1-content will-up">
            <p v-if="reportData.newc_cnt !== '0'" class="font-30">分享红包带来<span class="font-48 color-00FFDC">{{reportData.newc_cnt}}</span>位顾客</p>
            <p v-else class="font-30">没有顾客使用分享红包</p>
            <p v-if="reportData.oldc_cnt !== '0'" class="font-30">消费返红包带来<span class="font-48 color-00FFDC">{{reportData.oldc_cnt}}</span>位顾客</p>
            <p v-else class="font-30">没有顾客使用消费返红包</p>
          </div>
        </div>
        <div class="arrow"></div>
      </div>
      <div class="swiper-slide page4">
        <div class="main-pic2-wrap scale-up"></div>
        <h1 class="page4-title font-44 will-up">做会员红包活动</h1>
        <h1 class="page4-title-2 font-44 will-up">拉新留旧  收入翻番</h1>
        <div class="page4-content-wrap will-up" @click.stop="redirect">
          <a class="page4-content font-34" @click.stop="redirect">马上体验会员红包</a>
          <span class="icon"></span>
        </div>
      </div>
    </div>
    </div>
  <div v-if="noData && onload" class="no-data-wrap">
    <div class="header-wrap">
      <div class="header-tip-wrap font-30">
        <p v-if="noCoupon">老板，你还没有设置过红包活动哦！先看看好近几万商户使用红包的效果～</p>
        <p v-else>老板，你设置的活动效果好像不太好，先看看好近几万商户使用红包的效果～</p>
      </div>
    </div>
    <div class="main-wrap">
      <h2 class="break font-34 color-FF4400">平均每家店的红包效果</h2>
      <h1 class="font-32 color-2F323A">单店日均交易金额</h1>
      <p class="color-8A8C92 font-30">红包活动前日均<span class="color-FF4400">596</span>元，红包活动后日均<span class="color-FF4400">787</span>元</p>
      <h1 class="font-32 color-2F323A">单店日均交易笔数</h1>
      <p class="color-8A8C92 font-30">红包活动前日均<span class="color-FF4400">15</span>笔，红包活动后日均<span class="color-FF4400">23</span>笔</p>
      <h1 class="font-32 color-2F323A">单店30天到店消费者数</h1>
      <p class="color-8A8C92 font-30">红包活动前<span class="color-FF4400">234</span>人，红包活动后<span class="color-FF4400">293</span>人，活动增长<span class="color-FF4400">5%</span></p>
      <h1 class="font-32 color-2F323A">复购率（顾客回头的频率）</h1>
      <p class="color-8A8C92 font-30">红包活动前<span class="color-FF4400">24%</span>，红包活动后<span class="color-FF4400">32%</span>，活动增长<span class="color-FF4400">33%</span></p>
      <div class="title-wrap">
        <p class="font-34 color-FF4400">红包效果棒棒哒，用过的都说好！</p>
      </div>
      <p class="font-30 color-2F323A title-title">特此奉上红包商户优秀案例，大家可以参考参考怎么来设置红包活动</p>
      <div class="case-wrap">
        <h1 class="font-30 color-FF4400">案例一：美食城商户</h1>
        <p class="font-30 color-8A8C92">商户类型：<span class="color-2F323A">美食城 封闭式写字楼商圈</span></p>
        <p class="font-30 color-8A8C92">活动天数：<span class="color-2F323A">15天</span></p>
        <p class="font-30 color-8A8C92">红包金额：<span class="color-2F323A">1.5元</span></p>
        <p class="font-30 color-8A8C92">红包领取数：<span class="color-2F323A">1752个</span></p>
        <p class="font-30 color-8A8C92">红包使用数：<span class="color-2F323A">729个</span></p>
        <p class="font-30 color-8A8C92">核销率：<span class="color-2F323A">42%</span></p>
        <p class="font-30 color-8A8C92">人均消费：<span class="color-2F323A">20元</span></p>
        <p class="font-30 color-8A8C92">红包刺激消费：<span class="color-2F323A">14580元</span></p>
        <p class="font-30 color-8A8C92">老顾客回头率：<span class="color-2F323A">20%</span></p>
        <p class="font-30 color-8A8C92">实际红包带来流水增长：<span class="color-2F323A">6943元</span></p>
        <div class="case-bg"></div>
      </div>
      <div class="case-wrap">
        <h1 class="font-30 color-FF4400">案例二：便利店商户</h1>
        <p class="font-30 color-8A8C92">商户类型：<span class="color-2F323A">便利店超市 半封闭式写字楼商圈</span></p>
        <p class="font-30 color-8A8C92">活动天数：<span class="color-2F323A">15天</span></p>
        <p class="font-30 color-8A8C92">红包金额：<span class="color-2F323A">0.8元</span></p>
        <p class="font-30 color-8A8C92">红包领取数：<span class="color-2F323A">1113个</span></p>
        <p class="font-30 color-8A8C92">红包使用数：<span class="color-2F323A">386个</span></p>
        <p class="font-30 color-8A8C92">核销率：<span class="color-2F323A">35%</span></p>
        <p class="font-30 color-8A8C92">人均消费：<span class="color-2F323A">10元</span></p>
        <p class="font-30 color-8A8C92">红包刺激消费：<span class="color-2F323A">3860元</span></p>
        <p class="font-30 color-8A8C92">老顾客回头率：<span class="color-2F323A">10%</span></p>
        <p class="font-30 color-8A8C92">实际红包带来流水增长：<span class="color-2F323A">2757元</span></p>
        <div class="case-bg"></div>
      </div>
      <div class="title-wrap">
        <p class="font-34 color-FF4400">做会员红包活动，拉新留旧，收入翻番！</p>
      </div>
      <div class="btn" @click="redirect">
        <p class="font-34">马上体验好近会员红包</p>
      </div>
    </div>
  </div>
  <div class="mask" v-if="visible" @click="hiddenMask">
    <div class="mask-bg"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  /*global Swiper, _hmt */
  import config from '../../methods/config'
  import bridge from '../../methods/bridge'
  import util from '../../methods/util'
  import mask from '../../components/mask/index.vue'
  export default {
    components: {
      mask
    },
    data () {
      return {
        reportData: {
          mchnt_id: 0,
          nickname: 0,
          jdate: 0,
          tx_cnt: 0,
          total_amt: 0,
          coupon_amt: 0,
          act_cnt: 0,
          c_cnt: 0,
          self_amt: 0,
          self_tx_amt: 0,
          newc_cnt: 0,
          oldc_cnt: 0
        },
        userid: '',
        noData: false,
        noCoupon: true,
        visible: false,
        onload: false
      }
    },
    ready () {
      let params = util.getRequestParams(window.location.search)
      this.userid = params.userid || ''

      /* eslint-disable no-new */
      this.getDate()
      this.initSwiper()
    },
    attached () {
    },
    methods: {
      redirect () {
        let UA = navigator.userAgent
        if ((/Android/ig).test(UA)) {
          bridge.redirectToNative('nearmcht://view-coupon-activity')
        } else {
          this.visible = true
        }
        _hmt.push(['_trackEvent', 'coupon-review', 'click-coupon-review-button', 'click'])
      },
      getDate () {
        let _this = this
        let data = null
        if (_this.userid !== '') {
          data = {
            userid: _this.userid
          }
        }
        bridge.request({
          url: config.o_host + 'report/coupon_report/get',
          method: 'JSONP',
          data: data,
          callback: function (res) {
            if (res[0]) {
              if (res[0].status === '1') {
                _this.$set('reportData', res[0])
                _this.noData = false
              } else if (res[0].status === '0') {
                _this.noData = true
                _this.noCoupon = false
              }
            } else {
              _this.noData = true
            }
            _this.onload = true
          }
        })
      },
      hiddenMask () {
        this.visible = false
      },
      initSwiper () {
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          direction: 'vertical',
          parallax: true,
          speed: 500,
          resistanceRatio: 0,
          nextButton: '.arrow',
          observer: true
        })
      }
    }
  }

</script>

<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../styles/main";

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
  .no-data-wrap{
    .header-wrap{
      width: 100%;
      height: 282px;
      background: url('assets/header.png') no-repeat center center;
      background-size: 100% 100%;
      position: relative;
      .header-tip-wrap{
        width: 540px;
        height: 112px;
        position: absolute;
        padding: 20px 10px;
        top: 38px;
        right: 27px;
        >p{
          color: #ffffff;
          line-height: 1.2;
        }
      }
    }
    .main-wrap{
      margin-top: 30px;
      border-top: 2px solid #FF4400;
      padding: 0 30px 80px 30px;
      position: relative;
      .break{
        position: relative;
        top: -25px;
        text-align: center;
        width: 350px;
        margin: 0 auto;
        background: #ffffff;
      }
      >h1{
        margin-top: 0;
        font-weight: normal;
        padding-left: 30px;
        position: relative;
        margin-bottom: 16px;
        &:first-child{
          margin-top: 0;
        }
        &:before{
          display: block;
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #FF4400;
          position: absolute;
          top: 12px;
          left: 10px;
        }
      }
      .title-wrap{
        margin-top: 54px;
        width: 100%;
        height: 84px;
        border: 4px dashed #FF4400;
        position: relative;
        &:before{
          display: block;
          content: '';
          width: 86px;
          height: 76px;
          position: absolute;
          top: -38px;
          left: -20px;
          background: url("assets/horn.png") no-repeat center center;
          background-size: 100% 100%;
        }
        >p{
          line-height: 84px;
          text-align: center;
        }
      }
      .title-title{
        margin-top: 30px;
        margin-bottom: 47px;
      }
      .case-wrap{
        position: relative;
        margin-top: 30px;
        width: 100%;
        border: 4px solid #FF4400;
        text-align: center;
        padding: 26px 30px 30px 30px;
        >h1{
          position: relative;
          text-align: center;
          width: 300px;
          margin: 0 auto 26px auto;
          &:before{
            display: block;
            content: '';
            width: 20px;
            height: 20px;
            background: url("assets/xingxing.png") no-repeat center center;
            background-size: 100% 100%;
            position: absolute;
            top: 8px;
            left: -25px;
          }
          &:after{
            display: block;
            content: '';
            width: 20px;
            height: 20px;
            background: url("assets/xingxing.png") no-repeat center center;
            background-size: 100% 100%;
            position: absolute;
            top: 8px;
            right: -25px;
          }
        }
        >p{
          text-align: left;
          line-height: 1.5;
        }
        .case-bg{
          width: 302px;
          height: 216px;
          position: absolute;
          bottom: 0;
          right: 0;
          background: url("assets/bg-4.png") no-repeat center center;
          background-size: 100% 100%;
        }
      }
      .btn{
        margin-top: 42px;
        width: 100%;
        height: 88px;
        text-align: center;
        background: #FF4400;
        >p{
          line-height: 88px;
          color: #fff;
        }
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 99;
    .mask-bg{
      width: 648px;
      margin: 30px auto;
      height: 690px;
      background: url("assets/return.png") no-repeat center center;
      background-size: 100% 100%;
    }
  }
  .swiper-container {
    /*display: none;*/
    width: 100%;
    height: 100%;
  }
  .parallax-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 200%;
    background-image: url('./assets/bg-3.png');
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
  }

  .swiper-slide {
    padding-top: 0.03rem;
    position: relative;
    box-sizing: border-box;
    text-align: center;
    color: #ffffff;
  }

  .font-48{
    font-size: 48px;
  }
  .font-44{
    font-size: 44px; /*44px*/
  }
  .font-34{
    font-size: 34px; /*34*/
  }
  .font-32{
    font-size: 32px; /*30px*/
  }
  .font-30{
    font-size: 30px; /*30px*/
  }
  .font-24{
    font-size: 24px; /*24*/
  }
  .text-center{
    text-align: center;
  }
  .text-right{
    text-align: right;
  }
  .text-left{
    text-align: left;
  }
  .color-00FFDC{
    color: #00FFDC;
  }
  .color-2F323A{
    color: #2F323A;
  }
  .color-8A8C92{
    color: #8A8C92;
  }
  .color-FF4400{
    color: #FF4400;
  }
  .color-FF4400{
    color: #FF4400;
  }

  .wp{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .page{
    box-sizing: border-box;
    position: relative;
    text-align: center;
    color: #ffffff;
    background-color: #070E39;
    background-image: url("./assets/bg.png");
    background-size: 100% 100%;
  }

  .page1{
    padding-top: 2.333rem;
    .main-pic-wrap{
      width: 9.09rem;
      height: 6.2rem;
      margin: 0 auto;
      background: url('./assets/main-pic.png') no-repeat center center;
      background-size: 100%;
      transition-delay: .5s;
    }
    .page1-title{
      font-size: 0.58666rem; /*44px*/
      line-height: 1;
      margin-top: 1.30666rem;
      margin-bottom: 0.74666rem;
      position: relative;
    }
    .page1-content-wrap{
      width: 5.28rem;
      height: 0.773rem;
      border: 0.03rem solid #FFFFFF;
      border-radius: 2.666rem;
      margin: 0 auto ;
      transition-delay: .4s;
      .page1-content{
        margin: 0;
        line-height: 0.773rem;
        color: #ffffff;
        font-size: 0.4rem; /*30px*/
        .page1-content-number{
          font-family: "impict", "Lucida Sans Unicode", Helvetica, Arial, sans-serif;
          font-weight: 800;
        }
        .point{
          display: inline-block;
          width: 0.1333rem;
          height: 0.1333rem;
          border-radius: 50%;
          background: #fff;
          font-size: 0.5rem;
          position: relative;
          top: -0.0433rem;
          margin: 0 0.133rem;
        }
      }
    }
    .page1-tip{
      margin-top: 1.9733rem;
      font-size: 0.32rem; /*24*/
      transition-delay: .8s;
    }
  }

  .style1-content{
    margin-left: 0.5333rem;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    flex-direction: column;
    padding-bottom: 0.1666rem;
    >p{
      line-height: 1.3;
    }
  }
  .style2-content{
    margin-left: 0.3rem;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    flex-direction: column;
    padding-bottom: 0.1666rem;
    >p{
      line-height: 1.3;
    }
  }

  .page2{
    .part1{
      margin-top: 1rem;
      .part1-pic{
        width: 2.5333rem;
        height: 1.94666rem;
        margin-right: 1rem;
        >img{
          position: relative;
          z-index: 3;
          width: 2.5333rem;
          height: 1.94666rem;
          animation-delay: .5s;
          -webkit-animation-delay: .5s;
        }
      }
      .flex-row-sub{
        flex: auto;
        position: relative;
        transition-delay: .5s;
        .line1{
          left: 1.2rem;
          top: 0.95rem;
          -webkit-transform: rotate(-225deg);
          transform: rotate(-225deg);
          transition-delay: 1.7s;
        }
      }
      .will-up{
        transition-delay: 1.2s;
      }
    }
    .part2{
      margin-top: 2.6666rem;
      .part2-pic{
        width: 3.0666rem;
        height: 2.5866rem;
        >img{
          position: relative;
          z-index: 3;
          width: 3.0666rem;
          height: 2.5866rem;
          animation-delay: 2.7s;
          -webkit-animation-delay: 2.7s;
        }
      }
      .flex-row-sub{
        flex: auto;
        position: relative;
        transition-delay: 2.7s;
        .line2{
          left: 1.5rem;
          top: 1.3rem;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
          transition-delay: 3.9s;
        }
      }
      .will-up{
        transition-delay: 3.4s;
      }
    }
    .part3 {
      margin-top: 3.3333rem;
      .part3-pic {
        width: 2.58666rem;
        height: 2.08rem;
        margin-right: 1rem;
        > img {
          position: relative;
          z-index: 3;
          width: 2.58666rem;
          height: 2.08rem;
          animation-delay: 4.9s;
          -webkit-animation-delay: 4.9s;
        }
      }
      .flex-row-sub{
        flex: auto;
        position: relative;
        transition-delay: 4.9s;
      }
      .will-up{
        transition-delay: 5.6s;
      }
    }
  }

  .page3{
    .part4{
      margin-top: 1rem;
      .part4-pic{
        width: 3.44rem;
        height: 2.16rem;
        >img{
          position: relative;
          z-index: 3;
          width: 3.44rem;
          height: 2.16rem;
          animation-delay: .5s;
          -webkit-animation-delay: .5s;
        }
      }
      .flex-row-sub{
        flex: auto;
        position: relative;
        transition-delay: .5s;
        .line4{
          left: 1.7rem;
          top: 1.05rem;
          -webkit-transform: rotate(41deg);
          transform: rotate(41deg);
          transition-delay: 1.7s;
        }
      }
      .will-up{
        transition-delay: 1.2s;
      }
    }
    .part5{
      margin-top: 3.04rem;
      .part5-pic{
        width: 3.01333rem;
        height: 2.10666rem;
        margin-right: 0.3rem;
        >img{
          position: relative;
          z-index: 3;
          width: 3.01333rem;
          height: 2.10666rem;
          animation-delay: 2.7s;
          -webkit-animation-delay: 2.7s;
        }
      }
      .flex-row-sub{
        flex: auto;
        position: relative;
        transition-delay: 2.7s;
        .line5{
          left: 1.5rem;
          top: 1.05rem;
          -webkit-transform: rotate(-221deg);
          transform: rotate(-221deg);
          transition-delay: 3.9s;
        }
      }
      .will-up{
        transition-delay: 3.4s;
      }
    }
    .part6{
      margin-top: 3.1333rem;
      .part6-pic{
        width: 2.6666rem;
        height: 2.02666rem;
        margin-left: 0.1333rem;
        >img{
          position: relative;
          z-index: 3;
          width: 2.6666rem;
          height: 2.02666rem;
          animation-delay: 4.9s;
          -webkit-animation-delay: 4.9s;
        }
      }
      .flex-row-sub{
        flex: auto;
        position: relative;
        transition-delay: 4.9s;
        .line6{
          left: 1.2rem;
          top: 0.95rem;
          -webkit-transform: rotate(-225deg);
          transform: rotate(-225deg);
          transition-delay: 6s;
        }
      }
      .will-up{
        transition-delay: 5.6s;
      }
    }
  }

  .page4{
    padding-top: 1.62666rem;
    .main-pic2-wrap{
      width: 9.17333rem;
      height: 7.2533rem;
      margin: 0 auto;
      background: url('./assets/main-pic-2.png') no-repeat center center;
      background-size: contain;
      transition-delay: .5s;
    }
    .page4-title{
      line-height: 1.3;
      margin-top: 1.14666rem;
      transition-delay: .4s;
    }
    .page4-title-2{
      line-height: 1.3;
      transition-delay: .6s;
    }
    .page4-content-wrap{
      width: 6.08rem;
      height: 1.10666rem;
      position: relative;
      background: #FF1544;
      border-radius: 2.666rem;
      margin: 1.36rem auto 0 auto;
      transition-delay: .8s;
      .page4-content{
        margin: 0;
        line-height: 1.10666rem;
        color: #ffffff;
        font-size: 0.4rem; /*30px*/
        text-decoration: none;

      }
      .icon {
        position: absolute;
        top: 0.419rem;
        right: 0.7rem;
        display: block;
        width: 0.46rem;
        height: 0.25rem;
        background: url("./assets/arrow.png") no-repeat center center;
        background-size: 100% 100%;
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
      }
    }
  }

  .arrow{
    width: 0.96rem;
    height: 0.5333rem;
    position: absolute;
    left: 50%;
    margin-left: -0.48rem;
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
  .flex-row {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-items: center;
    -webkit-justify-items: center;
  }
  @-webkit-keyframes ball-scale-ripple-multiple {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
    50% {
      -webkit-transform: scale(1.5);
      transform: scale(1.5);
      opacity: .5;
    }
    100% {
      -webkit-transform: scale(2);
      transform: scale(2);
      opacity: 0;
    }
  }
  @keyframes ball-scale-ripple-multiple {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
    50% {
      -webkit-transform: scale(1.5);
      transform: scale(1.5);
      opacity: .5;
    }
    100% {
      -webkit-transform: scale(2);
      transform: scale(2);
      opacity: 0;
    }
  }
  @-webkit-keyframes swing {
    20% {
      -webkit-transform: rotate3d(0,0,1,15deg);
      transform: rotate3d(0,0,1,15deg);
    }
    40% {
      -webkit-transform: rotate3d(0,0,1,-10deg);
      transform: rotate3d(0,0,1,-10deg);
    }
    60% {
      -webkit-transform: rotate3d(0,0,1,5deg);
      transform: rotate3d(0,0,1,5deg);
    }
    80% {
      -webkit-transform: rotate3d(0,0,1,-5deg);
      transform: rotate3d(0,0,1,-5deg);
    }
    100% {
      -webkit-transform: rotate3d(0,0,1,0deg);
      transform: rotate3d(0,0,1,0deg);
    }
  }
  @keyframes swing {
    20% {
      -webkit-transform: rotate3d(0,0,1,15deg);
      transform: rotate3d(0,0,1,15deg);
    }
    40% {
      -webkit-transform: rotate3d(0,0,1,-10deg);
      transform: rotate3d(0,0,1,-10deg);
    }
    60% {
      -webkit-transform: rotate3d(0,0,1,5deg);
      transform: rotate3d(0,0,1,5deg);
    }
    80% {
      -webkit-transform: rotate3d(0,0,1,-5deg);
      transform: rotate3d(0,0,1,-5deg);
    }
    100% {
      -webkit-transform: rotate3d(0,0,1,0deg);
      transform: rotate3d(0,0,1,0deg);
    }
  }

  /*animation*/
  .fade-in{
    opacity: 0;
    transition: all .7s;
    transition-property: opacity,-webkit-transform;
    transition-property: opacity,transform;
    transition-property: opacity,transform,-webkit-transform;
  }
  .will-up{
    opacity: 0;
    -webkit-transform: translate3d(0,1.066667rem,0);
    transform: translate3d(0,1.066667rem,0);
    transition: all 1.5s cubic-bezier(.19,1,.22,1);
    transition-property: opacity,-webkit-transform;
    transition-property: opacity,transform;
    transition-property: opacity,transform,-webkit-transform;
  }
  .scale-up{
    -webkit-transform: scale(0);
    transform: scale(0);
    transition: -webkit-transform .5s;
    transition: transform .5s;
    transition: transform .5s,-webkit-transform .5s;
  }
  .ball-scale-ripple-multiple>div.circle {
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -1rem;
    margin-top: -1rem;
    border-radius: 50%;
    border: 1px solid #fff;
    -webkit-animation: ball-scale-ripple-multiple 1.25s 0s infinite linear;
    animation: ball-scale-ripple-multiple 1.25s 0s infinite linear;
    width: 2rem;
    height: 2rem;
  }
  .ball-scale-ripple-multiple>div.circle:nth-child(2) {
    -webkit-animation-delay: -.4s;
    animation-delay: -.4s;
  }
  .animated-swing {
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .is-load{
    .swiper-slide-active {
      .scale-up {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      .fade-in{
        opacity: 1;
      }
      .will-up {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
      .animated-swing{
        -webkit-animation-name: swing;
        animation-name: swing;
      }
      .line1{
        transition-delay: .5s;
        opacity: 1;
        width: 6.733rem;
      }
      .line2{
        transition-delay: .5s;
        opacity: 1;
        width: 7.333rem;
      }
      .line3{
        transition-delay: .5s;
        opacity: 1;
        width: 7.333rem;
      }
      .line4{
        transition-delay: .5s;
        opacity: 1;
        width: 6.533rem;
      }
      .line5{
        transition-delay: .5s;
        opacity: 1;
        width: 6.853rem;
      }
      .line6{
        transition-delay: .5s;
        opacity: 1;
        width: 7.333rem;
      }
    }
  }

  .swiper-slide-prev,.swiper-slide-next{
    .scale-up {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    .fade-in{
      opacity: 0;
    }
    .will-up {
      opacity: 0;
      -webkit-transform: translate3d(0,1.066667rem,0);
      transform: translate3d(0,1.066667rem,0);
      transition: all 2s cubic-bezier(.19,1,.22,1);
    }
  }

  .line{
    width: 0;
    position: absolute;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    border-bottom: 0.06rem dotted #FF0033;
    height: 0;
    opacity: 0;
    transition: all .8s ease-in-out;
    z-index: 2;
    .dot {
      position: absolute;
      top: -1px;
      width: 6px;
      height: 6px;
      background: #FF0033;
      border-radius: 50%;
    }
    .dot-left{
      left: 0;
    }
    .dot-right {
      right: 0;
    }
  }

</style>
