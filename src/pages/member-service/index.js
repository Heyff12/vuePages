import 'lib-flexible'
import FastClick from 'fastclick'
window.FastClick = FastClick
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
Vue.use(VueResource)
Vue.use(VueRouter)

// import '../../filters/index'

let router = new VueRouter()

import card from './card.vue'
import diancan from './diancan.vue'
import app from './main.vue'
import choice from './choice.vue'

// var App = Vue.extend({})

/* eslint-disable no-new */

router.map({
  '': {
    component: choice
  },
  '/card': {
    component: card,
    name: 'card'
  },
  '/diancan': {
    component: diancan,
    name: 'diancan'
  }
})

router.start(app, 'app')
