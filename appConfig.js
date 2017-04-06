/**
 * Created by aidenZou on 16/5/6.
 */

/**
 * chunks
 * vue vue-resource
 */

// 页面配置
exports.pages = [
  {  // diy 配置
    filename: 'diy',
    template: 'src/pages/diy/diy.ejs',  // 指定 html模板路径
    title: '' // title 可以在模板中指定
  }, {
    filename: 'coupon-recommend',
    title: '红包查询', // 指定自定义 title
    chunks: 'vue_vue-resource'
  }, {
    filename: 'activity-preview',
    title: '我的推广活动',
    chunks: 'vue_vue-resource',
    supportOffline: true
  }, {
    filename: 'activity',
    title: '官方活动',
    chunks: 'vue_vue-resource',
    supportOffline: true
  }, {
    filename: 'merchant-loan',
    title: '快易贷'
  }, {
    filename: 'activity-detail',
    title: '官方活动',
    chunks: 'vue_vue-resource',
    supportOffline: true
  }, {
    filename: 'software-license-android',
    template: 'src/pages/software-license-android/diy.ejs'
  }, {
    filename: 'software-license-ios',
    template: 'src/pages/software-license-ios/diy.ejs'
  }, {  // Bridge 测试页面
    filename: 'bridge-test',
    template: 'src/pages/bridge-test/index.html'
  }, {
    filename: 'trade-statistics',
    template: 'src/pages/trade-statistics/index.html',
    title: '交易统计',
    chunks: 'vue_vue-resource'
  },{
    filename: 'hot-marketing',
    template: 'src/pages/hot-marketing/index.ejs',
    title: '热点营销'
  },{
    filename: 'com-authorize',
    template: 'src/pages/com-authorize/index.ejs'
  }, {
    filename: 'restaurant-order-list',
    template: 'src/pages/restaurant-order-list/index.ejs',
    title: '点餐订单'
  },{
    filename: 'restaurant-order-list-jp',
    template: 'src/pages/restaurant-order-list-jp/index.ejs',
    title: '注文一覧'
  },{
    filename: 'merchant-signup-agreement',
    title: '钱方好近商户注册协议'
  },,{
    filename: 'darling-merchant-signup-agreement',
    title: '达令商户注册协议'
  },{
    filename: 'privacy-agreement',
    title: '服务隐私政策条款'
  },{
    filename: 'agreement-ali',
    title: '支付宝支付解决方案条款'
  },{
    filename: 'agreement-jd',
    title: '京东钱包支付解决方案条款'
  },{
    filename: 'agreement-qpos',
    title: 'QPOS支付解决方案条款'
  },{
    filename: 'agreement-service',
    title: '钱方好近商户服务协议'
  },,{
    filename: 'darling-agreement-service',
    title: '达令商户服务协议'
  },{
    filename: 'baipai-agreement-service',
    title: 'V创宝商户服务协议'
  },{
    filename: 'baipai-merchant-signup-agreement',
    title: 'V创宝商户注册协议'
  },{
    filename: 'agreement-weixin',
    title: '微信支付解决方案条款'
  },{
    filename: 'vip-introduction',
    title: '会员介绍',
    template: 'src/pages/vip-introduction/index.html'
  },{
    filename: 'diancan-manage',
    title: '管理菜品',
    template: 'src/pages/diancan-manage/index.ejs'
  },{
    filename: 'coupon-review',
    title: '好近红包'
  },{
    filename: 'member-service',
    title: '好近服务开通'
  }, {
    filename: 'sale-preview',
    title: '特卖预览',
    chunks: 'vue_vue-resource',
    supportOffline: true
  }, {
    filename: 'diancan-intro',
    title: '好近点餐',
    template: 'src/pages/diancan-intro/index.ejs',
    chunks: 'vue_vue-resource'
  },{
    filename: 'sale-introduction',
    title: '特卖介绍',
    template: 'src/pages/sale-introduction/index.ejs',
    chunks: 'vue_vue-resource'
  },{
    filename: 'wx-sale-introduction',
    title: '特卖介绍',
    template: 'src/pages/wx-sale-introduction/index.ejs',
    chunks: 'vue_vue-resource'
  },{
    filename: 'takeout-order-list',
    title: '外卖订单',
    template: 'src/pages/takeout-order-list/index.ejs',
  },
  {
    filename: 'agreement-batch',
    title: '好近协议',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'takeout-settings',
    title: '外卖设置',
    template: 'src/pages/takeout-settings/index.ejs',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'pay-guest',
    title: '好近收银台',
    template: 'src/pages/pay-guest/index.ejs',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'pay-login',
    title: '好近收银台登陆',
    template: 'src/pages/pay-login/index.ejs',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'baipai',
    title: '开启白牌合作',
    template: 'src/pages/baipai/index.ejs',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'activity-create',
    title: '可创建活动列表',
    template: 'src/pages/activity-create/index.ejs',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'data-record',
    title: '数据报告',
    template: 'src/pages/data-record/index.ejs',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'wx-diancan-intro',
    title: '微信点餐',
    template: 'src/pages/wx-diancan-intro/index.ejs',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'pwd-reset',
    title: '密码重置',
    template: 'src/pages/pwd-reset/index.ejs',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'jsbridge-demo',
    title: 'JSBridge测试',
    template: 'src/pages/jsbridge-demo/index.ejs',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'save-currency',
    title: '会员储值优秀案例',
    template: 'src/pages/save-currency/index.ejs',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'save-currency-agreement',
    title: '储值服务协议',
    chunks: 'vue_vue-resource'
  },
  {
    filename: 'business-king-intro',
    title: '好近生意王',
    template: 'src/pages/business-king-intro/index.ejs',
    chunks: 'vue_vue-resource'
  }
]
