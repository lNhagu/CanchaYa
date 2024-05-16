const TABLA = 'reserva'


module.exports= function(dbInyectada){

    let db = dbInyectada

    if (!db){
        db = require('../../DB/mysql')
    }

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

    return {
        todos,
        uno,
        eliminar,
        actualizar,
    }
}