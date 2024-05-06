const db = require('../../DB/mysql');

const TABLA = 'usuario'

function todos(){
    return db.todos(TABLA)
}

function uno(id){
    return db.uno(TABLA, id)
}

function eliminar(body){
    return db.eliminar(TABLA, body)
}

function actualizar(body){
    return db.actualizar(TABLA, body)
}

module.exports={
    todos,
    uno,
    eliminar,
    actualizar,

}