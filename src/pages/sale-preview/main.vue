<template>
  <div v-show="isShow">
    <header>
      <img :src="data.goods_image" id="picture" alt=""/>
      <div>
        <h1 id="title">{{data.goods_title}}</h1>
      </div>
    </header>
    <section>
      <div class="price">
        <p>
          ￥{{data.discount_price}}
          <span>￥{{data.origin_price}}</span>
          <a href="javascript:void(0);" id="buy">购买</a>
        </p>
      </div>
      <div class="border"></div>
      <div class="last-time">
        <p class="rest-time">
          <i class="countText">{{countText}}</i> <span class="rest-content">{{counter}}</span>
          <em>仅剩 <i>{{data.quantity}}份</i></em>
        </p>
      </div>
      <div class="border"></div>
      <div class="has-bought">
        <p><span>{{data.buy_count}}人</span> 已购买</p>
        <div v-if="data.buyer_avatars.length" >
          <img v-for="item in data.buyer_avatars" :src="item"/>
        </div>
      </div>
      <div class="border"></div>
      <div class="blank"></div>
      <div class="border"></div>
      <div class="tips">
        <div>
          <h3>购买须知</h3>
          <div class="border"></div>
          <div class="tips-content">
            <p>兑换日期 <span> {{data.redeem_start_time | subStr 10 | replace}} - {{data.redeem_end_time | subStr 10 | replace}}</span></p>
            <p v-if="data.redeem_start_time">兑换时间 <span> {{data.redeem_start_time | subStr -8 | subStr 5}} - {{data.redeem_end_time | subStr -8 | subStr 5}}</span></p>
            <p v-else><span>* </span>营业时间即可兑换</p>
            <p class="huise"><span>* </span>每人限购一单特卖商品 <span> * </span>商品不支持退款</p>
          </div>
        </div>
      </div>
      <div class="border"></div>
      <div class="blank"></div>
      <div class="border"></div>
      <div class="sale-detail">
        <h3>特卖详情</h3>
        <div class="border"></div>
        <p id="describe">{{data.act_desc}}</p>
        <div class="shop-info">
            <img :src="data.shop_image_url" alt=""/>
            <p class="business-name">{{data.shop_name}}</p>
            <p class="business-address">{{data.shop_address}}</p>
        </div>
      </div>
      <div class="border"></div>
      <div class="blank"></div>
    </section>
  </div>

</template>

<script type="text/ecmascript-6">
// import util from '../../methods/util'
  import bridge from '../../methods/bridge/native'
  /*eslint-disable*/
  export default {
    components: {
    },
    data () {
      return {
        isShow: false,
        data: {
          goods_title: '',
          act_desc: '',
          goods_image: '',
          origin_price: '',
          discount_price: '',
          quantity: '',
          redeem_start_time: '',
          redeem_end_time: '',
          start_time: '',
          end_time: '',
          server_time: '',
          buy_count: '',
          buyer_avatars: [],
          shop_name: '',
          shop_address: '',
          shop_image_url: ''
        },
        counter: '',
        countText: '',
        isCount: false
      }
    },
    computed: {
    },
    created: function () {
//      let _this = this
//      let params = {
//        goods_title: "商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称",
//        act_desc: "活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述",
//        goods_image: "http://7xry2m.com1.z0.glb.clouddn.com/avatar.png",
//        origin_price: "13",
//        discount_price: "5",
//        quantity: "1",
//        start_time: "2016-10-01 18:00:00",//特卖开始时间
//        redeem_start_time: "2016-10-01 05:00:00",//兑换开始时间
//        end_time: "2016-10-01 23:00:00",//特卖结束时间
//        redeem_end_time: "2016-10-01 05:00:00",//兑换结束时间
//        server_time: "2016-10-01 17:59:50",//服务器时间
//        buy_count: "5",
//        buyer_avatars: ["http:\/\/7xiz8u.com1.z0.glb.clouddn.com\/mmopen\/ajNVdqHZLLAPW1YibaEBgmK7Tw7080vXvCWldNREYQW0nC75WjxeuacLdR9xfCNBMwNpkP2dRaNYN33baibtDuaA\/0","http:\/\/7xiz8u.com1.z0.glb.clouddn.com\/mmopen\/PiajxSqBRaEJAoSAxHsbmDW3ljMLLtoyf02rHavmzOEnhFNPgEYPA16hFQagusm50f2YOhibhpZzINU8CmibX1AAg\/0","http:\/\/7xiz8u.com1.z0.glb.clouddn.com\/mmopen\/8YkOC1N3ocncvCARW8KYlNsuMmQlIpicGwDLPqxqhgFFZLZFnVRrWwcSpWvzP6EzoXu97MceMxziak2mJBhCHyvibgOCzu8VxBG\/0"],
//        shop_name: "店铺名称",
//        shop_address: "店铺地址",
//        shop_image_url: "http://7xry2m.com1.z0.glb.clouddn.com/avatar.png"
//      }
//      for (var key in params) {
//        _this.data[key] = params[key]
//      }
//      console.log(this.data)
//      _this.initCounter()
//      _this.isShow = true
    },
    ready: function () {
      let _this = this
      bridge.getPageParam(function (params) {
        if (!params) {
          window.alert('获取参数失败!')
          return
        }
        for (var key in params) {
          _this.data[key] = params[key]
        }
        _this.initCounter()
        _this.isShow = true
      })
    },
    methods: {
      count (type,time,lastTime) {
        let _this = this
        let timer = window.setInterval(function () {
          var hour = Math.floor(time / 3600),
            minute = Math.floor((time - hour * 3600) / 60),
            second = Math.floor(time - hour * 3600 - minute * 60);
          if (hour < 10) {
            hour = '0' + hour;
          }
          if (minute < 10) {
            minute = '0' + minute;
          }
          if (second < 10) {
            second = '0' + second;
          }
          _this.counter = hour + ':' + minute + ':' + second
          time--;
          if (time < 0) {
            if (type == 1) {
              _this.countText = '抢购结束啦~'
              _this.counter = null
              clearInterval(timer);
            } else if (type == 0 && !_this.isCount) {
              time = lastTime;
              _this.isCount = true;
              _this.countText = '限时特惠剩余'
            } else {
              _this.countText = '抢购结束啦~'
              _this.counter = null
              clearInterval(timer);
            }
          }
        }, 1000);
      },
      initCounter () {
        let _this = this
        let startTime = _this.data.start_time.replace(/\-/g, '/')
        startTime = new Date(startTime).getTime()
        let serverTime = _this.data.server_time.replace(/\-/g, '/')
        serverTime = new Date(serverTime).getTime()
        let endTime = _this.data.end_time.replace(/\-/g, '/')
        endTime = new Date(endTime).getTime()
        let leftSecond = parseInt((endTime-serverTime)/1000)
        let lastSecond = parseInt((endTime-startTime)/1000)
        let countDown = parseInt((startTime-serverTime)/1000)
        console.log(leftSecond,lastSecond,countDown)
        if (startTime > serverTime){
          _this.countText = '距特卖开始';
        }else {
          _this.countText = '限时特惠剩余';
        }

        if (startTime > serverTime){
          var countDay = Math.floor(countDown/3600/24);
          if(countDay >=1){
            _this.counter = countDay + '天'
          }else {
            _this.count(0,countDown,lastSecond);
          }
        }else if(leftSecond > 0){
          var leftDay = Math.floor(leftSecond/3600/24);
          if (leftDay >= 1){
            _this.counter = leftDay + '天'
          }else {
            _this.count(1,leftSecond);
          }
        }
//        else {
//          $('.rest-time').html('抢购结束啦~');
//          $('#buy').addClass('sale-out');
//        }
//        if(_data.quantity == 0){
//          $('#buy').addClass('sale-out').text('已售罄');
//        }
      }
    }
  }
</script>

<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../styles/common";
  @import "sale";
  // fix Font Boosting
  p, div {
    max-height: 999999px;
  }
</style>
