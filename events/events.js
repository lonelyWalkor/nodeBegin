//事件模块的 常用 api 及使用方法

var EventEmitter = require('events').EventEmitter;


var life = new EventEmitter();

//设置 一个事件的最大的 监听数量
life.setMaxListeners(11);

life.on('res',function(who){
	console.log('aa'+who);
})


// emit 出发一个事件
//返回一个 bool 表示该事件是否注册过监听
var bool = life.emit('res','cc');

// 移除一个事件监听   函数不能是一个匿名函数 必须是一个函数地址
// 否则讲不冷移除
//life.removeListener('res',aaa);

//移除所有的事件监听  若不传 则移除所有的 事件监听
life.removeAllListeners('[事件名称]');


//获取事件的 监听的函数列表
var funs = life.listeners('res');
//获取事件的 监听的函数个数
EventEmitter.listenerCount(life , 'res');