var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';


function filterChapters(html){
	var $ = cheerio.load(html);
	var chapters = $('.mod-chapters');
	// console.log(chapters);
	var data = [];

	chapters.each(function(item) {
		var c = $(this);
		var title = c.find('strong').text();
		var v = c.find('.video').children('li');
		var d = {
			title:title,
			videos:[]
		}

		v.each(function(item) {
			var a = $(this).find('a');
            var t = a.text();
            var href = a.attr('href');
            d.videos.push({
            	title:t,
            	href:href,
            });
		});
		data.push(d);
		//console.log(d);
	});
	//console.log(data)
	return data;

}

function printData(data){
	data.forEach(function(item){
		console.log(item.title);
		item.videos.forEach(function(item){
			console.log("      "+item.title);
			console.log("      "+item.href);
		})
	})
}

http.get(url,function(res){
	var html = "";
	res.on('data',function(data){
		html += data;
	})

	res.on('end',function(){
		// console.log(html);
		var data = filterChapters(html);
		printData(data);
	})

	res.on('error',function(){
		console.log('error');
	})

})