const fs = require('fs')
const path = require('path')

const writeLine = async (userId, respuestas, filename) => {
    let contenido = `${userId},`
    respuestas.forEach((respuestaObj, i) => {
        contenido += respuestaObj.respuesta
        if (i !== respuestas.length - 1) {
            contenido += ','
        }
    })
    contenido += '\n'
    await fs.appendFile(
        path.join(
            __dirname,
            '..',
            filename,
        ),
        contenido,
        () => {}
    )
}

module.exports = {
    writeLine,
}