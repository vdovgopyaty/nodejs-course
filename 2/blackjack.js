var readline = require('readline'),
    fs = require('fs'),
    colors = require('colors');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function logging(log) {
    var logFile = 'blackjack.log';
    fs.appendFile(logFile, log + '\n', function(err) {
        if (err) throw err;
    });
};

var deck = [
    {
        value: 6,
        face: [
            '┌───────────┐',
            '│6          │',
            '│%          │',
            '│   %   %   │',
            '│           │',
            '│   %   %   │',
            '│           │',
            '│   %   %   │',
            '│          %│',
            '│          6│',
            '└───────────┘'
        ]
    },
    {
        value: 7,
        face: [
            '┌───────────┐',
            '│7          │',
            '│%          │',
            '│   %   %   │',
            '│     %     │',
            '│   %   %   │',
            '│           │',
            '│   %   %   │',
            '│          ♣│',
            '│          7│',
            '└───────────┘'
        ]
    },
    {
        value: 8,
        face: [
            '┌───────────┐',
            '│8          │',
            '│%          │',
            '│   %   %   │',
            '│     %     │',
            '│   %   %   │',
            '│     %     │',
            '│   %   %   │',
            '│          ♣│',
            '│          8│',
            '└───────────┘'
        ]
    },
    {
        value: 9,
        face: [
            '┌───────────┐',
            '│9          │',
            '│%  %   %   │',
            '│           │',
            '│   %   %   │',
            '│     %     │',
            '│   %   %   │',
            '│           │',
            '│   %   %  %│',
            '│          9│',
            '└───────────┘'
        ]
    },
    {
        value: 10,
        face: [
            '┌───────────┐',
            '│10         │',
            '│%  %   %   │',
            '│     %     │',
            '│   %   %   │',
            '│           │',
            '│   %   %   │',
            '│     %     │',
            '│   %   %  %│',
            '│         10│',
            '└───────────┘'
        ]
    },
    {
        value: 2,
        face: [
            '┌───────────┐',
            '│J          │',
            '│%          │',
            '│     ███   │',
            '│      █    │',
            '│      █    │',
            '│  █   █    │',
            '│   ███     │',
            '│          %│',
            '│          J│',
            '└───────────┘'
        ]
    },
    {
        value: 3,
        face: [
            '┌───────────┐',
            '│Q          │',
            '│%          │',
            '│   ███     │',
            '│  █   █    │',
            '│  █   █    │',
            '│  █   █    │',
            '│   ███ █   │',
            '│          %│',
            '│          Q│',
            '└───────────┘'
        ]
    },
    {
        value: 4,
        face: [
            '┌───────────┐',
            '│K          │',
            '│%          │',
            '│   █  █    │',
            '│   █ █     │',
            '│   ██      │',
            '│   █ █     │',
            '│   █  █    │',
            '│          %│',
            '│          K│',
            '└───────────┘'
        ]
    },
    {
        value: 11,
        face: [
            '┌───────────┐',
            '│A          │',
            '│%          │',
            '│           │',
            '│           │',
            '│     %     │',
            '│           │',
            '│           │',
            '│          %│',
            '│          A│',
            '└───────────┘'
        ]
    }
];

function showCard(card, suit) {
    console.log();
    switch (suit) {
        case 0:
            card.forEach(function(item) {
                console.log(' ' + item.black.bgWhite.replace(/%/g, '♣'));
            });
            break
        case 1:
            card.forEach(function(item) {
                console.log(' ' + item.red.bgWhite.replace(/%/g, '♥'));
            });
            break
        case 2:
            card.forEach(function(item) {
                console.log(' ' + item.black.bgWhite.replace(/%/g, '♠'));
            });
            break
        case 3:
            card.forEach(function(item) {
                console.log(' ' + item.red.bgWhite.replace(/%/g, '♦'));
            });
            break
    };
};

function Session(player1, player2) {
    this.id = Date.now();
    this.player1 = player1;
    this.player2 = player2;
    this.open = function() {
        logging('openSession: ' + this.id);
        logging('player1: ' + this.player1);
        logging('player2: ' + this.player2);
    };
    this.close = function() {
        logging('closeSession: ' + this.id);
    };
};

function Player(id, name) {
    this.id = id;
    this.name = name;
    this.score = 0;
    this.cards = [];
    this.takeCard = function(show, quantity) {
        if (quantity) {
            for (var i = 0; i < quantity; i++) {
                var randomCard = randomInt(0, deck.length - 1);
                var randomSuit = randomInt(0, 3);
                this.cards.push({
                    card: randomCard,
                    suit: randomSuit
                });
                this.score += deck[randomCard].value;
                logging(this.id + ' takeCard: ' + randomCard);
                logging(this.id + ' score: ' + this.score);
                if (show) {
                    showCard(deck[randomCard].face, randomSuit);
                };
            };
        } else {
            var randomCard = randomInt(0, deck.length - 1);
            var randomSuit = randomInt(0, 3);
            this.cards.push({
                card: randomCard,
                suit: randomSuit
            });
            this.score += deck[randomCard].value;
            logging(this.id + ' takeCard: ' + randomCard);
            logging(this.id + ' score: ' + this.score);
            if (show) {
                showCard(deck[randomCard].face, randomSuit);
            };
        };
    };
    this.showCards = function() {
        this.cards.forEach(function(item) {
            showCard(deck[item.card].face, item.suit);
        });
    };
    this.pass = function() {

    };
    this.sayScore = function() {
        var score = this.score;
        score += ((score % 10 == 1) && (score % 100 != 11)) ? ' очко' :
            ((score % 10 == (2 || 3 || 4)) && (score % 100 != (12 || 13 || 14))) ? ' очка' :
            ' очков';
        console.log();
        console.log(' У игрока ' + this.name + ' ' + score + '.');
    };
};


rl.question(' Добро пожаловать в игру Блэкджек. Введите ваше имя: ', function(name) {
    var computer = new Player('player2', 'Компьютер');
    var player = new Player('player1', name);
    var session = new Session(player.name, computer.name);
    session.open();
    player.takeCard(true, 2);
    player.sayScore();
    computer.takeCard(false, 2);
    while (computer.score < 16) {
        computer.takeCard();
    };
    // while (player.score < 21) {
    //     rl.question(' Взять еще одну карту? (да/нет) ', function(answer) {
    //         if (answer == 'да') {
    //             player.takeCard(true);
    //             player.sayScore();
    //         };
    //     });
    //     rl.pause();
    // };

    rl.on('close', function() {
        session.close();
        rl.question('Уже уходишь? Может ещё одну игру? (да/нет): ', function(answer) {
            if (answer == 'да') {
                rl.write();
            } else {
                rl.question(player.name + ', куда же ты? Сейчас придут шлюхи! Возвращайся скорее!', function(answer) {
                    rl.close();
                });
            };
        });
    });
});
