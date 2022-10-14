const fs = require('fs');
const path = require('path');
const readline = require('readline');

const DELIMITER = ',';
const ID_INDEX = 0;

const INDEXES = {
    ID: 0,
    ANS1: 1,
    ANS2: 2,
};

const writeLine = async (userId, respuestas, filename) => {
    console.log('test', userId, respuestas, filename);
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

const readLine = async (userId, filename) => {
    const lines = fs.readFileSync(path.join(
        __dirname,
        '..',
        filename,
    )).toString().split('\n'); //READ ALL LINES

    const idLine = lines // READ THE USERS LINE
        .filter((line) => line.split(DELIMITER)[ID_INDEX] === userId)[0];
   
    if (idLine) {
        return idLine.split(','); //  SPLIT ALL FIELDS
    }
}

/**
 * converts an array of string fields that represent an evaluation
 * extracted from a file to an object that represents the evaluation
 * in an easier way.
 * @param {*} evaluationArray values of the evaluation, including user id at index 0
 * @param {*} evaluationFields sequence of fields to rename the indexes from the evaluationArray
 */
const lineToEvaluation = async (evaluationArray, evaluationFields) => {
    if (evaluationArray.length - 1 !== evaluationFields.length) {
        console.log(evaluationArray.slice(1), evaluationFields);
        throw new Error('evaluationarray and evaluationfields lengths differ');
    }
    const evaluationObject = {};
    evaluationFields.forEach((fieldName, i) => {
        evaluationObject[fieldName] = evaluationArray.slice(1)[i];
    });
    return evaluationObject;
};

module.exports = {
    writeLine,
    readLine,
    lineToEvaluation,
}