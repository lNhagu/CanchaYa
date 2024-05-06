const express = require('express')

const respuesta = require('../../red/respuestas')
const controlador = require('./controlador');
//const { actualizar } = require('../../DB/mysql');
//const { eliminar } = require('../../DB/mysql');
//const { uno } = require('../../DB/mysql');

const router = express.Router()

router.get('/', todos)
router.get('/:id', uno)

//eliminar
router.put('/',eliminar)

//actualizar
router.post('/',actualizar)

async function todos(req, res, next){
    try {
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error)
    }
};


async function uno(req, res, next){
    try {
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error)
    }
};

async function actualizar(req, res, next){
    try {
        const items = await controlador.actualizar(req.body);
        if (req.body.id == 0){
            mensaje = 'item guardado con exito'
        }else{
            mensaje = 'item actualizado con exito'
        }

        respuesta.success(req, res, mensaje, 201);
    } catch (error) {
        next(error)
    }
};

async function eliminar(req, res, next){
    try {
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'item eliminado satisfactoriamente', 200);
    } catch (error) {
        next(error)
    }
};

module.exports = router