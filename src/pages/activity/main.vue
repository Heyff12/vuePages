<template>
  <div id="qf-container">
    <div id="app" class="p-activity">
      <div class="activity-list" v-show="ondated.length && !loading" v-cloak>
        <h2 class="c-title">在进行</h2>
        <ul>
          <li v-for="activity in ondated">
            <section class="activity" @click="goUrl(activity)">
              <!--<a :href="'./activity-detail.html?id='+activity.id" style="display: block;">-->
              <div class="activity-img_box">
                <img :src="activity.bg_url"/>
              </div>
              <div class="activity-info">
                <h3>{{ activity.title }}</h3>
                <p>{{ activity.content }}</p>
                <span>{{ activity.start_time }} - {{ activity.expire_time }}</span>
              </div>
              <!--</a>-->
            </section>
          </li>
        </ul>
      </div>

      <div class="activity-list activity-end-list" v-show="outdated.length && !loading" v-cloak>
        <h2 class="c-title">已结束</h2>
        <ul>
          <li v-for="old_activity in outdated">
            <section class="activity" @click="goUrl(old_activity)">
              <!--<a :href="'./activity-detail.html?id='+old_activity.id" style="display: block;">-->
              <div class="activity-img_box">
                <img :src="old_activity.bg_url">
                <div class="make">
                  <img src="./assets/status_end.png"/>
                </div>
              </div>
              <div class="activity-info">
                <h3>{{ old_activity.title }}</h3>
                <p>{{ old_activity.content }}</p>
                <span>{{ old_activity.start_time }} - {{ old_activity.expire_time }}</span>
              </div>
              <!--</a>-->
            </section>
          </li>
        </ul>
      </div>
      <loading :class="{'h-100': ondated.length}" :visible="loading"></loading>
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
        loading: false, // 是否处于加载中
        msg: '',
        ondated: [],    // 当前活动列表
        outdated: []   // 已结束活动列表
      }
    },
    created: function () {
      // var params = method.getRequestParams();
      // // if (!params) {
      // //     return
      // // }
      // this._swx = params._swx;
      // this.getList();

      var self = this
      if (!util.isAPP) {
        bridge.getPageParam(function (params) {
          params && (self._swx = params._swx || '')
          if (window.localStorage && self._swx) {
            window.localStorage._swx = self._swx
          }
          self.getList()
        })
      } else {
        self.getList()
      }
    },
    ready: function () {
    },
    methods: {
      getList: function () {
        if (this.loading) {
          return
        }
        this.loading = true

        var data = {
          outdated_size: 5    // 显示过期的数量， 默认为5条
        }
        if (!util.isAPP) {
          data.format = 'jsonp'
          data.cross_domain = 'yesyes'
          data._swx = this._swx
        }

        bridge.request({
          url: config.o_host + 'mchnt/activity/apply_list',
          method: 'JSONP',
          // method: 'GET',
          // xhr: {
          //     withCredentials: true
          // },
          data: data,
          // callback: callback
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
        this.$set('ondated', data.data.ondated)
        this.$set('outdated', data.data.outdated)
        this.loading = false
      },
      goUrl: function (activity) {
        var url = (util.isAPP ? '/templates/' : './') + 'activity-detail.html'
        var params = {
          id: activity.id
        }
        if (this._swx && !window.localStorage) {
          params._swx = this._swx
        }
        bridge.redirect(url, params)
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

  .p-activity {
    padding: 20px;

    .c-title {
      position: relative;
      text-align: center;
      font-size: 28px; /*px*/
      //font-family: PingFangSC-Regular;
      color: #8A8C92;
      margin: 20px;
      &:first-child {
        margin-top: 0;
      }

      &:before, &:after {
        content: '';
        position: absolute;
        top: 50%;
        display: inline-block;
        height: 1px;
        width: 250px;
        margin: 0 16px;
        border: 1px solid #E5E5E5; /*no*/
      }
      &:before {
        left: 0;
      }
      &:after {
        right: 0;
      }
    }

    h2, h3 {
      margin: 0;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        margin-bottom: 20px;
      }
    }
    .activity {
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12); /*px*/
    }
    .activity-img_box {
      /* 710x256 */
      width: 710px;
      height: 256px;
      overflow: hidden;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .activity-info {
      padding: 28px;
      padding-top: 24px;
      padding-bottom: 20px;
      h3 {
        //font-family: PingFangSC-Regular;
        font-size: 30px; /*px*/
        color: #FF8100;
      }
      p {
        margin: 10px 0;
        font-size: 28px; /*px*/
        color: #333333;
      }
      span {
        //font-family: PingFangSC-Regular;
        font-size: 26px; /*px*/
        color: #8A8C92;
      }

    }
    .p-activity-list {
      li:last-child {
        //margin-bottom: 0;
      }
      li:nth-last-child(1) {
        margin-bottom: 0;
      }
    }

    //已结束
    .activity-end-list {
      .activity-img_box {
        position: relative;
      }
      .make {
        position: absolute;
        top: 0;
        padding: 50px;
        text-align: center;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: .8;
        z-index: 99;
        img {
          width: 164px;
          height: 154px;
        }
      }
    }
    .c-loading {
      height: 400px !important;
    }
  }

</style>
