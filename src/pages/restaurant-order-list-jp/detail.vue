<template>
  <div class="detail-all-box">
    <div class="detail-box">
      <div class="detail-title">
        <p v-if="state === 3" class="color-gray font-30 detail-state-false">取消済み</p>
        <p v-if="state === 2" class="color-gray font-30 detail-state-true">決済済み</p>
      </div>
      <div class="qucan-id-wrap">
        <p class="color-gray font-30">注文番号：<span class="color-weight font-44">{{orderinfo.order_sn}}</span></p>
        <p class="color-orange font-44 text-right">{{orderinfo.address}}テーブル</p>
      </div>
    </div>
    <ul>
      <li v-for="item in goods_list" class="detail-list-box">
        <p class="color-light font-30 detail-list-title">{{item.cate}}</p>
        <div v-for="subItem in item.goods" class="detail-list-sub">
          <div>
            <p class="color-weight font-30 ">{{subItem.name}}</p>
            <p v-if="subItem.spec_name" class="color-gray font-26 ">{{subItem.spec_name}}</p>
          </div>
          <p class="color-light font-34 text-right"><span class="font-26">￥</span>{{subItem.txamt | formatCurrency}} <span class="font-26">× {{subItem.count}}</span></p>
        </div>
      </li>
      <div class="detail-total-box">
        <div class="detail-list-total">
          <p class="color-weight font-34 ">合計金額</p>
          <p class="color-orange font-40 text-right"><span class="color-orange font-30">￥</span>{{orderinfo.txamt | formatCurrency}}</p>
        </div>
      </div>
    </ul>
    <div v-if="note" class="color-light font-30 detail-tip-box">
      <p>備考</p>
      <p class="detail-tip">{{note}}</p>
    </div>
    <div class="order-info-wrap">
      <p class="color-gray font-30 margin-14">注文番号：{{orderinfo.order_id}}</p>
      <p class="color-gray font-30 margin-14">購入日付：{{orderinfo.pay_time | formatTime "yyyy-MM-dd hh:mm:ss"}}</p>
      <p class="color-gray font-30 margin-14">取引番号：{{orderinfo.syssn}}</p>
    </div>
  </div>
  <div class="print-btn">
    <a @click="print(orderId)" class="list-btn font-30 color-orange">レシート印刷</a>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  body{
    background: #f7f7f7;
  }
  .detail-total-box{
    padding: 30px 0 0 30px;
  }
  .detail-list-total{
    padding: 0 30px 30px 0;
    border-bottom: 2px solid #E5E5E5; /*px*/
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    align-items: baseline;
    >p{
      flex: auto;
    }
  }
  .detail-all-box{
    padding-bottom: 88px;
  }
  .detail-box{
    padding: 30px 30px 10px 30px;
    /*background: #2F323A;*/
    display: flex;
    flex-direction: column;
    .detail-title{
      display: flex;
      flex-direction: row;
      >p{
        flex: auto;
      }
      .detail-state-false{
        margin-left: 44px;
        position: relative;
        &:before{
          display: block;
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          top: 7px;
          left: -40px;
          background: #FF8100;
        }
      }
      .detail-state-true{
        margin-left: 44px;
        position: relative;
        &:before{
          display: block;
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          top: 7px;
          left: -40px;
          background: #7ED321;
        }
      }
    }
    .qucan-id-wrap{
      width: 690px;
      padding: 35px 30px 30px 22px;
      display: flex;
      border: 2px solid #FF8100; /*px*/
      border-radius: 8px;
      margin-top: 30px;
      background: #ffffff;
      >p{
        flex: 1;
      }
    }
  }
  .detail-list-box{
    padding: 30px 0 0 30px;
    .detail-list-title{
      margin-bottom: 12px;
    }
    .detail-list-sub{
      padding: 30px 30px 30px 0;
      border-bottom: 2px solid #E5E5E5; /*px*/
      display: flex;
      align-items: center;
      >p{
        flex: auto;
      }
    }
  }
  .detail-tip-box{
    padding: 30px 30px 0 30px;
    .detail-tip{
      margin-top: 36px;
      padding: 30px;
      background: #EFEFEF;
    }
  }
  .order-info-wrap{
    padding: 30px;
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
  .font-26{
    font-size: 26px;
  }
  .font-30{
    font-size: 30px;
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
  import config from '../../methods/config'
  import '../../methods/filters'
  import bridge from '../../methods/bridge'

  export default {
    data () {
      return {
        note: '',
        orderinfo: {
          address: '',
          note: ''
        },
        goods_list: [],
        orderId: '',
        state: ''
      }
    },
    created () {
      this.getDetails()
    },
    route: {
      activate: function (transition) {
        var _this = this
        _this.orderId = JSON.parse(window.sessionStorage.orderId)
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
        this.$set('orderinfo', res.data.orderinfo)
        this.$set('goods_list', res.data.goods_list)
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
        this.$set('goods_list', [])
      },
      print (id) {
        let _this = this
        let data = {
          order_id: id,
          format: 'jsonp'
        }
        bridge.request({
          url: config.o_host + 'diancan/mchnt/printorder',
          method: 'JSONP',
          data: data,
          callback: function (res) {
            if (res.respcd === '0000') {
              _this.msg = '印刷成功'
            } else {
              _this.msg = res.resperr
            }
          }
        })
      }
    }
  }
</script>
