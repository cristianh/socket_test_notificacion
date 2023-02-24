const { io } = require('../server');

const Usuarios = require('../clases/usuario');

const usuario = new Usuarios();

io.on('connection', (client) => {
    client.on('entrar_chat', (data, callback) => {



        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            })
        }

        let personas = usuario.agregarPersona(client.id, data.nombre)

        //EVENTO PARA TODAS LAS PERSONA CONECTADAS INFORMANDO LA LISTA DE LOS USUARIOS CONECTADOS
        client.broadcast.emit('listaPersona', usuario.getPersonas())

        callback(personas)


    })

    //EVENTO AL DESCONECTARSE
    client.on('disconnect', () => {
        let personaborrada = usuario.borrarPersona(client.id)

        //NOTIFICAR A TODOS LOS USUARIOS
        client.broadcast.emit('mensaje_desconexion', { usuario: 'Administrador', mensaje: `${personaborrada.nombre} abandonó el chat` })
        //EVENTO PARA TODAS LAS PERSONA CONECTADAS INFORMANDO LA LISTA DE LOS USUARIOS CONECTADOS
        client.broadcast.emit('listaPersona', usuario.getPersonas())

    })
});

