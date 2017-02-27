<template>
  <div class="content">
    <div class="activity-email">
      <div>我们会于1小时内发送打印版海报到您的邮箱</div>
      <div>
        <h4>邮箱</h4>
        <input type="text" placeholder="liu******@163.com" v-model="emailAdress">
      </div>
    </div>
    <div class="send-btn" @click="sendPost()">发送</div>
    <div v-show="visible" class="successTip">
      <div>预计1小时内发送至您的邮箱</div>
      <div>请尽快打印海报</div>
      <div @click="backDetail()">我知道了</div>
    </div>
    <toast :msg.sync="toast_msg"></toast>
    <mask :visible="visible"></mask>
    <loading :visible="loadingStatus"></loading>
  </div>
</template>
<style lang="scss" type="scss" rel="stylesheet/scss">
  .content{
    height: 100%;
  }
  .activity-email{
    width: 690px;
    margin: 0 auto;
    padding-top: 42px;
    div:nth-child(1){
      width: 690px;
      margin: 0 auto;
      font-family: PingFangSC-Regular;
      font-size: 30px;
      color: #2F323A;
      line-height: 30px;
    }
    div:nth-child(2){
      width: 690px;
      margin: 36px auto;
      h4{
        margin: 0;
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #2F323A;
        line-height: 30px;
      }
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #D8D8D8;
      }

      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #D8D8D8;
      }

      input:-ms-input-placeholder{
        color: #D8D8D8;
      }

      input::-webkit-input-placeholder{
        color: #D8D8D8;
      }
      input{
        display: inline-block;
        width: 600px;
        height: 88px;
        text-indent: 34px;
        margin-left: 18px;
        background: #FFFFFF;
        border: 2px solid #D8D8D8; /*px*/
        border-radius: 6px;
        font-family: PingFangSC-Regular;
        font-size: 34px;
      }
    }
  }
  .send-btn{
    position: absolute;
    width: 750px;
    height: 88px;
    text-align: center;
    background: #FF8100;
    font-family: PingFangSC-Regular;
    font-size: 34px;
    color: #FFFFFF;
    line-height: 88px;
    bottom: 0;
    left: 50%;
    margin-left: -375px;
  }
  .successTip{
    padding-top: 42px;
    background-color: #FFFFFF;
    width: 478px;
    height: 362px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -239px;
    margin-top: -181px;
    z-index: 999;
    div:nth-child(1){
      text-align: center;
      width: 392px;
      margin: 0 auto;
      font-size: 30px;
      line-height: 48px;
    }
    div:nth-child(2){
      margin: 0 auto;
      width: 330px;
      text-align: center;
      font-size: 30px;
      letter-spacing: 0px;
      line-height: 48px;
      margin-bottom: 50px;
    }
    div:nth-child(3){
      margin: 0 auto;
      border: 2px solid #FF8100;
      border-radius: 6px;
      text-align: center;
      width: 417px;
      height: 88px;
      font-size: 34px;
      color: #FF8100;
      line-height: 88px;
      background: #F7F7F7;
    }
  }
</style>
<script type="text/ecmascript-6">
  /* global _hmt */
    import mask from '../../components/mask/index.vue'
    import util from '../../methods/util'
    import loading from '../../components/loading/juhua.vue'
    import toast from '../../components/tips/toast.vue'
    import config from '../../methods/config'
    if (util.isAPP) {
      var bridge = require('../../methods/bridge/native')
    } else {
      bridge = require('../../methods/bridge/web')
    }
    export default{
      data () {
        return {
          emailAdress: '',
          visible: false,
          activity_id: '',
          is_end: '',
          toast_msg: '',
          loadingStatus: false
        }
      },
      components: {
        mask, loading, toast
      },
      route: {
        data (transition) {
          this.activity_id = transition.to.params.activityid
          this.is_end = transition.to.params.status
          transition.next({})
        }
      },
      methods: {
        backDetail () {
          this.visible = false
          window.history.go(-2)
        },
        sendPost () {
          if (this.emailAdress === '') {
            this.toast_msg = '请输入邮箱'
          } else {
            if (!util.checkEmail(this.emailAdress)) {
              this.toast_msg = '请输入正确的邮箱'
            } else {
              this.loadingStatus = true
              let data = {
                activity_id: this.activity_id,
                email: this.emailAdress
              }
              bridge.request({
                url: config.o_host + 'mchntactv/sendmail',
//                url: 'http://172.100.111.215:6200/mchntactv/sendmail',
//                url: 'http://wx.qa.qfpay.net/mchntactv/sendmail',
                method: 'POST',
                data: data,
                callback: (response) => {
                  this.loadingStatus = false
                  this.visible = true
                  _hmt.push(['_trackEvent', 'new-term', 'new-term-send-print-post-success', 'click'])
                }
              })
            }
          }
        }
      }
    }
</script>
