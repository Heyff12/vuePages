<template>
  <div id="app" v-cloak>
    <router-view keep-alive></router-view>
    <div v-if="display" class="tab">
      <div v-link="{path: '/new-order', replace: true}" class="tab-item" :class="{'tab-item__active': route == '/new-order', 'tab-item__active': route == '/'}">
        <div class="tab-item__order">
          <p class="tab-item__num">{{count_info.new_order_count}}</p>
        </div>
        <p class="tab-item__content">新订单</p>
      </div>
      <div v-link="{path: '/preparation', replace: true}" class="tab-item" :class="{'tab-item__active': route == '/preparation'}">
        <div class="tab-item__prepare">
          <p class="tab-item__num">{{count_info.making_order_count}}</p>
        </div>
        <p class="tab-item__content">备餐中</p>
      </div>
      <div v-link="{path: '/distribution', replace: true}" class="tab-item" :class="{'tab-item__active': route == '/distribution'}">
        <div class="tab-item__distribute">
          <p class="tab-item__num">{{count_info.deliverying_order_count}}</p>
        </div>
        <p class="tab-item__content">配送中</p>
      </div>
      <div v-link="{path: '/completion', replace: true}" class="tab-item" :class="{'tab-item__active': route == '/completion'}">
        <div class="tab-item__complete">
          <p class="tab-item__num">{{count_info.done_order_count}}</p>
        </div>
        <p class="tab-item__content">已完成</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../../styles/_main";
  *{
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    background: #F7F7F7;
  }
  #app {
    height: 100%;
    position: relative;
    padding-top: 1px;
  }
  .tab {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 98px;
    z-index: 999;
    background: #FFFFFF;
    border-top: 0.03rem solid #EFEFEF;
    display: flex;
    .tab-item {
      flex: 1;
    }
  }
  .tab-item__num{
    position: absolute;
    background: #EFEFEF;
    height: 36px;
    line-height: 36px;
    border-radius: 10px;
    padding: 0 10px;
    color: #A7A9AE;
    font-size: 26px;
    text-align: center;
  }
  .tab-item__content{
    margin-top: 4px;
    text-align: center;
    font-size: 20px;
    color: #A7A9AE;
    padding-right: 30px;
  }
  .tab-item__active, .v-link-active {
    .tab-item__order {
      background: url("./assets/ic_new_order_sel_act.png") center center no-repeat;
      background-size: 100% 100%;
    }
    .tab-item__num {
      background: #FF8100;
      color: #ffffff;
    }
    .tab-item__content {
      color: #FF8100;
    }
    .tab-item__prepare {
      background: url("./assets/ic_pick_up_act.png") center center no-repeat;
      background-size: 100% 100%;
    }
    .tab-item__distribute {
      background: url("./assets/ic_progress_act.png") center center no-repeat;
      background-size: 100% 100%;
    }
    .tab-item__complete {
      background: url("./assets/ic_complete_act.png") center center no-repeat;
      background-size: 100% 100%;
    }
  }
  .tab-item__order{
    position: relative;
    margin-top: 10px;
    margin-left: 30%;
    width: 50px;
    height: 52px;
    background: url("./assets/ic_new_order_sel.png") center center no-repeat;
    background-size: 100% 100%;
    >p {
      top: -2px;
      left: 60px;
    }
  }
  .tab-item__prepare {
    position: relative;
    margin-top: 14px;
    margin-left: 30%;
    width: 44px;
    height: 48px;
    background: url("./assets/ic_pick_up.png") center center no-repeat;
    background-size: 100% 100%;
    >p {
      top: -6px;
      left: 54px;
    }
  }
  .tab-item__distribute{
    position: relative;
    margin-top: 18px;
    margin-left: 30%;
    width: 44px;
    height: 44px;
    background: url("./assets/ic_progress.png") center center no-repeat;
    background-size: 100% 100%;
    >p {
      top: -10px;
      left: 54px;
    }
  }
  .tab-item__complete{
    position: relative;
    margin-top: 14px;
    margin-left: 30%;
    width: 40px;
    height: 48px;
    background: url("./assets/ic_complete.png") center center no-repeat;
    background-size: 100% 100%;
    >p {
      top: -6px;
      left: 50px;
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        count_info: {}
      }
    },
    computed: {
      route () {
        return this.$route.path
      },
      display () {
        let _this = this
        if (_this.$route.name === 'detail') {
          return false
        } else {
          return true
        }
      }
    },
    created () {
      console.log(this.route)
    },
    events: {
      'handle-count' (val) {
        this.$set('count_info', val)
      }
    },
    methods: {

    }
  }
</script>
