const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('../config/default')
const apiSolicitud = require('./routes/solicitud')

app.use(bodyParser.urlencoded({extended: true}))
app.use('/solicitud', apiSolicitud)

app.listen(config.PORT, config.BINDIND_IP, function() {
    console.log("App listening on " + config.BINDIND_IP + " at " + config.PORT);
})

module.exports = app