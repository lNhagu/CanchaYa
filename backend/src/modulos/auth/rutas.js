const express = require('express')

const respuesta = require('../../red/respuestas')
const controlador = require('./index.js');
//const { actualizar } = require('../../DB/mysql');
//const { eliminar } = require('../../DB/mysql');
//const { uno } = require('../../DB/mysql');

const router = express.Router()

router.get('/login', login)

async function login (req, res, next){
    try{
        const token = await controlador.login(req.body.nombreUsuario, req.body.pass)
        respuesta.success(req, res, token, 200)
    }catch(err){
        next(err)
    }
}

module.exports = router
