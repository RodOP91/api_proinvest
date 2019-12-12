const express = require('express')
const router = express.Router();
const Inversionista = require('../dataaccess/model/Inversionista')

/**
 * GET todos los Inversionistas
 * @params null
 * @returns Array de Jsons con los Inversionistas
 */
router.get('/all', (req, res)=>{
    Inversionista.find((err, docs)=>{
        if(err){
            res.status(500).json({
                message: 'Hubo un error al recuperar a los Inversionistas',
                error: err
            })
            return
        }
        res.json(docs)
    })
})

/**
 * GET one by ID, recupera a un Inversionista por su ID
 * @params id
 * @returns inversionista que coincida con la id propocionada
 */
router.get('/:id', (req, res)=>{
    if(!req.params.id){
        res.status(400).json({
            message:'Parámetro inexistente',
            error: req.params.id
        })
        return
    }

    Inversionista.findById({_id: req.params.id}, (err, docs)=>{
        if(err){
            res.status(500).json({
                message: 'Error al recuperar al Inversionista solicitado',
                error: err.body
            })
            console.error(err)
            return
        }
        res.status(200).json(docs)
    })
})



/**
 * POST nuevo Inversionista
 * @params nombre, apellido paterno, apellido materno, rfc, fecha nacimiento, grado académico,
 * profesión, empresa, email y teléfono celular. Corresponde al primer paso de alta de datos del
 * Inversionista
 * @returns res = response
 */
router.post('/new', (req, res) =>{
    /**
     * Validación que los parámetros de req.body existan, regresa código 400 si faltan
     */
    if(!req.body.nombre || !req.body.apellido_paterno || !req.body.apellido_materno || !req.body.rfc
        || !req.body.fecha_nac || !req.body.grado_academico || !req.body.profesion || !req.body.empresa
        || !req.body.email || !req.body.telefono_celular){
            res.status(400).json({
                message: 'Parámetros incompletos y/o inválidos',
                request: req.body
            })
            return
        }
    //let fecha = new Date()
    let inversionista = new Inversionista({
        nombre: req.body.nombre,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        rfc: req.body.rfc,
        fecha_nac: req.body.fecha_nac,
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

/**
 * PUT registra los datos del Paso 2 del formulario
 * @params calle, numero, numero_interior, codigo_postal, colonia, municipio, estado
 */
router.put('/paso2/:id', (req, res)=>{
    if(!req.body.calle || !req.body.numero || !req.body.numero_interior || !req.body.codigo_postal
        || !req.body.colonia || !req.body.municipio || !req.body.estado){
            res.status(400).json({
                message : 'Parámetros incompletos y/o inválidos',
                request: req.body
            })
            return
        }

        Inversionista.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, docs)=>{
            if(err){
                res.status(500).json({
                    message:'Error al actualizar datos de Inversionista',
                    error: err.body
                })
                return
            }
            res.status(200).json(docs)
        })
})
    

module.exports = router