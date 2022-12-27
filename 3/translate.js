'use strict';

var fs = require('fs'),
    http = require('http'),
    request = require('request'),
    readline = require('readline'),
    rl = readline.createInterface({
        input  : process.stdin,
        output : process.stdout
    }),
    argv = require('minimist')(process.argv.slice(2));

var apiKey = 'trnsl.1.1.20151113T100129Z.565212460ec5d73a.76c1baaa0a80af3059f8ef9a552c6af444326ce7';

var translate = function(enText) {
    request({
        method: 'POST',
        uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
        form: {
            key: apiKey,
            text: enText,
            lang: 'en-ru',
            format: 'plain'
        },
    }, function (error, response, body) {
        if (error) {
            console.error(error);
        } else {
            var body = JSON.parse(body);
            var ruText = enText + ' - ' + body.text[0] + '\n';
            console.log(ruText);
            fs.appendFile('translate.txt', ruText, function (err) {
                if (err) throw err;
            });
        }
        rl.close();
    });
};

translate(argv._[0]);