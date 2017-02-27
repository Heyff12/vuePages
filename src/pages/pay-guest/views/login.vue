<template>
  <div class="main">
    <img src="../assets/logo.png" alt="" class="logo">
    <div class="dialog">
      <div class="type">
        <ul>
          <li @click.prevent="singleClickHandler()" :class="{'active':single}">
            单店登录
          </li>
          <li @click.prevent="multClickHandler()" :class="{'active':!single}">
            多店登录
          </li>
        </ul>
        <div class="border" :class="{'mult':!single}"></div>
      </div>
      <form autocomplete="off">
        <div class="content">
          <div v-if="single" class="single">
            <input id="tel" type="text" maxlength="15" placeholder="钱方好近账户" v-model="info.mobile" name="mobile"/>
          </div>
          <div v-else class="mult">
            <input id="tel" type="text" maxlength="15" placeholder="钱方好近账户" v-model="info.mobile" name="mobile"/>
            <input id="op" type="text" maxlength="15" placeholder="操作员编号" v-model="info.opuid" name="opuid"/>
          </div>
          <input id="pwd" class="promtPwd" type="password" placeholder="钱方好近密码" v-model="info.password" @keydown.enter="goLog" name="password"/>
          <a id="login" @click.prevent="goLog">登录</a>
        </div>
      </form>
    </div>
    <img src="../assets/icon.png" alt="" class="icon">
    <toast :msg.sync="errMsg"></toast>
  </div>
</template>
<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../../styles/_common.scss";
  #app {
    height: 100%;
  }
  .main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: url("../assets/bg-ground.png") center center no-repeat;
    background-size: 100% 100%;
    .logo {
      width: 450px;
      display: block;
      margin: 0 auto;
    }
    .dialog {
      width: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -150px;
      margin-top: -162px;
      background-color: #fff;
      border-radius: 5px;
      .type {
        position: relative;
        cursor: pointer;
        ul {
          display: flex;
          li {
            flex: 1;
            height: 60px;
            line-height: 60px;
            color: #8A8C92;
            font-size: 15px;
            text-align: center;
            background-color: #fff;
            transition: all .2s;
            &.active {
              color: #2F323A;
            }
            &:nth-of-type(1) {
              border-top-left-radius: 5px;
            }
            &:nth-of-type(2) {
              border-top-right-radius: 5px;
            }
          }
        }
        .border {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 150px;
          height: 2px;
          background-color: #FF8100;
          transition: all .2s;
          &.mult {
            transform: translateX(150px);
          }
        }
      }
      .content {
        padding: 25px;
        background-color: #F7F7F7;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      #tel, #pwd, #op {
        display: block;
        width: 250px;
        height: 44px;
        color: #2F323A;
        outline: none;
        border: 1px solid #DEDEDE;
        border-radius: 3px;
        padding: 0 16px;
        font-size: 16px;
        margin-bottom: 11px;
      }
      .mult {
        #tel {
          margin-bottom: 0;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        #op {
          border-top: none;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      }
      #login {
        width: 250px;
        margin: 0 auto;
        height: 44px;
        line-height: 44px;
        text-align: center;
        display: block;
        background: #FF8100;
        color: #fff;
        border: 0;
        outline: none;
        margin-top: 15px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 17px;
      }
    }
    .icon {
      width: 324px;
      height: 219px;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -162px;
    }
  }
</style>
<script>
  /*global Vue*/
  /*eslint-disable no-unused-vars*/
  import toast from './toast.vue'
  export default{
    data () {
      return {
        single: true,
        info: {
          mobile: '',
          password: '',
          opuid: ''
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
      singleClickHandler () {
        this.single = true
        this.info.opuid = ''
      },
      multClickHandler () {
        this.single = false
      },
      goLog () {
        this.$http({
          url: 'https://o.qfpay.com/mchnt/user/login',
          method: 'POST',
          data: {
            'username': this.info.mobile,
            'password': this.info.password,
            'opuid': this.info.opuid,
            'format': 'cors'
          }
        }).then(function (res) {
          if (res.data.respcd === '0000') {
            this.$router.go({name: 'payMoney'})
          } else {
            if (this.info.mobile === '' || this.info.password === '') {
              this.errMsg = res.data.respmsg
            } else {
              this.errMsg = res.data.respmsg
            }
          }
        })
      }
    },
    events: {
      'on-toast' (msg) {
        this.msg = msg
      }
    }
  }
</script>
