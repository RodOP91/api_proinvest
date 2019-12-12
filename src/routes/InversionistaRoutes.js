const express = require('express')
const router = express.Router();
const {check, validationResult} = require('express-validator')
var crypto = require('crypto')
var nodemailer = require('nodemailer')
const Token = require('../dataaccess/model/Token')
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
 * @params ids
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
router.post('/new',[check('email').isEmail()], (req, res) =>{
    /**
     * Validación de mail funcional
     */
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }

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
    
    /**VALIDACIÓN DE EMAIL */
    // Crear un token de verificación
    var token = new Token({ _userId: req.body.rfc, tipo: "email", token: crypto.randomBytes(16).toString('hex') });
 
    // Save the verification token
    token.save(function (err) {
        if (err) {
            console.error(err)
            return
        }

        // Send the email
        var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'rodrigo.op1791@gmail.com', pass: 'garGantua56' } });
        var mailOptions = { from: 'rodrigo.op1791@gmail.com', to: req.body.email, subject: 'Account Verification Token', 
        text: 'Hello,\n\n' + 'Su código de validación es: ' + token.token + '\n\n Recuerde que su código expira 12 horas después de haber recibido este mail.' };
        transporter.sendMail(mailOptions, function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            console.log('A verification email has been sent to ' + user.email + '.')
        })
    })

    /**
     * VALIDACIÓN DE EMAIL
     */


     /**
      * VALIDACIÓN DE TELÉFONO
      */
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Your Account Sid and Auth Token from twilio.com/console
    // DANGER! This is insecure. See http://twil.io/secure
    const accountSid = 'AC5e711606e00e78d03a0926f041d7ca4b';
    const authToken = 'db19b624b21e813a696202470abe6f25';
    const client = require('twilio')(accountSid, authToken);

     // Crear un token de verificación
     var tokensms = new Token({ _userId: req.body.telefono_celular, tipo: "sms", token: crypto.randomBytes(16).toString('hex') });
    // Save the verification token
    tokensms.save(function (err) {
        if (err) {
            console.error(err)
            return
        }
    })
    client.messages
    .create({
        body: 'ProInvest le otorga su código de verificación para continuar con su solicitud de Inversión:' + tokensms.token,
        from: '+12017629874',
        to: '+52' + req.body.telefono_celular
    })
    .then(message => console.log(message.sid));

     
})
/**
 * GET Confirmación de correo electrónico
 */
router.get('/mail/validation', (req, res) =>{
 
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'No podemos verificar su email. Recuerde que su link de confirmación dura 12hrs. a partir de que recibe su mail de confirmación.' });
 
        // If we found a token, find a matching user
        console.log(token._userId)
        Inversionista.findOne({rfc: token._userId}, function (err, doc) {
            if (!doc) return res.status(400).send({ msg: 'No existe ningún Inversionista asociado a este token (SMS)' });
            if (doc.email_isValidado) return res.status(400).send({ type: 'already-verified', msg: 'Este usuario ya ha sido validado' });
 
            // Verify and save the user
            doc.email_isValidado = true;
            doc.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("El email ha sido validado exitosamente");
            })
        })
    })
})

/**
 * GET Confirmación de correo electrónico
 */
router.get('/sms/validation', (req, res) =>{
 
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'No podemos verificar su email. Recuerde que su link de confirmación dura 12hrs. a partir de que recibe su mail de confirmación.' });
 
        // If we found a token, find a matching user
        console.log(token._userId)
        Inversionista.findOne({telefono_celular: token._userId}, function (err, doc) {
            if (!doc) return res.status(400).send({ msg: 'No existe ningún Inversionista asociado a este token' });
            if (doc.email_isValidado) return res.status(400).send({ type: 'already-verified', msg: 'Este usuario ya ha sido validado' });
 
            // Verify and save the user
            doc.telefono_isValidado = true;
            doc.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("El email ha sido validado exitosamente");
            })
        })
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



/**
 * SECCION DE CREACIÓN DE SMS
 */


module.exports = router