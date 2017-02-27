<template>
  <div id="app" id="qf-container" v-cloak>
    <div class="p-activity-detail">
      <div v-show="data.id">
        <div class="activity-img_box"><img :src="data.bg_url"></div>
        <div class="activity-describe_box">
          <section>
            <h3>活动名称</h3>
            <p>{{ data.title }}</p>
          </section>
          <section>
            <h3>活动时间</h3>
            <p>{{ data.start_time }} 至 {{ data.expire_time }}</p>
          </section>
          <section>
            <h3>活动内容</h3>
            <p>{{ data.content }}</p>
          </section>
        </div>
        <div class="activity-info_box">
          <section>
            <h3>活动规则</h3>
            <ul>
              <li v-for="_item in data.rule">{{ _item }}</li>
            </ul>
          </section>

          <section>
            <h3>海报说明</h3>
            <ul>
              <li v-for="_item in data.poster_content">{{ _item }}</li>
            </ul>
            <p id="action_show_poster" class="show_poster" v-if="data.poster_url" @click="setStatus('show_poster')">
              预览海报</p>
          </section>
        </div>
        <a class="btn btn_download" :href="data.poster_url" download="activity"
           v-if="!is_app && data.poster_url && !is_wx" @click="download(data.poster_url)">下载活动海报</a>
        <a class="btn btn_download" v-if="is_app && data.poster_url" @click="download(data.poster_url)">下载活动海报</a>

        <div id="poster" class="poster" v-show="data.poster_url && status==='show_poster'" transition="zoomInOut"
             @click="setStatus('init')">
          <div class="guide" v-show="!is_app">
            <p>长按选择 保存到手机</p>
            <div class="down">
              <svg width="17px" height="10px" viewBox="0 0 17 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch Beta 3.7 (28127) - http://www.bohemiancoding.com/sketch -->
                <title>Fill 1 Copy 3</title>
                <desc>Created with Sketch Beta.</desc>
                <defs></defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="新功能引导－4格－中" transform="translate(-136.000000, -258.000000)" fill="#FFFFFF">
                    <path
                      d="M141.122872,255.583606 C140.788701,255.256069 140.246846,255.256069 139.912675,255.583606 C139.578504,255.911143 139.578504,256.442162 139.912675,256.769777 L146.613935,263.337915 L139.912675,269.90613 C139.578504,270.233667 139.578504,270.764764 139.912675,271.092301 C140.246846,271.419838 140.788701,271.419838 141.122872,271.092301 L148.412077,263.947814 C148.583541,263.779754 148.666407,263.558171 148.66187,263.337915 C148.666407,263.117736 148.583541,262.896153 148.412077,262.728094 L141.122872,255.583606 Z"
                      id="Fill-1-Copy-3"
                      transform="translate(144.162046, 263.337954) rotate(-270.000000) translate(-144.162046, -263.337954) "></path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div class="center"><img :src="data.poster_url_small"/></div>
          <!--<div class="placeholder"></div>-->
        </div>
      </div>
      <loading :visible="loading"></loading>
      <toast :msg="msg"></toast>
    </div>
  </div>
</template>

<script>
  import config from '../../methods/config'
  import util from '../../methods/util'
  import bridge from '../../methods/bridge'
  import toast from '../../components/tips/toast'
  import loading from '../../components/loading/loading.vue'

  export default {
    components: {
      toast, loading
    },
    data () {
      return {
        _swx: '',
        id: null,  // 当前活动id
        loading: false, // 是否处于加载中
        is_wx: util.isWX, // 是否为微信容器
        is_app: util.isAPP, // 是否为APP容器
        msg: '',
        status: 'init', // init: 初始状态; show_poster: 预览海报状态
        data: {}
      }
    },
    created: function () {
    },
    ready: function () {
      var self = this
      bridge.getPageParam(function (params) {
        if (!params || !params.id) {
          self.msg = '参数错误！'
          return
        }

        self.id = params.id
        self._swx = (window.localStorage && window.localStorage._swx) || params._swx || ''
        self.getDetail()
      })
    },
    methods: {
      getDetail: function () {
        this.loading = true
        var self = this
        var data = {
          // format: 'JSONP',
          // cross_domain: 'yesyes',
          // _swx: self._swx,
          id: self.id
        }
        if (!util.isAPP) {
          data.format = 'jsonp'
          data.cross_domain = 'yesyes'
          data._swx = this._swx
        }

        // this.$http.jsonp(config.o_host + 'mchnt/activity/apply_info', data, {})
        //     .then(function (response) {
        //         var data = response.data
        //         this.setData(data)
        //     }, function (response) {
        //         // error callback
        //         this.msg = '服务器繁忙，请稍候再试！'
        //         this.loading = false
        //     })

        bridge.request({
          url: config.o_host + 'mchnt/activity/apply_info',
          method: 'JSONP',
          // xhr: {
          //     withCredentials: true
          // },
          data: data,
          callback: this.setData
        })
      },
      setData: function (response) {
        var data = response
        if (data.respcd === config.code.SESSIONERR) {   // 用户未登录
          this.loading = false
          this.msg = data.resperr
          window.location.href = config.o_host + 'mchnt/activity/apply_entrance?redirect_url=' + encodeURIComponent(window.location.href)
          return
        } else if (data.respcd !== config.code.OK) {   // 出现错误
          this.loading = false
          this.msg = data.resperr
          return
        }
        this.$set('data', data.data)
        // 小图
        this.data.poster_url_small = this.data.poster_url ? (this.data.poster_url + '_900') : ''
        this.loading = false
      },
      setStatus: function (status) {
        this.status = status
      },
      download: function (url) {
        if (util.isAPP) {
          bridge.download({url: url})
        }
        return
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  @import "../../styles/main";

  $c_info: #8A8C92;
  $c_error: #FF8100;
  $c_success: #3CBB0B;

  // fix Font Boosting
  p, div {
    max-height: 999999px;
  }

  a, a:link, a:visited, a:hover {
    text-decoration: none;
  }

  .p-activity-detail {
    padding-bottom: 88px;
    $border-c: #E5E5E5;
    h3, p {
      margin: 0;
      padding: 0;
      font-weight: initial;
    }
    h3 {
      font-size: 28px; /*px*/
      color: #8A8C92;
    }
    .activity-img_box {
      /* 710x256 */
      width: 750px;
      height: 270px;
      overflow: hidden;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .activity-describe_box {
      padding: 0 30px;
      //height: 352px;
      background-color: #fff;
      //border-top: 1px solid $border-c;  /*no*/
      border-bottom: 1px solid $border-c; /*no*/

      section {
        //height: 114px;
        border-top: 1px solid $border-c; /*no*/
        padding: 20px 0;
        &:first-child {
          border-top: none;
        }

        p {
          margin-top: 5px;
          font-size: 30px; /*px*/
          color: #2F323A;
        }
      }
    }

    .activity-info_box {
      padding: 26px;
      //padding-bottom: (26+88)px;
      //margin-bottom: 88px;

      section {
        padding-top: 26px;
        border-top: 1px solid $border-c; /*no*/
      }
      section:first-child {
        padding-top: 0;
        border-top: none;
      }
      ul {
        padding-left: 30px;
        list-style: none;
      }
      li {
        line-height: 50px;
        font-size: 28px; /*px*/
        color: #2F323A;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          background: #E5E5E5;
          width: 10px;
          height: 10px;
          //top: 19px; /*px*/
          top: 20px;

          left: -20px;
          border-radius: 50%;
        }
      }
      .show_poster {
        padding-left: 40px;
        font-size: 30px; /*px*/
        color: #FC4E4E;
      }
    }

    .btn {
      display: inline-block;
      margin-bottom: 0;
      //padding: .5em 1em;
      //font-size: 1.6rem;
      font-weight: 400;
      line-height: 88px;
      text-align: center;
      white-space: nowrap;
      background-image: none;
      cursor: pointer;
      outline: 0;
      user-select: none;
    }
    .btn_download {
      position: fixed;
      padding: 0;
      bottom: 0;
      height: 88px;
      line-height: 88px;
      width: 100%;
      max-width: 10rem;
      background-color: #FC4E4E;
      color: #fff;
      border: none;
      font-size: 34px; /*px*/
    }

    //海报
    .poster {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #2f323a;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .guide,
      .placeholder {
        flex: 1;
        color: #fff;
      }

      .guide {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          padding-bottom: 20px;
          text-align: center;
          font-size: 28px; /*px*/
          color: #fff;
        }
        .down {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 60px;
          svg {
            height: 40px;
            width: 40px;
            animation: start 1.5s infinite ease-in-out;
          }
        }
      }
      .center {
        width: 750px;
        height: 1000px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }

    @keyframes start {
      0% {
        opacity: 0;
      }
      30% {
        opacity: .1;
        transform: translate(0, -10px);
      }
      60% {
        opacity: 1;
        transform: translate(0, 0);
      }
      80% {
        opacity: .1;
        transform: translate(0, 10px);
      }
      100% {
        opacity: 0;
      }
    }

    .c-loading {
      height: 400px !important;
    }
  }

  // iphone4 下屏幕 height较小
  [data-dpr="2"] .p-activity-detail .center {
    height: 900px !important;
  }
</style>
