const mongoose = require('../MongoConnect')
const Schema = mongoose.Schema

var InversionistaSchema = new Schema({
    nombre:{
        required: true,
        type: String
    },
    apellido_paterno:{
        required: true,
        type: String
    },
    apellido_materno:{
        required: true,
        type: String
    },
    rfc:{
        required: true,
        type: String
    },
    fecha_nac:{
        required: true,
        type: Date
    },
    grado_academico:{
        required: true,
        type: String
    },
    profesion:{
        required: true,
        type: String
    },
    empresa:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    telefono_celular:{
        required: true,
        type: String
    },
})

var Inversionista = mongoose.model('Inversionista', InversionistaSchema)
module.exports = Inversionista