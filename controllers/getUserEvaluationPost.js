const { readLine, lineToEvaluation } = require('../utils/handleDump');
const { coockieGetUser } = require('../utils/handleCookies');

module.exports = async (req, res) => {
    const userId = coockieGetUser(req, res);

    const { q } = req.query;
    const preguntasObj = JSON.parse(q).preguntas;

    if(!q) {
        res.status(500).json({
            name: 'MissingQuery',
            message: 'Missing JSON query object',
        });
        return;
    }

    let line;
    let obj;
    try {
        line = await readLine(userId, 'dump_post.txt');
        console.log(line, preguntasObj);
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
    });
};