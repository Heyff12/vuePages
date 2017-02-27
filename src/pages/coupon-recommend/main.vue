<template>
  <div id="qf-container" class="p-coupon-recommend">
    <div class="p-coupon-recommend_view">
      <div class="img_box">
        <img src="assets/img_1.png"/>
      </div>
      <div class="coupon-info m-b-28"><div>输入单个红包金额和你店铺的客单价，根据红包金额／客单价的比例，为你推荐真实红包案例！</div></div>

      <!--<border-dashed-box class="m-b-28">-->
        <!--<div class="coupon-info2">输入单个红包金额和你店铺的客单价，根据红包金额／客单价的比例，为你推荐真实红包案例！</div>-->
      <!--</border-dashed-box>-->

      <div class="l-r input">
        <div>红包金额</div>
        <div class="l_auto"><input type="tel" v-model="coupon_amount" maxlength="6" onkeyup='this.value=this.value.replace(/\D/gi,"")' placeholder=""><span>{{coupon_amount ? '元' : ''}}</span></div>
      </div>
      <div class="l-r input">
        <div>店铺客单价</div>
        <div class="l_auto"><input type="tel" v-model="use_amount" maxlength="10" onkeyup='this.value=this.value.replace(/\D/gi,"")' placeholder="">{{use_amount ? '元' : ''}}</div>
      </div>

      <button class="c-btn search-btn" @click.stop="search">查询</button>
    </div>

    <toast :msg.sync="toast_msg"></toast>

    <loading :visible="visibleLoading"></loading>

    <!--没有案例-->
    <dialog :visible="visibleDialog" ok-text="我知道了">还没有商户设置这样的红包换一个金额试试吧</dialog>

    <!--有案例-->
    <modal-view :coupon="coupon" :visible="visibleResult" :action="backView"></modal-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import bridge from '../../methods/bridge'
  import dialog from '../../components/dialog/dialogMask'
  import mask from '../../components/mask'
  import toast from '../../components/tips/toast'
  import loading from '../../components/loading/juhua'
  import borderDashedBox from '../../components/container/borderDashed'
  import modalView from './modalView'

  export default {
    components: {
      dialog, loading, toast, mask, borderDashedBox, modalView
    },
    data () {
      return {
        visibleLoading: false,
        visibleDialog: false,
        visibleResult: false,
        toast_msg: '',
        coupon_amount: null, // 红包金额
        use_amount: null,    // 使用金额
        coupon: {}
      }
    },
    methods: {
      search () {
        if (this.visibleLoading) {
          this.toast_msg = '请求中！'
          return
        }
        let couponAmount = parseFloat(this.coupon_amount || 0)
        let useAmount = parseFloat(this.use_amount || 0)
        if (couponAmount <= 0) {
          this.toast_msg = '请输入正确的红包金额金额！'
          return
        }

        if (useAmount <= 0) {
          this.toast_msg = '请输入正确的人均消费金额！'
          return
        }

        let data = {
          format: 'jsonp',
          coupon_amt_per: parseInt(couponAmount / useAmount * 10000)
        }
        if (data.coupon_amt_per >= 10000) {
          this.toast_msg = '还没有商户设置这样的红包，换一个试试吧！'
          return
        }
        this.visibleLoading = true
        bridge.request({
          // url: 'http://172.100.101.106:9000/v1/mkw/coupon_story',
          url: 'https://marketing.qfpay.com/v1/mkw/coupon_story',
          method: 'JSONP',
          data: data,
          callback: this.setData
        })
      },
      setData (response) {
        this.visibleLoading = false
        let data = response
        if (data.respcd !== '0000') {
          this.toast_msg = data.resperr
          console.error(data.resperr)
          return
        }
        if (!data.data.expire_time) {
          this.visibleDialog = true
          return
        }
        this.$set('coupon', data.data)
        this.coupon.continued = (parseInt(this.coupon.expire_time) - parseInt(this.coupon.start_time)) * 100
        this.visibleResult = true
      },
      closeDialog () {
        this.visibleDialog = false
      },
      backView () {
        bridge.backView()
      }
    },
    events: {
      onOk () {
        console.log('onOk')
        this.closeDialog()
      },
      onClickMask () {
        console.log('onClickMask')
        this.closeDialog()
      },
      onModal1Close () {
        console.log('onModal1Close')
        this.visibleResult = false
      }
    }
  }
</script>

<style lang="scss" type="scss" rel="stylesheet/scss">

  @import "../../styles/main";

  /*fix Font Boosting*/
  p, div {
    max-height: 999999px;
  }

  /*body {*/
    /*height: initial;*/
    /*padding: 30px;*/
    /*background-color: #D54837;*/
  /*}*/

  #qf-container {
    height: initial;
    padding: 30px;
    background-color: #D54837;
  }

  .m-b-28 {
    margin-bottom: 28px !important;
  }

  .c-btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    /*border: 2px solid transparent;*/
    border: none;
    white-space: nowrap;
    line-height: 1.5;
    padding: 4px 15px;
    border-radius: 6px; /*px*/
    user-select: none;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transform: translate3d(0, 0, 0);
    /*color: #666;*/
    /*background-color: #f4f4f4;*/
    /*border-color: #d9d9d9;*/
  }
  .c-btn {
    width: 100%;
    height: 88px;
    font-size: 34px;  /*px*/
  }

  .search-btn {
    background-color: #FFF467;
    color: #D54837;
  }

  .p-coupon-recommend_view {
    .img_box {
      margin: 0 auto;
      margin-top: 44px;
      margin-bottom: 40px;
      width: 400px;
      height: 377px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    /*.coupon-info {
      position: relative;
      margin-bottom: 28px;
      padding: 2px; !*px*!
      font-size: 30px; !*px*!
      !*border: 2px dashed #952114; !*px*!*!
      border-radius: 8px; !*px*!
      text-align: center;
      color: #fff;

      &:before {
        content: '';
        position: absolute;
        display: block;
        width: 50%;
        height: 50%;
        top: 50%;
        left: 50%;
        border: 2px dashed #952114; !*px*!
        transform: scale(2);
        transform: translate(-50%, -50%) scale(2, 2);
        border-radius: 8px; !*px*!
      }
      div {
        padding: 24px 56px;
        border-radius: 8px; !*px*!
        background: #AB3324;
      }
    }*/
    .coupon-info {
      /*margin-bottom: 28px;*/
      /*padding: 1px; !*px*!*/
      font-size: 30px; /*px*/
      border: 4px dashed #952114; /*px*/
      border-radius: 8px; /*px*/
      text-align: center;
      color: #fff;

      div {
        margin: -2px; /*px*/
        padding: 24px 56px;
        border-radius: 8px; /*px*/
        background: #AB3324;
      }
    }
    .coupon-info2 {
      width: 100%;
      height: 100%;
      padding: 24px 56px;
      font-size: 30px; /*px*/
    }
    .input {
      margin-bottom: 28px;
      padding: 0 20px;
      height: 88px;
      background: #FFFFFF;
      border-radius: 6px; /*px*/

      font-size: 34px;  /*px*/

      div:nth-child(1) {
        width: 180px;
        line-height: 88px;
        /*font-size: 34px;  !*px*!*/
        color: #D54837;
      }
      div:nth-child(2) {
        /*height: 88px;*/
        line-height: 88px;
        text-align: right;
        color: #606470;
        display: flex;
      }
      input {
        padding: 20px 0;
        display: inline-block;
        flex: 1;
        line-height: 1;
        /*width: 100%;*/
        border: 0;
        text-align: right;
        /*font-size: 28px;  !*px*!*/
        outline: none;
        /*color: #606470;*/
        /*font-size: 52px;  !*px*!*/
      }
    }
  }

</style>
