const TABLA = 'usuario'
const auth = require('../auth')


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
    
    async function actualizar(body){
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            apellido: body.apellido,
            tipo: body.tipo,
            estado: body.estado
        }
        const respuesta = await db.actualizar(TABLA, usuario)
    
        let insertId = body.id
        
        if(body.id === 0 && respuesta.insertId){
            insertId = respuesta.insertId // Corregido de inserId a insertId
        }
        let respuesta2 = ''
        if (body.nombreUsuario || body.pass){
            authAux = {
                id: insertId, // Corregido de inserId a insertId
                nombreUsuario: body.nombreUsuario,
                pass: body.pass
            }
            
             respuesta2 = await auth.actualizar(authAux)
        }
        return respuesta2
    }

    return {
        todos,
        uno,
        eliminar,
        actualizar,
    }
}