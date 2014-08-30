front-end-watching
=========

front end watching

##项目概述
此方案为网站的可用性测试及用户体验提供支持。

##项目描述
为按钮和导航等元素做监控，当用户对该元素进行操作时，记录用户本次行为。针对每个监控点做DO和UO的记录，通过大数据分析为页面元素优化配置提供支持。

##名词释义
DO: (dot operation)单位时间内，埋点被点击的次数（此处的点击为有效点击，即经过前端高频率点击过滤）。
		算法：得出在指定时间内，records的记录条数。
UO: (user operation)单位时间内，埋点被多少用户点击。不同的cookie即为不同的用户。
		算法：得出在指定时间内，records的记录条数，过滤过相同cookie的情况。

##项目设置

###数据设置
所有的数据存储在mongoDB中的watching数据库，埋点采用自动注册方式，即当记录埋点被操作信息时，自动检测，存在则记录，不存在则先注册再记录。

###数据库描述
watching(db):dots(collection),
> * dots字段描述：
如：
```javascript
{
	dotId:"111",
	pageId:"xymain001",
	elementId:"submitInfo"
}
```
埋点ID：dotId[string],当该埋点首次加入时自动生成。
页面ID：pageId[string],该埋点所在的页面ID。
元素ID：elementId[string]，埋点所在的dom元素的真实ID。

> * records字段描述：
如:
```javascript
{
	dotId:"111",
	records:{
		"2014-8-10":{
									time:"2014-8-10 17:00",
									user:"cookie",
								}
	}
}
```
埋点ID：dotId[string]
用户ID：userId[string],以当前时间随机生成唯一数。
点击时间：time[string]

###前端对接
当新用户访问时，前端生成带有特殊标识的cookie，用来识别该用户的本次访问。当浏览器关闭时，该cookie自动失效。该cookie与后端cookie无任何关联。


问题待解决：MongoDB中是否可以以某种时间格式做数据排序处理。