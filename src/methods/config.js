/* global RUN_ENV */
/**
 * 环境
 * development: 开发
 * testing: 测试环境
 * production: 生产环境（默认）
 * online: 线上环境
 */

const ENV = RUN_ENV || 'production'

// 生产环境,线上配置
let host = 'http://wx.qfpay.com/'
let o2Host = 'https://o2.qfpay.com/'
let oHost = 'https://o.qfpay.com/'
let shHost = 'https://sh.qfpay.com/'
let aHost = 'http://a.haojin.me/'
let dcHost = 'https://o.qfpay.com/'
// 测试配置
if (ENV === 'testing') {
  host = 'http://wx.qfpay.com/'
  o2Host = 'https://1.openapi2.qfpay.com/'
  oHost = 'https://o.qa.qfpay.net/'
  shHost = 'https://sh.qa.qfpay.net/'
  aHost = 'http://a.haojin.me/'
  dcHost = 'https://o.qa.qfpay.net/'
}

// 开发配置
if (ENV === 'development') {
  host = 'http://wx.qfpay.com/'
  o2Host = 'https://1.openapi2.qfpay.com/'
  // oHost = 'https://o.qa.qfpay.net/'
  oHost = 'https://o.qfpay.com/'
  // oHost = 'http://172.100.111.45:2002/'
  shHost = 'https://sh.qa.qfpay.net/'
  aHost = 'http://a.haojin.me/'
  dcHost = 'https://o.qfpay.com/'
}

module.exports = {
  host: host,
  o2_host: o2Host,
  o_host: oHost,
  shHost: shHost,
  aHost: aHost,
  dcHost: dcHost,
  // eachPageNumber: eachPageNumber,
  code: {
    OK: '0000', // 成功
    DBERR: '2000', // 数据库查询错误
    THIRDERR: '2001', // 第三方系统错误
    SESSIONERR: '2002', // 用户未登录
    DATAERR: '2003', // 数据错误
    IOERR: '2004', // 文件读写错误
    LOGINERR: '2100', // 用户登录失败
    PARAMERR: '2101', // 参数错误
    USERERR: '2102', // 用户不存在或未激活
    ROLEERR: '2103', // 用户身份错误
    // ROLEERR: '2103', // 密码错误
    REQERR: '2200', // 非法请求或请求次数受限
    IPERR: '2201', // IP受限
    NODATA: '2300', // 无数据
    DATAEXIST: '2301', // 数据已存在
    UNKOWNERR: '2400', // 未知错误
    VERIFYCODE: '1001', //    验证码不正确
    REGISTERERR: '1000' //    注册失败
  }
}
