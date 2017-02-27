<template>
  <div class="l-c-c modal-box" v-show="visible">
    <mask :visible="visible"></mask>
    <div class="qf-relative" v-show="visible" transition="bottom">
      <div class="qf-absolute">
        <modal op-close="onModal1Close">
          <!--<modal>-->
          <div class="coupon-info-box">
            <div class="coupon-info-1">
              <h3>{{coupon.industry + '类'}}&nbsp;<span>店铺</span></h3>
              <div><span>店铺客单价</span> ¥ {{coupon.avg_spend | formatCurrency}}</div>
            </div>

            <title>活动效果</title>

            <div class="coupon-info-2">
              <div class="l-r-auto">
                <section>
                  <h4>领取数</h4>
                  <p>{{coupon.obtain_num}}</p>
                </section>
                <section>
                  <h4>核销数</h4>
                  <p>{{coupon.use_num}}</p>
                </section>
              </div>
              <div class="l-r-auto">
                <section>
                  <h4>使用率</h4>
                  <p>{{coupon.use_per | formatCurrency}}%</p>
                </section>
                <section>
                  <h4>刺激消费</h4>
                  <p><span>¥</span>{{coupon.coupon_trade_amt | formatCurrency}}</p>
                </section>
              </div>
            </div>

            <title>红包设置</title>
            <div class="coupon-info-3">
              <section class="l-r-lr">
                <div>红包活动时长：</div>
                <div>{{coupon.continued | formatTime 'd天'}}</div>
              </section>
              <section class="l-r-lr">
                <div>单个红包金额：</div>
                <div v-if="coupon.amt_min == coupon.amt_max">￥{{coupon.amt_min | formatCurrency}}</div>
                <div v-else>￥{{coupon.amt_min | formatCurrency}}~{{coupon.amt_max | formatCurrency}}</div>
              </section>
              <section class="l-r-lr">
                <div>领取红包条件：</div>
                <div>满 ￥{{coupon.obtain_threshold | formatCurrency}}</div>
              </section>
              <section class="l-r-lr">
                <div>使用红包条件：</div>
                <div>满 ￥{{coupon.use_threshold | formatCurrency}}</div>
              </section>
            </div>

            <!--
            <title>友情提示</title>
            <ul class="coupon-info-4">
              <li>推荐案例来源于真实商户的红包设置，活动可能处于正在进行中，数据会不断变化，仅供参考！</li>
              <li>据统计，每发一个红包，平均每天可多带来20%的回头客。红包发放越多，回头客越多！</li>
            </ul>
            -->
          </div>
        </modal>
        <button class="c-btn submit-btn" @click.stop="action">设置我的红包</button>
      </div>
    </div>
  </div>
</template>

<script>
import mask from '../../components/mask'
import modal from '../../components/modal/modal1'
import title from '../../components/tips/title'

export default {
  props: ['visible', 'coupon', 'action'],
  data () {
    return {
    }
  },
  components: {
    mask, modal, title
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">

  .modal-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 30px;
    padding-left: 20px;
  }
  .qf-relative {
    position: relative;
    padding-left: 10px;
    width: 100%;
    /*height: 100%;*/
    max-height: 100%;
    overflow-y: scroll;
    z-index: 199;
    transition: all .3s cubic-bezier(0.35, .18, .72, 1.01);
  }

  /* 必需 */
  .bottom-transition {
    /*overflow: hidden;*/
  }

  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .bottom-enter, .bottom-leave {
    transform: translateY(100%);
  }

  .qf-absolute {
    // position: absolute;
    width: 100%;
    // bottom: 0;
    z-index: 199;
  }
  .coupon-info-box {
    margin-top: 32px;
    font-size: 30px;  /*px*/
  }
  .coupon-info-1 {
    text-align: center;
    color: #2F323A;
    h3 {
      margin: 0;
      margin-bottom: 8px;
      font-weight: normal;
      font-size: 34px;  /*px*/
    }
    span {
      color: #606470;
    }
  }

  .coupon-info-2 {
    padding: 18px 22px;
    background: #FFF3F1;
    border-radius: 6px; /*px*/
    div:first-child {
      padding-bottom: 8px;
      border-bottom: 2px solid rgba(213, 72, 55, .22); /*px*/
    }
    div:last-child {
      padding-top: 8px;
    }
    div section:first-child {
      border-right: 2px solid rgba(213, 72, 55, .22);  /*px*/
    }
    * {
      font-weight: 400;
    }
    h4 {
      margin: 0;
      margin-top: 8px;
      font-size: 28px;  /*px*/
      color: #D54837;
    }
    p {
      margin: 0;
      margin-top: 10px;
      margin-bottom: 8px;
      font-size: 48px;  /*px*/
      color: #A12516;
      span {
        font-size: 70%;
      }
    }
  }

  .coupon-info-3 {
    section {
      line-height: 48px;
    }
    & > section > div:first-child {
      color: #606470;
    }
    & > section > div:last-child {
      font-weight: bold;
      color: #2F323A;
    }
  }

  ul.coupon-info-4 {
    margin: 0;
    padding-left: 30px;
    line-height: 36px;
    font-size: 26px;  /*px*/
    color: #8A8C92;
    li {
      margin-bottom: 10px;
    }
  }
  .submit-btn {
    /*margin: 30px 0;*/
    margin-top: 30px;
    background-color: #D54837;
    color: #fff;
  }
</style>
