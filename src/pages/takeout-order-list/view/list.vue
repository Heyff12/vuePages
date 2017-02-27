<template>
  <div v-if="order_list.length !== 0" class="com-content-box">
    <ul>
      <li v-for="item in order_list" class="main-box">
        <a class="list-box" @click="orderId(item)">
          <div class="list-title-box font-34">
            <p class="font-26 color-light">下单时间 今日 {{item.ctime | formatTime "yyyy-MM-dd hh:mm:ss"}}</p>
            <div class="text-right"><p class="color-orange font-40">{{item.order_sn}}</p></div>
          </div>
          <div class="list-content-box">
            <div class="information-box">
              <div class="color-weight font-34">
                <div>
                  <p>{{item.addr_info.detail_addr}}</p>
                  <p>{{item.addr_info.contact_name}} {{item.addr_info.mobile}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="list-content-box-2">
            <div class="information-box">
              <div class="font-28 color-light">
                <p>{{item.name}}</p>
                <p v-if="item.note !== ''" class="list-tip">备注</p>
              </div>
              <div class="font-28 color-light ">
                <p v-if="item.order_state === 2" class="order-state-true">已支付</p>
                <p v-if="item.order_state === 3" class="order-state-false">已撤销</p>
                <span class="order-price font-28">总计: <span class="font-26">￥</span>{{item.amt | formatCurrency}}</span>
              </div>
            </div>
            <div class="arrow"></div>
          </div>
        </a>
        <div class="list-btn">
          <div class="font-30 color-orange" @click="print(item.order_id)">
            <span class="print">打印小票</span>
          </div>
          <div @click="changeState(item.order_id)">
          <!--<div @click="removeListItem(item.order_id)">-->
            <p class="accept">{{routeInfo.acceptCopy}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-show="no_data" class="no-data">
    <div class="no-data-con">
      <img src="../../../assets/no_data.png" alt="">
      <p>暂无数据</p>
    </div>
  </div>
  <div id="loading" v-show="loading">
    <loading :visible="loading"></loading>
  </div>
  <toast :msg.sync="msg"></toast>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .calendar-position{
    top: 70px;
  }
  .date{
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    background: #f7f7f7;
    padding-top: 10px;
    font-size: 34px;
    color: #2F323A;
    text-align: center;
    line-height: 60px;
    .arrow{
      margin-left: 15px;
      margin-bottom: 7px;
      display: inline-block;
      width: 20px;
      height: 20px;
      border: solid #FF8100;
      border-width: 0 4px 4px 0;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  .total-info-wrap{
    margin-top: 70px;
    font-size: 30px;
    color: #8A8C92;
    line-height: 90px;
    display: flex;
    align-items: center;
    .total-info{
      flex: 1;
      padding-left: 30px;
      span{
        color: #2F323A;
      }
    }
    .print-total{
      width: 232px;
      height: 64px;
      line-height: 64px;
      border: 2px solid #FF8100; /*px*/
      border-radius: 6px;
      margin-right: 30px;
      text-align: center;
      >p{
        color: #FF8100;
      }
    }
  }
  #loading{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .com-content-box{
    background: #f7f7f7;
    padding-bottom: 100px;
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
    color: #A7A9AE;
  }
  .color-orange{
    color: #FF8100;
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
  .font-34{
    font-size: 34px;
  }
  .font-40{
    font-size: 40px;
  }
  .font-44{
    font-size: 44px;
  }

  .main-box{
    margin-top: 30px;
    position: relative;
    .list-box{
      display: inline-flex;
      width: 100%;
      flex-direction: column;
      border-top: 4px solid #FF8100;
      padding: 18px 0 0 30px;
      text-decoration: none;
      background: #ffffff;
      .list-title-box{
        display: flex;
        margin-bottom: 30px;
        padding-right: 30px;
        p {
          vertical-align: bottom;
          align-self: flex-end;
        }
        >div{
          flex: 1;
        }
      }
      .list-content-box-2{
        position: relative;
        margin-top: 18px;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        padding-bottom: 16px;
        padding-right: 30px;
        border-bottom:0.03rem solid #E5E5E5 ;
      }
      .list-content-box{
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        padding-bottom: 16px;
        padding-right: 30px;
        border-bottom:0.03rem solid #E5E5E5 ;
      }
      .arrow{
        position: absolute;
        top: 25px;
        right: 35px;
        width: 25px;
        height: 25px;
        border: solid #A7A9AE;
        border-width: 0 4px 4px 0;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
      .information-box{
        flex: auto;
        display: flex;
        flex-direction: column;
        >div{
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          p{
            align-self: baseline;
          }
          .div-flex{
            flex: 1;
          }
          .list-tip{
            margin-left: 34px;
            background: #FFFAF4;
            width: 72px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 24px;
            color: #FF8100;
            border: 0.03rem dashed #FF8100;
            border-radius: 6px;
          }
          &:first-child{
            margin-top: -3px;
          }
          &:nth-child(2){
            margin-top: 13px;
          }
          &:nth-child(3){
            margin-top: -5px;
          }
          .order-state-false{
            margin-left: 28px;
            position: relative;
            align-self: baseline;
            &:before{
              display: block;
              content: '';
              position: absolute;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              top: 10px;
              left: -22px;
              background: #FD5359;
            }
          }
          .order-state-true{
            margin-left: 28px;
            position: relative;
            align-self: baseline;
            &:before{
              display: block;
              content: '';
              position: absolute;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              top: 10px;
              left: -22px;
              background: #7ED321;
            }
          }
          .order-price{
            align-self: baseline;
            margin-left: 44px;
          }
        }
      }
    }
    .list-btn{
      width: 100%;
      padding: 0 30px;
      height: 108px;
      background: #ffffff;
      display: flex;
      >div {
        flex: 1;
      }
      .print{
        position: relative;
        padding-left: 50px;
        line-height: 108px;
        &:before {
          display: block;
          position: absolute;
          top: 0;
          content: '';
          width: 34px;
          height: 34px;
          background: url("../assets/ic_print.png") center center no-repeat;
          background-size: 100% 100%;
        }
      }
      .accept {
        display: inline-block;
        width: 200px;
        height: 68px;
        text-align: center;
        line-height: 68px;
        font-size: 34px;
        color: #FF8100;
        border: 0.03rem solid #FF8100;
        border-radius: 6px;
        float: right;
        margin-top: 20px;
      }
    }
  }

  .no-data{
    width: 750px;
    height: 1334px;
    position: relative;
    .no-data-con{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 500px;
      width: 360px;
      img{
        display: block;
        height: 446px;
        width: 360px;
      }
      p{
        font-size: 30px;
        color: #7b7b7b;
        text-align: center;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import config from '../../../methods/config'
  import loading from '../../../components/loading/loading.vue'
  import toast from '../../../components/tips/toast.vue'
  import '../../../methods/filters'
  import bridge from '../../../methods/bridge'
  export default {
    components: {
      loading,
      toast
    },
    data () {
      return {
        order_list: [],
        first_page: '',
        loading: false,
        page: 1,
        msg: '',
        no_data: false,
        count_info: {}
      }
    },
    computed: {
      routeInfo () {
        switch (this.$route.path) {
          case '/preparation':
            return {
              deliveryState: 1,
              acceptCopy: '配送',
              expectState: 2
            }
          case '/distribution':
            return {
              deliveryState: 2,
              acceptCopy: '完成',
              expectState: 3
            }
          case '/completion':
            return {
              deliveryState: 3,
              acceptCopy: ''
            }
          default:
            return {
              deliveryState: 0,
              acceptCopy: '接单',
              expectState: 1
            }
        }
      }
    },
    events: {
      'handle-date' (val) {
        this.dateTime = new Date(val).getTime()
        this.order_list = []
        this.page = 1
        this.no_data = false
        this.getData()
      }
    },
    route: {
      data: function (transition) {
        var _this = this
        if (transition.from.name === 'detail') {
          console.log('detail回来')
          transition.next()
          _this.$nextTick(function () {
            window.document.body.scrollTop = window.sessionStorage.scrollTop
          })
        } else {
          console.log('tab回来')
          transition.next()
          _this.$nextTick(function () {
            _this.init()
            if (!_this.first_page) {
              _this.first_page = 1
              _this.getData()
            }
            window.sessionStorage.scrollTop = 0
            window.document.body.scrollTop = 0
          })
        }
        window.addEventListener('scroll', _this.getScrollData, false)
      },
      deactivate: function (transition) {
        var _this = this
        window.removeEventListener('scroll', _this.getScrollData, false)
        window.sessionStorage.scrollTop = window.document.body.scrollTop
        transition.next()
      }
    },
    created () {
    },
    methods: {
      init () {
        this.$set('order_list', [])
        this.first_page = ''
        this.loading = false
        this.page = 1
        this.msg = ''
        this.no_data = false
      },
      setData (res) {
        let _this = this
        if (res.respcd === '0000') {
          _this.loading = false
          if (_this.page === 1) {
            _this.$set('order_list', res.data.order_info)
          } else {
            _this.$set('order_list', _this.order_list.concat(res.data.order_info))
          }
          if (_this.order_list.length === 0) {
            _this.no_data = true
          }
          if (res.data.order_info.length === 0) {
            _this.$set('msg', '没有更多了...')
          }
          _this.$set('page', res.data.next_page)
          _this.$set('count_info', res.data.count_info)
          _this.$dispatch('handle-count', _this.count_info)
        } else if (res.respcd === '2300') {
          _this.msg = '没有更多了...'
        } else {
          _this.msg = res.resperr
        }
      },
      getData () {
        let data = {
          page: this.page,
          format: 'jsonp',
          delivery_state: this.routeInfo.deliveryState
        }
        this.loading = true
        bridge.request({
          url: config.o_host + 'diancan/mchnt/deliveryorder_list',
//          url: 'http://172.100.111.215:9300/diancan/mchnt/deliveryorder_list',
          method: 'JSONP',
          data: data,
          callback: this.setData
        })
      },
      getScrollData () {
        var _this = this
        if ((window.document.body.offsetHeight + window.document.body.scrollTop) + 100 > window.document.body.scrollHeight && !_this.loading) {
          _this.getData()
        }
      },
      orderId (item) {
        window.sessionStorage.state = JSON.stringify(item.order_state)
        window.sessionStorage.orderId = JSON.stringify(item.order_id)
        this.$router.go({name: 'detail', params: {orderId: item.order_id}})
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
              _this.msg = '打印成功'
            } else {
              _this.msg = res.resperr
            }
          }
        })
      },
      changeState (id) {
        let _this = this
        let data = {
          order_id: id,
          delivery_state: this.routeInfo.expectState
        }
        _this.loading = true
        bridge.request({
          url: config.o_host + 'diancan/mchnt/modify_delivery_state',
//          url: 'http://172.100.111.215:9300/diancan/mchnt/deliveryorder_list',
          method: 'POST',
          data: data,
          callback: function (res) {
            if (res.respcd === '0000') {
              _this.loading = false
              _this.removeListItem(id)
              _this.changeNum()
            }
          }
        })
      },
      removeListItem (id) {
        let _this = this
        for (let i in _this.order_list) {
          if (_this.order_list[i].order_id === id) {
            console.log(_this.order_list[i].order_id)
            _this.order_list.splice(i, 1)
          }
          if (_this.order_list.length === 0) {
            _this.no_data = true
          }
        }
      },
      changeNum () {
        let _this = this
        switch (this.$route.path) {
          case '/preparation':
            _this.count_info.making_order_count -= 1
            _this.count_info.deliverying_order_count += 1
            _this.$dispatch('handle-count', _this.count_info)
            break
          case '/distribution':
            _this.count_info.deliverying_order_count -= 1
            _this.count_info.done_order_count += 1
            _this.$dispatch('handle-count', _this.count_info)
            break
          case '/completion':
            break
          default:
            _this.count_info.new_order_count -= 1
            _this.count_info.making_order_count += 1
            _this.$dispatch('handle-count', _this.count_info)
            break
        }
      }
    }
  }
</script>
