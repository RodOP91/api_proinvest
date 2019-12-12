const mongoose = require('../MongoConnect')
const Schema = mongoose.Schema

var TokenSchema = new Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: ''
    }
})