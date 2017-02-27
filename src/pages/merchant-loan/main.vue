<template>
  <div class="banner">
    <a href="http://mp.weixin.qq.com/s?__biz=MzIxMjAzODY0NQ==&mid=405787734&idx=1&sn=5088bba73eeb5891f5df4c2f1731db1f&scene=0&previewkey=sqRmEi5RDnvKLfGIX5MJEcNS9bJajjJKzz%2F0By7ITJA%3D&from=singlemessage&isappinstalled=0#wechat_redirect">
      <img src="assets/banner.png" alt="">
    </a>
  </div>
  <div class="sec-1">
    <div>
      <span class="icon-ling">
      </span>
      <p>无需抵押</p>
    </div>
    <div>
      <span class="icon-sheng">
      </span>
      <p>低利率</p>
    </div>
    <div>
      <span class="icon-bian">
      </span>
      <p>随借随还</p>
    </div>
  </div>
  <div class="divide"></div>
  <div class="content">
    <h1>快速查看借款信息</h1>
    <p>选择借款金额和借款时长，即可查询每月还款金额和总利息金额，赶快来算一算。</p>
    <div class="select-box" @click="selectDisplay">
      <span class="title">借款金额</span>
      <div class="select-btn">
        <span>{{moneyText}}</span>
        <i></i>
      </div>
    </div>
    <div class="button-box">
      <span class="title">借款时长</span>
      <span v-for="(index, _item) in times" :class="{'button': true, 'activation': (thisTime===_item)}" @click="setTime(_item, index)">{{_item}}个月</span>
      <!--<span :class="{'button': true, 'activation': (thisTime===times[0])}" @click="setTime(times[0])">{{times[0]}}个月</span>-->
      <!--<span :class="{'button': true, 'activation': (thisTime===times[1])}" @click="setTime(times[1])">{{times[1]}}个月</span>-->
      <!--<span :class="{'button': true, 'activation': (thisTime===times[2])}" @click="setTime(times[2])">{{times[2]}}个月</span>-->
    </div>
    <div class="btn bg-white" @click="maskDisplay"><span>算一算</span></div>
    <div class="btn bg-red">
      <a href="http://form.mikecrm.com/7gIBL1">立即申请贷款</a>
    </div>
  </div>
  <div class="mask" @click="maskDisplay" v-show="maskVisible" >
    <div class="mask-content">
      <div class="content-block padding-l">
        <p>每月还款金额</p>
        <span>{{result[0]}}</span>
      </div>
      <div class="content-block padding-r">
        <p>总利息金额</p>
        <span>{{result[1]}}</span>
      </div>
      <div class="close">
        <!--<span class="subclose">×</span>-->
      </div>
    </div>
  </div>
  <div class="actionsheet_wrap">
    <div class="weui_mask_transition" v-show="selectVisible" @click="selectDisplay"></div>
    <div :class="{'weui_actionsheet_toggle': selectVisible, 'weui_actionsheet': true}" >
      <div class="weui_actionsheet_menu">
        <div class="weui_actionsheet_cell" v-for="(index, item) in moneys" @click="changeMoney(item, index)" >{{item}} 万</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "../../styles/base/_normalize.scss";

  .weui_mask_transition {
    background: rgba(0,0,0,.6);
    -webkit-transition: background .3s;
    transition: background .3s;
  }
  .weui_mask, .weui_mask_transition, .weui_mask_transparent {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .weui_actionsheet {
    position: fixed;
    left: 0;
    bottom: 0;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 2;
    width: 100%;
    background-color: #efeff4;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
  }
  .weui_actionsheet_menu{
    padding: 10px 0;
  }
  .weui_actionsheet_toggle {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  .weui_actionsheet_cell {
    position: relative;
    height: 70px;
    line-height: 70px;
    text-align: center;
    color: #606470;
    font-size: 30px;
  }
  .weui_actionsheet_cell:first-child:before {
    display: none;
  }
  .weui_actionsheet_cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 2px;
    border-top: 2px solid #d9d9d9; /*px*/
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transorm-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }


  .mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    z-index: 99;
    .mask-content{
      width: 590px;
      height: 274px;
      border-radius: 6px;
      background: #F7F7F7;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -295px;
      margin-top: -137px;
      .padding-r{
        padding-right: 15px;
      }
      .padding-l{
        padding-left: 15px;
      }
      .content-block{
        width: 295px;
        box-sizing: border-box;
        height: inherit;
        float: left;
        text-align: center;
        p{
          color: #171717;
          font-size: 34px;
          margin-top: 56px;
        }
        span{
          display: block;
          width: 256px;
          height: 88px;
          background: #43B1F8;
          border-radius: 6px;
          margin: 36px auto;
          color: #ffffff;
          font-size: 34px;
          line-height: 88px;
        }
      }
    }
    .close{
      position: absolute;
      top: -25px;
      right: -25px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: url('assets/close.svg') no-repeat center center;
      background-size: 100% 100%;
      /*color: #ffffff;*/
      .subclose{
        position: absolute;
        font-size: 60px;
        top: 50%;
        left: 50%;
        margin-top: -30px;
        margin-left: -30px;
      }
    }
  }

  .banner {
    height: 300px;
    width: 750px;
    img{
      height: 300px;
      width: 750px;
    }
  }
  .sec-1{
    width: 750px;
    height: 186px;
    div{
      color: #2F323A;
      font-size: 30px;
      text-align: center;
      float: left;
      width: 280px;
      height: inherit;
      &:nth-child(2){
        width: 190px;
      }
      span{
        display: block;
        margin: 30px auto 14px;
        /*margin-bottom: 14px;*/
        width: 80px;
        height: 80px;
      }
      p{
        margin: 0;
        padding: 0;
      }
      .icon-ling{
        background: url('assets/ic_ling@2x.png') no-repeat center center;
        background-size: 100% 100%;
        /*margin-left: 100px;*/
      }
      .icon-sheng{
        background: url('assets/ic_sheng@2x.png') no-repeat center center;
        background-size: 100% 100%;
        /*margin: 30px auto 14px;*/
      }
      .icon-bian{
        background: url('assets/ic_bian@2x.png') no-repeat center center;
        background-size: 100% 100%;
        /*margin-left: 70px;*/
      }
    }
  }
  .divide{
    width: 750px;
    height: 20px;
    background: #F7F7F7;
  }
  .content{
    box-sizing: border-box;
    width: 750px;
    height:auto;
    padding: 30px 30px 115px 30px;
    h1{
      text-align: center;
      color: #2F323A;
      font-size: 34px;
    }
    p{
      color: #606470;
      font-size: 30px;
    }
    .select-box{
      width: 690px;
      height: 88px;
      margin-top: 40px;
      position: relative;
      .title{
        color: #606470;
        font-size: 30px;
        line-height: 88px;
      }
      .select-btn{
        background: #F7F7F7;
        width: 554px;
        height: 88px;
        float: right;
        box-sizing: border-box;
        padding: 23px 30px;
        position: relative;
        border-radius: 6px;
        span{
          color: #B4B4B4;
          font-size: 30px;
          vertical-align: middle;
        }
        i{
          position: absolute;
          top: 30px;
          right: 45px;
          display: block;
          width: 15px;
          height: 15px;
          border: solid #43B1F8;
          border-width: 0 2px 2px 0;  /*px*/
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        ul{
          position: absolute;
          left: 0;
          z-index: 99;
          background: rgba(255,255,255,0.6);
          color: #606470;
          font-size: 30px;
          width: 554px;
          list-style: none ;
          padding: 0;
          li{
            width: inherit;
            height: 60px;
            line-height: 60px;
            text-align: center;
            background: rgba(255,255,255,0.6);
          }
        }
      }
    }
    .button-box{
      width: 690px;
      height: 88px;
      margin-top: 30px;
      position: relative;
      color: #606470;
      font-size: 30px;
      line-height: 88px;
      overflow: hidden;
      .title{
        line-height: 88px;
      }
      .button{
        border: 2px solid #DEDEDE; /*px*/
        box-sizing: border-box;
        border-radius: 6px;
        display: inline-block;
        width: 174px;
        height: 88px;
        /*float: right;*/
        margin-left: 12px;
        text-align: center;
      }
      .activation {
        border: 2px solid #43B1F8; /*px*/
        color: #43B1F8;
      }
    }
    .btn{
      box-sizing: border-box;
      width: 690px;
      height: 88px;
      line-height: 84px;
      text-align: center;
      font-size: 34px;
    }
    .bg-white{
      margin-top: 40px;
      border: 2px solid #FF8100;  /*px*/
      color: #FF8100;
      border-radius: 6px;
    }
    .bg-red{
      position: fixed;
      left: 0;
      width: 100%;
      bottom: 0;
      margin-top: 30px;
      border: 2px solid #FF8100;  /*px*/
      color: #ffffff;
      background: #FF8100;
      /*border-radius: 6px;*/
      a{
        width: 690px;
        height: 88px;
        text-decoration: none;
        color: #ffffff;
      }
    }
  }

</style>
<script>
  export default {
    data () {
      return {
        msg: 'hello vue',
        maskVisible: false,
        selectVisible: false,
        money: null,
        moneys: [5, 10, 15],
        times: [3, 6, 9],
        thisTime: 3,
        result_data: [
          [[17338, 2014], [8927, 3562], [6216, 5132]],
          [[34676, 4028], [17853, 7118], [12252, 10264]],
          [[52014, 6042], [26779, 10674], [18378, 15396]]
        ],
        result_1: 0,
        result_2: 0
      }
    },
    computed: {
      moneyText () {
        return this.money ? this.money + ' 万' : '请选择金额'
      },
      result () {
        return this.result_data[this.result_1][this.result_2]
      }
    },
    methods: {
      setTime (time, index) {
        console.log(time, index)
        this.thisTime = time
        this.result_2 = index
      },
      maskDisplay: function () {
        if (!this.money) return
        this.maskVisible = !this.maskVisible
      },
      selectDisplay: function () {
        this.selectVisible = !this.selectVisible
      },
      changeMoney: function (e, index) {
        this.money = e
        this.result_1 = index
        this.selectVisible = !this.selectVisible
      }
    }
  }
</script>
