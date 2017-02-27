<template>
  <div class="com-content-box">
    <div @click="calendar" class="date">
      <p>{{dateTime | formatTime "yyyy年MM月dd日"}}<i class="arrow"></i></p>
    </div>

    <div v-if="!no_data" class="total-info-wrap">
      <p class="total-info">共 <span>{{summary_info.summary_count}}</span> 笔，<span>{{summary_info.summary_amt | formatCurrency}}</span> 元</p>
    </div>
    <ul>
      <li v-for="item in order_list" class="main-box" :class="{'order-cancel': item.order_state === 3}">
        <a class="list-box" @click="orderId(item)">
          <div class="list-title-box font-34">
            <p class="font-26 color-light">下单时间 今日 {{item.ctime | formatTime "yyyy-MM-dd hh:mm:ss"}}</p>
            <div class="text-right"><p class="color-orange font-40">{{item.order_sn}}</p></div>
          </div>
          <div class="list-content-box">
            <div class="information-box">
              <div class="color-weight font-34"                                           >
                <div v-if="item.addr_info" >
                  <p>{{item.addr_info.detail_addr}}</p>
                  <p>{{item.addr_info.contact_name}} {{item.addr_info.mobile}}</p>
                </div>
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
          <div>
            <span v-if="item.order_state === 2" class="accept-true">订单完成</span>
            <span v-if="item.order_state === 3" class="accept-false">订单完成</span>
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
  <div class="mask" v-show="calendarDisplay" @click="calendar"></div>
  <!--日历插件-->
  <inline-calendar @click.stop class="calendar-position" :show.sync="calendarDisplay" :value.sync="value" :hiddeWeekList="true"></inline-calendar>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .main-box {
    &.order-cancel{
      .list-box{
        border-top: 0.053333rem solid #A7A9AE;
      }
      p {
        color: #A7A9AE;
      }
      span {
        color: #A7A9AE;
      }
      .list-btn .accept-false {
        color: #A7A9AE;
      }
      .list-btn .print:before {
        background: url("../assets/ic_print_false.png") center center no-repeat;
        background-size: 100% 100% ;
      }
    }
  }

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 100;
  }
  .calendar-position{
    top: 180px;
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
    align-items: center;
    text-align: center;
    .total-info{
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

  .com-content-box{
    background: #f7f7f7;
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
  ul {
    padding-bottom: 100px;
  }
  .main-box{
    margin-top: 30px;
    position: relative;
    &:first-of-type {
      margin-top: 0;
    }
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
      .list-content-box{
        padding-right: 30px;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        padding-bottom: 26px;
        border-bottom:0.03rem solid #E5E5E5 ;
        .img-box{
          height: 120px;
          width: 120px;
          img{
            height: 120px;
            width: 120px;
          }
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
      .accept-true {
        position: relative;
        line-height: 108px;
        font-size: 30px;
        padding-left: 58px;
        color: #606470;
        float: right;
        &:before {
          display: block;
          position: absolute;
          top: 40px;
          left: 0;
          content: '';
          width: 42px;
          height: 28px;
          background: url("../assets/ic_right.png") center center no-repeat;
          background-size: 100% 100%;
        }
      }
      .accept-false {
        position: relative;
        line-height: 108px;
        font-size: 30px;
        padding-left: 58px;
        color: #606470;
        float: right;
        &:before {
          display: block;
          position: absolute;
          top: 40px;
          left: 14px;
          content: '';
          width: 28px;
          height: 28px;
          background: url("../assets/ic_false.png") center center no-repeat;
          background-size: 100% 100%;
        }
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
<script>
  import config from '../../../methods/config'
  import loading from '../../../components/loading/loading.vue'
  import toast from '../../../components/tips/toast.vue'
  import '../../../methods/filters'
  import bridge from '../../../methods/bridge'
  import inlineCalendar from '../../../components/inline-calendar/index.vue'
  export default {
    components: {
      loading,
      toast,
      inlineCalendar
    },
    data () {
      return {
        order_list: [],
        first_page: '',
        loading: false,
        page: 1,
        msg: '',
        no_data: false,
        summary_info: {
          summary_count: 0,
          summary_amt: 0
        },
        calendarDisplay: false,
        dateTime: new Date().getTime(),
        dateTimeStr: '',
        value: '',
        count_info: {}
      }
    },
    computed: {
      dateTimeDefault () {
        let date = new Date(this.dateTime)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let dateArr = [year, month, day]
        return (dateArr.join('-'))
      },
      deliveryState () {
        switch (this.$route.path) {
          case '/preparation':
            return 1
          case '/distribution':
            return 2
          case '/completion':
            return 3
          default:
            return 0
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
          console.log(_this.page)
          if (_this.page === 1) {
            _this.$set('order_list', res.data.order_info)
          } else {
            _this.$set('order_list', _this.order_list.concat(res.data.order_info))
          }
          if (res.data.summary_info && res.data.summary_info.summary_count !== 0) {
            _this.$set('summary_info', res.data.summary_info)
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
        let _this = this
        _this.loading = true

        let fmt = 'yyyyMMdd'
        var t = new Date(this.dateTime)
        var o = {
          'M+': t.getMonth() + 1, // 月份
          'd+': t.getDate(),      // 日
          'h+': t.getHours(),     // 小时
          'm+': t.getMinutes(),   // 分
          's+': t.getSeconds(),   // 秒
          'q+': Math.floor((t.getMonth() + 3) / 3), // 季度
          'S': t.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
        this.dateTimeStr = fmt

        let data = {
          page: _this.page,
          format: 'jsonp',
          date_time: _this.dateTimeStr,
          delivery_state: this.deliveryState
        }
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
      calendar () {
        this.calendarDisplay = !this.calendarDisplay
      }
    }
  }
</script>
