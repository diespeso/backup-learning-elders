const fs = require('fs');
const path = require('path');
const readline = require('readline');

const DELIMITER = ',';
const ID_INDEX = 0;

const CSV_HEADERS = [
  'ID',
  'FAKE_01',
  'FAKE_02',
  'FUENTE_01',
  'FUENTE_02',
  'REALIDAD_01',
  'REALIDAD_02',
  'FAKE_03',
  'DESCONFIANZA_01',
  'DESCONFIANZA_02',
  'LIMITACION_01',
];

const INDEXES = {
  ID: 0,
  ANS1: 1,
  ANS2: 2,
};

const writeLine = async (userId, respuestas, filename) => {
  const filePath = path.join(
    __dirname,
    '..',
    filename,
  );
  /// try headers
  const content = await fs.promises.readFile(filePath);
  if (content.length === 0) {
    //write headers
    let headers = '';
    CSV_HEADERS.forEach((header, i) => {
      headers += header;
      if (i !== CSV_HEADERS.length - 1) {
        headers += ',';
      }
    });
    headers += '\n'
    await fs.promises.appendFile(
      filePath,
      headers,
      () => { }
    )
  }
  //end try
  let contenido = `${userId},`
  respuestas.forEach((respuestaObj, i) => {
    contenido += respuestaObj.respuesta
    if (i !== respuestas.length - 1) {
      contenido += ','
    }
  })
  contenido += '\n'
  await fs.promises.appendFile(
    filePath,
    contenido,
    () => { }
  )
}

const readLine = async (userId, filename) => {
  const readLinesPromise = await fs.promises.readFile(path.join(  //NOTA, FIX, TODO, IMPORTANT AH: NUNCA USAR ESTO EN EL MUNDO REAL SI SE USA NODE(SYNC)
    __dirname,
    '..',
    filename,
  ))
  const lines = readLinesPromise.toString().split('\n'); //READ ALL LINES

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
  const data = await fs.promises.readFileSync(fileName, 'utf-8');
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
  const evaluationObject = {};
  evaluationFields.forEach((fieldName, i) => {
    let element = evaluationArray.slice(1)[i];
    if (element === 'true') {
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
