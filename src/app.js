const express = require('express')
const cors = require('cors')
const app = express()
const config = require('./config/default')
const apiInversionista = require('./routes/InversionistaRoutes')
const apiInversion = require('./routes/InversionRoutes')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json({limit:'10mb'}))
app.use('/inversionista', apiInversionista)
app.use('/inversion', apiInversion)

app.listen(config.PORT, config.BINDIND_IP, function() {
    console.log("App listening on " + config.BINDIND_IP + " at " + config.PORT);
})

module.exports = app