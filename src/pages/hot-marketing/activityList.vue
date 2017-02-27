<template>
  <div id="index">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="value in actList">
          <div>
            <div class="hot-activity-time">{{value.startTime | formatTime 'M月d日'}}-{{value.expireTime | formatTime 'M月d日'}}</div>
            <div class="hot-activity-view">
              <a v-link="{ name: 'detail', params: { activityid: value._id, status: value.isEndAct?1:0}}">
                <div class="img-box">
                  <img :src="value.cover"/>
                  <div v-show="value.isEndAct==1?true:false">
                    <div class="end-tag" >
                      <img src="./assets/hot-activity-end.png">
                    </div>
                    <div class="end-info">已结束</div>
                    <div class="end-mask"></div>
                  </div>
                  <div class="icon-is-new" v-if="value.isNewAct==1?true:false"></div>
                </div>
                <div class="hot-activity-describle">
                  <div class="hot-activity-title">{{value.title}}</div>
                  <div class="hot-activity-content">{{value.brief}}</div>
                  <div class="hot-activity-count">
                    <p>参与商家 <span>{{value.trueCount}}</span></p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../styles/common";
  @import "../../styles/swiper/swiper.min.css";
  body{
    background-color: #F7F7F7;
  }
  html,body {
    min-height: 100%;
  }
  #app {
    height: 100%;
    min-height: 100%;
  }
  #index {
    .swiper-container {
      /*width: 600px;*/
      margin: 0 auto;
      overflow: visible;
      min-height: 100%;
      padding: 0 1rem;
      .swiper-slide {
        width: 600px;
      }
      .swiper-pagination {
        position: relative;
        .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          border: 4px solid #A7A9AE;
          background-color: transparent;
        }
        .swiper-pagination-bullet-active {
          background-color: #606470;
          border: 4px solid #606470;
        }
      }
    }
    .hot-activity-time{
      margin-top: 30px;
      text-align: center;
      font-size: 30px;
      color: #606470;
    }
    .hot-activity-view{
      position: relative;
      background-color: #FFFFFF;
      box-shadow: 0 4px 20px 0 #C6C6C6;
      border-radius: 6px;
      margin: 30px auto;
      padding-bottom: 40px;
      overflow: hidden;
      .img-box {
        position: relative;
        img{
          display: block;
          width: 100%;
        }
        .end-tag{
          width: 130px;
          height: 130px;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 2;
        }
        .end-info{
          width: 130px;
          height: 130px;
          text-align: center;
          padding-top: 23px;
          position: absolute;
          right: 0;
          top: 0;
          transform: rotate(45deg);
          font-size: 26px;
          color: #FFFFFF;
          z-index: 2;
        }
        .end-mask {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.4);
          z-index: 1;
        }
      }
      .hot-activity-describle div{
        text-align: center;
        word-wrap: break-word;
        word-break: normal;
        &.hot-activity-title{
          font-size: 32px;
          color: #2F323A;
          padding: 0 26px;
          margin-top: 22px;
          font-weight: bold;
        }
        &.hot-activity-content{
          margin: 13px auto 0;
          padding: 0 26px;
          font-size: 28px;
          color: #606470;
          line-height: 48.95px;
        }
      }
      .icon-is-new{
        position: absolute;
        z-index: 10;
        top: 0;
        right: 0;
        width: 130px;
        height: 130px;
        background: url('assets/isNew.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .hot-activity-count{
      background: #FFEBD3;
      border-radius: 200px;
      width: 352px;
      line-height: 60px;
      height: 60px;
      margin: 22px auto 32px;
      text-align: center;
      p {
        font-size: 27.3px;
        color: #2F323A;
        span {
          font-size: 36px;
          color: #FF8100;
        }
      }
    }
  }

</style>
<script type="text/ecmascript-6">
  /* global Swiper */
  /*eslint-disable */
    import config from '../../methods/config'
    export default{
      data () {
        return {
          visible: '',
          actList: []
        }
      },
      ready () {
        this.$http.get(config.aHost + 'api/operation/hotMarketingGetData').then((response) => {
          // success callback
          this.setData(response.data)
        }, (response) => {
          // error callback
        })
      },
      attached () {
      },
      methods: {
        setData (response) {
          this.actList = response
        },
        isNew(str) {
          {
            let _this = this
            let startTime = str.replace(/\-/g, '/')
            startTime = new Date(startTime).getTime()
            let currentTime = _this.current_datetime.replace(/\-/g, '/')
            currentTime = new Date(currentTime).getTime()
            return (currentTime - startTime < 259200000)
          }
        }
      },
      watch: {
        actList () {
          /* eslint-disable no-new */
          let _this = this
          let mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            pagination: '.swiper-pagination',
            paginationElement: 'li',
            touchMoveStopPropagation: false,
            iOSEdgeSwipeDetection: true,
            iOSEdgeSwipeThreshold: 20,
            effect: 'coverflow',
            initialSlide: _this.actList.length - 1,
            coverflow: {
              rotate: 0,
              stretch: -40,
              depth: 180,
              modifier: 1,
              slideShadows: false
            }
          })
          mySwiper.update()
        }
      }
    }
</script>
