<template>
  <div class="com-content-box">
    <div @click="calendar" class="date">
      <p>{{dateTime | formatTime "yyyy年MM月dd日"}}<i class="arrow"></i></p>
      <!--日历插件-->
      <inline-calendar @click.stop class="calendar-position" :show.sync="calendarDisplay" :value.sync="value" :hiddeWeekList="true"></inline-calendar>
      <!--<calendar class="calendar-position" :show.sync="calendarDisplay" :type.sync="datetime" :value.sync="dateTimeDefault"></calendar>-->
    </div>

    <div v-if="!no_data" class="total-info-wrap">
      <p class="total-info">共 <span>{{summary_info.summary_count}}</span> 笔，<span>{{summary_info.summary_amt | formatCurrency}}</span> 元</p>
      <div class="print-total" @click="printTotal">
        <p>打印日结单</p>
      </div>
    </div>
    <ul>
      <li v-for="item in order_list" class="main-box">
        <a class="list-box" v-link="{ path: 'detail'}" @click="orderId(item)">
          <div class="list-title-box font-34">
            <div><p class="color-title">取餐号：{{item.order_sn}}</p></div>
            <div class="text-right"><p class="color-orange font-40">{{item.address}}号桌</p></div>
          </div>
          <div class="list-content-box">
            <div class="information-box">
              <div class="color-weight font-34"><p>{{item.order_name}}</p></div>
              <div class="font-26 color-light">
                <p>下单时间: {{item.pay_time | formatTime "yyyy-MM-dd hh:mm:ss"}}</p>
              </div>
              <div class="font-26 color-light ">
                <p v-if="item.order_state === 2" class="div-flex order-state-true">已支付</p>
                <p v-if="item.order_state === 3" class="div-flex order-state-false">已撤销</p>
                <span class="div-flex font-40 text-right"><span class="font-30">￥</span>{{item.txamt | formatCurrency}}</span>
              </div>
            </div>
          </div>
          <div v-if="item.note" class="color-light font-30 list-tip-box">
            <p>备注</p>
            <p class="list-tip">{{item.note}}</p>
          </div>
        </a>
        <div class="list-btn">
          <a @click="print(item.order_id)" class="font-30 color-orange">打印小票</a>
        </div>
      </li>
    </ul>
  </div>
  <div v-show="no_data" class="no-data">
    <div class="no-data-con">
      <img src="../../assets/no_data.png" alt="">
      <p>暂无数据</p>
    </div>
  </div>
  <div id="loading" v-show="loading">
    <loading :visible="loading"></loading>
  </div>
  <toast :msg.sync="msg"></toast>
</template>
<style lang="scss" rel="stylesheet/scss">
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

  .main-box{
    margin-bottom: 20px;
    position: relative;
    background: #ffffff;
    .list-box{
      display: block;
      padding: 30px;
      text-decoration: none;
      background: #ffffff;
      .list-title-box{
        display: flex;
        >div{
          flex: 1;
        }
      }
      .list-content-box{
        position: relative;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        padding-bottom: 30px;
        &:after{
          display: block;
          position: absolute;
          bottom: 0;
          left: -30px;
          content: '';
          width: 10rem;
          border-bottom: 2px solid #efefef; /*px*/
        }
        .img-box{
          height: 120px;
          width: 120px;
          img{
            height: 120px;
            width: 120px;
          }
        }
        .information-box{
          flex: auto;
          display: flex;
          flex-direction: column;
          >div{
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            .div-flex{
              flex: 1;
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
              &:before{
                display: block;
                content: '';
                position: absolute;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                top: 7px;
                left: -22px;
                background: #FF8100;
              }
            }
            .order-state-true{
              margin-left: 28px;
              position: relative;
              &:before{
                display: block;
                content: '';
                position: absolute;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                top: 7px;
                left: -22px;
                background: #7ED321;
              }
            }
          }
        }
      }
    }
    .list-btn{
      width: 100%;
      background: #ffffff;
      padding: 24px 0 30px 0;
      >a{
        display: block;
        height: 76px;
        width: 690px;
        margin: 0 auto;
        text-decoration: none;
        border: 2px solid #FF8100; /*px*/
        text-align: center;
        line-height: 76px;
        background: #ffffff;
      }
    }
  }

  .list-tip-box{
    padding: 30px 0 0 0;
    .list-tip{
      margin-top: 36px;
      padding: 30px;
      background: #f7f7f7;
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
  import config from '../../methods/config'
  import loading from '../../components/loading/loading.vue'
  import toast from '../../components/tips/toast.vue'
  import '../../methods/filters'
  import bridge from '../../methods/bridge'
  import inlineCalendar from '../../components/inline-calendar/index.vue'
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
        ajaxCount: 1,
        value: ''
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
      }
    },
    events: {
      'handle-date' (val) {
        this.dateTime = new Date(val).getTime()
        this.order_list = []
        this.page = 1
        this.no_data = false
        this.getData()
        this.ajaxCount = 1
      }
    },
    route: {
      data: function (transition) {
        var _this = this
        _this.is_activate = true
        transition.next()
        _this.$nextTick(function () {
          window.document.body.scrollTop = window.sessionStorage.scrollTop
        })
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
      var self = this
      if (!self.first_page) {
        self.first_page = 1
        self.getData()
      }
    },
    methods: {
      setData (res) {
        let _this = this
        if (res.respcd === '0000') {
          _this.loading = false
          console.log(_this.page)
          if (_this.page === 1) {
            _this.$set('order_list', res.data.order_list)
            if (res.data.summary_info) {
              _this.$set('summary_info', res.data.summary_info)
            }
          } else {
            _this.$set('order_list', _this.order_list.concat(res.data.order_list))
          }
          if (_this.order_list.length === 0) {
            _this.no_data = true
          }
          if (res.data.order_list.length === 0) {
            _this.$set('msg', '没有更多了...')
          }
          _this.$set('page', _this.page + 1)
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
          date_time: _this.dateTimeStr
        }
        bridge.request({
          url: config.o_host + 'diancan/mchnt/order_list',
//          url: 'http://172.100.111.215:9300/diancan/mchnt/order_list',
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
        window.sessionStorage.orderId = JSON.stringify(item.order_id)
        window.sessionStorage.state = JSON.stringify(item.order_state)
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
      },
      printTotal () {
        let _this = this
        let data = {
          format: 'jsonp',
          date_time: _this.dateTimeStr
        }
        bridge.request({
          url: config.o_host + 'diancan/mchnt/printdailyorder',
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
      }
    }
  }
</script>
