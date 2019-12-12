const mongoose = require('../MongoConnect')
const Schema = mongoose.Schema

var TokenSchema = new Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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