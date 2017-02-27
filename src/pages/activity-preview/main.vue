<template>
  <div id="qf-container" class="l-c-c p-preview">
    <div class="stationery" :class="{'no_bg': !bg_url, 'diy_bg': bg_url}" v-show="isShow" v-cloak>
      <div class="bg-box" v-show="bg_url">
        <img :src="bg_url"/>
        <!--渐变-->
        <div class="jb" v-show="bg_url"></div>
      </div>

      <div class="stationery-box">
        <div class="stationery-head">
          <!--<h2>亲爱的&nbsp;{{ nickname }}</h2>-->
          <p>{{ title }}</p>
        </div>
        <div class="stationery-body">
          <p>{{ content }}</p>
        </div>
        <div class="stationery-footer">
          <p v-show="shopname">店铺：{{ shopname }}</p>
          <p v-show="address">地址：{{ address }}</p>
          <p v-show="expiredate">有效期：{{ startdate }}-{{ expiredate }}</p>
          <p v-show="tel">电话：{{ tel }}</p>
        </div>
        <!--<div class="signed"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
import util from '../../methods/util'
import bridge from '../../methods/bridge/native'

export default {
  components: {
  },
  data () {
    return {
      isShow: false,
      nickname: '顾客',
      title: '',
      content: '',
      startdate: '',
      expiredate: '',
      shopname: '',
      address: '',
      tel: '',
      bg_url: ''
    }
  },
  computed: {
  },
  created: function () {
    document.getElementsByTagName('body')[0].style.minHeight = document.documentElement.clientHeight + 'px'
  },
  ready: function () {
    if (!util.isAPP) {
      /*
      this.nickname = '黄大仙儿'
      this.title = '新品汉堡会员8.5折 一般人我不告诉他~'
      this.content = '华丽丽的造型被端上桌就被惊艳到！两大团冰淇淋球，草莓味和巧克力，配上新鲜水果和奶油，底下是热乎乎的华夫饼，待冰淇淋融化之前赶紧送到嘴里平，冰火两重天的感觉！美貌和味道兼备，值得一试哦~烫手的松饼浇上草莓和奶油，哇哦，如此诱人的草莓奶油松饼就是西九巷的招牌甜点！'
      this.shopname = '759阿信屋'
      this.address = '朝阳区 望京SOHO 中心广场负一层1012'
      this.startdate = '2016.4.26'
      this.expiredate = '6.29'
      this.tel = '18600000000'
      this.bg_url = 'http://7xnvca.com1.z0.glb.clouddn.com/qf/web/%E5%9B%BE.png'
      this.bg_url = 'http://photocdn.sohu.com/20160415/Img444245812.jpeg'
      this.bg_url = 'http://cn.bing.com/az/hprichbg/rb/SichuanTerracefield_ZH-CN10274952912_480x640.jpg'
      this.bg_url = ''
      */

      this.isShow = true
      return
    }
    var self = this
    bridge.getPageParam(function (params) {
      if (!params) {
        return
      }
      self.nickname = params.nickname || '顾客'
      self.title = params.title || ''
      self.content = params.content || ''
      self.shopname = params.shopname || ''
      self.address = params.address || ''
      self.startdate = params.startdate || ''
      self.expiredate = params.expiredate || ''
      self.tel = params.tel || ''
      self.bg_url = params.bg_url || ''

      this.isShow = true
    })
  },
  methods: {}
}
</script>

<style lang="scss" type="scss" rel="stylesheet/scss">

  @import "../../styles/main";

  // fix Font Boosting
  p, div {
    max-height: 999999px;
  }

  .p-preview {
    background-color: #2F323A !important;
    //min-height: 100%;
    //min-height: 100vh;
    //padding-top: 50px;
    padding: 30px;
    .stationery {
      position: relative;
      width: 100%;
      //margin: 0 auto;

      border-radius: 10px;
      background-color: #FFFFFF;
      overflow: hidden;

      .stationery-box {
        padding: 50px 50px;
        padding-bottom: 80px;
        //padding-top: 232px;

        background-image: url("./assets/preview_def_bg_bottom.png");
        background-repeat: no-repeat;
        background-position: bottom left;
        background-size: contain;
      }

      &.no_bg {
        padding: 15px;
        background-image: url("./assets/bg.jpg");
        background-size: 80px;
        & > div {
          background-color: #fff;
          border-radius: 10px;
        }

        .stationery-body > p {
          background-image: url("./assets/line.png");
          background-size: 8px; /*px*/
        }
      }
      &.diy_bg {
        padding-top: 232px;

        //background-image: url("../image/preview_def_bg_top.png");
        background-repeat: no-repeat;
        background-size: contain;
      }
      .bg-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 300px;
        //height: 232px;
        overflow: hidden;
        //opacity: 0.76;
        border-radius: 10px;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-height: 100%;
          width: 100%;
          display: block;
          border-radius: 10px;
        }
      }
      .jb {
        position: absolute;
        //top: 0;
        //top: 50px;
        top: 0;
        left: 0;
        width: 100%;
        //height: 300px;
        //height: 257px;
        height: 100%;
        //background: linear-gradient(top, rgba(237, 237, 237, 0), rgba(255, 255, 255, 1));
        //background-image: linear-gradient(-180deg, rgba(237, 237, 237, 0.00) 0, #FFFFFF 100%);
        background-image: linear-gradient(-180deg, rgba(237, 237, 237, 0.1) 40%, #FFF 100%);
      }
    }
    .stationery-box {
      position: relative;
    }
    .stationery-head {
      color: #2F323A;
      h2 {
        margin-top: 0;
        margin-bottom: 18px;
        font-size: 32px; /*px*/
      }
      p {
        margin-top: 18px;
        margin-bottom: 18px;
        font-weight: bold;
        font-size: 32px; /*px*/
        //text-indent: 2em;
        text-align: center;
        color: #2c1d8b;
      }
    }
    .stationery-body {
      margin: 28px 0;
      margin-top: 18px;
      color: #606470;
      p {
        margin: 0;
        font-size: 28px; /*px*/
        line-height: 1.6;
        //background-image: url("./assets/line.png");
        //background-size: 8px; /*px*/
        line-height: 48px; /*px*/
      }
    }
    .stationery-footer {
      margin-top: 60px;
      //margin-bottom: 100px;
      color: #606470;
      font-size: 24px; /*px*/
      p {
        margin: 8px 0;
      }
    }
    .signed {
      position: absolute;
      bottom: 40px;
      right: 40px;
      display: inline-block;
      width: 253px;
      height: 32px;
      background-image: url("./assets/signature.png");
      background-repeat: no-repeat;
      background-size: cover;
      svg {
        width: 100%;
        height: 100%;
      }

    }
  }

</style>
