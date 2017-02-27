<template>
  <div class="">
    <div class="c-loading-container" v-if="isLoading">
      <loading :visible="isLoading"></loading>
    </div>
    <toast :msg.sync="msg"></toast>
    <div id="c-restaurant-content-box" class="l-r">
      <div class="list-group-box" v-show="groupList.length">
        <scroller class="scroller-left" lock-x v-ref:scrollerleft height="100%">
          <div class="list-group">
            <ul class="">
              <li v-for="group in groupList" :class="{'active': selectIndex===$index}"
                  @click="select($index, group)">
                <div>{{group.cate_name}}
                </div>
              </li>
            </ul>
          </div>
        </scroller>
      </div>
      <div class="l_auto shopmenu-list-container">
        <scroller class="scroller-right" lock-x v-ref:scroller height="100%">
          <div class="shopmenu-list">
            <no-data v-if="!groupList.length" class="no-data"></no-data>
            <ul class="listgroup" v-else>
              <li v-for="goods in groupList[selectIndex].goods" class="list-item">
                <div class="l-r wrap">
                  <div class="list-img">
                    <div class="shelve-out-mask" v-show="!goods.available"></div>
                    <div :style="{'background-image': 'url(' + goods.img + '_120s)'}"></div>
                  </div>
                  <div class="l_auto list-content">
                    <h4 class="title one_text" :class="{'shelve-out-font': !goods.available}">{{goods.name}}</h4>
                    <p class="price" :class="{'shelve-out-font': !goods.available}"><em class="dollar">¥&nbsp;</em>
                      {{goods.spec_list.length ? goods.spec_list[0].txamt : goods.txamt | formatCurrency}}
                    </p>
                  </div>
                </div>
                <div class="shelve-out" v-show="!goods.available"></div>
                <!--商品状态-->
                <span class="business-state" :class="{under: !goods.available}" @click="changeState(goods.available, goods.unionid, selectIndex, $index)">
                  {{goods.available ? '下架' : '上架'}}
                </span>
              </li>
            </ul>
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* global Vue */
  import Config from '../../methods/config'
  import util from '../../methods/util'
  import Scroller from 'vux-components/scroller'

  import loading from 'components/loading/loading'
  import toast from 'components/tips/toast'
  import noData from './noData.vue'
  export default {
    components: {
      loading, Scroller, noData, toast
    },
    data () {
      return {
        isLoading: true,
        msg: '',
        selectIndex: 0, // 激活分类
        groupList: [],  // 分类列表
        groupLength: 0, // 品类数量
        expireList: []  // 已下架列表
      }
    },
    computed: {
    },
    created () {
      Vue.http.options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
      }
      Vue.http.options.xhr = {
        withCredentials: true
      }
      Vue.http.options.emulateJSON = true
    },
    ready () {
      this.$http({
        url: Config.shHost + 'goods/b/operating',
//        url: 'http://172.100.101.106:9099/goods/b/operating',
        method: 'JSONP',
        data: {
          format: 'jsonp'
        }
      }).then(function (response) {
        this.isLoading = false
        // success callback
        let data = response.data
        if (data.respcd !== Config.code.OK) {
          this.onToast(data.resperr)
          return
        }
        if (util.isEmptyObject(response.data.data)) return
        this.groupList = response.data.data.goods_list
        this.groupLength = this.groupList.length
        this.$nextTick(() => {
          document.getElementsByClassName('list-group-box')[0].style.height = window.innerHeight + 'px'
          document.getElementsByClassName('shopmenu-list-container')[0].style.height = window.innerHeight + 'px'
          this.$refs.scrollerleft.reset()
          this.$refs.scroller.reset()
        })
      }, function (response) {
        // error callback
        this.isLoading = false
        window.alert('服务器错误,请稍后重试!')
      })
    },
    methods: {
      select (index, item) {
        this.selectIndex = index
        this.$nextTick(function () {
          let scroller = this.$refs.scroller
          scroller.reset()
          scroller._xscroll.scrollTop()
        })
      },
      changeState (state, id, rootIndex, index) {
        let data = {
          unionid: id,
          available: Number(!state),
          format: 'cors',
          '_type': 'change_state'
        }
        this.$http({
          url: Config.shHost + 'goods/b/operating',
//          url: 'http://172.100.101.106:9099/goods/b/operating',
          method: 'post',
          data: data
        }).then(function (response) {
          this.isLoading = false
          if (response.data.respcd !== Config.code.OK) {
            this.onToast(response.data.resperr)
            return
          }
          // 修改当前状态
          let currentGoods = this.groupList[rootIndex].goods[index]
          this.groupList[rootIndex].goods[index].available = !currentGoods.available
          // 添加至已下架商品中
          let expireGoods = this.groupList[this.groupLength - 1].goods
          if (!currentGoods.available) {
            expireGoods.unshift(currentGoods)
          } else {
            expireGoods.forEach(function (value, index, array) {
              if (value.unionid === currentGoods.unionid) {
                expireGoods.splice(index, 1)
              }
            })
          }
        }, function (response) {
          // error callback
          this.isLoading = false
          window.alert('服务器错误,请稍后重试!')
        })
      },
      onToast (msg) {
        this.msg = msg
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../styles/common";

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    font-size: 100%;
    vertical-align: baseline;
  }

  ol, ul, li {
    list-style: none;
  }

  // fix Font Boosting
  p, div {
    max-height: 999999px;
  }

  a {
    text-decoration: none;
    &:link, &:visited, &:hover, &:active {
      text-decoration: none;
    }
  }

  em {
    font-style: normal;
  }

  // 文字中划线
  .text-line-through {
    text-decoration: line-through;
  }

  // 美元
  .dollar {
    font-style: normal;
    font-size: 75%;
  }

  .one_text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .l-g_15 {
    line-height: 1.5;
  }

  .btn {
    /*display: inline-block;*/
    appearance: none;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    /*background-image: none;*/
    border: 0;
    outline: 0;
    white-space: nowrap;
    /*line-height: 1.5;*/
    /*padding: 4px 15px;*/
    border-radius: 6px; /*px*/
    user-select: none;
    /*transition: all .3s cubic-bezier(.645, .045, .355, 1);*/
    /*transform: translate3d(0, 0, 0);*/
  }

  .c-loading-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    z-index: 999;
  }

  .no-data {
    height: 300px !important;
  }

  /*左侧分类列表*/
  .list-group-box {
    /*padding-bottom: 104px;*/
    /*height: 100%;*/
    width: 156px;
    background-color: #F7F7F7;
  }

  .list-group {
    /*padding-bottom: 70px;*/
    padding-bottom: 104px;
    li {
      position: relative;
      text-align: center;
      padding: 30px 12px;
      font-size: 28px;
      color: #2F323A;
      border-bottom: 2px solid #E5E5E5; /*px*/

      &.active {
        background-color: #fff;
        color: #FF8100;
      }

      /*&:before {*/
      .count {
        position: absolute;
        display: block;
        top: 4px;
        right: 4px;
        /*padding: 0 10px;*/

        /*padding: 2px 10px;*/
        min-width: 32px;
        height: 32px;
        line-height: 32px;
        border-radius: 16px;
        text-align: center;
        /*font-size: 32px;*/
        font-size: 24px;
        color: #fff;
        background-color: #FD5359;
      }
    }
  }

  /*右侧选菜列表*/
  .shopmenu-list-container {
    overflow: hidden;
    /*padding-bottom: 104px;*/
    height: 100%;
    background-color: #fff;

    & > div:first-child {
      /*background: #f2f2f2;*/
      /*background: url() center 10px no-repeat;*/
      /*background-size: 90px;*/
    }
  }

  .shopmenu-list {
    background-color: #fff;
  }

  li.list-item {
    position: relative;
    padding-left: 24px;
    .wrap {
      position: relative;
      /*align-items: center;*/
      padding: 24px 0;
      border-bottom: 2px solid #E5E5E5; /*px*/
    }
    .list-img {
      position: relative;
      display: block;
      left: 10px;
      top: 0;
      width: 120px;
      height: 120px;
      background: url(assets/default_food_pic.png) center center no-repeat;
      /*background-size: 50px 50px;*/
      background-size: 100%;
      > div {
        width: 120px;
        height: 120px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top center;
      }
    }
    .list-content {
      overflow: hidden;
      padding-left: 24px;
      .title {
        font-size: 32px;
        /*line-height: 32px;*/
        color: #2f323a;
        margin-bottom: 50px;
        transition: all .2s linear;
      }

      .description {
        height: 33px;
        margin: 8px 0;
        font-size: 26px;
        color: #8a8c92;
        line-height: 34px;
      }

      .old-price {
        font-size: 26px;
        height: 34px;
        line-height: 34px;
        color: #8A8C92;
      }
      .price {
        font-size: 30px;
        color: #FF8100;
        line-height: 40px;
        transition: all .2s linear;
      }
    }
  }

  .goods-select-container {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .select {
    button {
      border: 0 !important;
      background-color: #FF8100 !important;
      color: #fff !important;
    }
  }

  .totop1-transition {
    transition: all .3s ease;
  }

  .totop1-enter, .totop1-leave {
    transform: translateY(100%);
    /*opacity: 0;*/
  }

  .spec-btn {
    /*position: absolute;*/
    /*right: 0;*/
    /*bottom: 0;*/

    width: 196px;
    height: 100px;
    button {
      padding: 0 20px;
      /*width: 156px;*/
      height: 60px;
      border: 2px solid #C2C2C2;  /*px*/
      border-radius: 30px;
      background-color: #fff;
      font-size: 30px;
      color: #FF8100;
    }
  }
  .business-state {
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: block;
    width: 128px;
    height: 60px;
    text-align: center;
    color: #FF8100;
    font-size: 30px;
    border-radius: 52px;
    border: 2px solid #C2C2C2;
    line-height: 60px;
    background-color: #fff;
    z-index: 100;
    transition: all .2s linear;
    &.under {
      color: #fff;
      background-color: #FF8100;
      border: 2px solid #fff;
    }
  }
  .shelve-out {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 200;
    width: 134px;
    height: 134px;
    background: url('./assets/shelve-out.png') center center no-repeat;
    background-size: 100% 100%;
    transition: all .2s linear;
  }
  .shelve-out-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.7);
    transition: all .2s linear;
  }
  .shelve-out-font {
    color: #C2C2C2!important;
  }
</style>
