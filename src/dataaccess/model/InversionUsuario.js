const mongoose = require('../MongoConnect')
const Schema = mongoose.Schema

var InversionUsuarioSchema = new Schema({
    usuario_id:{
        required:true,
        type: String,
    },
    inversion:{
        required: true,
        type: Inversion
    },
    monto:{
        required: true,
        type: Number
    },
    plazo:{
        required:true,
        type: Number
    }

})

var Inversion = mongoose.model('InversionUsuario', InversionUsuarioSchema)
module.exports = Inversion