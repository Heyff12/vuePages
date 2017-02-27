<template>
  <loading :visible="loading"></loading>
  <div v-if="!loading">
    <header>
      <img src="./asset/banner.jpg" alt="">
    </header>
    <section>
      <h1>
        <span>·</span>{{record.actv_info.actv_name}}<span>·</span>
      </h1>
      <p>{{record.actv_info.start_time | formatTime 'yyyy.MM.dd'}}~{{record.actv_info.expire_time | formatTime 'MM.dd'}}</p>
      <div>
        <h2 class="detail-h2">活动详情</h2>
        <ul>
          <li v-for="item in record.datas">
            <p>{{item.title}}</p>
            <i>{{item.desc}}</i>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="increase-h2">营业额增长</h2>
        <ul>
          <li v-for="item in record.effect">
            <p>{{item.title}}</p>
            <i>{{item.desc}}</i>
          </li>
        </ul>
      </div>
      <div class="rank" v-show="record.rank">
        <h2 class="rank-h2">行业排名</h2>
        <h3>{{{record.rank}}}</h3>
      </div>
      <div class="suggestion">
        <a @click.prevent="goNative(record.button.link)">{{record.button.name}}</a>
      </div>
    </section>
  </div>
  <toast :msg.sync="msg"></toast>
</template>

<script type="text/ecmascript-6">
  /* global _hmt */
  import config from '../../methods/config'
  import util from '../../methods/util'
  import loading from '../../components/loading/loading.vue'
  import toast from '../../components/tips/toast.vue'

  if (util.isAPP) {
    var bridge = require('../../methods/bridge/native')
  } else {
    bridge = require('../../methods/bridge/web')
  }
  export default {
    components: {
      toast, loading
    },
    data () {
      return {
        msg: '',
        record: {},
        loading: true
      }
    },
    created () {
      let _this = this
      bridge.request({
        url: `${config.o_host}mchnt/user/actv_effect`,
        method: 'JSONP',
        data: {
          id: util.getRequestParams().id,
          format: 'jsonp'
        },
        callback (res) {
          if (res.respcd === '0000') {
            _this.record = res.data
            _this.$nextTick(() => {
              _this.loading = false
            })
          } else {
            _this.onToast(res.resperr)
          }
        }
      })
    },
    methods: {
      onToast (msg) {
        this.msg = msg
      },
      goNative (schema) {
        bridge.redirectToNative(schema)
        _hmt.push(['_trackEvent', 'data-record', 'data-record-create', 'click'])
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
    background: #ECEDF7;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
  }
  header {
    img {
      display: block;
      width: 100%;
    }
  }
  section {
    position: relative;
    overflow: hidden;
    > h1 {
      text-align: center;
      color: #000000;
      height: 40px;
      font-size: 40px;
      line-height: 1;
      position: absolute;
      left: 50%;
      top: 38px;
      transform: translateX(-50%);
      white-space: nowrap;
      &:before {
        content: '';
        display: block;
        height: 4px;
        position: absolute;
        left: -1000px;
        right: 105%;
        top: 18px;
        background-color: #000;
      }
      &:after {
        content: '';
        display: block;
        height: 4px;
        position: absolute;
        left: 105%;
        right: -1000px;
        top: 18px;
        background-color: #000;
      }
      span {
        font-size: 60px;
        line-height: 0;
        display: inline-block;
        vertical-align: -.06rem;
      }
    }
    > p {
      color: #606470;
      font-size: 30px;
      text-align: center;
      padding-top: 86px;
      padding-bottom: 40px;
    }
    > div {
      margin: 0 20px 20px;
      background-color: #fff;
      h2 {
        color: #000000;
        font-size: 36px;
        font-weight: 500;
        height: 80px;
        line-height: 80px;
        padding: 0 28px;
        border-bottom: 2px solid #E5E5E5;
      }
      ul {
        padding: 0 28px;
        li {
          height: 80px;
          line-height: 80px;
          border-bottom: 2px solid #E5E5E5;
          display: flex;
          > p {
            color: #606470;
            font-size: 30px;
            line-height: 80px;
            flex: 1;
          }
          > i {
            color: #000000;
            font-size: 30px;
          }
        }
      }
    }
    .rank {
      h3 {
        padding: 32px 36px;
        color: #000000;
        font-size: 30px;
        text-align: center;
        line-height: 1.42;
        span {
          color: #FF8100;
        }
      }
    }
    .suggestion {
      a {
        display: block;
        margin: 40px auto 100px;
        height: 88px;
        color: #FFFFFF;
        font-size: 34px;
        text-align: center;
        line-height: 88px;
        border-radius: 6px;
        background-color: #FF8100;
      }
    }
  }
  .detail-h2 {
    background: url("./asset/1.svg") left center no-repeat;
    background-size: 10px 40px;
  }
  .increase-h2 {
    background: url("./asset/2.svg") left center no-repeat;
    background-size: 10px 40px;
  }
  .rank-h2 {
    background: url("./asset/3.svg") left center no-repeat;
    background-size: 10px 40px;
  }
  .suggestion-h2 {
    background: url("./asset/4.svg") left center no-repeat;
    background-size: 10px 40px;
  }
</style>
