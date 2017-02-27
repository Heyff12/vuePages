<template>
  <div class="post-content">
    <div class="post-preview" v-show="loadingSatus">
      <div><img :src="pic_url"></div>
      <div v-link="{ name: 'postSend', params: {activityid: activity_id,status: is_end} }" v-show="is_end==0?true:false" @click="redirectEmailRecord()">发送打印版海报到邮箱</div>
      <div v-show="is_end==0?false:true" @click="endTip()">发送打印版海报到邮箱</div>
    </div>
    <loading :visible="$loadingRouteData"></loading>
    <dialog :visible="visibleDialog" ok-text="我知道了">活动结束啦,快去看看进行中的活动吧~</dialog>
  </div>
</template>
<style lang="scss" type="scss" rel="stylesheet/scss">
  .post-preview{
    position: absolute;
    top: 0;
    width: 750px;
    height: 100%;
    left: 50%;
    margin-left: -375px;
    padding-top: 26px;
    padding-bottom: 30px;
    background-color: #f7f7f7;
    div:nth-child(1){
      width: 688px;
      height: 935px;
      margin: 0 auto;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    div:nth-child(2){
      /*margin: 30px auto;*/
      /*margin-top: 30px;*/
      position: fixed;
      bottom: 0;
      width: 750px;
      height: 88px;
      text-align: center;
      background: #FF8100;
      font-family: PingFangSC-Regular;
      font-size: 34px;
      color: #FFFFFF;
      line-height: 88px;
    }
    div:nth-child(3){
      /*margin: 30px auto;*/
      /*margin-top: 30px;*/
      position: fixed;
      bottom: 0;
      width: 750px;
      height: 88px;
      text-align: center;
      background: #3D3D3D;
      font-family: PingFangSC-Regular;
      font-size: 34px;
      color: #FFFFFF;
      line-height: 88px;
    }
  }
</style>
<script type="text/ecmascript-6">
  /* global _hmt */
  /*eslint-disable no-unused-vars*/
    import dialog from '../../components/dialog/dialogMask'
    import loading from '../../components/loading/juhua.vue'
    import util from '../../methods/util'
    import config from '../../methods/config'
    if (util.isAPP) {
      var bridge = require('../../methods/bridge/native')
    } else {
      bridge = require('../../methods/bridge/web')
    }
    export default{
      data () {
        return {
          activity_id: '',
          is_end: '',
          loadingSatus: false,
          pic_url: '',
          visibleDialog: false
        }
      },
      components: {
        loading, dialog
      },
      route: {
        data (transition) {
          this.activity_id = transition.to.params.activityid
          this.is_end = transition.to.params.status
          let data = {
            activity_id: this.activity_id
          }
          bridge.request({
            url: config.o_host + 'mchntactv/prevsee',
//            url: 'http://172.100.102.101:6204/mchntactv/prevsee',
            method: 'POST',
            data: data,
            callback: (response) => {
              transition.next({})
              this.loadingSatus = true
              this.pic_url = response.data.pic_url
            }
          })
        }
      },
      methods: {
        endTip () {
          this.visibleDialog = true
          _hmt.push(['_trackEvent', 'new-term', 'new-term-send-print-post-expired', 'click'])
        },
        redirectEmailRecord () {
          _hmt.push(['_trackEvent', 'new-term', 'new-term-send-print-post', 'click'])
        },
        closeDialog () {
          this.visibleDialog = false
        }
      },
      events: {
        onOk () {
          this.closeDialog()
        }
      }
    }
</script>
