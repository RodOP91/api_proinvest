const express = require('express')
const router = express.Router();
const Inversionista = require('../dataaccess/model/Inversionista')

/**
 * POST nuevo Inversionista
 * @params nombre, apellido paterno, apellido materno, rfc, fecha nacimiento, grado académico,
 * profesión, empresa, email y teléfono celular. Corresponde al primer paso de alta de datos del
 * Inversionista
 * @returns res = response
 */
router.post('/', (req, res) =>{
    /**
     * Validación que los parámetros de req.body existan, regresa código 400 si faltan
     */
    if(!req.body.nombre || !req.body.apellido_paterno || !req.body.apellido_materno || !req.body.rfc
        /*|| !req.body.fecha_nac*/ || !req.body.grado_academico || !req.body.profesion || !req.body.empresa
        || !req.body.email || !req.body.telefono_celular){
            res.status(400).json({
                message: 'Parámetros incompletos y/o inválidos',
                request: req.body
            })
            return
        }
    let fecha = new Date()
    let inversionista = new Inversionista({
        nombre: req.body.nombre,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        rfc: req.body.rfc,
        fecha_nac: fecha,
        grado_academico: req.body.grado_academico,
        profesion: req.body.profesion,
        empresa: req.body.empresa,
        email: req.body.email,
        telefono_celular: req.body.telefono_celular
    })
    console.log('Procesando creación de inversionista...')
    inversionista.save((err, doc)=>{
        if(err){
            res.status(500).json({
                message: 'Error al guardar al Inversionista en la base de datos.',
            })
            console.error(err)
            return
        }
        res.status(200).json(doc)
    })
})
    

module.exports = router