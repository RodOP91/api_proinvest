const mongoose = require("mongoose");
//MONGODB_CONNECTION_STRING has the following format: `mongodb+srv://${user}:${password}@${server}/${database}`
//Read the .env file for more information.
//process.env.NODE_ENV='test'

//if(process.env.NODE_ENV === 'development'){
    const config = require('../config/default')
    mongoose.connect(config.MONGODB_CONNECTION_STRING, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    })
    console.log('Default mode')
//}
/*if(process.env.NODE_ENV === 'test'){
    const config_test = require('../config/test')
    mongoose.connect(config_test.MONGODB_TEST_CONNECTION_STRING, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    })
    console.log('Test mode')
}*/



module.exports = mongoose