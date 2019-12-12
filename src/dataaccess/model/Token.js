const mongoose = require('../MongoConnect')
const Schema = mongoose.Schema

var TokenSchema = new Schema({
    _userId:{
        type: String,
        required: true,
        ref: 'User'
    },
    tipo:{
        type: String,
        required: true,
    },
    token:{
        required: true,
        type: String
    },
    createdAt:{
        required: true,
        type: Date,
        default: Date.now,
        expires: 43200
    }
})

var Token = mongoose.model('Token', TokenSchema)
module.exports = Token