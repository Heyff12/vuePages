/**
 * 流水交易方式*/
exports.payType = (n) => {
  if (n.indexOf('8002') === 0) {
    return '微信支付'
  } else if (n.indexOf('8001') === 0) {
    return '支付宝'
  }
}
/**
 * 格式化货币*/
exports.formatCurrency = (number) => {
  if (isNaN(number)) return
  return (number / 100).toFixed(2)
}
/**
 * 流水支付成功后状态判断*/
exports.cancelStatus = (Status) => {
  if (Status === '0') {
    return '消费'
  } else {
    return '消费撤销'
  }
}
