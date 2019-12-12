const mongoose = require('../MongoConnect')
const Schema = mongoose.Schema

var InversionSchema = new Schema({
    tipo_inversion:{
        required: true,
        type: String
    },
    retorno:{
        required: true,
        type: Number
    }
})

var Inversion = mongoose.model('Inversion', InversionSchema)
module.exports = Inversion