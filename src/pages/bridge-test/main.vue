<template>
  <div>
    <div class="header-container">Bridge</div>

    <div>
      <switch :title="hasNative ? 'Native 模式' : 'Browser 模式'" :value.sync="hasNative"></switch>
    </div>

    <div class="btn-container">
      <x-button type="primary" @click.stop="requestGET">AJAX接口代理请求(GET)</x-button>
      <x-button type="primary" @click.stop="requestJSONP">AJAX接口代理请求(JSONP)</x-button>
      <x-button type="primary" @click.stop="requestPOST">AJAX接口代理请求(POST)</x-button>
      <x-button type="primary" @click.stop="redirect">页面跳转</x-button>
      <x-button type="primary" @click.stop="getPageParam">获取页面参数</x-button>
      <x-button type="primary" @click.stop="download">下载（Native 独有）</x-button>
      <x-button type="primary" @click.stop="backView">后退（Native 独有）</x-button>
    </div>
    <div class="res-container">
      <div>{{res}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Switch from './components/switch'
  import XButton from './components/x-button'

  import bridgeNative from '../../methods/bridge/native'
  import bridgeWeb from '../../methods/bridge/web'

  const apiHost = 'http://112.74.217.65:6620'

  export default {
    components: {
      Switch, XButton
    },
    data () {
      return {
        hasNative: true,  // bridge 模式
        bridge: null,
        res: ''
      }
    },
    created () {
      if (!window.localStorage) {
        window.alert('WebView 不支持 localStorage')
      }
      this.hasNative = window.localStorage.__hasNative === 'true'
      this.bridge = this.hasNative ? bridgeNative : bridgeWeb
    },
    methods: {
      // AJAX接口代理请求
      requestGET () {
        let data = {
          name: 'aidenZou',
          age: 18,
          method: 'GET'
        }
        this.bridge.request({
          url: apiHost + '/test/api/get',
          method: 'GET',
          data: data,
          callback: this.pring
        })
      },
      requestJSONP () {
        let data = {
          name: 'aidenZou',
          age: 18,
          method: 'JSONP',
          format: 'jsonp'
        }
        this.bridge.request({
          url: apiHost + '/test/api/get',
          method: 'JSONP',
          data: data,
          callback: this.pring
        })
      },
      requestPOST () {
        let data = {
          name: 'aidenZou',
          age: 18,
          method: 'POST'
        }
        this.bridge.request({
          url: apiHost + '/test/api/post',
          method: 'POST',
          data: data,
          callback: this.pring
        })
      },
      // 页面跳转
      redirect () {
        // var url = (util.isAPP ? '/templates/' : './') + 'activity-detail.html'
        let url = 'http://wx.qfpay.com/near-v2/bridge-test.html'
        let params = {
          name: 'aidenZou',
          age: 18,
          method: 'redirect'
        }
        this.bridge.redirect(url, params)
      },
      // 获取页面参数
      getPageParam () {
        this.bridge.getPageParam((params) => {
          this.pring(params)
        })
      },
      // 下载（Native 独有）
      download () {
        let url = 'http://near.m1img.com/op_upload/8/146010664779.png'
        this.bridge.download({url: url})
      },
      // 后退（Native 独有）
      backView () {
        this.bridge.backView()
      },
      pring (data) {
        this.res = JSON.stringify(data)
      }
    },
    events: {
      'on-change' (hasNative) {
        window.localStorage.__hasNative = hasNative
        this.bridge = hasNative ? bridgeNative : bridgeWeb
      }
    }
  }
</script>

<style scoped lang="scss" type="scss" rel="stylesheet/scss">
  body {
    width: 100%;
  }

  .header-container {
    margin: 10px auto; /*no*/
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px; /*no*/
    height: 80px; /*no*/
    border-radius: 50%;
    background-color: #FF8100;
    color: #fff;
  }

  .btn-container {
    padding: 20px; /*no*/
    border-top: 1px solid #d9d9d9;
  }

  .res-container {
    margin: 20px; /*no*/
    word-break: break-all;
    /*background-color: #e5e5e5;*/
    border-radius: 5px; /*no*/
    padding: 10px; /*no*/
    div {
    }
  }
</style>
