const { readLine, lineToEvaluation } = require('../utils/handleDump');
const { coockieGetUser } = require('../utils/handleCookies');

const PRE_EVAL_FIELDS = [
    'id',
    'ans1',
    'ans2',
] // TAMBIEN PODRIA SER BRINDADO POR EL REQUEST, USAR ESTE DE DEFAULT

// TODO: MANEJAR ESTO DESDE FRONT, HAY UN ESTADO QUE TIENE LOS NOMBRES DE LAS RESPUESTAS
// O IGNORAR Y SEGUIR CON MI VIDA

module.exports = async (req, res) => {
    const userId = coockieGetUser(req, res);

    const { preguntas } = req.body;
    const { q } = req.query;
    const preguntasObj = JSON.parse(q).preguntas;
    if(!q) {
        res.status(500).json({
            name: 'MissingQuery',
            message: 'missing JSON query object',
        });
        return;
    }
    let line;
    let obj;
    try {
        line = await readLine(userId, 'dump.txt');
        obj = await lineToEvaluation(line, preguntasObj);
    } catch (err) {
        res.status(500).json({
            name: err.name,
            message: err.message,
        });
        return;
    }
    
    res.json({
        evaluationData: obj,
    })
};