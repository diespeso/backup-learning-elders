const { readDump } = require('../utils/handleDump')
module.exports = async (req, res) => {
  try {
    const data = await readDump('pre');
    res.send(data);
  } catch (error) {
    res.status(500).json({
      name: error.name,
      mesage: error.message,
    })
  }
  res.send(data);
}
