<template>
  <div class="hot-detail">
    <div>
      <div class="hot-detail-title">
        <div class="hot-detail-img" @click="postPreviewRecord()">
          <img :src="act.subCover">
        </div>
        <div class="hot-detail-des">
          <h1>{{act.subTitle}}</h1>
          <p>{{{act.subBrief}}}</p>
        </div>
        <div class="time">
          活动时间：{{act.startTime | formatTime 'yyyy.M.d'}}-{{act.expireTime | formatTime 'M.d'}}
        </div>
      </div>
      <div class="hot-detail-content">
        <img :src="act.subContent" alt="" style="width: 100%">
      </div>
      <div v-if="act.subCarousel.length === 1" class="single">
        <img :src="act.subCarousel[0]"/>
      </div>
      <div class="swiper-container" v-else>
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in act.subCarousel">
            <img :src="item">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="join-btn" :class="{'bg-color': isBaipaiApp}" v-link="{ name: 'preview', params: {activityid: activity_id,status: is_end} }" @click="postPreviewRecord2()">立即加入</div>
    </div>
  </div>
</template>
<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../styles/common";
  @import "../../styles/swiper/swiper.min.css";
  @mixin contentH2 {
    h2 {
      position: relative;
      font-size: 28px;
      color: #FF8100;
      line-height: 38px;
      text-align: center;
      &:before,&:after {
        content: '';
        position: absolute;
        display: block;
        width: 260px;
        height: 2px;
        background: #FFEDD6;
      }
      &:before {
        left: 0;
        top: 16px;
      }
      &:after {
        right: 0;
        top: 16px;
      }
    }
  }
  .margin-top{
    margin-top: 10px;
  }
  .margin-left{
    margin-left: 93px;
  }
  .animated {
    -webkit-animation-duration: .3s;
    animation-duration: .3s;
  }
    .hot-detail{
      margin: 0 auto;
      padding-bottom: 118px;
      .hot-detail-title .hot-detail-img{
        height: 562px;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .hot-detail-des{
        position: absolute;
        top: 436px;
        left: 20px;
        right: 20px;
        background-color: #fff;
        padding: 30px 36px 20px;
        border-radius: 8px;
        text-align: center;
        h1 {
          font-size: 34px;
          color: #2F323A;
          margin: 0 auto 20px;
          font-weight: bold;
          position: relative;
          display: inline-block;
          &:before,&:after {
            content: '';
            position: absolute;
            display: block;
            width: 8px;
            height: 8px;
            background-color: #FF8100;;
            border-radius: 8px;
          }
          &:before {
            left: -16px;
            top: 16px;
          }
          &:after {
            right: -16px;
            top: 16px;
          }
        }
        p {
          font-size: 28px;
          color: #606470;
          line-height: 46px;
          text-align: center;
        }
      }
      .time {
        margin-top: -.6rem;
        height: 228px;
        padding-top: 156px;
        background: $black url('assets/stroke.svg') center center no-repeat;
        background-size: 100% 100%;
        font-size: 28px;
        color: #FFFFFF;
        text-align: center;
      }
      .hot-detail-content {
        padding: 0 30px;
        .hot-detail-play{
          position: relative;
          padding-top: 30px;
          @include contentH2;
          h3 {
            font-size: 30px;
            color: #2F323A;
            line-height: 30px;
            margin: 40px auto 16px;
          }
          p {
            font-size: 28px;
            color: #606470;
            line-height: 48px;
            margin: 20px auto 0;
          }
        }
        .hot-detail-process{
          position: relative;
          padding-top: 30px;
          @include contentH2;
          h3 {
            font-size: 30px;
            color: #2F323A;
            line-height: 30px;
            margin: 40px auto 16px;
            i {
              display: inline-block;
              background: $lightBlack;
              font-size: 24px;
              color: #FFFFFF;
              width: 32px;
              height: 32px;
              line-height: 32px;
              border-radius: 32px;
              text-align: center;
              vertical-align: text-bottom;
              margin-right: 6px;
            }
          }
          p {
            font-size: 28px;
            color: #606470;
            line-height: 42px;
          }
          a {
            font-size: 34px;
            color: #FF8100;
            display: block;
            height: 88px;
            line-height: 88px;
            text-align: center;
            border: 2px solid #FF8100; /* px */
            border-radius: 6px;
            margin-top: 20px;
            img {
              width: 30px;
              height: 30px;
              vertical-align: -.05rem;
              margin-right: 16px;
            }
          }
          article {
            margin-top: 28px;
            h5 {
              font-size: 28px;
              color: #2F323A;
              line-height: 42px;
              span {
                color: #FF8100;
              }
            }
            > div {
              display: flex;
              p {
                &.line {
                  flex: 1;
                  background: url("assets/line.png") center center repeat-x;
                  background-size: 26px 3px; /*px*/
                  margin: 0 24px;
                }
              }
            }
          }
        }
      }
      .single, .swiper-container{
        width: 690px;
        height: 518px;
        margin: 0 auto;
        margin-top: 30px;
        border-radius: 6px;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .swiper-wrapper{
        width: 750px;
      }
      .swiper-slide{
        width: 690px;
        height: 518px;
      }
      .swiper-container {
        padding: 0;
      }
      .swiper-pagination{
        position: relative;
        bottom: 46px;
      }
      .swiper-pagination-bullet{
        width: 14px;
        height: 14px;
        background-color: transparent;
        border: 2px solid #fff; /*px*/
        border-radius: 14px;
      }
      .swiper-pagination-bullet-active{
        background-color: transparent!important;
      }
      .swiper-pagination-bullets .swiper-pagination-bullet{
        margin: 0 6px;
      }
      .join-btn{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 99;
        width: 750px;
        line-height: 88px;
        margin: 0 auto;
        text-align: center;
        background: #FF8100;
        font-size: 34px;
        color: #FFFFFF;
        &.bg-color {
          background-color:#3971E0
        }
      }
    }
</style>
<script type="text/ecmascript-6">
  /* global Swiper, _hmt */
  import config from '../../methods/config'
  import util from '../../methods/util'
//  import bridge from '../../methods/bridge'
  export default{
    data () {
      return {
        activity_id: '',
        is_end: '',
        act: {},
        isBaipaiApp: true
      }
    },
    created: function () {
      this.isBaipaiApp = util.isBaipaiApp()
    },
    attached () {
      /* eslint-disable no-new */
      new Swiper('.swiper-container', {
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        paginationElement: 'li'
      })
    },
    route: {
      data: function (transition) {
        this.activity_id = transition.to.params.activityid
        this.is_end = transition.to.params.status
        this.$http.get(config.aHost + 'api/operation/hotMarketingGetData/' + this.activity_id).then((response) => {
          // success callback
          this.setData(response.data)
          this.$root.statistics = response.data.buryName
        }, (response) => {
          // error callback
        })
      }
    },
    methods: {
      setData (response) {
        this.act = response
      },
      postPreviewRecord1 () {
        let _this = this
        _hmt.push(['_trackEvent', _this.$root.statistics + '-activity', _this.$root.statistics + '-activity-xiazaihaibao', 'click'])
      },
      postPreviewRecord2 () {
        let _this = this
        _hmt.push(['_trackEvent', _this.$root.statistics + '-activity', _this.$root.statistics + '-activity-lijijiaru', 'click'])
      }
    }
  }
</script>
