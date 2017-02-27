<template>
  <div>
    <ul class="keyboard">
      <li v-for="key in keyList" track-by="$index" v-text="key" @click="clickKey(key)"></li>
    </ul>
  </div>
</template>
<style lang="scss" type="scss" rel="stylesheet/scss">
  .keyboard {
    width: 265px;
    margin: 0;
    padding: 0;
    list-style: none;
    user-select: none;
    overflow: hidden;

    li {
      float: left;
      margin: 0 0px 10px 10px;
      width: 78px;
      height: 61px;
      line-height: 61px;
      text-align: center;
      background: #fff;
      border: 1px solid #DEDEDE;
      border-radius: 3px;
      font-size: 30px;
      color: #606470;

      &:hover {
        position: relative;
        background-color: #E5E5E5;
        cursor: pointer;
      }
      &:active {
        top: 1px;
        left: 1px;
      }
    }
  }
</style>
<script>
  export default {
    props: ['keyboardText', 'keyboardMath', 'keyboardVal'],
    data () {
      return {
        keyList: [],
        normalKeyList: [],
        _length: 0
      }
    },
    methods: {
      clickKey (key) {
        switch (key) {
          case 'C':
            this.keyboardVal === 1 ? this.keyboardText = '' : this.keyboardMath = ''
            this.keyboardVal === 1 ? document.querySelector('.pay_input').focus() : document.querySelector('.pay_math').focus()
            break
          case '.':
            if (this.keyboardVal === 1) {
              if (this.keyboardText.trim() === '') {
                this.keyboardText = '0.'
                document.querySelector('.pay_input').focus()
              } else if (this.keyboardText.match(/\.+?/g)) {
                document.querySelector('.pay_input').focus()
                return
              } else {
                this.keyboardText += '.'
                document.querySelector('.pay_input').focus()
              }
            } else {
              document.querySelector('.pay_input').focus()
              return
            }
            break
          default:
            if (this.keyboardVal === 1) {
              let kt = this.keyboardText.indexOf('.')
              let kl = this.keyboardText.length
              if (kt !== -1) {
                if (kt + 3 === kl) return
              } else {
                if (kl === 5) return
              }
              if (kl > 0 && this.keyboardText.indexOf('0') === 0) {
                if (kt !== 1) {
                  this.keyboardText = key
                  return
                }
              }
              this.keyboardText += key.toString()
              document.querySelector('.pay_input').focus()
            } else {
              this.keyboardMath = this.keyboardMath.replace(/\D/g, '').replace(/....(?!$)/g, '$& ')
              this.keyboardMath += key.toString()
              document.querySelector('.pay_math').focus()
            }
            break
        }
      }
    },
    ready () {
      let normalKeyList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'C']
      this.keyList = this.normalKeyList = normalKeyList
    }
  }
</script>
