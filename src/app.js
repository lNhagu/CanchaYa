const express = require ('express')
const config = require('./config')
const morgan = require('morgan')

const usuarios = require('./modulos/usuarios/rutas')
const reservas = require('./modulos/reservas/rutas')

const error = require('./red/errors')

const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/usuarios', usuarios)
app.use('/api/reservas', reservas)
app.use(error)

module.exports = app