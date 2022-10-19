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
    () => { }
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

const readDump = async (evaluationTypeName) => {
  let fileName = '';
  if (evaluationTypeName === 'pre') {
    fileName = path.join(
      __dirname,
      '..',
      'dump.txt',
    );
  } else if (evaluationTypeName === 'post') {
    fileName = path.join(
      __dirname,
      '..',
      'dump_post.txt',
    );
  } else {
    throw new Error('InvalidTypeName for readDump: must be either "pre" or "post"');
  }
  const data = fs.readFileSync(fileName, 'utf-8');
  return data;
}
/**
 * converts an array of string fields that represent an evaluation
 * extracted from a file to an object that represents the evaluation
 * in an easier way.
 * @param {*} evaluationArray values of the evaluation, including user id at index 0
 * @param {*} evaluationFields sequence of fields to rename the indexes from the evaluationArray
 */
const lineToEvaluation = async (evaluationArray, evaluationFields) => {
  //if (evaluationArray.length - 1 !== evaluationFields.length) {
  //  console.log('evaluationArray is: ', evaluationArray);
  //  console.log('evaluationFields: ', evaluationFields);
  //  throw new Error('evaluationarray and evaluationfields lengths differ');
  //}
  const evaluationObject = {};
  evaluationFields.forEach((fieldName, i) => {
    let element = evaluationArray.slice(1)[i];
    if (element === 'true ') {
      element = true;
    }
    if (element === 'false') {
      element = false;
    }
    evaluationObject[fieldName] = element;
  });
  return evaluationObject;
};

module.exports = {
  writeLine,
  readLine,
  lineToEvaluation,
  readDump,
}
