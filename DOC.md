## wdbfe-v2 交接文档
> 好近B端项目,提供给商家,页面大都为好近商户版客户端提供支持

项目结构

```
| wdbfe-v2
	|build          *** webpack配置文件
	|config		   ***	提供开发,测试,正式三种环境
	|src			   *** 主要目录
		| assets     *** 公共静态图片
		| components *** vue通用组件
		| filters    *** vue filters
		| methods    *** 公用js,包括微信授权,微信jssdk操作,常用util,Host URL及jsBridge
		| pages      *** 页面目录 每个页面单独生成一个文件夹,需在appConfig.js中注册
			| xxx
				| index.js
				| index.ejs
				| main.vue
	|static         *** 公共库 不支持require的库
	|.babelrc       *** babel 配置文件
	|.eslintrc.js   *** eslint 配置文件
	|appConfig.js   *** 注册页面js,每个页面都需要在此js中声明
	|package.json   *** npm配置文件
```
> `npm run dev` 启动开发模式 页面为 localhost:{端口}/xxx.html

> `npm run build_test` 会将所有的接口host替换为测试host,同时静态资源路径替换为"/near-v2/static/xx.xx",html 路径为 'near-v2/xx.html'

> `npm run build` 会将所有的接口host正式host,同时静态资源路径替换为"/near-v2/static/xx.xx",html 路径为 'near-v2/xx.html'
>
> `npm run build_online` 会将所有的接口host正式host,同时静态资源路径替换为"{七牛仓库地址}/near-v2/static/xx.xx",html 路径为 'near-v2/xx.html'

> `npm run build_offline` 打离线包,提供给客户端,离线页面需在appconfig.js中将supportOffline设置为true,会将所有的接口host正式host,同时静态资源路径替换为"/static/xx.xx",html 路径为 'xx.html'

* pages
	- activity 官方活动列表
	- activity-create 商家可创建活动列表
	- activity-detail 官方活动详情
	- activity-preview 官方活动预览
	- agreement-xxx 各种协议
	- baipai 白牌合作商家招募
	- bridge-test jsBridge第一版测试页面
	- com-authorize 好近授权确认页
	- coupon-recommend 红包查询
	- coupon-review 红包统计
	- data-record 商家结案报告
	- diancan-manage 商家点餐商品管理
	- hot-marketing 热点营销页面
	- jsbirdge-demo jsBridge 第二版测试页面
	- member-service 好近服务开通页面
	- merchant-loan 商家贷款页面
	- new-term 弃用
	- pay-guest 好近商户收款页面
	- pay-login 弃用
	- pwd-reset 密码重置页面
	- restaurant-order-list 好近点餐商家订单列表
	- sale-introduction 特卖介绍
	- sale-preview 特卖预览
	- takeout-order-list 好近外卖商家订单列表
	- takeout-settings 好近外卖商家设置
	- trade-statistics 商家交易统计
	- vip-introduction 会员介绍
	- wx-diancan-intro 点餐介绍

页面方面上面都有写到

这个是b端的新项目， 地址还是 http://wx.qfpay.com/near-v2/ + 页面的地址

页面地址在appConfig 这个文件里 就可以找到了

这个项目测试部署都是由测试去完成， 测试环境的地址就是 https://wx.qa.qfpay.net/near-v2/

灰度和线上的环境  只要在公司内网都是灰度的环境   如果想看正式的页面呢  就需要开4g




