import 'lib-flexible'
import FastClick from 'fastclick'
window.FastClick = FastClick
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import '../../filters/index'
/* eslint-disable no-new */
import app from './app.vue'
new Vue({
  el: 'body',
  components: { app }
})
