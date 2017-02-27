/**
 * Created by yatessss on 16/6/13.
 */
import 'lib-flexible'
import FastClick from 'fastclick'
window.FastClick = FastClick
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
Vue.use(VueResource)
Vue.use(VueRouter)

import app from './main.vue'
import list from './list.vue'
import detail from './detail.vue'
import '../../filters'

let router = new VueRouter()

// var App = Vue.extend({})

/* eslint-disable no-new */

router.map({
  '': {
    component: list
  },
  '/detail': {
    component: detail
  }
})

router.start(app, '#app')
