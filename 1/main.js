var console = require('better-console'),
    beep = require('beepbeep'),
    sfx = require('sfx');

// beep(3, 1000);
sfx.random();

console.warn('Внимание! Сейчас будет выведена таблица умножения');
console.time('Таблица выведена за');

function Matrix(rows, cols) {
    var arr = new Array();
    for(var i = 1; i <= cols; i++) {
        arr[i] = new Array();
        for(var j = 1; j <= rows; j++) {
            arr[i][j] = i * j;
        }
    }
    return arr;
}
var matrix = Matrix(9, 9);

console.table(matrix);
console.timeEnd('Таблица выведена за');
console.log();

var myObject = new Object();
var myObject = {
    name: 'Vladislav',
    age: '21',
    skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'PHP'
    ]
};

console.warn('Вывод объекта');
console.dir(myObject);
