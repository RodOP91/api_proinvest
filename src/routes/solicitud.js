const express = require('express')
const router = express.Router();

router.post('/prueba', (req, res) =>{
    var prueba = req.body.prueba
    console.log(`Mandaste ${prueba}`)
    res.status(200).json({
        message : 'éxito'
    })
})

router.get('/prueba2', (req, res)=>{
    console.log("Ha funcionado")
    res.status(200).json({
        message: 'éxito'
    })
})

module.exports = router