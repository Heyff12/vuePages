<template>
  <loading :visible="loading"></loading>
  <div v-show="!loading">
    <header>
      <div>
        <img :src="actvsNumberImg" alt="">
      </div>
    </header>
    <section>
      <ul>
        <li class="consume-coupon" v-show="actvs.indexOf('payment_coupon') != -1">
          <h3>消费返红包</h3>
          <p>个性化设置，领取后下次消费即可使用，增加顾客黏性。</p>
          <a @click.prevent="goNative('nearmcht://view-coupon-activity', 1)">
            <i>返</i><span>立即创建</span>
          </a>
        </li>
        <li class="share-coupon" v-show="actvs.indexOf('share_coupon') != -1">
          <h3>分享红包</h3>
          <p>会员可分享好友一起领红包，加倍曝光店铺，带来新顾客。</p>
          <a @click.prevent="goNative('nearmcht://view-coupon-activity')">
            <i>享</i><span>立即创建</span>
          </a>
        </li>
        <li class="card" v-show="actvs.indexOf('card') != -1">
          <h3>会员集点</h3>
          <p>首创集点活动玩法，趣味”集”满回头客。</p>
          <a @click.prevent="goNative('nearmcht://view-member-card')">
            <i></i><span>立即创建</span>
          </a>
        </li>
        <li class="sale" v-show="actvs.indexOf('sale') != -1">
          <h3>特卖</h3>
          <p>发布一款特卖商品，顾客在线抢购，到店兑换，打造爆品聚人气。</p>
          <a @click.prevent="goNative('nearmcht://view-special-sale')">
            <i></i><span>立即创建</span>
          </a>
        </li>
        <li class="push" v-show="actvs.indexOf('notify_coupon') != -1">
          <h3>红包通知</h3>
          <p>主动给会员发红包，刺激消费，改善老顾客流失问题。</p>
          <a @click.prevent="goNative('nearmcht://view-member-notify')">
            <i></i><span>立即创建</span>
          </a>
        </li>
      </ul>
    </section>
  </div>
  <toast :msg="msg"></toast>
</template>

<script type="text/ecmascript-6">
  /* global _hmt */
  import config from '../../methods/config'
  import util from '../../methods/util'
  import loading from '../../components/loading/loading.vue'
  import toast from '../../components/tips/toast.vue'

  import img1 from './assets/1.svg'
  import img2 from './assets/2.svg'
  import img3 from './assets/3.svg'
  import img4 from './assets/4.svg'
  import img5 from './assets/5.svg'
  if (util.isAPP) {
    var bridge = require('../../methods/bridge/native')
  } else {
    bridge = require('../../methods/bridge/web')
  }
  export default {
    components: {
      toast, loading
    },
    data () {
      return {
        msg: '',
        actvs: [],
        actvsNumberImg: null,
        loading: true
      }
    },
    created () {
      let _this = this
      bridge.request({
        url: `${config.o_host}mchnt/user/allow_actvs`,
        method: 'JSONP',
        data: {
          format: 'jsonp'
        },
        callback (res) {
          if (res.respcd === '0000') {
            _this.actvs = res.data.actvs
            switch (_this.actvs.length) {
              case 1: {
                _this.actvsNumberImg = img1
                break
              }
              case 2: {
                _this.actvsNumberImg = img2
                break
              }
              case 3: {
                _this.actvsNumberImg = img3
                break
              }
              case 4: {
                _this.actvsNumberImg = img4
                break
              }
              case 5: {
                _this.actvsNumberImg = img5
                break
              }
            }
            _this.$nextTick(() => {
              _this.loading = false
            })
          } else {
            _this.onToast(res.resperr)
          }
        }
      })
    },
    methods: {
      onToast (msg) {
        this.msg = msg
      },
      goNative (schema, type) {
      /** creSaleFromActivityCreate（创建特卖）
       creHBShareFromActivityCreate（创建分享红包）
       creHBBackFromActivityCreate（创建消费返红包）
       creHBNoticeFromActivityCreate（创建红包通知）
       creJDFromActivityCreate（创建集点）
       */
        bridge.redirectToNative(schema)
        let tag = ''
        switch (schema) {
          case 'nearmcht://view-coupon-activity': {
            if (type) {
              tag = 'creHBBackFromActivityCreate'
            } else {
              tag = 'creHBShareFromActivityCreate'
            }
            break
          }
          case 'nearmcht://view-member-card': {
            tag = 'creJDFromActivityCreate'
            break
          }
          case 'nearmcht://view-special-sale': {
            tag = 'creSaleFromActivityCreate'
            break
          }
          case 'nearmcht://view-member-notify': {
            tag = 'creHBNoticeFromActivityCreate'
            break
          }
        }
        _hmt.push(['_trackEvent', 'activity-create', tag, 'click'])
      }
    }
  }

</script>

<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../styles/common";

  p,img{
    line-height: 1.4;
    margin: 0;
  }

  html, body {
    position: relative;
    height: 100%;
  }
  body {
    background: #ECEDF7;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
  }
  header {
    background: url("./assets/header.png") center center no-repeat;
    background-size: 100% 100%;
    height: 300px;
    > div {
      position: absolute;
      top: 124px;
      left: 154px;
      width: 450px;
      height: 88px;
      background: url("./assets/header-content.png") center center no-repeat;
      background-size: 100% 100%;
      img {
        display: block;
        width: 26px;
        height: 46px;
        position: absolute;
        left: 134px;
        top: 22px;
      }
    }
  }
  section {
    padding: 20px;
    ul {
      li {
        background-color: #fff;
        padding: 30px 0;
        margin-bottom: 20px;
        h3 {
          color: #000000;
          font-size: 36px;
          padding: 0 28px;
          margin: 0 0 26px;
          position: relative;
          font-weight: 500;
          &:before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 4px;
            width: 20px;
            height: 40px;
          }
        }
        p {
          color: #606470;
          font-size: 30px;
          padding: 0 28px;
        }
        a {
          display: flex;
          margin: 24px 30px 0;
          border: 2px solid #FF8100; /*px*/
          border-radius: 6px;
          text-align: center;
          color: #FF8100;
          justify-content: center;
          align-items: center;
          font-size: 34px;
          height: 80px;
          line-height: 80px;
          i {
            vertical-align: text-top;
            margin-right: 8px;
            display: inline-block;
            text-align: center;
            font-size: 22px;
            color: #fff;
          }
        }
        &.consume-coupon {
          h3 {
            &:before {
              background: url("./assets/icon-1.svg");
              background-size: 100% 100%;
            }
          }
          i {
            width: 34px;
            height: 34px;
            line-height: 34px;
            background-color: #FF3C1E;
          }
        }
        &.share-coupon {
          h3 {
            &:before {
              background: url("./assets/icon-2.svg");
              background-size: 100% 100%;
            }
          }
          i {
            width: 34px;
            height: 34px;
            line-height: 34px;
            background-color: #FF8100;
          }
        }
        &.card {
          h3 {
            &:before {
              background: url("./assets/icon-3.svg");
              background-size: 100% 100%;
            }
          }
          i {
            width: 36px;
            height: 36px;
            background: url("./assets/icon-star.svg");
            background-size: 100% 100%;
          }
        }
        &.sale {
          h3 {
            &:before {
              background: url("./assets/icon-4.svg");
              background-size: 100% 100%;
            }
          }
          i {
            width: 36px;
            height: 36px;
            background: url("./assets/icon-edit.png");
            background-size: 100% 100%;
          }
        }
        &.push {
          h3 {
            &:before {
              background: url("./assets/icon-1.svg");
              background-size: 100% 100%;
            }
          }
          i {
            width: 28px;
            height: 36px;
            background: url("./assets/icon-coupon.png");
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>
