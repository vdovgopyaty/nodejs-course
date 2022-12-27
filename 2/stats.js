var readline = require('readline'),
    fs = require('fs'),
    colors = require('colors');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Добро пожаловать в анализатор игровых логов. Введите путь к log-файлу: ', function(logFile) {
    fs.readFile(logFile, {encoding: 'utf8'}, function (err, data) {
        if (err) {
            console.error('Вы неверно указали путь к log-файлу.');
            rl.close();
        }
        console.log(data);
    });
});