const TABLA = 'auth'
const bcrypt = require('bcrypt')
const auth = require('../../auth')


module.exports= function(dbInyectada){

    let db = dbInyectada

    if (!db){
        db = require('../../DB/mysql')
    }

    async function login(nombreUsuario, pass){
        console.log(nombreUsuario, pass)
        const data = await db.query(TABLA, {nombreUsuario: nombreUsuario})

        return bcrypt.compare(pass, data.pass)
            .then(sonIguales => {
                if (sonIguales === true){
                    //generar token
                    return auth.asignarToken({...data})
                }else{
                    throw new Error('Información inválida')
                }
            })
    }
    /// video 6 21:43
    async function actualizar(data){
        const autData = {
            id: data.id
        }

        if (data.nombreUsuario){
            autData.nombreUsuario = data.nombreUsuario
        }

        if (data.pass){
            autData.pass = await bcrypt.hash(data.pass.toString(),5)
        }
        return db.actualizar(TABLA, autData)
    }

    return {
        actualizar,
        login,
    }
}