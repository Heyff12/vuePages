<script>
  import bridge from '../../methods/bridge'
  import config from '../../methods/config'
  import alert from '../../components/alert/alert.vue'

  export default {
    components: {
      alert
    },
    data () {
      return {
        maskVisible: false,
        selectVisible: false,
        editing1: false,
        editing2: false,
        pricesList: [],
        msg: '',
        promoCode: '',
        mobile: '',
        priceCode: '',
        price: '',
        alertTip: '',
        alertVisible: false,
        mobileErr: '',
        promoCodeErr: '',
        loading: false
      }
    },
    computed: {
      moneyText () {
        return this.price ? this.price : '请选择服务开通时长'
      },
      text () {
        return this.loading ? '提交中...' : '提交'
      }
    },
    ready () {
      this.getList()
    },
    methods: {
      setList (res) {
        let _this = this
        if (res.respcd === '0000') {
          _this.$set('pricesList', res.data.prices)
        } else if (res.respcd === '2300') {
          _this.msg = '没有更多了...'
        } else {
          _this.msg = res.resperr
        }
      },
      getList () {
        let data = {
          format: 'jsonp',
          goods_code: 'diancan'
        }
        bridge.request({
          url: config.o_host + 'mchnt/recharge/promo/price_list',
//          url: 'http://172.100.111.45:2002/mchnt/recharge/promo/price_list',
          method: 'JSONP',
          data: data,
          callback: this.setList
        })
      },
      setTime (time, index) {
        this.thisTime = time
        this.result_2 = index
      },
      maskDisplay: function () {
        this.maskVisible = !this.maskVisible
      },
      selectDisplay: function () {
        this.selectVisible = !this.selectVisible
      },
      changeMoney: function (e, code, index) {
        this.price = e
        this.priceCode = code
        this.selectVisible = !this.selectVisible
      },
      doneEdit1 () {
        let _this = this
        this.editing1 = false
        let data = {
          mobile: this.mobile,
          format: 'jsonp'
        }
        if (_this.mobile === '') {
          return
        }
        if (_this.mobile !== '') {
          bridge.request({
            url: config.o_host + 'mchnt/tool/check_mobile',
//          url: 'http://172.100.111.45:2002/mchnt/tool/check_mobile',
            method: 'JSONP',
            data: data,
            callback: function (res) {
              if (res.respcd === '0000') {
                return
              }
              if (res.respcd !== '0000') {
                _this.mobileErr = '请填写正确的钱方商户注册手机号码'
              }
            }
          })
        }
      },
      focus1 () {
        this.editing1 = true
        this.mobileErr = ''
      },
      doneEdit2 () {
        let _this = this
        this.editing2 = false
        let reg = /^[A-Za-z0-9]{8}$/
        if (!reg.test(_this.promoCode)) {
          _this.promoCodeErr = '请输入8位数字字母组合'
        }
      },
      focus2 () {
        this.editing2 = true
        this.promoCodeErr = ''
      },
      submit () {
        let _this = this
        let data = {
          price_code: this.priceCode,
          promo_code: this.promoCode,
          mobile: this.mobile,
          goods_code: 'diancan',
          format: 'jsonp'
        }

        if (this.mobile === '' || this.promoCode === '') {
          this.alertTip = '请填写正确手机号及推广商户开通码'
          this.changeAlertVisible()
          return
        }

        if (this.priceCode === '') {
          this.alertTip = '请选择服务开通时长'
          this.changeAlertVisible()
          return
        }

        if (this.mobileErr !== '' || this.promoCodeErr !== '') {
          this.alertTip = '请填写正确的手机号及推广商户开通码'
          this.changeAlertVisible()
          return
        }

        if (this.priceCode !== '' && this.promoCode !== '' && this.mobile !== '') {
          _this.loading = true
          bridge.request({
            url: config.o_host + 'mchnt/recharge/promo/recharge',
//            url: 'http://172.100.111.45:2002/mchnt/recharge/promo/recharge',
            method: 'JSONP',
            data: data,
            callback: function (res) {
              if (res.respcd === '0000') {
                _this.alertTip = '提交成功'
                _this.changeAlertVisible()
                _this.mobile = ''
                _this.promoCode = ''
              }
              if (res.respcd !== '0000') {
                _this.alertTip = res.respmsg
                _this.changeAlertVisible()
              }
              _this.loading = false
            }
          })
        }
      },
      changeAlertVisible () {
        this.alertVisible = true
      }
    }
  }
</script>

<template>
  <div class="banner">
    <img src="assets/bg-2.png" alt="">
  </div>
  <div class="content">
    <div class="input">
      <input @blur="doneEdit1"
             :class="{'editing': editing1,  'error': mobileErr ==='' ? false : true }"
             type="text"
             v-model="mobile"
             placeholder="请输入钱方商户注册手机号码"
             @focus="focus1"
             maxlength="11"
      >
      <p class="err" v-if="mobileErr !== ''">{{mobileErr}}</p>
    </div>
    <div class="input">
      <input @blur="doneEdit2"
             type="text"
             :class="{'editing': editing2, 'error': promoCodeErr ==='' ? false : true }"
             v-model="promoCode"
             placeholder="请输入推广商开通码"
             @focus="focus2"
             maxlength="8"
      >
      <p class="err" v-if="promoCodeErr !== ''">{{promoCodeErr}}</p>
    </div>
    <div class="select-box" @click="selectDisplay">
      <div class="select-btn">
        <span>{{moneyText}}</span>
        <i></i>
      </div>
    </div>
    <!--<div class="button-box">
      <span class="title">请选择会员服务开通时长</span>
      <span v-for="(index, _item) in times" :class="{'button': true, 'activation': (thisTime===_item)}" @click="setTime(_item, index)">{{_item}}个月</span>
    </div>-->
    <div class="btn bg-white" @click="submit"><span>{{text}}</span></div>
  </div>

  <alert :alert-title="alertTitle" :alert-tip="alertTip" :alert-visible.sync="alertVisible"></alert>

  <div class="actionsheet_wrap">
    <div class="weui_mask_transition" v-show="selectVisible" @click="selectDisplay"></div>
    <div :class="{'weui_actionsheet_toggle': selectVisible, 'weui_actionsheet': true}" >
      <div class="weui_actionsheet_menu">
        <div class="weui_actionsheet_cell" v-for="(index, item) in pricesList" @click="changeMoney(item.goods_name, item.code, index)" >{{item.goods_name}}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "../../styles/base/_normalize.scss";
  html{
    width: 100%;
    height: 100%;
  }
  body{
    background: #FFFFFB;
    width: 100%;
    height: 100%;
  }
  .weui_mask_transition {
    background: rgba(0,0,0,.6);
    -webkit-transition: background .3s;
    transition: background .3s;
  }
  .weui_mask, .weui_mask_transition, .weui_mask_transparent {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .weui_actionsheet {
    position: fixed;
    left: 0;
    bottom: 0;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 2;
    width: 100%;
    background-color: #FFFFFB;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
  }
  .weui_actionsheet_menu{
    padding: 10px 0;
  }
  .weui_actionsheet_toggle {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  .weui_actionsheet_cell {
    position: relative;
    height: 70px;
    line-height: 70px;
    text-align: center;
    color: #606470;
    font-size: 30px;
  }
  .weui_actionsheet_cell:first-child:before {
    display: none;
  }
  .weui_actionsheet_cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 2px;
    border-top: 2px solid #d9d9d9; /*px*/
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transorm-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }

  .mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    z-index: 99;
    .mask-content{
      width: 590px;
      height: 274px;
      border-radius: 6px;
      background: #F7F7F7;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -295px;
      margin-top: -137px;
      .padding-r{
        padding-right: 15px;
      }
      .padding-l{
        padding-left: 15px;
      }
      .content-block{
        width: 295px;
        box-sizing: border-box;
        height: inherit;
        float: left;
        text-align: center;
        p{
          color: #171717;
          font-size: 34px;
          margin-top: 56px;
        }
        span{
          display: block;
          width: 256px;
          height: 88px;
          background: #43B1F8;
          border-radius: 6px;
          margin: 36px auto;
          color: #ffffff;
          font-size: 34px;
          line-height: 88px;
        }
      }
    }
  }

  .banner {
    height: 350px;
    width: 750px;
    img{
      height: 350px;
      width: 750px;
    }
  }

  .content{
    position: relative;
    box-sizing: border-box;
    width: 750px;
    height:auto;
    padding: 1px 30px 300px 30px;
    h1{
      text-align: center;
      color: #2F323A;
      font-size: 34px;
    }
    p{
      color: #606470;
      font-size: 30px;
    }
    .input{
      width: 670px;
      margin: 38px auto 0 auto ;
      >input{
        box-sizing: border-box;
        width: 670px;
        height: 88px;
        border: 2px solid #E0D7CD;
        border-radius: 8px;
        font-size: 28px;
        padding: 0 20px;
        background: #FFFFFB;
      }
      .err{
        margin: 10px;
        font-size: 26px;
        color: #FD5359;
      }
      .editing{
        border: 2px solid #FF8100;
      }
      .error{
        border: 2px solid #FD5359;
        background: #FFEEEF;
      }
    }
    .select-box{
      width: 670px;
      height: 88px;
      margin: 38px auto 0 auto ;
      position: relative;
      .select-btn{
        box-sizing: border-box;
        width: 670px;
        height: 88px;
        line-height: 88px;
        border: 2px solid #E0D7CD;
        border-radius: 8px;
        font-size: 28px;
        padding: 0 20px;
        span{
          color: #828080;
          vertical-align: middle;
        }
        i{
          position: absolute;
          top: 40px;
          right: 45px;
          display: block;
          width: 24px;
          height: 14px;
          background: url("assets/arrow.svg") no-repeat center center;
          background-size: 100% 100%;
        }
        ul{
          position: absolute;
          left: 0;
          z-index: 99;
          background: rgba(255,255,255,0.6);
          color: #606470;
          font-size: 30px;
          width: 554px;
          list-style: none ;
          padding: 0;
          li{
            width: inherit;
            height: 60px;
            line-height: 60px;
            text-align: center;
            background: rgba(255,255,255,0.6);
          }
        }
      }
    }
    .button-box{
      width: 670px;
      height: 88px;
      margin: 32px auto 0 auto;
      position: relative;
      color: #606470;
      font-size: 30px;
      line-height: 84px;
      overflow: hidden;
      .title{
        line-height: 88px;
      }
      .button{
        border: 2px solid #DEDEDE; /*px*/
        box-sizing: border-box;
        border-radius: 6px;
        display: inline-block;
        width: 174px;
        height: 88px;
        /*float: right;*/
        margin-left: 12px;
        text-align: center;
      }
      .activation {
        border: 2px solid #43B1F8; /*px*/
        color: #43B1F8;
      }
    }
    .btn{
      box-sizing: border-box;
      width: 670px;
      height: 88px;
      margin: 32px auto 0 auto;
      line-height: 84px;
      text-align: center;
      font-size: 34px;
    }
    .bg-white{
      margin-top: 40px;
      border: 2px solid #FF8100;  /*px*/
      color: #FFFFFF;
      border-radius: 6px;
      background: #FF8100;
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
  }

</style>
