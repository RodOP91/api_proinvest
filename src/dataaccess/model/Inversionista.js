const mongoose = require('../MongoConnect')
const Schema = mongoose.Schema

var InversionistaSchema = new Schema({
    //PROPIEDADES DEL PASO 1
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
    email_isValidado:{
        required: false,
        type: Number,
    },
    telefono_celular:{
        required: true,
        type: String
    },
    telefono_isValidado:{
        required:false,
        type: Number,
    },
    //TERMINAN PROPIEDADES DEL PASO 1

    //PROPIEDADES DEL PASO 2
    calle:{
        required:false,
        type: String,
    },
    numero:{
        required:false,
        type: String,
    },
    numero_interior:{
        required:false,
        type: String,
    },
    codigo_postal:{
        required:false,
        type: String,
    },
    colonia:{
        required:false,
        type: String,
    },
    municipio:{
        required:false,
        type: String,
    },
    estado:{
        required:false,
        type: String,
    },
    //TERMINAN PROPIEDADES DEL PASO 2
    solicitud_terminada:{
        required: false,
        type: Number
    },
})

var Inversionista = mongoose.model('Inversionista', InversionistaSchema)
module.exports = Inversionista