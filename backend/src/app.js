const express = require ('express')
const config = require('./config')
const morgan = require('morgan')

const usuarios = require('./modulos/usuarios/rutas')
const reservas = require('./modulos/reservas/rutas')
const auth = require('./modulos/auth/rutas')
const error = require('./red/errors')
const cors = require('cors')


const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/usuarios', usuarios)
app.use('/api/reservas', reservas)
app.use('/api/auth', auth)
app.use(error)
module.exports = app