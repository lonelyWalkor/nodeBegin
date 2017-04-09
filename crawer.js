var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';


function filterChapters(html) {
	var $ = cheerio.load(html);
	var chapters = $('.chapter');
	//console.log(chapters.length);
	var data = [];

	chapters.each(function(item) {
		var c = $(this);
		var t = c.find('strong').text();
		t = t.replace(/\ +/g, ""); //去掉空格
		t = t.replace(/[ ]/g, ""); //去掉空格
		t = t.replace(/[\r\n]/g, ""); //去掉回车换行		
		var v = c.find('.video').children('li');
		var d = {
			title: t,
			videos: []
		}

		v.each(function(item) {
			var a = $(this).find('a');
			var t = a.text();
			// t = t.replace(/^\s+|\s+$/g, "");
			t = t.replace(/\ +/g, ""); //去掉空格
			t = t.replace(/[ ]/g, ""); //去掉空格
			t = t.replace(/[\r\n]/g, ""); //去掉回车换行
			//console.log(t);
			var href = a.attr('href');
			d.videos.push({
				title: t,
				href: href,
			});
		});
		data.push(d);
		//console.log(d);
	});
	//console.log(data)
	return data;

}

function printData(data) {
	data.forEach(function(item) {
		console.log(item.title+"\n");
		item.videos.forEach(function(item) {
			console.log("        [" + item.title + "]     " + item.href +"\n");
		})
	})
}

http.get(url, function(res) {
	var html = "";
	res.on('data', function(data) {
		html += data;
	})

	res.on('end', function() {
		// console.log(html);
		var data = filterChapters(html);
		printData(data);
	})

	res.on('error', function() {
		console.log('error');
	})

})