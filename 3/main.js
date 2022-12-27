'use strict';

var request = require('request'),
    cheerio = require('cheerio'),
    colors = require('colors'),
    readline = require('readline'),
    rl = readline.createInterface({
        input  : process.stdin,
        output : process.stdout
    });

request('http://geekbrains.ru/posts', function(error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        var posts = [];

        $('.event').each(function(i, element) {
            var title = $(this).find('.h4');
            var desc = $(this).find('.tc');
            var link = $(this).find('a[href]').first().attr('href');

            posts.push({
                title: title.text().trim(),
                desc: desc.text().trim(),
                link: link.trim()
            });
        });

        var page = 1;
        var pages = Math.ceil(posts.length / 5);

        var showPage = function(page) {
            for (var i = 0; i < 5; i++) {
                console.log(colors.grey('\nНовость ' + (i + 1) + ' из 5'));
                console.log(colors.bold(posts[i + page * 5 - 5].title.toUpperCase()));
                console.log(posts[i + page * 5 - 5].desc);
            }
            console.log('\nСтраница ' + page + ' из ' + pages);
            pagination(page, pages);
        };

        var pagination = function(page, pages) {
            console.log('\nЧтобы открыть полный текст новости введите её номер.');
            if (page == pages) {
                console.log('Для постраничной навигации используйте PREV (предыдущая):');
            } else if (page == 1) {
                console.log('Для постраничной навигации используйте NEXT (следующая):');
            } else {
                console.log('Для постраничной навигации используйте PREV (предыдущая) или NEXT (следующая):');
            }
            rl.question('', function(answer) {
                if (answer.toLowerCase() == 'next') {
                    if (page == pages) {
                        pagination(page, pages);
                    } else {
                        page++;
                        showPage(page);
                    }
                } else if (answer.toLowerCase() == 'prev') {
                    if (page == 1) {
                        pagination(page, pages);
                    } else {
                        page--;
                        showPage(page);
                    }
                } else if (answer == '1') {
                    openPost(page, page * 5 - 5);
                } else if (answer == '2') {
                    openPost(page, page * 5 - 4);
                } else if (answer == '3') {
                    openPost(page, page * 5 - 3);
                } else if (answer == '4') {
                    openPost(page, page * 5 - 2);
                } else if (answer == '5') {
                    openPost(page, page * 5 - 1);
                } else {
                    pagination(page, pages);
                }
            });
        };

        var openPost = function(page, post) {
            request('http://geekbrains.ru' + posts[post].link, function(error, response, html) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    var content = $('.blogpost').find('.content');
                    console.log(colors.bold('\n\n' + posts[post].title.toUpperCase()), '\n');
                    console.log(content.text().trim() + '\n');
                    var back = function() {
                        console.log('\nЧтобы вернуться к списку новостей введите BACK (назад):');
                        rl.question('', function(answer) {
                            if (answer.toLowerCase() == 'back') {
                                showPage(page);
                            } else {
                                back();
                            }
                        });
                    };
                    back();
                }
            });
        }

        showPage(page);

    } else {
        console.error(error);
    }
});
