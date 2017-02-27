<template>
  <div id="wrap">
    <div class="content">
      <div>
        <p>手机号</p>
        <input type="tel" placeholder="请输入登录手机号" v-model="mobile">
      </div>
      <div>
        <p>验证码</p>
        <input type="tel" placeholder="请输入收到的短信验证码" v-model="code">
        <a v-if="!gotCode" @click.prevent="getCode">获取验证码</a>
        <a v-else v-text="count + '秒后获取'" class="gotCode"></a>
      </div>
      <div>
        <p>设置新密码</p>
        <input :type="type" placeholder="请输入新密码" v-model="password">
        <img :src="icon" @click="toggleIcon" :class="{'show':showPwd}">
      </div>
    </div>
    <a @click.prevent="submit" class="submit">提交</a>
    <toast :msg.sync="errmsg"></toast>
  </div>
</template>

<script>
import config from '../../methods/config'
// import util from '../../methods/util'
import bridge from '../../methods/bridge'
import toast from '../../components/tips/toast.vue'
import iconHide from './assets/icon-hide.png'
import iconShow from './assets/icon-show.png'
export default {
  components: {
    toast
  },
  data () {
    return {
      showPwd: false,
      icon: iconHide,
      type: 'password',
      gotCode: false,
      count: 60,
      mobile: '',
      code: '',
      password: '',
      errmsg: ''
    }
  },
  computed: {
  },
  created: function () {
  },
  watch: {
    'showPwd' () {
      if (this.showPwd) {
        this.icon = iconShow
      } else {
        this.icon = iconHide
      }
    }
  },
  ready: function () {

  },
  methods: {
    toggleIcon () {
      this.showPwd = !this.showPwd
      this.type = this.type === 'password' ? 'text' : 'password'
    },
    getCode () {
      var mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
//      var mobileReg = /.*?/g
      if (this.mobile.match(mobileReg)) {
        let _this = this
        bridge.request({
          url: `${config.o_host}mchnt/smscode/send`,
          method: 'GET',
          data: {
            mobile: this.mobile,
            mode: 'reset_pwd',
            format: 'cors'
          },
          callback (res) {
            if (res.respcd === '0000') {
              _this.gotCode = true
              let timer = setInterval(function () {
                if (_this.count) {
                  _this.count--
                } else {
                  clearInterval(timer)
                  _this.gotCode = false
                  _this.count = 60
                }
              }, 1000)
            } else {
              _this.onToast(res.resperr)
            }
          }
        })
      } else {
        this.onToast('请输入正确的手机号')
      }
    },
    submit () {
      if (!this.mobile) {
        this.onToast('请输入手机号')
        return
      }
      if (!this.code) {
        this.onToast('请输入验证码')
        return
      }
      if (!this.password) {
        this.onToast('请输入密码')
        return
      }
      let _this = this
      bridge.request({
        url: `${config.o_host}mchnt/user/reset_pwd`,
        method: 'POST',
        data: {
          mobile: this.mobile,
          code: this.code,
          password: this.password,
          format: 'cors'
        },
        callback (res) {
          if (res.respcd === '0000') {
            bridge.logout()
          } else {
            _this.onToast(res.resperr)
          }
        }
      })
    },
    onToast (msg) {
      this.errmsg = msg
    }
  }
}
</script>

<style lang="scss" type="scss" rel="stylesheet/scss">

  @import "../../styles/common";

  // fix Font Boosting
  p, div {
    max-height: 999999px;
    margin: 0;
  }
  body {
    background-color: #f7f7f7;
  }
  #wrap {
    height: 100%;
  }
  .content {
    margin-top: 30px;
    padding-left: 30px;
    background-color: #fff;
    > div {
      display: flex;
      height: 90px;
      line-height: 90px;
      border-bottom: 2px solid #E5E5E5; /*px*/
      &:nth-last-of-type(1) {
        border-bottom: none;
      }
      p {
        color: #606470;
        font-size: 30px;
        white-space: nowrap;
      }
      input {
        flex: 1;
        outline: none;
        padding: 30px;
        line-height: 1;
        margin: 0;
        text-align: right;
        border: 0;
        font-size: 30px;
        overflow: hidden;
        &:focus {
          border: none;
          outline: none;
        }
      }
      a {
        width: 194px;
        min-width: 194px;
        height: 66px;
        line-height: 66px;
        text-align: center;
        border: 2px solid #FE9B20;
        border-radius: 6px;
        color: #FE9B20;
        font-size: 30px;
        margin-right: 20px;
        margin-top: 12px;
        &.gotCode {
          border: 2px solid #e5e5e5;
          color: #A7A9AE;
        }
      }
      img {
        width: 38px;
        height: 24px;
        margin-top: 34px;
        margin-right: 30px;
        &.show {
          margin-top: 30px;
          height: 30px;
        }
      }
    }
  }
  .submit {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    height: 88px;
    line-height: 88px;
    background-color: #FF8100;
    color: #FFFFFF;
    font-size: 34px;
  }
</style>
