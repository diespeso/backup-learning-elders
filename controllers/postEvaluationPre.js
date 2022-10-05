const { writeLine } = require('../utils/handleDump')
const { coockieSetPreTestDone, coockieGetPreTestDone,
    coockieGetUser,
} = require('../utils/handleCookies')

module.exports = async (req, res) => {
    //write into the .txt the column names first i guess (maybe in init or maybe not)
    //every time write into the .txt the answers in order
    const { respuestas } = req.body
    if (!coockieGetPreTestDone(req, res)) { // permitir guardar una sola vez
        writeLine(coockieGetUser(req, res), respuestas, 'dump.txt')
        coockieSetPreTestDone(req, res)
    }
    res.json({response: `got ${respuestas[0].respuesta}`})
}