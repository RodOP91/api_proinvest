const express = require('express')
const router = express.Router()
const Inversion = require('../dataaccess/model/Inversion')

/**
 * GET todos los tipos de Inversion en la BD
 * @params null
 */
router.get('/', (req, res)=>{
    Inversion.find((err, docs)=>{
        if(err){
            res.status(500).json({
                message: 'Error al recuperar las inversiones',
                error: err
            })
            console.error(err)
            return
        }
        res.json(docs)
    })
})

/**POST un nuevo tipo de inversión. No esta disponible para el cliente 
 * @params tipo de inversion, retorno anual
*/
router.post('/new', (req, res)=>{
    if(!req.body.tipo_inversion || !req.body.retorno){
        res.status(400).json({
            message: 'Parámetros incompletos y/o inválidos',
            request: req.body
        })
        return
    }
    let inversion = new Inversion({
        tipo_inversion: req.body.tipo_inversion,
        retorno: req.body.retorno
    })
    inversion.save((err, doc)=>{
        if(err){
            res.status(500).json({
                message: 'Error al guardar la Inversion en la base de datos.',
            })
            console.error(err)
            return
        }
        res.status(200).json(doc)
    })
})
module.exports = router