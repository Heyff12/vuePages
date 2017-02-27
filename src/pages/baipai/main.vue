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
        <div class="form-header">
          <h4>招募合作小伙伴</h4>
          <p>留下信息，召唤属于你的好近小伙伴</p>
        </div>
        <div class="form-control">
          <label for="city">所属城市</label>
          <input type="text" name="city" v-model="req.city" id="city" maxlength="10" autocomplete="false">
        </div>
        <div class="form-control">
          <label for="address">详细地址</label>
          <input type="text" name="address" v-model="req.address" id="address" maxlength="20" autocomplete="false">
        </div>
        <div class="form-control">
          <label for="userName">姓名</label>
          <input type="text" name="userName" v-model="req.userName" id="userName" maxlength="5" autocomplete="false">
        </div>
        <div class="form-control">
          <label for="concat">联系方式</label>
          <input type="tel" name="concat" v-model="req.concat" id="concat" maxlength="11" autocomplete="false">
        </div>
        <a @click.prevent="submitHandler">立即预约</a>
      </div>
    </div>
    <toast :msg="msg"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  /*global Swiper*/
  import config from '../../methods/config'
  import util from '../../methods/util'
  import toast from '../../components/tips/toast.vue'

  import img4 from './assets/4.png'
  if (util.isAPP) {
    var bridge = require('../../methods/bridge/native')
  } else {
    bridge = require('../../methods/bridge/web')
  }
  export default {
    components: {
      toast
    },
    data () {
      return {
        req: {
          city: '',
          address: '',
          userName: '',
          concat: ''
        },
        msg: ''
      }
    },
    ready () {
      this.initSwiper()
    },
    attached () {
    },
    methods: {
      initSwiper () {
        /* eslint-disable no-new */
        window.mySwiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          mousewheelControl: false,
          direction: 'vertical',
          speed: 500,
          resistanceRatio: 0,
          observer: true,
          onSlideChangeStart: function (swiper) {
          }
        })
      },
      submitHandler () {
        let mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[012356789]|18[0-9]|14[57])[0-9]{8}$/
        if (!this.req.city) {
          this.onToast('请输入城市名')
          return
        }
        if (!this.req.address) {
          this.onToast('请输入详细地址')
          return
        }
        if (!this.req.userName) {
          this.onToast('请输入姓名')
          return
        }
        if (!this.req.concat) {
          this.onToast('请输入手机号')
          return
        }
        if (!this.req.concat.match(mobileReg)) {
          this.onToast('请输入正确的手机号')
          return
        }
        bridge.request({
          url: config.aHost + 'api/b/baipaiCount',
          method: 'POST',
          data: this.req,
          callback: () => {
            window.mySwiper.appendSlide(
              `<div class="swiper-slide">
                <img src="${img4}" alt="">
              </div>`
            )
            setTimeout(function () {
              window.mySwiper.slideNext()
              window.mySwiper.lockSwipeToPrev()
            }, 0)
          }
        })
      },
      onToast (msg) {
        this.msg = msg
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
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .swiper-container-vertical > .swiper-wrapper {
    max-width: 10rem;
    margin: 0 auto;
    flex-direction: column;
  }
  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: auto;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }
  .swiper-slide {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    text-align: center;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    a {
      position: absolute;
      top: 100%;
      transform: translateY(-88px);
      left: 0;
      right: 0;
      height: 88px;
      line-height: 88px;
      text-align: center;
      color: $white;
      font-size: 34px;
      background-color: $orange;
    }
  }
    .form-header {
      background-color: #FF8100;
      padding: 32px 0 40px;
      h4 {
        font-size: 44px;
        color: $white;
        margin-bottom: 18px;
        line-height: 1;
        font-weight: bold;
      }
      p {
        font-size: 30px;
        color: $white;
        line-height: 1;
      }
    }
    .form-control {
      padding: 30px 40px 0;
      label {
        color: #606470;
        font-size: 30px;
        display: block;
        line-height: 1;
        text-align: left;
        margin-bottom: 20px;
      }
      input {
        display: block;
        width: 100%;
        height: 88px;
        line-height: 1;
        border: 2px solid #E5E5E5; /*px*/
        border-radius: 2px;
        padding: 30px 20px;
        font-size: 30px;
        color: #2F323A;
        outline: none;
      }
    }
</style>
