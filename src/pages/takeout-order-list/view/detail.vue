<template>
  <div class="detail-all-box">
    <p class="detail-p color-light font-26">订单明细</p>
    <div class="detail-box">
      <div class="detail-title">
        <div class="detail-name">
          <span class="color-orange font-40">{{orderinfo.order_sn}}</span>
          <span class="color-orange font-28">外卖订单</span>
        </div>
        <div>
          <p v-if="state === 3" class="color-gray font-30 detail-state-false">已撤销</p>
          <p v-if="state === 2" class="color-gray font-30 detail-state-true">已支付</p>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="item in goodsList" class="detail-list-box">
        <p class="color-light font-24 detail-list-title">{{item.cate}}</p>
        <div v-for="subItem in item.goods" class="detail-list-sub">
          <div>
            <p class="color-weight font-32 ">{{subItem.name}}</p>
            <p  class="color-gray font-24 ">{{subItem.spec_name}}</p>
          </div>
          <p class="color-weight font-34 text-right"><span class="font-26">￥</span>{{subItem.txamt | formatCurrency}} <span class="font-26 color-light">× {{subItem.count}}</span></p>
        </div>
      </li>
      <div class="detail-total-box">
        <div class="detail-fee">
          <div>
            <p class="color-weight font-32 ">配送费</p>
          </div>
          <p class="color-weight font-34 text-right"><span class="font-26">￥</span>{{shippingFee | formatCurrency}}</p>
        </div>
        <div class="detail-list-total">
          <p class="color-weight font-32 ">总计</p>
          <p class="font-40 text-right"><span class=" font-30">￥</span>{{txamt | formatCurrency}}</p>
        </div>
        <div v-if="note !== ''" class="color-light font-30 detail-tip-box">
          <p class="detail-tip-title">备注</p>
          <p class="detail-tip font-30">{{note}}</p>
        </div>
      </div>
    </ul>
    <p class="order-info-title font-26 color-light">订单信息</p>
    <div class="order-info-wrap">
      <li class="order-info">
        <p class="color-light font-28">配送地址</p>
        <p class="color-weight font-28">{{orderinfo.customer_info.detail_addr}}<br/>{{orderinfo.customer_info.contact_name}} {{orderinfo.customer_info.mobile}}</p>
      </li>
      <li class="order-info">
        <p class="color-light font-28">订单编号</p>
        <p class="color-weight font-28">{{orderinfo.syssn}}</p>
      </li>
      <li class="order-info">
        <p class="color-light font-28">购买时间</p>
        <p class="color-weight font-28">{{orderinfo.pay_time | formatTime "yyyy-MM-dd hh:mm:ss"}}</p>
      </li>
      <li class="order-info">
        <p class="color-light font-28">支付方式</p>
        <p class="color-weight font-28 wechat">微信支付</p>
      </li>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  body{
    background: #f7f7f7;
  }
  .detail-total-box{
    padding: 30px 0 30px 0;
    border-top: 2px solid #E5E5E5; /*px*/
    .detail-fee {
      display: flex;
      flex-direction: row;
      padding-right: 30px;
      margin-bottom: 15px;
      >p,div {
        flex: 1;
      }
    }
  }
  .detail-list-total{
    padding: 0 30px 20px 0;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    align-items: baseline;
    >p{
      flex: auto;
    }
  }
  .detail-all-box{
    padding-bottom: 118px;
    >ul{
      padding-left: 30px;
      list-style: none;
      background: #ffffff;
    }
  }
  .detail-p{
    padding-left: 30px;
    height: 70px;
    line-height: 70px;
    background: #f7f7f7;
    border-bottom: 0.03rem solid #E5E5E5;
  }
  .detail-box{
    padding-left:30px;
    background: #ffffff;
    .detail-title{
      display: flex;
      height: 72px;
      line-height: 72px;
      flex-direction: row;
      border-bottom: 0.03rem solid #E5E5E5;
      >div{
        flex: auto;
      }
      .detail-state-false{
        float: right;
        margin-right: 30px;
        margin-left: 44px;
        position: relative;
        &:before{
          display: block;
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          top: 20px;
          left: -40px;
          background: #FF8100;
        }
      }
      .detail-state-true{
        float: right;
        margin-left: 44px;
        margin-right: 30px;
        position: relative;
        &:before{
          display: block;
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          top: 20px;
          left: -40px;
          background: #7ED321;
        }
      }
    }
    .detail-name {
      >:nth-child(2) {
        margin-left: 18px;
      }
    }
  }
  .detail-list-box{
    padding: 16px 0 0 0;
    background: #ffffff;
    .detail-list-title{
    }
    .detail-list-sub{
      margin: 24px 0;
      padding: 0 30px 0 0;
      display: flex;
      align-items: center;
      >p{
        flex: auto;
      }
    }
  }
  .detail-tip-box{
    width: 690px;
    padding: 20px;
    border: 2px dashed #FF8100;
    border-radius: 6px;
    word-wrap:break-word ;
    background: #FFFAF4;
    position: relative;
    padding-bottom: 30px;
    .detail-tip-title {
      font-size: 30px;
      color: #FF8100;
      position: absolute;
    }
    .detail-tip{
      padding-left: 90px;
      width: 650px;
      line-height: 1.3;
    }
  }
  .order-info-title{
    background: #f7f7f7;
    height: 68px;
    line-height:68px;
    padding:0 30px;
    border-top: 2px solid #E5E5E5; /*px*/
    border-bottom: 2px solid #E5E5E5; /*px*/
  }
  .order-info-wrap{
    background: #ffffff;
    padding-left: 30px;
    .order-info {
      display: flex;
      flex-direction: row;
      padding: 20px 30px 20px 0;
      border-bottom: 2px solid #e5e5e5; /*px*/
      >:nth-child(1) {
        width: 140px;
      }
      >p{
        word-wrap:break-word;
      }
      &:last-child {
        border: none;
      }
      .wechat{
        padding-left: 50px;
        position: relative;
        &:before {
          display: block;
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 38px;
          height: 36px;
          background: url("../assets/ic_wechat.png") center center no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    >li{
      list-style: none;
    }
  }
  .print-btn{
    position: fixed;
    bottom: 0;
    width: 750px;
    height: 88px;
    text-align: center;
    line-height: 88px;
    background: #f7f7f7;
    >a{
      display: block;
      height: 76px;
      width: 690px;
      margin: 0 auto;
      text-decoration: none;
      border: 2px solid #FF8100; /*px*/
      background: #f7f7f7;
      text-align: center;
      line-height: 76px;
    }
  }

  .margin-10{
    margin-top: 10px;
  }
  .margin-14{
    margin-top: 14px;
  }
  .text-right{
    text-align: right;
  }
  .color-title{
    color: #606470;
  }
  .color-weight{
    color: #2F323A;
  }
  .color-light{
    color: #8A8C92;
  }
  .color-orange{
    color: #FF8100;
  }
  .color-white{
    color: #ffffff;
  }
  .color-gray{
    color: #A7A9AE;
  }
  .font-24{
    font-size: 24px;
  }
  .font-26{
    font-size: 26px;
  }
  .font-28{
    font-size: 28px;
  }
  .font-30{
    font-size: 30px;
  }
  .font-32{
    font-size: 32px;
  }
  .font-34{
    font-size: 34px;
  }
  .font-40{
    font-size: 40px;
  }
  .font-44{
    font-size: 44px;
  }

</style>
<script>
  import config from '../../../methods/config'
  import '../../../methods/filters'
  import bridge from '../../../methods/bridge'

  export default {
    data () {
      return {
        note: '',
        txamt: 0,
        orderinfo: {
          address: '',
          note: ''
        },
        goodsList: [],
        orderId: '',
        state: '',
        orderSn: '',
        shippingFee: 0
      }
    },
    created () {
//      this.getDetails()
    },
    route: {
      activate: function (transition) {
        var _this = this
        console.log(this.$route)
        _this.orderId = this.$route.params.orderId
        _this.state = JSON.parse(window.sessionStorage.state)
        transition.next()
        _this.getDetails()
        _this.$nextTick(function () {
          window.document.body.scrollTop = 0
        })
        window.addEventListener('scroll', _this.getScrollData, false)
      },
      deactivate: function (transition) {
        var _this = this
        _this.init()
        transition.next()
        window.removeEventListener('scroll', _this.getScrollData, false)
      }
    },
    methods: {
      setData (res) {
        this.$set('note', res.data.orderinfo.note)
        this.$set('txamt', res.data.orderinfo.txamt)
        this.$set('orderinfo', res.data.orderinfo)
        this.$set('goodsList', res.data.goods_list)
        this.$set('shippingFee', res.data.orderinfo.shipping_fee)
      },
      getDetails () {
        let _this = this
        let data = {
          order_id: _this.orderId,
          format: 'jsonp'
        }
        bridge.request({
          url: config.o_host + 'diancan/mchnt/order_detail',
//          url: 'http://172.100.111.215:9300/diancan/mchnt/order_detail',
          method: 'JSONP',
          data: data,
          callback: this.setData
        })
      },
      init () {
        this.$set('note', '')
        this.$set('txamt', 0)
        this.$set('orderinfo', {})
        this.$set('goodsList', [])
      }
    }
  }
</script>
