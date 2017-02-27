<template>
  <div v-show="visible">
    <ul>
      <li>
        <i>开放时段</i>
        <span>{{settings.start_time | subStr '5'}}-{{settings.end_time | subStr '5'}}</span>
      </li>
      <li>
        <i>起送价</i>
        <span>{{settings.start_delivery_fee | formatCurrency | noZeroCurrency}}元</span>
      </li>
      <li>
        <i>配送费</i>
        <span>
          <em>{{settings.shipping_fee | formatCurrency | noZeroCurrency}}元/单</em>
          <em>每单满{{settings.min_shipping_fee | formatCurrency | noZeroCurrency}}元，免配送费</em>
        </span>
      </li>
    </ul>
    <ul>
      <li>
        <i>接单状态</i>
        <span>
          <b :class="{'red': !state, 'green': state}">{{stateText}}</b> <checkbox :value="state"></checkbox>
        </span>
      </li>
    </ul>
    <footer @click="goEdit">
      编辑
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import config from '../../../methods/config'
  import checkbox from '../../../components/input/checkbox.vue'
  import bridge from '../../../methods/bridge'
  export default {
    data () {
      return {
        data: {
        }
      }
    },
    computed: {
      state () {
        return this.settings.delivery_open_state
      },
      stateText () {
        return this.settings.delivery_open_state ? '接单中' : '暂停中'
      },
      settings () {
        return this.$parent.settings
      }
    },
    components: {
      checkbox
    },
    props: ['visible'],
    ready () {
    },
    methods: {
      goEdit () {
        this.$dispatch('on-page-change', 0)
      }
    },
    events: {
      'on-checkbox-change' (val) {
        bridge.request({
          url: config.dcHost + 'diancan/mchnt/modifydeliverystate',
          method: 'POST',
          data: {
            format: 'cors',
            delivery_open_state: val,
            id: this.settings.id
          },
          callback: (res) => {
            if (res.respcd === '0000') {
              this.settings.delivery_open_state = val
            } else {
              this.$dispatch('on-toast', res.resperr)
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" type="scss" rel="stylesheet/scss" scoped>
  @import "../../../styles/common";
  body {
    background-color: #f7f7f7;
  }
  ul {
    margin-top: 30px;
    background-color: #fff;
    border-top: 2px solid #E5E5E5; /*px*/
    border-bottom: 2px solid #E5E5E5; /*px*/
    li {
      min-height: 94px;
      margin-left: 30px;
      border-bottom: 2px solid #E5E5E5; /*px*/
      display: flex;
      font-size: 30px;
      padding: 30px 30px 30px 0;
      &:nth-last-of-type(1) {
        border-bottom: none;
      }
      i {
        font-style: normal;
        color: #606470;
      }
      span {
        flex: 1;
        text-align: right;
        color: #2F323A;
        em {
          display: block;
          line-height: 40px;
        }
        b {
          font-weight: normal;
          &.green {
            color: #1EC622;
          }
          &.red {
            color: #FD5359;
          }
        }
      }
    }
  }
  footer {
    position: fixed;
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
