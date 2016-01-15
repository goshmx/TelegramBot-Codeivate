# TelegramBot-Codeivate
Bot de telegram para interactuar con el API de Codeivate y notificar cuando ciertos usuarios estan programando, lenguaje y datos adicionales.

##Instalacion
* Desde la consola en la carpeta del proyecto, descargar los modulos necesarios para el funcionamiento del script.

```javascript
npm install 
```
* Crear un archivo llamado **config.json** en la carpeta raiz del proyecto con la siguiente estructura.

```json
{
  "debug": false,
  "lang_monitor": true,
  "telegram_token": "TOKEN_DEL_BOT",
  "telegram_name":"NOMBRE_BOT",
  "canales":["12345","67890"],
  "users":[
    {
      "usuario": "NOMBRE_USUARIO",
      "codeivate": "USUARIO_CODEIVATE",
      "programando": false,
      "lenguaje": null
    }
  ]
}
```
- **debug:** Habilitar mensajes en consola.
- **lang_monitor:** Habilitar la notificacion por cambio de lenguaje.
- **telegram_token:** El codigo de telegram enviado por "Botfather".
- **telegram_name:** El nombrel del bot de telegram.
- **canales:** Un array donde tendran los ID de chats donde enviara los mensajes el script.
- **users:** Un array con un objeto con los datos basicos del usuario de codeivate, solo se debe cambiar los valores con mayusculas.

* Ejecutar en consola el script.
```bash
node index.js
```


  

