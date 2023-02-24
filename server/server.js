const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors')
const path = require('path');

const app = express();
let server = http.createServer(app);

// enable local connections - Cors
let options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false
}


//this.app.options('*', cors())//EL '*' INDICA QUE SE ACEPTAN TODAS LAS CONEXIONES DE CUALQUIER SERVIDOR.


app.use(cors(options));//INDICAMOS A EXPRESS QUE UTILICE LOS CORS.

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');





server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});