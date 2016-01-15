var Bot = require('node-telegram-bot');
var request = require("request");

var config = require('./config.json');

consola('Inicio del Bot');
var bot = new Bot({
    token: config.telegram_token
}).on('message', function (message) {
        console.log(message);
        if(typeof message.text != "undefined") return actions.message(message);
    })
    .start();

setInterval(consultaCodeivate, 5000);

var actions = {
    "message": function(datos){
        var mensaje = datos.text.replace(config.telegram_name+' ','');
        msjStatus = mensaje.split(" ");

        switch (msjStatus[0]) {
            case '/ayuda':
                commands.ayuda(datos);
                break;
            case '/start':
                commands.start(datos);
                break;
        }
    },
    "send": function(mensaje){
        for (j = 0; j < config.canales.length; ++j) {
            opciones = {chat_id:config.canales[j], text: mensaje};
            bot.sendMessage(opciones,function(){
                consola("mensaje enviado!");
            });
        }
    }
};

var commands = {
    "ayuda": function(datos){

    },
    "start": function(datos){
        var respuesta = "Hola! "+datos.chat.first_name+" bienvenido al servicio de notificaciones de codeivate";
        opciones = {chat_id:datos.chat.id, text: respuesta};
        bot.sendMessage(opciones,function(){
            consola("mensaje enviado!");
        });
        actions.send(datos.chat.first_name+" quiere usar el api su clave del chat es: "+datos.chat.id);
    }
};

function consultaCodeivate() {
    for (i = 0; i < config.users.length; i++) {
        usuarioCodeivate(config.users[i].codeivate,verificaCodeivate);
    }
}

function usuarioCodeivate(usuario,funcion){
    var url = "http://codeivate.com/users/"+usuario+".json";
    request({
        url: url,
        json: true
    }, function(error, response, body){
        funcion(body);
    });
}

function verificaCodeivate(body){
    if (typeof body.programming_now != 'undefined'){
        var programming_now = body.programming_now;
        var current_language = body.current_language;

        for (i = 0; i < config.users.length; i++) {
            if(config.users[i].codeivate.toLowerCase() == body.name.toLowerCase()){
                if(config.users[i].programando != programming_now ){
                    if(programming_now == true){
                        actions.send(config.users[i].usuario+" empezo a programar en "+current_language);
                        config.users[i].lenguaje = current_language;
                    }
                    if(programming_now == false){
                        actions.send(config.users[i].usuario+" dejo de programar");
                        config.users[i].lenguaje = null;
                    }
                    config.users[i].programando = programming_now;
                }
                else{
                    if(programming_now == true){
                        if(config.users[i].lenguaje != body.current_language){
                            actions.send(config.users[i].usuario+" cambio de lenguaje "+current_language);
                            config.users[i].lenguaje = current_language;
                        }
                    }
                }
            }
        }
    }
}

function consola(msj){
    if(config.debug == true){
        console.log(msj);
    }
}