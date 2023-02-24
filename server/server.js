const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors')
const path = require('path');

const app = express();

/* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
}); */

let server = http.createServer(app);

/* {
    cors: {
        origin: "https://localhost"
    }
} */

// enable local connections - Cors
let options = {
    "origin": "https://localhost"
}



app.use(cors());//INDICAMOS A EXPRESS QUE UTILICE LOS CORS.

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');





server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${port}`);

});