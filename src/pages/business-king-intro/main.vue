<template>
  <div class="swiper-container" v-show="isInit">
      <div class="swiper-wrapper">
        <!--0-->
        <div class="swiper-slide">
          <p class="shop-name">@{{res.shopname}}</p>
          <img class="home-img" src="./assets/0.png" alt="">
          <div class="arrow" v-show="arrow"></div>
        </div>
        <!--无数据情况-->
        <div class="swiper-slide" v-if="isEmpty(res.stat)" >
          <h1 class="title">单笔消费分析</h1>
          <p class="bold-content">2月份好近微信支付使用情况不足以对单笔消费金额、月留存和回头客占比进行分析，请引导消费者使用微信支付</p>
          <p class="sub-content">根据生意王大数据，同城同行业的商户平均情况如下：</p>
          <div id="charts-4">
            <p class="charts-tip tip-1">{{res.avg.cat_avg_amt | formatCurrency}}元</p>
            <p class="charts-tip tip-2">{{res.avg.cat_retention_rate}}%</p>
            <p class="charts-tip tip-3">{{res.avg.cat_rcg_rate}}%</p>
            <img src="assets/avg-info.png" alt="">
          </div>
          <div class="arrow" v-show="arrow"></div>
        </div>
        <!--1-->
        <div class="swiper-slide" v-if="!isEmpty(res.stat)">
          <h1 class="title">单笔消费分析</h1>
          <p class="content">2月份微信支付交易
            <span class="color-blue">{{res.stat.tx_cnt}}笔</span>，营业额
            <span class="color-blue">{{res.stat.tx_amt | formatCurrency}}元</span>，单笔消费
            <span class="color-blue">{{res.stat.avg_amt | formatCurrency}}元</span>，
            <span class="color-orange" v-if="res.stat.avg_amt < res.avg.cat_avg_amt">低于</span>
            <span class="color-orange" v-if="res.stat.avg_amt === res.avg.cat_avg_amt">等于</span>
            <span class="color-orange" v-if="res.stat.avg_amt > res.avg.cat_avg_amt">高于</span>
            同城同行业水平。
          </p>
          <div class="charts-wrap">
            <div class="legend-wrap">
              <p><span class="legend-1"></span>本店营业数据</p>
              <p><span class="legend-2"></span>同行业营业数据</p>
            </div>
            <div id="charts-1" style="width: 100%;height:100%;">

            </div>
          </div>
          <p class="charts-title">单笔消费</p>
          <div class="arrow" v-show="arrow"></div>
        </div>
        <!--2-->
        <div class="swiper-slide" v-if="!isEmpty(res.stat)">
          <h1 class="title">月留存率分析</h1>
          <p class="content">1月份到店的
            <span class="color-blue">{{res.stat.c_cnt0}}</span>个消费者中，有
            <span class="color-blue">{{res.stat.c_cnt01}}</span>个消费者2月份到店消费，月留存率为
            <span class="color-blue">{{res.stat.retention_rate}}%</span>，
            <span class="color-orange" v-if="res.stat.retention_rate < res.avg.cat_retention_rate">低于</span>
            <span class="color-orange" v-if="res.stat.retention_rate === res.avg.cat_retention_rate">等于</span>
            <span class="color-orange" v-if="res.stat.retention_rate > res.avg.cat_retention_rate">高于</span>
            同城同行业平均数据。
          </p>
          <div class="charts-wrap">
            <div class="legend-wrap">
              <p><span class="legend-1"></span>本店营业数据</p>
              <p><span class="legend-2"></span>同行业营业数据</p>
            </div>
            <div id="charts-2" style="width: 100%;height:100%;">

            </div>
          </div>
          <p class="charts-title">月留存率</p>
          <div class="arrow" v-show="arrow"></div>
        </div>
        <!--3-->
        <div class="swiper-slide" v-if="!isEmpty(res.stat)">
          <h1 class="title">回头客占比分析</h1>
          <p class="content">2月微信支付交易{{res.stat.tx_cnt}}笔，消费者
            <span class="color-blue">{{res.stat.c_cnt}}</span>人，到店2次以上的的消费者
            <span class="color-blue">{{res.stat.rcg_c_cnt}}</span>人，回头客占比
            <span class="color-blue">{{res.stat.rcg_rate}}%</span>，
            <span class="color-orange" v-if="res.stat.rcg_rate < res.avg.cat_rcg_rate">低于</span>
            <span class="color-orange" v-if="res.stat.rcg_rate === res.avg.cat_rcg_rate">等于</span>
            <span class="color-orange" v-if="res.stat.rcg_rate > res.avg.cat_rcg_rate">高于</span>
            同城同行业水平。
          </p>
          <div class="charts-wrap">
            <div class="legend-wrap">
              <p><span class="legend-1"></span>本店营业数据</p>
              <p><span class="legend-2"></span>同行业营业数据</p>
            </div>
            <div id="charts-3" style="width: 100%;height:100%;">

            </div>
          </div>
          <p class="charts-title">回头客占比</p>
          <div class="arrow" v-show="arrow"></div>
        </div>
        <!--4-->
        <div class="swiper-slide" v-if="!isEmpty(res.stat)">
          <h1 class="title">提升空间</h1>
          <p class="bold-content" v-if="res.stat.rcg_rate < res.avg.cat_rcg_rate || res.stat.retention_rate < res.avg.cat_retention_rate">如果店铺月留存率与回头客占比提升到平均水平：</p>
          <p class="bold-content" v-if="res.stat.rcg_rate >= res.avg.cat_rcg_rate && res.stat.retention_rate >= res.avg.cat_retention_rate">目前店铺月留存和回头客占比仅高于同城同行业水平！如果持续提升两个指标10%</p>
          <div class="can-up-wrap">
            <p>本店营业额可提升：</p>
            <p class="can-up-num">
              <span>￥</span>{{totalAmt}}
              <img src="./assets/ic_up.png" alt="">
            </p>
          </div>
          <div class="tip-content-wrap" v-if="res.stat.rcg_rate < res.avg.cat_rcg_rate || res.stat.retention_rate < res.avg.cat_retention_rate">
            <p class="tip-content" v-if="res.stat.retention_rate < res.avg.cat_retention_rate">留存率提升20%：{{promoteRate_20}}元<br/>＝上月到店消费者{{res.stat.c_cnt0}} × 提升留存率20% × 单笔消费{{res.stat.avg_amt | formatCurrency}}</p>
            <p class="tip-content" v-if="res.stat.rcg_rate < res.avg.cat_rcg_rate">回头客提升20%：{{promoteCustomer_20}}元<br/>＝{{res.stat.c_cnt}}消费者 × 提升回头客占比20% × 单笔消费{{res.stat.avg_amt | formatCurrency}} </p>
          </div>
          <div class="tip-content-wrap" v-if="res.stat.rcg_rate >= res.avg.cat_rcg_rate && res.stat.retention_rate >= res.avg.cat_retention_rate">
            <p class="tip-content" v-if="res.stat.retention_rate > res.avg.cat_retention_rate">留存率提升10%：{{promoteRate_10}}元<br/>＝上月到店消费者{{res.stat.c_cnt0}} × 提升留存率10% × 单笔消费{{res.stat.avg_amt | formatCurrency}}</p>
            <p class="tip-content" v-if="res.stat.rcg_rate > res.avg.cat_rcg_rate">回头客提升10%：{{promoteCustomer_10}}元<br/>＝{{res.stat.c_cnt}}消费者 × 提升回头客占比10% × 单笔消费{{res.stat.avg_amt | formatCurrency}} </p>
          </div>
          <div class="arrow" v-show="arrow"></div>
        </div>
        <!--5-->
        <div class="swiper-slide">
          <h1 class="title">如何提升</h1>
          <p class="bold-content">生意王连接店铺与消费者，搭建微信公众账号，专业人员代运营</p>
          <ul class="up-ways-wrap">
            <li>
              <div class="ic-wrap"><img class="img-1" src="assets/ic_1.png" alt=""></div>
              <div >
                <p class="up-ways-title">线上+线下吸粉</p>
                <p class="up-ways-content">持续拉新，稳定留存</p>
              </div>
            </li>
            <li>
              <div class="ic-wrap"><img class="img-2" src="assets/ic_2.png" alt=""></div>
              <div >
                <p class="up-ways-title">搭建微信公众账号</p>
                <p class="up-ways-content">连接店铺与消费者，沉淀会员</p>
              </div>
            </li>
            <li>
              <div class="ic-wrap"><img class="img-3" src="assets/ic_3.png" alt=""></div>
              <div >
                <p class="up-ways-title">数据分析与支持</p>
                <p class="up-ways-content">多维度分析会员画像，运营有根有据</p>
              </div>
            </li>
            <li>
              <div class="ic-wrap"><img class="img-4" src="assets/ic_4.png" alt=""></div>
              <div >
                <p class="up-ways-title">红包、集点、储值、特卖</p>
                <p class="up-ways-content">多种营销能力，带来流量与销量</p>
              </div>
            </li>
            <li>
              <div class="ic-wrap"><img class="img-5" src="assets/ic_5.png" alt=""></div>
              <div >
                <p class="up-ways-title">专业人员代运营</p>
                <p class="up-ways-content">专业运营方案，微信营销如此简单</p>
              </div>
            </li>
          </ul>
          <div class="arrow" v-show="arrow"></div>
        </div>
        <!--6-->
        <div class="swiper-slide">
          <h1 class="title">商户案例</h1>
          <div class="user-demo-wrap">
            <div class="user-demo">
              <div class="ic-wrap"><img src="assets/ic_shop.png" alt=""></div>
              <p>鑫记到家</p>
            </div>
            <p class="user-demo-content"><span>15天新增1200+新粉丝关注</span><br/>开通微信支付默认关注店铺公众号功能后，15天新增1200+新粉丝，稳定后日常新增30+</p>
            <p class="user-demo-content"><span>量身定制会员营销活动，流水翻倍</span><br/>通过数据分析会员留存流失，客单价及高低价值会员分布，精准推出红包、新品特卖和储值活动，店铺流水提升翻倍。</p>
            <img src="assets/1.png" alt="">
          </div>
          <div class="arrow" v-show="arrow"></div>
        </div>
        <!--7-->
        <div class="swiper-slide">
          <div class="user-demo-2">
            <p class="user-demo-content"><span>生意王专业代运营公众号</span><br/>粉丝消费力与品牌好感全面提高，专业的文案编辑和美工设计，在粉丝收到图文转化购买之外，店铺品牌和品质慢慢深入人心。</p>
            <img src="assets/2.png" alt="">
          </div>
          <div class="submit" @click="showSubmit">我要了解生意王</div>
        </div>
      </div>
    </div>
  <div class="info-submit-wrap" v-if="visibleSubmit">
    <h1 class="title title-1">了解更多生意王服务，获取更深度的会员解读和专业运营人员支持</h1>
    <p class="content">请留下您的信息，我们的运营人员会在1-3个工作日联系您</p>
    <div class="info">
      <h2>1. 您的店铺是否有营业执照？</h2>
      <div class="info-select" :class="{'active': inputIndex === 1 }" @click="changIndex(1)">有</div>
      <div class="info-select" :class="{'active': inputIndex === 2 }" @click="changIndex(2)">正在办理</div>
      <div class="info-select" :class="{'active': inputIndex === 3 }" @click="changIndex(3)">没有，借用</div>
      <div class="info-select" :class="{'active': inputIndex === 4 }" @click="changIndex(4)">没有</div>
      <p class="info-tip">提示：如未有多家店，请任选一家填写</p>
    </div>
    <div class="info">
      <h2>2. 您是否有微信公众账号？如有，请留下公众账号名字</h2>
      <input type="text" :class="{'did-edit': weixin.length !== 0 ? true : false }" placeholder="请输入公众账号" v-model="weixin">
      <p class="info-tip">提示：如未入住好近，请留下联系电话</p>
    </div>
    <div class="info">
      <h2>3. 可以联系到您的电话号码</h2>
      <input type="text" :class="{'did-edit': phone.length !== 0 ? true : false }" placeholder="请输入电话号码" v-model="phone">
      <p class="info-tip">提示：如未入住好近，请留下联系电话</p>
    </div>
    <div class="submit-1" @click="submitInfo">提交</div>
  </div>

  <alert :alert-visible.sync="visibleDialog" alert-tip="请输入全部信息" alert-title="好近提醒您"></alert>

  <div v-if="submitSuccess" class="submit-success-wrap">
    <img src="assets/commit.png" alt="">
  </div>

</template>

<script>
  /*global Swiper, _hmt */
  import Vue from 'vue'
  import config from '../../methods/config'
//  import util from '../../methods/util'
  import alert from '../../components/alert/alert.vue'
  var echarts = require('echarts')
//  import bridge from '../../methods/bridge-v2'
  export default {
    components: {
      alert: alert
    },
    data () {
      return {
        res: {
          stat: {
//            c_cnt: 481,
//            c_yearmonth: '2017-02',
//            cate_id2: '237',
//            rcg_rate: 29,
//            userid: '1331965',
//            c_cnt01: 143,
//            c_cnt0: 449,
//            avg_amt: 975,
//            retention_rate: 31,
//            tx_cnt: 731,
//            cat_avg_amt: 2048,
//            cat_rcg_rate: 26,
//            cate_name2: '社区服务类',
//            rcg_c_cnt: 141,
//            nickname: '驼房营麦香炸鸡',
//            tx_amt: 713450,
//            cat_retention_rate: 22
          },
          avg: {
//            cat_avg_amt: 2048,
//            cat_retention_rate: 22,
//            cat_rcg_rate: 26
          },
          shopname: ''
        },
        arrow: true,
        visibleSubmit: false,
        weixin: '',
        phone: '',
        inputIndex: '',
        visibleDialog: false,
        submitSuccess: false,
        dpr: '14',
        isInit: false
      }
    },
    computed: {
//      提升留存率
      promoteRate_20 () {
        let result = this.res.stat.c_cnt0 * 0.2 * this.res.stat.avg_amt
        if (isNaN(result)) {
          return
        }
        result = (result / 100).toFixed(2)
        return result
      },
      promoteRate_10 () {
        let result = this.res.stat.c_cnt0 * 0.1 * this.res.stat.avg_amt
        if (isNaN(result)) {
          return
        }
        result = (result / 100).toFixed(2)
        return result
      },
//      提升回头客
      promoteCustomer_20 () {
        let result = this.res.stat.c_cnt * 0.2 * this.res.stat.avg_amt
        if (isNaN(result)) {
          return
        }
        result = (result / 100).toFixed(2)
        return result
      },
      promoteCustomer_10 () {
        let result = this.res.stat.c_cnt * 0.1 * this.res.stat.avg_amt
        if (isNaN(result)) {
          return
        }
        result = (result / 100).toFixed(2)
        return result
      },
      totalAmt () {
        let result = 0
        let _this = this
        if (_this.res.stat.rcg_rate < _this.res.avg.cat_rcg_rate || _this.res.stat.retention_rate < _this.res.avg.cat_retention_rate) {
          let a = _this.res.stat.rcg_rate < _this.res.avg.cat_rcg_rate ? _this.promoteCustomer_20 : 0
          let b = _this.res.stat.retention_rate < _this.res.avg.cat_retention_rate ? _this.promoteRate_20 : 0
          result = Number(b) + Number(a)
        } else {
          let a = _this.res.stat.rcg_rate > _this.res.avg.cat_rcg_rate ? _this.promoteCustomer_10 : 0
          let b = _this.res.stat.retention_rate > _this.res.avg.cat_retention_rate ? _this.promoteRate_10 : 0
          result = Number(a) + Number(b)
        }
        return result
      }
    },
    created () {
      let isIPhone = window.navigator.appVersion.match(/iphone/gi)
      let devicePixelRatio = window.devicePixelRatio
      let _this = this
      if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3) {
          _this.dpr = '42'
        } else if (devicePixelRatio >= 2) {
          _this.dpr = '28'
        } else {
          _this.dpr = '14'
        }
      } else {
        // 其他设备下，仍旧使用1倍的方案
        _this.dpr = '14'
      }
    },
    ready () {
//      bridge.request({
//        url: config.aHost + 'api/b/dcIntroCount',
//        url: config.o_host + 'mchnt/bk/stat',
//        method: 'GET',
//        data: {
//          format: 'cors'
//        },
//        callback: (res) => {
//          console.log(res.data)
//          this.$set('res', res.data)
//          this.initSwiper()
//        }
//      })
      this.$http.options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
      }
      this.$http.options.xhr = {
        withCredentials: true
      }
      this.$http.options.emulateJSON = true
      this.$http({
        url: config.o_host + 'mchnt/bk/stat',
        method: 'JSONP',
        data: {
          format: 'jsonp'
        }
      }).then((res) => {
        if (res.data.respcd === '0000') {
          this.$set('res', res.data.data)
        }
      }).then(() => {
        this.initSwiper()
      })
    },
    attached () {
    },
    methods: {
      goDoor () {
        _hmt.push(['_trackEvent', 'business-king-intro', 'click-business-king-intro-shangmen', 'click'])
      },
      moreHelp () {
        _hmt.push(['_trackEvent', 'business-king-intro', 'click-business-king-intro-gengduohelp', 'click'])
      },
      initSwiper () {
        let _this = this
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          direction: 'vertical',
          parallax: true,
          speed: 500,
          resistanceRatio: 0,
          nextButton: '.arrow',
          observer: true,
          onInit: function () {
            _this.isInit = true
            _this.initCharts()
          }
        })
      },
      initCharts (res) {
        let _this = this
        let _data = this.res
        this.$nextTick(() => {
          if (!this.isEmpty(_this.res.stat)) {
            let myChart1 = echarts.init(document.getElementById('charts-1'))
            myChart1.setOption({
              color: ['#649CFF', '#FF5C1F'],
              tooltip: {
                show: false
              },
              grid: {
                show: false,
                left: '3%',
                right: '4%',
                bottom: '0%',
                top: '30%',
                backgroundColor: 'transparent',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: [],
                axisTick: {
                  show: false,
                  alignWithLabel: true
                },
                axisLine: {
                  lineStyle: {
                    color: '#649CFF',
                    width: '2'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisLabel: {
                  show: false
                }
              },
              series: [
                {
                  name: '本店营业数据',
                  type: 'bar',
                  barWidth: '13%',
                  barGap: '180%',
                  data: [_this.formatCurrency(_data.stat.avg_amt)],
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      textStyle: {
                        fontSize: _this.dpr
                      }
                    }
                  }
                },
                {
                  name: '同行业营业数据',
                  type: 'bar',
                  barWidth: '13%',
                  data: [_this.formatCurrency(_data.avg.cat_avg_amt)],
                  barCategoryGap: '200%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      textStyle: {
                        fontSize: _this.dpr
                      }
                    }
                  }
                }
              ]
            })

            let myChart2 = echarts.init(document.getElementById('charts-2'))
            myChart2.setOption({
              color: ['#649CFF', '#FF5C1F'],
              tooltip: {
                show: false
              },
              grid: {
                show: false,
                left: '3%',
                right: '4%',
                bottom: '0%',
                top: '30%',
                backgroundColor: 'transparent',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: [],
                axisTick: {
                  show: false,
                  alignWithLabel: true
                },
                axisLine: {
                  lineStyle: {
                    color: '#649CFF',
                    width: '2'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisLabel: {
                  show: false
                }
              },
              series: [
                {
                  name: '本店营业数据',
                  type: 'bar',
                  barWidth: '13%',
                  barGap: '180%',
                  data: [_data.stat.retention_rate],
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      formatter: '{c}%',
                      textStyle: {
                        fontSize: _this.dpr
                      }
                    }
                  }
                },
                {
                  name: '同行业营业数据',
                  type: 'bar',
                  barWidth: '13%',
                  data: [_data.avg.cat_retention_rate],
                  barCategoryGap: '200%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      formatter: '{c}%',
                      textStyle: {
                        fontSize: _this.dpr
                      }
                    }
                  }
                }
              ]
            })

            let myChart3 = echarts.init(document.getElementById('charts-3'))
            myChart3.setOption({
              color: ['#649CFF', '#FF5C1F'],
              tooltip: {
                show: false
              },
              grid: {
                show: false,
                left: '3%',
                right: '4%',
                bottom: '0%',
                top: '30%',
                backgroundColor: 'transparent',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: [],
                axisTick: {
                  show: false,
                  alignWithLabel: true
                },
                axisLine: {
                  lineStyle: {
                    color: '#649CFF',
                    width: '2'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisLabel: {
                  show: false
                }
              },
              series: [
                {
                  name: '本店营业数据',
                  type: 'bar',
                  barWidth: '13%',
                  barGap: '180%',
                  data: [_data.stat.rcg_rate],
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      formatter: '{c}%',
                      textStyle: {
                        fontSize: _this.dpr
                      }
                    }
                  }
                },
                {
                  name: '同行业营业数据',
                  type: 'bar',
                  barWidth: '13%',
                  data: [_data.avg.cat_rcg_rate],
                  barCategoryGap: '200%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      formatter: '{c}%',
                      textStyle: {
                        fontSize: _this.dpr
                      }
                    }
                  }
                }
              ]
            })
          } else {
          }
        })
      },
      showSubmit () {
        this.visibleSubmit = true
      },
      submitInfo () {
        let _this = this
        if (this.weixin && this.phone) {
          Vue.http.options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
          }
          Vue.http.options.xhr = {
            withCredentials: true
          }
          Vue.http.options.emulateJSON = true

          _this.$http({
            url: config.o_host + 'mchnt/bk/apply?format=cors',
            method: 'POST',
            credentials: true,
            data: {
              license_state: _this.inputIndex,
              mobile: _this.phone,
              wx_pub: _this.weixin
            }
          }).then((res) => {
            if (res.data.respcd === '0000') {
              this.$set('submitSuccess', true)
            }
          })
        } else {
          this.visibleDialog = true
        }
      },
      changIndex (e) {
        this.$set('inputIndex', e)
      },
      formatCurrency  (number) {
        if (isNaN(number)) {
          return
        }
        return (number / 100).toFixed(2)
      },
      isEmpty (obj) {
        for (let name in obj) {
          name
          return false
        }
        return true
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
    /*display: none;*/
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .color-blue {
    color: #4990E2;
  }
  .color-orange {
    color: #FF5C1F;
  }
  #charts-4 {
    margin-top: 60px;
    width: 650px;
    height: 557px;
    position: relative;
    .charts-tip {
      position: absolute;
      font-size: 28px;
      color: #FF5C1F;
      &.tip-1 {
        top: 51%;
        left: 16%;
      }
      &.tip-2 {
        position: absolute;
        top: 32%;
        left: 46%;
      }
      &.tip-3 {
        position: absolute;
        top: 9%;
        left: 73%;
      }
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .swiper-slide {
    position: relative;
    box-sizing: border-box;
    .shop-name {
      position: absolute;
      top: 110px;
      left: 50px;
      font-size: 48px;
      color: #FF5C1F;
    }
    &:not(:first-child) {
      padding: 0 50px;
    }
    .home-img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .title {
      font-size: 52px;
      padding: 40px 0 50px;
      margin-bottom: 50px;
      position: relative;
      &.title-1 {
        font-size: 36px;
      }
      &:after {
        display: block;
        content: '';
        position: absolute;
        width: 88px;
        height: 8px;
        background: #FF5C1F;
        bottom: 0;
        left: 0;
      }
    }
    .content {
      font-size: 30px;
      color: #4A4A4A;
      line-height: 1.4;
    }
    .bold-content {
      font-size: 34px;
      color: #000;
      line-height: 1.4;
    }
    .sub-content {
      font-size: 30px;
      color: #4A4A4A;
      line-height: 1.4;
      margin-top: 20px;
    }
    .charts-wrap {
      margin-top: 60px;
      width: 650px;
      height: 454px;
      position: relative;
      background: #F2F6FD;

      .legend-wrap {
        top: 15px;
        left: 30px;
        position: absolute;
        >p {
          font-size: 26px;
          color: #4A90E2;
          margin-top: 7px;
        }
        .legend-1 {
          background: #4A90E2;
          display: inline-block;
          width: 22px;
          height: 22px;
          margin-right: 22px;
        }
        .legend-2 {
          background: #FF5C1F;
          display: inline-block;
          width: 22px;
          height: 22px;
          margin-right: 22px;
        }
      }
    }
    .charts-title {
      text-align: center;
      font-size: 28px;
      color: #4990E2;
      margin-top: 24px;
    }
    .can-up-wrap {
      margin-top: 40px;
      margin-bottom: 56px;
      padding: 30px;
      width: 650px;
      height: 240px;
      background: #F2F6FD;
      border: 0.03rem solid #DDE5F3;
      border-radius: 6px;
      p {
        font-size: 32px;
      }
      .can-up-num {
        margin-left: -8px;
        margin-top: 47px;
        font-size: 74px;
        color: #407EED;
        >span{
          font-size: 54px;
        }
        >img {
          width: 32px;
          height: 54px;
        }
      }
    }
    .tip-content-wrap {
      & p:nth-child(1){
        &:before {
        display: block;
        position: absolute;
        top: 4px;
        left: 0;
        content: '';
        width: 32px;
        height: 32px;
        background: url("assets/ic_tip.png") no-repeat center center;
        background-size: 100% 100%;
        }
      }
      .tip-content {
        margin-top: 30px;
        padding: 0 0 0 50px;
        line-height: 1.4;
        font-size: 28px;
        color: #8A8C92;
        position: relative;
      }
    }
    .up-ways-wrap {
      margin-top: 38px;
      >li {
        width: 650px;
        height: 132px;
        background: #F2F6FD;
        display: flex;
        &:not(:first-child) {
          margin-top: 8px;
        }
        .ic-wrap {
          width: 108px;
          min-width: 108px;
          flex-grow: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .img-1 {
            width: 67px;
            height: 54px;
          }
          .img-2 {
            width: 59px;
            height: 59px;
          }
          .img-3 {
            width: 46px;
            height: 60px;
          }
          .img-4 {
            width: 53px;
            height: 53px;
          }
          .img-5 {
            width: 68px;
            height: 56px;
          }
        }
        div {
          flex: 1;
        }
        .up-ways-title {
          margin-top: 25px;
          font-size: 32px;
          color: #07111C;
        }
        .up-ways-content {
          margin-top: 18px;
          font-size: 28px;
          color: #4A4A4A;
        }
      }
    }
    .user-demo-wrap {
      .user-demo {
        display: flex;
        margin-bottom: 28px;
        .ic-wrap {
          width: 50px;
          flex-grow: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          >img {
            display: block;
            width: 46px;
            height: 46px;
          }
        }
        p {
          justify-content: center;
          padding: 16px;
          font-size: 36px;
          line-height: 1.4;
        }
      }
      >img {
        display: block;
        width: 560px;
        height: 320px;
        margin: 34px auto;
      }
    }
    .user-demo-content {
      margin-top: 24px;
      color: #4A4A4A;
      font-size: 28px;
      padding: 0 16px 0 44px;
      position: relative;
      line-height: 1.4;
      >span {
        display: inline-block;
        font-weight: 700;
        margin-bottom: 10px;
      }
      &:before {
        display: block;
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #07111C;
        top: 16px;
        left: 22px;
      }
    }
    .user-demo-2 {
      padding-top: 20px;
      >img {
        display: block;
        width: 408px;
        height: 726px;
        margin: 44px auto;
      }
    }
  }
  .submit {
    position: absolute;
    bottom: 50px;
    left: 50px;
    width: 650px;
    height: 88px;
    background: #407EED;
    text-align: center;
    line-height: 88px;
    font-size: 34px;
    color: #FFFFFF;
    margin-top: 60px;
    border-radius: 6px;
  }
  .submit-1 {
    width: 650px;
    height: 88px;
    background: #407EED;
    text-align: center;
    line-height: 88px;
    font-size: 34px;
    color: #FFFFFF;
    margin-top: 60px;
    border-radius: 6px;
  }
  .submit-success-wrap {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    padding-top: 148px;
    width: 100%;
    height: 100%;
    background: #F2F6FD;
    >img {
      display: block;
      width: 656px;
      height: 676px;
      margin: 0 auto;
    }
  }
  .info-submit-wrap {
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 50px 50px;
    background: #FFFFFF;
    .title {
      font-size: 52px;
      padding: 40px 0 50px;
      margin-bottom: 50px;
      position: relative;
      &.title-1 {
        font-size: 36px;
      }
      &:after {
        display: block;
        content: '';
        position: absolute;
        width: 88px;
        height: 8px;
        background: #FF5C1F;
        bottom: 0;
        left: 0;
      }
    }
    .content {
      font-size: 30px;
      color: #4A4A4A;
      line-height: 1.4;
    }
    h2 {
      font-size: 30px;
      color: #07111C;
      line-height: 1.4;
      margin-bottom: 30px;
    }
    .info-tip {
      font-size: 26px;
      color: #8A8C92;
    }
    .info {
      margin-top: 63px;
      .info-select {
        width: 638px;
        height: 88px;
        line-height: 88px;
        border: 0.03rem solid #E0E0E0;
        padding: 0 30px;
        border-radius: 6px;
        margin-bottom: 16px;
        position: relative;
        font-size: 30px;
        color: #07111C;
        &.active {
          background: #DFEBFF;
          border: 0.03rem solid #B1C9F8;
          &:after {
            display: block;
            content: '';
            position: absolute;
            width: 41px;
            height: 28px;
            background: url("assets/ic_check.png") no-repeat center center;
            background-size: 100% 100%;
            top: 30px;
            right: 30px;
          }
        }
      }
      input {
        width: 638px;
        height: 88px;
        line-height: 88px;
        padding: 0 30px;
        font-size: 30px;
        color: #07111C;
        border: 0.03rem solid #E0E0E0;
        border-radius: 6px;
        margin-bottom: 16px;
        outline: none;
        &:focus {
          border: 0.03rem solid #4A90E2;
        }
      }
      .did-edit {
        background: #DFEBFF;
      }
    }
  }
  .weui_btn_dialog.primary {
    color: #4A90E2 !important;
  }
  .arrow{
    width: 76px;
    height: 80px;
    position: absolute;
    left: 50%;
    margin-left: -38px;
    bottom: 0.56rem;
    opacity: 1;
    background: url("./assets/arrow.png") no-repeat center center;
    background-size: 100% 100%;
    animation: start 1.5s infinite ease;
    -webkit-animation: start 1.5s infinite ease;
  }
  @keyframes start{
    0% {
      transform: translate(0,-0.06667rem);
    }
    35% {
      transform: translate(0, 0.1333rem);
    }
    100% {
      transform: translate(0,-0.06667rem);
    }
  }
  @-webkit-keyframes start{
    0% {
      transform: translate(0,-0.06667rem);
    }
    35% {
      transform: translate(0, 0.1333rem);
    }
    100% {
      transform: translate(0,-0.06667rem);
    }
  }
</style>
