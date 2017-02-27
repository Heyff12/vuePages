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
import '../../filters'

let router = new VueRouter()

// var App = Vue.extend({})

/* eslint-disable no-new */

router.map({
  '': {
    name: 'new-order',
    component: require('./view/list.vue')
  },
  '/new-order': {
    name: 'new-order',
    component: require('./view/list.vue')
  },
  '/preparation': {
    name: 'preparation',
    component: require('./view/list.vue')
  },
  '/distribution': {
    name: 'distribution',
    component: require('./view/list.vue')
  },
  '/completion': {
    name: 'completion',
    component: require('./view/list-complete.vue')
  },
  '/detail/:orderId': {
    name: 'detail',
    component: require('./view/detail.vue')
  }
})

router.start(app, '#app')
