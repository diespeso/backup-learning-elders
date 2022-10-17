const { writeLine } = require('../utils/handleDump');
const {
  cookieSetPostTestDone,
  cookieGetPostTestDone,
  coockieGetUser }
  = require('../utils/handleCookies');

module.exports = async (req, res) => {
  const { respuestas } = req.body;
  if (!cookieGetPostTestDone(req, res)) {
    writeLine(coockieGetUser(req, res), respuestas, 'dump_post.txt');
    cookieSetPostTestDone(req, res);
  }
  res.json({ response: `got ${respuestas}` })
}
