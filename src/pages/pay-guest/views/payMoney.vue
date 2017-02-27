<template>
  <div class="app_container">
    <div class="nav">
      <img src="../assets/nav_icon.png" alt="">
      <div class="shop_name">
        <span>{{shopName}}</span>
        <span @click="exit_login" class="exit-login"><i class="exit"></i>退出</span>
      </div>
    </div>
    <div class="content">
      <div class="pay">
        <div class="pay_way">
          <p :class="active===0 ?'pay_wc_active':'pay_wc'" @click="wc_border">
            <img src="../assets/wechat.png" alt="">
            <span class="icon_font_wc">微信支付</span>
            <span v-show="!active" class="circle"></span>
          </p>
          <p :class="active===1 ?'pay_zfb_active':'pay_zfb'" @click="zfb_border">
            <img src="../assets/zfb.png" alt="">
            <span class="icon_font_zfb">支付宝</span>
            <span v-show="active" class="circle"></span>
          </p>
        </div>
        <p class="dollar">
          <span class="money">请输入金额：</span><i>¥</i>
          <input v-model="keyboardText" class="pay_input" @focus="money" autofocus type="text" @keydown.enter="changeFocus" @keydown="changeMoneyInput"/>
        </p>
        <p class="math">
          <span class="money">条形码数据：</span>
          <input class="pay_math" v-model="keyboardMath" @focus="math"  @keydown.enter="submit"  id="codeNumber" @keydown="changeMathInput" type="text" maxlength="24"/>
        </p>
        <!--<attention></attention>-->
        <div class="attention_container">
          <div class="attention_status"><b  :class="{'paySuccess': isSuccess,'payFailed': isFailed}" v-show="show"></b>{{{payStatus}}} </div>
          <div class="attention_num">支付金额: ¥ <span>{{success_pay}}</span></div>
          <div v-if="isFailed"  class="zfb-errmsg">＊{{errorMessage}}</div>

        </div>
      </div>
      <div class="computed">
        <keyboard :keyboard-text.sync="keyboardText" :keyboard-math.sync="keyboardMath" :keyboard-val="focusValue"></keyboard>
        <div class="wc_get">
          <a id="payBtn" @click.prevent="payMoney" :class="{'sure':makeSure,'wx-btn':wxBtn,'zfb-btn':zfbBtn}">{{pay_message}}</a>
        </div>
      </div>
    </div>
    <!--<account></account>-->
    <div class="account">
      <ul class="account_order">
        <li class="account_money">收款金额</li>
        <li class="account_status">交易状态</li>
        <li class="accoun_way">交易方式</li>
        <li class="account_time">交易时间</li>
        <li class="account_num">交易号<span class="account_refresh"><img src="../assets/refresh.png" alt="" @click="refresh"></span></li>
      </ul>
      <ul v-if="noData" class="account_data">
        <li v-for="item in account_orderList">
          <ul class="orderList">
            <li>¥{{item.txamt|formatCurrency}}</li>
            <li>{{item.cancel|cancelStatus}}</li>
            <li>{{item.busicd|payType}}</li>
            <li>{{item.sysdtm}}</li>
            <li>{{item.syssn}}</li>
          </ul>
        </li>
      </ul>
      <div v-if="!noData" class="no_data">
        <p>暂无数据</p>
      </div>
      <div class="psWord">
        <p><span>＊</span>扫码收款只显示最近3笔交易记录，更多流水请在钱方好近商户APP中查看。</p>
      </div>
    </div>
    <loading :visible="payLoading"></loading>
  </div>
</template>
<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../../styles/_common.scss";
  .app_container {
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    .nav {
      width: 100%;
      height: 60px;
      background-color: #FF8100;

      img {
        display: inline-block;
        width: 161px;
        height: 26px;
        margin-top: 17px;
        margin-left: 60px;
      }

      .shop_name {
        float: right;
        margin-top: 17px;
        margin-right: 66px;
        font-size: 16px;
        color: #fff;
        span {
          font-size: 18px;
        }
        .exit-login{
          cursor: pointer;
          font-size: 18px;
          .exit {
            display: inline-block;
            width: 22px;
            height: 19px;
            background: url("../assets/exit.png") no-repeat;
            margin-left: 20px;
            margin-right: 8px;
            background-size: 100% 100%;
            position: relative;
            vertical-align: sub;
          }
        }
      }
    }
    .content {
      width: 784px;
      margin: 30px auto;
      zoom: 100%;
      &:after {
        content: "";
        display: block;
        height: 0.1em;
        line-height: 0;
        visibility: hidden;
        clear: both;
      }

      .pay {
        float: left;
        .pay_way {
          zoom: 100%;
          &:after {
            content: "";
            display: block;
            height: 0.1em;
            line-height: 0;
            visibility: hidden;
            clear: both;
          }
          .pay_wc, .pay_zfb {
            float: left;
            margin: 0px;
            width: 80px;
            height: 85px;
            border: 1px solid #DEDEDE;
            border-radius: 3px;
            margin-right: 20px;
            img {
              width: 40px;
              height: 40px;
              border: 0px;
              margin: 10px 0px 0px 20px;
            }
            .icon_font_wc,.icon_font_zfb{
              display: block;
              width: 80px;
              text-align: center;
              color: #2F323A;
              margin-top: 5px;
              font-size: 15px;
            }
          }
          .pay_wc_active, .pay_zfb_active {
            margin: 0px;
            float: left;
            width: 80px;
            height: 85px;
            border: 1px solid #FF8100;
            border-radius: 3px;
            margin-right: 20px;
            position: relative;
            img {
              width: 40px;
              height: 40px;
              border: 0px;
              margin: 10px 0px 0px 20px;
            }
            span.circle{
              display: inline-block;
              width: 24px;
              height: 23px;
              background: url("../assets/circle.png") no-repeat;
              position: absolute;
              top: -10px;
              left: 64px;
              background-size: 100% 100%;
            }
            .icon_font_wc,.icon_font_zfb{
              display: block;
              width: 80px;
              text-align: center;
              color: #2F323A;
              margin-top: 5px;
              font-size: 15px;
            }

          }
          .pay_zfb img, .pay_zfb_active img {
            width: 40px;
            height: 40px;
            margin: 10px 10px 0 20px;
          }
        }
        .pay_input,.pay_math {
          width: 388px;
          height: 44px;
          border-radius: 3px;
          outline: none;
          border: 1px solid #DEDEDE;
          color:#FF8100;
          font-size: 20px;
          &:focus {
            border: 1px solid #FF8100;
          }
        }
        .pay_input {
          padding-left: 35px;
        }
        .pay_math{
          padding-left: 15px;
        }
        .dollar{
          margin-top: 20px;
          position: relative;
          .money {
            color: #2F323A;
            font-size: 15px;
          }
          i{
            position: absolute;
            display: inline-block;
            left: 110px;
            top: 8px;
            font-size: 25px;
            color: #FF8100;
          }
        }
        .math{
          margin-top: 20px;
          .money {
            color: #2F323A;
            font-size: 15px;
          }
          .pay_math{
            color: #606470;
            text-align: left;
          }
        }
        .attention_container{
          display: flex;
          width: 490px;
          height: 107px;
          border: 1px dashed #FF8100;
          border-radius: 3px;
          margin-top: 20px;
          flex-flow: row wrap;
          align-items: center;
          .attention_status{
            width: 230px;
          }
          .attention_num{
            width: 255px;
            span{
              font-size: 25px;
            }
          }
          .attention_status,.attention_num{
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-left: 1px solid #C2C2C2;
            color: #2F323A;
            font-size: 20px;
          }
          .attention_status{
            border: none;
            .paySuccess{
              display: inline-block;
              height: 41px;
              width: 40px;
              background: url("../assets/success.png");
              vertical-align: middle;
              margin-right: 10px;
              background-size: 100% 100%;
            }
            .payFailed{
              display: inline-block;
              height: 40px;
              width: 40px;
              background: url("../assets/failed.png");
              vertical-align: middle;
              margin-right: 10px;
              background-size: 100% 100%;
            }
          }
          .errorMsg{
            color: #FD5359;
            margin-left: 50px;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            margin-left: 15px;
          }
          .zfb-errmsg{
            color: #FD5359;
            margin: 0px;
            height: 30px;
            width: 490px;
            font-size: 12px;
            margin-left: 15px;
          }
        }
      }
      .computed{
        float: right;
        height: 340px;
        /*.zfb_get{*/
        /*width: 254px;*/
        /*height: 44px;*/
        /*margin-left: 10px;*/
        /*a{*/
        /*display: inline-block;*/
        /*width: 254px;*/
        /*height: 44px;*/
        /*line-height: 44px;*/
        /*text-align: center;*/
        /*font-size: 17px;*/
        /*color: #fff;*/
        /*background-color: #00AAEE;*/
        /*border-radius: 3px;*/
        /*margin-top: 13px;*/
        /*}*/
        /*.sure{*/
        /*background-color:#FF8100 ;*/
        /*}*/
        /*}*/
        .wc_get{
          width: 254px;
          height: 60px;
          margin-left: 10px;
          .wx-btn{
            display: inline-block;
            width: 254px;
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 17px;
            color: #fff;
            background-color: #7ED321;
            border-radius: 3px;
            margin-top: 13px;
            cursor: pointer;
          }
          .zfb-btn{
            display: inline-block;
            width: 254px;
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 17px;
            color: #fff;
            background-color: #00AAEE;
            border-radius: 3px;
            margin-top: 13px;
            cursor: pointer;
          }
          .sure{
            display: inline-block;
            width: 254px;
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 17px;
            color: #fff;
            background-color:#FF8100 ;
            border-radius: 3px;
            margin-top: 13px;
            cursor: pointer;
          }
        }
      }

    }
    .account{
      width: 784px;
      margin: 0 auto;
      .account_order{
        width: 784px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 3px;
        li{
          float: left;
          width: 145px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-color:#FFF4E7 ;
          color: #606470;
          border-bottom: 1px dashed #FF8100;
        }
        .account_money{
          width: 130px;
        }
        .account_time{
          width: 150px;
        }
        .account_status{
          padding-left: 7px;
        }
        .account_num{
          width: 214px;
          position: relative;
          .account_refresh{
            position: absolute;
            right: 10px;
            top: 5px;
            cursor: pointer;
              img{
                width: 19px;
                height: 21px;
              }
          }
        }
      }
      .account_data{
        width: 782px;
        /*height: 135px;*/
        margin: 0 auto;
        border: 1px solid #DEDEDE;
        border-top: none;
        li{
          width: 760px;
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #DEDEDE;
          margin-left: 20px;
          .orderList{
            width: 762px;
            overflow: hidden;
            li{
              width: 120px;
              float: left;
              border-bottom: none;
            }
            li:last-of-type{
              width: 180px;
              border-bottom: none;
            }
          }
          li:nth-child(2){
            width: 140px;
            border-bottom: none;
          }
          li:nth-child(3){
            width: 100px;
            margin-left: 0px;
            border-bottom: none;
          }
        }
        li:last-of-type{
          border-bottom: none;
        }
      }
      .no_data{
        width: 782px;
        margin: 0 auto;
        border: 1px solid #DEDEDE;
        border-top: none;
        height: 135px;
        p{
          text-align: center;
          font-size: 13px;
          color: #606470;
          padding-top: 55px;
        }
      }
      .psWord{
        border: 1px solid #DEDEDE;
        border-top: none;
        height: 50px;
        width: 782px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        p{
          margin-left: 15px;
          font-size: 13px;
          color: #606470;
            span{
              display: inline-block;
              font-size: 13px;
              height: 18px;
            }
        }
      }
    }
  }
</style>
<script>
  /*global Vue*/
  import Keyboard from '../components/Keyboard'
  import Loading from '../components/Loading'
  export default {
    data () {
      return {
        active: 0,
        keyboardText: '',
        keyboardMath: '',
        focusValue: '1',
        makeSure: false,
        wxBtn: true,
        zfbBtn: false,
        pay_message: '微信收款',
        noData: true,
        shopName: '',
        payStatus: '支付状态',
        isSuccess: false,
        isFailed: false,
        errorMessage: '',
        account_orderList: [],
        payType: '800208',
        success_pay: '',
        show: false,
        noWrite: true,
        loop: 0,
        zfb_prompt: false,
        wc_prompt: true,
        payLoading: false
      }
    },
    created () {
      Vue.http.options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
      }
      Vue.http.options.xhr = {
        withCredentials: true
      }
      Vue.http.options.emulateJSON = true
      this.$http({
        url: 'https://o2.qfpay.com/merchant/v1/profile',
        method: 'jsonp',
        data: {
//          'format': 'cors',
          'format': 'jsonp'
        }
      }).then(function (res) {
        if (res.data.respcd === '0000') {
          this.shopName = res.data.data.shopname
        } else {
          this.$router.go({name: 'login'})
        }
      })
    },
    components: {
      Keyboard, Loading
    },
    methods: {
      money () {
        this.focusValue = 1
        this.makeSure = false
        if (this.active === 0) {
          this.pay_message = '微信收款'
          this.wxBtn = true
          this.zfbBtn = false
        } else {
          this.pay_message = '支付宝收款'
          this.wxBtn = false
          this.zfbBtn = true
        }
      },
      math () {
        this.focusValue = 2
        this.show = false
        this.payStatus = '支付状态'
        this.isFailed = false
        this.success_pay = ''
        if (this.keyboardText.trim() !== '') {
          this.pay_message = '确认'
          this.makeSure = true
          this.wxBtn = false
          this.zfbBtn = false
        }
      },
      zfb_border () {
        this.reset()
        this.active = 1
        this.payType = '800108'
        this.pay_message = '支付宝收款'
        this.makeSure = false
        this.zfbBtn = true
        this.wxBtn = false
        this.zfb_prompt = true
        this.wc_prompt = false
      },
      wc_border () {
        this.active = 0
        this.payType = '800208'
        this.pay_message = '微信付款'
        this.makeSure = false
        this.zfbBtn = false
        this.wxBtn = true
        this.zfb_prompt = false
        this.wc_prompt = true
        this.reset()
      },
      changeFocus () {
        if (this.keyboardText.trim() !== '') {
          document.querySelector('.pay_math').focus()
          this.makeSure = true
          this.zfbBtn = false
          this.wxBtn = false
          this.pay_message = '确认'
          this.show = false
          this.payStatus = '支付状态'
          this.isFailed = false
          this.success_pay = ''
        }
      },
      submit () {
        if (this.keyboardText.trim() !== '' && this.keyboardText !== '0' && this.keyboardText !== '0.0' && this.keyboardText !== '0.00' && this.keyboardText !== '0.') {
          if (this.keyboardMath.trim() !== '') {
            this.keyboardMath = this.keyboardMath.replace(/\s/g, '')
            this.payLoading = true
            let _this = this
            let date = new Date()
            let nowTime = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate() + ' ' + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
            let amt
            let amtIndex = this.keyboardText.toString().indexOf('.')
            let amtArray = this.keyboardText.toString().split('.')
            // 将浮点数运算转化为整型运算
            if (amtIndex !== -1) {
              if (amtArray[1].length === 1) {
                amt = Number(amtArray[0] * 100) + Number(amtArray[1] * 10)
              } else {
                amt = Number(amtArray[0] * 100) + Number(amtArray[1])
              }
            } else {
              amt = amtArray[0] * 100
            }
            this.$http({
//              url: 'https://openapi-test.qfpay.com/trade/v1/payment',
              url: 'https://openapi.qfpay.com/trade/v1/payment',
              method: 'post',
              data: {
                'txamt': amt,
                'auth_code': this.keyboardMath,
                'txcurrcd': 'CNY',
                'txdtm': nowTime,
                'out_trade_no': 'webpay',
                'udid': 'webpay',
                'pay_type': this.payType,
                'format': 'cors'
              }
            }).then(function (res) {
              if (res.data.respcd === '0000') {
                this.show = true
                document.querySelector('.pay_input').focus()
                this.isSuccess = true
                this.$root.payStatus = '支付成功'
                this.success_pay = res.data.txamt / 100
                this.show = true
                this.isFailed = false
                this.payLoading = false
                document.querySelector('.pay_input').focus()
                this.refresh()
                this.recover()
              } else if (res.data.respcd === '1145' || res.data.respcd === '1143') {
                window.b = setInterval(() => {
                  _this.paying(res.data.syssn)
                }, 2000)
              } else {
                this.show = true
                this.isFailed = true
                this.isSuccess = false
                this.$root.payStatus = '支付失败'
                document.querySelector('.pay_input').focus()
                this.errorMessage = res.data.resperr
                this.success_pay = res.data.txamt / 100
                this.payLoading = false
                this.recover()
              }
            })
          }
        }
      },
      payMoney () {
        let payBtns = document.getElementById('payBtn')
        if (payBtns.className === 'wx-btn' || payBtns.className === 'zfb-btn') {
          if (this.keyboardText !== '') {
            this.makeSure = true
            this.wxBtn = false
            this.zfbBtn = false
            this.pay_message = '确认'
            this.noWrite = false
            this.payLoading = false
            this.keyboardVal = 0
            document.querySelector('.pay_math').focus()
          }
        } else if (payBtns.className === 'sure') {
          if (this.keyboardMath !== '') {
            this.submit()
          }
        }
      },
      exit_login () {
        this.$http({
          url: 'https://o.qfpay.com/mchnt/user/logout',
          method: 'get',
          data: {
            'format': 'cors'
          }
        }).then(function (res) {
          if (res.data.respcd === '0000') {
            this.$router.go({name: 'login'})
          }
        })
      },
      refresh () {
        this.$http({
          url: 'https://o2.qfpay.com/trade/v1/tradelist',
          method: 'jsonp',
          data: {
            'format': 'jsonp',
            'busicd': '800201,800207,800208,800101,800107,800108',
            'len': 3,
            'fix': 1,
            'stat': 0,
            'respcd': '0000'
          }
        }).then(function (res) {
          if (res.data.respcd === '0000') {
            if (res.data.data.tradelist.body !== '') {
              let numI
              let numJ
              let tradelistHead = res.data.data.tradelist.head
              let tradelistBody = res.data.data.tradelist.body
              let a = {}
              this.account_orderList = []
              for (numI = 0; numI < tradelistBody.length; numI++) {
                for (numJ = 0; numJ < tradelistBody[numI].length; numJ++) {
                  a[tradelistHead[numJ]] = tradelistBody[numI][numJ]
                }
                this.account_orderList.push(a)
                a = {}
              }
            } else {
              this.noData = !this.noData
            }
          }
        })
      },
      paying (syssn) {
        this.$http({
          url: 'https://o2.qfpay.com/trade/v1/tradeinfo',
          method: 'jsonp',
          data: {
            'syssn': syssn,
            'format': 'jsonp'
          }
        }).then(function (response) {
          if (response.data.respcd === '0000') {
            let headKeys = response.data.data.tradeinfo.head
            let bodyValue = response.data.data.tradeinfo.body
            let newValues = []
            let i
            for (i = 0; i < headKeys.length; i++) {
              newValues[headKeys[i]] = bodyValue[0][i]
            }
            if (newValues.respcd === '0000') {
              this.payLoading = false
              this.$root.payStatus = '支付成功'
              document.querySelector('.pay_input').focus()
              this.success_pay = newValues.txamt / 100
              this.show = true
              this.isSuccess = true
              this.isFailed = false
              this.show = true
              this.refresh()
              this.recover()
              window.clearInterval(window.b)
            } else {
              this.loop += 1
              this.payLoading = true
              if (this.loop === 15) {
                window.clearInterval(window.b)
                this.payLoading = false
                this.show = true
                this.isFailed = true
                this.isSuccess = false
                this.$root.payStatus = '支付失败'
                document.querySelector('.pay_input').focus()
                this.errorMessage = newValues.resperr
                this.success_pay = newValues.txamt / 100
                this.show = true
                this.recover()
              }
            }
          }
        })
      },
      reset () {
        this.show = true
        document.querySelector('.pay_input').focus()
        this.keyboardText = ''
        this.keyboardMath = ''
        this.refresh()
//        this.active = 0
//        this.makeSure = false
//        this.wxBtn = true
//        this.pay_message = '微信收款'
//        this.payType = '800208'
      },
      recover () {
        if (this.active === 0) {
          this.pay_message = '微信收款'
          this.makeSure = false
          this.zfbBtn = false
          this.wxBtn = true
          this.keyboardText = ''
          this.keyboardMath = ''
        } else {
          this.pay_message = '支付宝收款'
          this.makeSure = false
          this.wxBtn = false
          this.zfbBtn = true
          this.keyboardText = ''
          this.keyboardMath = ''
        }
      },
      transCode (key) {
        switch (key) {
          case 'NumpadDecimal' : return '.'
          case 'Period' : return '.'
          default : return key.charAt(key.length - 1)
        }
      },
      changeMathInput (e) {
        if (e.keyCode > 47 && e.keyCode < 58 || (e.keyCode > 95 && e.keyCode < 106)) {
          e.preventDefault()
          this.keyboardMath = this.keyboardMath.replace(/\D/g, '').replace(/....(?!$)/g, '$& ')
          this.keyboardMath += this.transCode(e.code)
        } else if (e.keyCode !== 13 && e.keyCode !== 108 && e.keyCode !== 8 && e.keyCode !== 37 && e.keyCode !== 39) {
          e.preventDefault()
        }
      },
      changeMoneyInput (e) {
        if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106)) {
          e.preventDefault()
          let kt = this.keyboardText.indexOf('.')
          let kl = this.keyboardText.length
          if (kl > 0 && this.keyboardText.indexOf('0') === 0) {
            if (kt !== 1) {
              this.keyboardText = this.transCode(e.code)
              return
            }
          }
          if (kt !== -1) {
            if (kt + 3 === kl) return
          } else {
            if (kl === 5) return
          }
          this.keyboardText += this.transCode(e.code)
        } else if (e.keyCode === 110 || e.keyCode === 190) {
          if (this.keyboardText.trim() === '') {
            e.preventDefault()
            this.keyboardText = '0.'
          } else if (this.keyboardText.match(/\.+?/g)) {
            e.preventDefault()
          }
        } else if (e.keyCode !== 13 && e.keyCode !== 108 && e.keyCode !== 8 && e.keyCode !== 37 && e.keyCode !== 39) {
          e.preventDefault()
        }
      }
    },
    ready () {
      this.refresh()
    }
  }
</script>
