const mongoose = require('mongoose')
const Schema = mongoose.Schema

var DocumentoSchema = new Schema({
    tipo_documento:{
        required: true,
        type: String
    },
    nombre:{
        required: true,
        type: String
    },
    inversionista_id:{
        required: false,
        type: String
    }
})

var Documento = mongoose.model('Documento', DocumentoSchema)
module.exports = Documento