<template>
  <div class="main">
    <div class="dialog">
      <div class="name"></div>
      <div class="zhanghao">
        <input id="tel" type="text" maxlength="11" placeholder="钱方好近账户" v-model="info.mobile" @keydown="GetInput" autocomplete="off"/>
      </div>
      <div class="mima">
        <input id="pwd" class="promtPwd" type="password" placeholder="钱方好近密码" v-model="info.password" @keydown.enter="goLog" autocomplete="off"/>
      </div>
      <a id="denglu" @click.prevent="goLog">登录</a>
    </div>
    <div class="icon">
    </div>
    <toast :msg.sync="errMsg"></toast>
  </div>
</template>
<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../styles/common";
    .main {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background: url("./assets/bg-ground.png") center center no-repeat;
      background-size: 100% 100%;

      .dialog {
        width: 300px;
        height: 324px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -150px;
        margin-top: -162px;
        background-color: #fff;
        border-radius: 5px;
        .name {
          width: 300px;
          height: 107px;
          background: url("./assets/name.png") no-repeat;
          margin-bottom: 25px;
        }
        .zhanghao, .mima {
          width: 250px;
          margin: 0 auto;
          height: 44px;
          background: #fff;
          border-radius: 2px;
        }
        .zhanghao {
          margin-bottom: 15px;
        }
        .zhanghao input, .mima input {
          display: block;
          width: 250px;
          height: 44px;
          color: #2F323A;
          outline: none;
          border: 1px solid #DEDEDE;
          border-radius: 3px;
          padding: 0 16px;
          font-size: 16px;
        }
        #denglu {
          width: 250px;
          margin: 0 auto;
          height: 44px;
          line-height: 44px;
          text-align: center;
          display: block;
          margin-top: 20px;
          background: #FF8100;
          color: #fff;
          border: 0;
          outline: none;
          border-radius: 3px;
          cursor: pointer;
          font-size: 17px;
        }
      }
      .icon {
        width: 408px;
        height: 200px;
        background: url("./assets/icon.png") no-repeat;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -145px;
      }
    }
</style>
<script>
  /*global Vue*/
  /*eslint-disable no-unused-vars*/
  import toast from './views/toast.vue'
  export default{
    data () {
      return {
        info: {
          mobile: '',
          password: ''
        },
        errMsg: ''
      }
    },
    components: {toast},
    created () {
      Vue.http.options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
      }
      Vue.http.options.xhr = {
        withCredentials: true
      }
      Vue.http.options.emulateJSON = true
    },
    methods: {
      goLog () {
        this.$http({
          url: 'https://o.qfpay.com/mchnt/user/login',
          method: 'POST',
          data: {
            'username': this.info.mobile,
            'password': this.info.password,
            'udid': '1234',
            'format': 'cors'
          }
        }).then(function (res) {
          if (res.data.respcd === '0000') {
            window.location.href = 'pay-guest.html'
          } else {
            if (this.info.mobile === '' || this.info.password === '') {
              this.errMsg = res.data.respmsg
            } else {
              this.errMsg = res.data.respmsg
            }
          }
        })
      },
      GetInput (e) {
        if ((e.keyCode <= 57 && e.keyCode >= 48) || (e.keyCode <= 105 && e.keyCode >= 96) || (e.keyCode === 13) || (e.keyCode === 8) || (e.keyCode === 9)) {
          return true
        } else {
          e.preventDefault()
        }
      }
    },
    events: {
      'on-toast' (msg) {
        this.msg = msg
      }
    }
  }
</script>
