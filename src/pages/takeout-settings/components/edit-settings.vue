<template>
  <div v-show="visible">
    <h2>选择时间段</h2>
    <div class="slider-container">
      <p>开放时段</p>
      <div id="slider"></div>
      <div class="slider-remark">
        <p class="tx-l">00:00</p>
        <p>06:00</p>
        <p>12:00</p>
        <p>18:00</p>
        <p class="tx-r">24:00</p>
      </div>
    </div>
    <h2>配送规则</h2>
    <ul>
      <li>
        <i>起送价</i>
        <span>
          <input type="tel" placeholder="请输入金额" v-model="settings.start_delivery_fee | twoWayCurrency"> 元
        </span>
      </li>
      <li>
        <i>配送费</i>
        <span>
          <input type="tel" placeholder="请输入金额" v-model="settings.shipping_fee | twoWayCurrency"> 元
        </span>
      </li>
      <li class="no-bb">
        <i>满减免配送费</i>
        <span>
          <checkbox :value="switchShipFee || checkboxState"></checkbox>
        </span>
      </li>
      <li class="input no-bb has-bt" :class="{'trans': !(switchShipFee || checkboxState)}">
        <i>每单满 <input type="tel" @focus="getFocus" @blur="loseFocus" v-model="settings.min_shipping_fee | twoWayCurrency | noneCurrency 'true'" :class="{'active': settings.min_shipping_fee}" debounce="3000"> 元，免配送费</i>
      </li>
    </ul>
    <footer @click="goSave" :class="{'styleFocus': styleFocus}">保存</footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import config from '../../../methods/config'
  import util from '../../../methods/util'
  import bridge from '../../../methods/bridge'
  import checkbox from '../../../components/input/checkbox.vue'
  import noUiSlider from 'nouislider'
  export default {
    data () {
      return {
        checkboxState: 0,
        styleFocus: false
      }
    },
    computed: {
      switchShipFee () {
        return this.settings.min_shipping_fee !== 0 ? 1 : 0
      },
      settings () {
        return this.$parent.settings
      }
    },
    components: {checkbox},
    props: ['visible'],
    watch: {
      'settings' () {
        let stNumber = this.transTimeToNum(this.settings.start_time) === false ? 0 : this.transTimeToNum(this.settings.start_time)
        let edNumber = this.transTimeToNum(this.settings.end_time) === false ? 48 : this.transTimeToNum(this.settings.end_time)
        document.getElementById('slider').noUiSlider.set([stNumber, edNumber])
      }
    },
    ready () {
    },
    attached () {
      var slider = document.getElementById('slider')
      noUiSlider.create(slider, {
        start: [0, 48],
        tooltips: true,
        step: 1,
        connect: true,
        range: {
          'min': 0,
          'max': 48
        },
        format: {
          to: function (value) {
            let intValue = parseInt(value)
            let hour = (intValue / 2) >= 10 ? Math.floor(intValue / 2) : '0' + Math.floor(intValue / 2)
            let minute = intValue % 2 === 1 ? '30' : '00'
            return hour + ':' + minute
          },
          from: function (value) {
            return value
          }
        }
      })
      let stNumber = this.transTimeToNum(this.settings.start_time) === false ? 0 : this.transTimeToNum(this.settings.start_time)
      let edNumber = this.transTimeToNum(this.settings.end_time) === false ? 48 : this.transTimeToNum(this.settings.end_time)
      document.getElementById('slider').noUiSlider.set([stNumber, edNumber])
    },
    methods: {
      getFocus () {
        if (util.isAndroid) {
          this.styleFocus = true
        }
      },
      loseFocus () {
        if (util.isAndroid) {
          this.styleFocus = false
        }
      },
      transTimeToNum (time) {
        if (typeof time !== 'undefined') {
          let mTime = time.substr(0, 5)
          let m = Number(mTime.split(':')[1]) >= 30 ? 1 : 0
          let h = Number(mTime.split(':')[0]) * 2
          return m + h
        } else {
          return false
        }
      },
      goSave () {
        let time = document.getElementById('slider').noUiSlider.get()
        this.settings.start_time = time[0] + ':00'
        this.settings.end_time = time[1] + ':00'
        bridge.request({
          url: config.dcHost + 'diancan/mchnt/editsetting',
          method: 'POST',
          data: Object.assign(this.settings, {
            format: 'cors'
          }),
          callback: (res) => {
            if (res.respcd === '0000') {
              this.$dispatch('on-page-change', 1)
              this.checkboxState = 0
            } else {
              this.$dispatch('on-toast', res.resperr)
            }
          }
        })
      }
    },
    events: {
      'on-checkbox-change' (val) {
        if (!val) {
          this.settings.min_shipping_fee = val
        }
        this.checkboxState = val
      }
    }
  }

</script>

<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  @import "../assets/nouislider.min.css";
  .styleFocus {
    position: static!important;
  }
  body {
    background-color: #f7f7f7;
  }
  div {
    h2 {
      height: 68px;
      line-height: 68px;
      padding-left: 30px;
      font-size: 28px;
      color: #A7A9AE;
    }
  }
  .slider-container {
    padding: 30px 36px;
    background-color: #fff;
    border-top: 2px solid #e5e5e5; /*px*/
    border-bottom: 2px solid #e5e5e5; /*px*/
    p {
      font-size: 30px;
      color: #2F323A;
    }
    #slider {
      margin-top: 70px;
      border: none;
      box-shadow: none;
      .noUi-base {
        height: 16px;
        border-radius: 32px;
        border: none;
        background: #fff url('../assets/slider.png') center center no-repeat;
        background-size: 100% 100%;
      }
      .noUi-connect {
        background-color: rgba(254,155,32,.6);
        top: 2px;
        bottom: 2px;
        box-shadow: none;
      }
      .noUi-tooltip {
        width: 100px;
        color: #2F323A;
        font-size: 30px;
        border: none;
      }
      .noUi-handle {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        background-color: #FF8100;
        border: 2px solid #fff;
        top: -14px;
        left: -.2rem;
        box-shadow: none;
        &:before, &:after {
          background-color: transparent;
        }
      }
    }
    .slider-remark {
      display: flex;
      margin-top: 20px;
      line-height: 1.4;
      p {
        text-align: center;
        color: #FF8100;
        font-size: 24px;
        flex: 1;
        &.tx-l {
          text-align: left;
        }
        &.tx-r {
          text-align: right;
        }
      }
    }
  }
  ul {
    background-color: #fff;
    border-top: 2px solid #E5E5E5;
    border-bottom: 2px solid #E5E5E5;
    li {
      min-height: 94px;
      margin-left: 30px;
      border-bottom: 2px solid #E5E5E5;
      display: flex;
      font-size: 30px;
      padding: 30px 30px 30px 0;
      transition: all .3s;
      &:nth-last-of-type(1) {
        border-bottom: none;
      }
      &.input {
        padding: 16px 30px 16px 0;
      }
      &.no-bb {
        border-bottom: none;
      }
      &.has-bt {
        border-top: 2px solid #E5E5E5;
      }
      &.trans {
        min-height: 0;
        height: 0;
        overflow: hidden;
        padding: 0;
        border: none;
      }
      > i {
        font-style: normal;
        color: #606470;
        input {
          width: 90px;
          height: 56px;
          border: 2px solid #D8D8D8;
          border-radius: 6px;
          vertical-align: inherit;
          font-size: 30px;
          text-align: center;
          font-weight: 400;
          padding: 0;
          &.active {
            border: 2px solid #FF8100; /*px*/
          }
        }
      }
      span {
        flex: 1;
        text-align: right;
        color: #2F323A;
        em {
          display: block;
          line-height: 40px;
        }
        i {
          display: block;
          width: 36px;
          height: 36px;
          border: 2px solid #A7A9AE; /*px*/
          border-radius: 6px;
          float: right;
          margin-top: 8px;
          position: relative;
          &.active {
            border: none;
            background-color: #FF8100;
            &:before {
              content: '';
              position: absolute;
              width: 10px;
              height: 2px; /*px*/
              background-color: #fff;
              top: 20px;
              left: 6px;
              transform: rotate(45deg);
            }
            &:after {
              content: '';
              position: absolute;
              width: 20px;
              height: 2px; /*px*/
              background-color: #fff;
              top: 16px;
              left: 12px;
              transform: rotate(-45deg);
            }
          }
        }
        input {
          width: 180px;
          height: 42px;
          font-size: 30px;
          text-align: right;
          border: none;
        }
      }
    }
  }
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FF8100;
    color: #FFFFFF;
    font-size: 34px;
    text-align: center;
    height: 88px;
    line-height: 88px;
  }
</style>
