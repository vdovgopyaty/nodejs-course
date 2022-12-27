
var request = require('request'),
	cheerio = require('cheerio');

module.exports = function(post) {
	if (post) {
		var string = 'Здесь будет текст статьи ' + post;
		return string;
	} else {
		request('http://habrahabr.ru/', function(error, response, html) {
			var posts = [];
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);

				$('.posts').each(function(i, element) {
					var title = $(this).find('.title');
					var content = $(this).find('.content');
					var link = $(this).find('.title a[href]').attr('href');

					posts.push({
						title: title.text().trim(),
						content: content.text().trim(),
						link: link.trim()
					});
				});

				console.log(posts);

				return posts;
			} else {
				console.error(error);
			};
		});
		return request.posts;
	};
};


// request('http://habrahabr.ru/', function(error, response, html) {
// 	if (!error && response.statusCode == 200) {
// 		var $ = cheerio.load(html);

// 		var posts = [];

// 		$('.posts').each(function(i, element) {
// 			var title = $(this).find('.title');
// 			var content = $(this).find('.content');
// 			var link = $(this).find('.title a[href]').attr('href');

// 			posts.push({
// 				title: title.trim(),
// 				content: content.trim(),
// 				link: link.trim()
// 			});
// 		});

// 		return posts;
// 	} else {
// 		console.error(error);
// 	};