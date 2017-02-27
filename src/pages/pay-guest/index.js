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
import filters from './Filters'
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))
/* eslint-disable no-new */
router.map({
  '/': {
    name: 'payMoney',
    component: require('./views/payMoney.vue')
  },
  'login': {
    name: 'login',
    component: require('./views/login.vue')
  }
})
router.start(App, '#app')
