<template>
  <nav id="nav">
    <div>
      <div class="month-container">
        <a @click.prevent="goPreMonth" :class="{'pre-able': preAble}">上一月</a>
        <h2>{{responseData.chosenDate}}</h2>
        <a @click.prevent="goNextMonth" :class="{'next-able': nextAble}">下一月</a>
      </div>
      <div class="data-container">
        <div>
          <em>本月实收</em>
          <em>微信收款</em>
          <em>支付宝收款</em>
          <em>京东收款</em>
          <em v-show="detail.QQCount!==undefined">QQ收款</em>
        </div>
        <div>
          <p><span>{{detail.mon_tx_cnt}}</span> 笔</p>
          <p>{{detail.wxCount}} 笔</p>
          <p>{{detail.aliCount}} 笔</p>
          <p>{{detail.jdCount}} 笔</p>
          <p v-show="detail.QQCount!==undefined">{{detail.QQCount}} 笔</p>
        </div>
        <div>
          <p><span>{{detail.mon_tx_amt | formatCurrency}}</span> 元</p>
          <p>{{detail.wxAmt | formatCurrency}} 元</p>
          <p>{{detail.aliAmt | formatCurrency}} 元</p>
          <p>{{detail.jdAmt | formatCurrency}} 元</p>
          <p v-show="detail.QQCount!==undefined">{{detail.QQAmt | formatCurrency}} 元</p>
        </div>
      </div>
    </div>
  </nav>
  <section>
    <h3>收入趋势</h3>
    <div id="chart"></div>
  </section>
  <p class="tip">* 数据非实时更新，仅供参考。准确数据请查看流水页。</p>
</template>
<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "trade-statistics.scss";
</style>
<script type="text/ecmascript-6">
  import util from '../../methods/util'
  import bridge from '../../methods/bridge'
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/grid'
  import 'echarts/lib/component/markPoint'
  import 'echarts/lib/component/dataZoom'
  import moment from 'moment'

  export default {
    data () {
      return {
        firstRequest: true,
        isCurrent: true,
        currentMonth: '',
        currentMonthsDay: '',
        chosenMonth: '',
        labelMonth: '',
        preAble: true,
        nextAble: false,
        requestData: {
          format: 'jsonp'
        },
        responseData: {},
        myChart: '',
        detail: {
          wxCount: 0,
          wxAmt: 0,
          aliCount: 0,
          aliAmt: 0,
          jdCount: 0,
          jdAmt: 0,
          QQCount: 0,
          QQAmt: 0,
          mon_tx_cnt: 0,
          mon_tx_amt: 0
        }
      }
    },
    created () {
      this.getData()
    },
    ready () {
    },
    methods: {
      getData () {
        let _this = this
        bridge.request({
          url: 'https://o2.qfpay.com/trade/v2/couponstat',
          data: _this.requestData,
          method: 'JSONP',
          callback: function (res) {
            _this.clearDetail()
            let sum = res.data.sum[0]
            if (!util.isEmptyObject(res.data.sum)) {
              _this.detail.aliCount = sum.mon_zfb_cnt
              _this.detail.aliAmt = sum.mon_zfb_amt
              _this.detail.wxCount = sum.mon_wx_cnt
              _this.detail.wxAmt = sum.mon_wx_amt + sum.mon_qf_coupon_amt
              _this.detail.jdCount = sum.mon_jd_cnt
              _this.detail.jdAmt = sum.mon_jd_amt
              _this.detail.QQCount = sum.mon_qq_cnt
              _this.detail.QQAmt = sum.mon_qq_amt
              _this.detail.mon_tx_cnt = sum.mon_tx_cnt
              _this.detail.mon_tx_amt = sum.mon_tx_amt + sum.mon_qf_coupon_amt
            }
            //  模拟一个当前时间 moment()
            if (_this.firstRequest) {
              _this.currentMonth = moment(res.data.server_time).format('YYYYMM')
              _this.chosenMonth = _this.currentMonth
              _this.firstRequest = false
            }
            if (_this.isCurrent) {
              _this.currentMonthsDay = moment(res.data.server_time).format('DD')
              _this.isCurrent = false
            } else {
              _this.currentMonthsDay = moment(_this.chosenMonth, 'YYYYMM').daysInMonth()
            }
            _this.labelMonth = moment(_this.chosenMonth, 'YYYYMM').format('MM')

            _this.responseData = res.data
            _this.responseData.chosenDate = moment(_this.chosenMonth, 'YYYYMM').format('YYYY年MM月')

            let _data = res.data.detail
            let _date = []
            let amt = []
            let cnt = []
            let couponAmt = []
            let couponCnt = []
            let _length = _this.currentMonthsDay
            for (let i = 0; i < _this.currentMonthsDay; i++) {
              let n = i + 1
              if (n < 10) {
                n = '0' + n
              }
              _date.push(_this.labelMonth + '/' + n)
              amt.push(0)
              cnt.push(0)
              couponAmt.push(0)
              couponCnt.push(0)
            }
            if (!util.isEmptyObject(_data)) {
              for (let value of _data) {
                let insertDay = value.c_yearmonthday.substring(8, 10) - 1
                amt[insertDay] = (value.tx_amt + value.qf_coupon_amt) / 100
                cnt[insertDay] = value.tx_cnt
                couponAmt[insertDay] = value.self_coupon_amt / 100
                couponCnt[insertDay] = value.self_coupon_cnt
              }
            }
            var myChart = echarts.init(document.getElementById('chart'))
            // 指定图表的配置项和数据
            var option = {
              grid: {
                top: 10,
                left: 0,
                right: 20,
                bottom: 0,
                containLabel: true
              },
              dataZoom: [{
                type: 'inside',
                startValue: _length - 7,
                endValue: _length - 0,
                zoomLock: true
              }],
              tooltip: {
                trigger: 'axis',
                alwaysShowContent: true,
                axisPointer: {
                  lineStyle: {
                    color: '#666'
                  }
                },
                backgroundColor: 'rgba(47,50,58,.9)',
                padding: 10,
                formatter (params) {
                  let index = params[0].dataIndex
                  return `${cnt[index]}笔 实收${amt[index]}元<br >${couponCnt[index]}红包 优惠${couponAmt[index]}元`
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: _date,
                splitLine: {
                  interval: 0
                },
                axisLabel: {
                  textStyle: {
                    color: '#2F323A',
                    fontSize: 12
                  },
                  interval: 0
                }
              },
              yAxis: {
                type: 'value',
                boundaryGap: [0, '10%'],
                axisLabel: {
                  formatter: '{value}元',
                  textStyle: {
                    color: '#2F323A',
                    fontSize: 12
                  }
                }
              },
              series: [{
                name: '收入',
                type: 'line',
                data: amt,
                symbol: 'circle',
                symbolSize: '8',
                showAllSymbol: true,
                itemStyle: {
                  normal: {
                    color: '#fff',
                    borderColor: 'rgb(253,83,89)',
                    borderWidth: 2
                  },
                  emphasis: {
                    color: 'rgb(253,83,89)'
                  }
                },
                lineStyle: {
                  normal: {
                    color: 'rgb(253,83,89)',
                    width: 2
                  }
                },
                areaStyle: {
                  normal: {
                    color: 'rgba(253,83,89,.1)'
                  }
                }
              }]
            }
            myChart.setOption(option, true)
            myChart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: amt.length > 7 ? 6 : amt.length
            })
          }
        })
      },
      emulateMonth (month, status) {
        if (moment(month, 'YYYYMM').get('month') === 0 && status === 0) {
          return month - 89
        } else if (moment(month, 'YYYYMM').get('month') === 11 && status === 1) {
          return month + 89
        }
        if (status === 0) {
          return month - 1
        } else if (status === 1) {
          return month + 1
        }
      },
      goPreMonth () {
        if (this.preAble) {
          this.chosenMonth = String(this.emulateMonth(parseInt(this.chosenMonth), 0))
          this.nextAble = true
          if (this.chosenMonth === '201508') {
            this.preAble = false
          }
          this.requestData.month = this.chosenMonth
          this.getData()
          /* global _hmt */
          _hmt.push(['_trackEvent', 'trade-statistics', 'prePage', 'tap'])
        }
      },
      goNextMonth () {
        if (this.nextAble) {
          this.chosenMonth = String(this.emulateMonth(parseInt(this.chosenMonth), 1))
          this.preAble = true
          if (this.chosenMonth === this.currentMonth) {
            this.nextAble = false
            this.isCurrent = true
          }
          this.requestData.month = this.chosenMonth
          this.getData()
        }
      },
      clearDetail () {
        for (let key in this.detail) {
          this.detail[key] = 0
        }
      }
    }
  }

</script>
