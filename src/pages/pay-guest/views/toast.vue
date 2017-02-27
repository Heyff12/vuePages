<template>
  <div class="c-toast" v-show="visible">{{msg}}</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['msg'],
  data () {
    return {
      visible: false
    }
  },
  watch: {
    'msg': function (val, oldVal) {
      if (val) {
        this.visible = true
        let _t = setTimeout(() => {
          this.visible = false
          this.msg = ''
          clearTimeout(_t)
        }, 1500)
      }
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .c-toast {
    position: fixed;
    z-index: 999999;
    bottom: 150px;
    left: 50%;
    border-radius: 5px;
    padding: 20px 20px;
    min-height: 20px;
    background-color: #FF8100;
    color: #fff;
    text-align: center;
    animation-fill-mode: both;
    animation: toast 0.5s;
    font-size: 15px;
    transform: translate3d(-50%, -3.5rem, 0);

    @keyframes toast {
      0% {
        opacity: 0;
        transform: translate3d(-50%, 0, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(-50%, -3.5rem, 0);
      }
    }
  }
</style>
