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
function actualizar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data], (err, result) => {
            return err ? reject(err) : resolve(result)
        })
    })
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

function query(tabla, consulta){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (err, result) => {
            if(err){
                return reject(err)
            }
            else{
                return resolve(result[0])
            }
        })
    })
}

module.exports = {
    uno,
    actualizar,
    eliminar,
    todos,
    query,
}