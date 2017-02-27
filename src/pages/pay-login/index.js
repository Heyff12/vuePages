// import 'lib-flexible'
import FastClick from 'fastclick'
window.FastClick = FastClick
import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
Vue.use(VueResource)
Vue.use(VueRouter)
let router = new VueRouter()
/* eslint-disable no-new */
// router.map({
//   ' ': {
//     name: 'wechat',
//   },
//   'wechat': {
//     name: 'wechat',
//   },
//   'zhifubao': {
//     name: 'zhifubao',
//   }
// })
router.start(App, '#app')
