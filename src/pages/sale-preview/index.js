import 'lib-flexible'
import FastClick from 'fastclick'
window.FastClick = FastClick
import Vue from 'vue'

import App from './main'
import '../../filters'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
