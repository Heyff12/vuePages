<template>
  <div>
    <edit-settings :visible="page==0"></edit-settings>
    <settings :visible="page==1"></settings>
    <toast :msg.sync="msg"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import config from '../../methods/config'
  import bridge from '../../methods/bridge'
  import util from '../../methods/util'
  import editSettings from './components/edit-settings.vue'
  import settings from './components/settings.vue'
  import toast from '../../components/tips/toast.vue'
  export default {
    data () {
      return {
        msg: '',
        page: null,
        settings: {
          start_delivery_fee: 0,
          start_time: '10:30:00',
          userid: 0,
          delivery_open_state: 0,
          end_time: '21:00:00',
          min_shipping_fee: 0,
          shipping_fee: 0,
          id: 0
        }
      }
    },
    components: {
      editSettings, settings, toast
    },
    ready () {
      bridge.request({
        url: config.dcHost + 'diancan/mchnt/settings',
        method: 'JSONP',
        data: {
          format: 'jsonp'
        },
        callback: (res) => {
          if (res.respcd === '0000') {
            if (util.isEmptyObject(res.data.merchant_info)) {
              this.page = 0
            } else {
              this.settings = res.data.merchant_info
              this.page = 1
            }
          } else {
            this.msg = res.resperr
          }
        }
      })
    },
    attached () {
    },
    methods: {
    },
    events: {
      'on-page-change' (page) {
        this.page = page
      },
      'on-toast' (msg) {
        this.msg = msg
      }
    }
  }
</script>

<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "../../styles/common";
  html, body {
    height: auto !important;
  }
</style>
