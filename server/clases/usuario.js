class Usuarios {

    constructor() {
        this.personas = []
    }

    agregarPersona(id, nombre) {
        let persona = { id, nombre }

        this.personas.push(persona);

        return this.personas;
    }

    getPersonaById(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0]

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        throw new Error('Not implemented')
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersonaById(id)
        this.personas = this.personas.filter(persona => persona.id !== id)
        return personaBorrada
    }
}

module.exports= Usuarios

