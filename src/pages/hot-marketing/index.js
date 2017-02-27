import 'lib-flexible'
import FastClick from 'fastclick'
window.FastClick = FastClick
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
Vue.use(VueResource)
Vue.use(VueRouter)
import Activity from './activityList.vue'
import Preview from './postPreview.vue'
import PostSend from './sendPost.vue'
import Detail from './activityDetail.vue'
import Swiper from 'swiper'
window.Swiper = Swiper
import '../../filters/index'
/* eslint-disable no-new */
let router = new VueRouter()
let App = Vue.extend({
  data () {
    return {
      statistics: ''
    }
  },
  events: {
    getBury (name) {
      this.statistics = name
    }
  }
})
Vue.transition('slide', {
  enterClass: 'slideInRight',
  leaveClass: 'slideOutLeft'
})
router.map({
  '': {
    name: 'activity',
    component: Activity
  },
  '/:activityid/:status': {
    name: 'detail',
    component: Detail
  },
  '/preview/:activityid/:status': {
    name: 'preview',
    component: Preview
  },
  '/postSend/:activityid/:status': {
    name: 'postSend',
    component: PostSend
  }
})

router.start(App, '#app')
