var TELEGRAMTOKEN = '';
var NOMBREBOT = ''; //@nombreBot

var Bot = require('node-telegram-bot');

console.log('Inicio del Bot');
var bot = new Bot({
    token: TELEGRAMTOKEN
}).on('message', function (message) {
        console.log(message);
    })
    .start();
