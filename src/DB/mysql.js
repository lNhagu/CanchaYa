const mysql = require('mysql')

const config = require('../config')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig)
    conexion.connect((err) => {
        if(err){
            console.log('[db err]',err)
            setTimeout(conMysql, 200)
        }
        else{
            console.log("DB Conectada ")
        }
    })

    conexion.on('error', (err) => {
        console.log('[db err]',err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql()
        }
        else{
            throw err
        }
    })
}

conMysql()

function todos(tabla){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (err, result) => {
            if(err){
                return reject(err)
            }
            else{
                return resolve(result)
            }
        })
    })
}

function uno(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, (err, result) => {
            if(err){
                return reject(err)
            }
            else{
                return resolve(result)
            }
        })
    })
}

//insertar
function insertar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (err, result) => {
            if(err){
                return reject(err)
            }
            else{
                return resolve(result)
            }
        })
    })
}

//actualiza
function editar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, data.id], (err, result) => {
            if(err){
                return reject(err)
            }
            else{
                return resolve(result)
            }
        })
    })
}
function actualizar(tabla, data){
    if (data && data.id == 0){
        return insertar(tabla, data)
    }else{
        return editar(tabla, data)
    }
}

function eliminar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET estado = 0 WHERE id = ?`, data.id, (err, result) => {
            if(err){
                return reject(err)
            }
            else{
                return resolve(result)
            }
        })
    })
}

module.exports = {
    uno,
    actualizar,
    eliminar,
    todos
}