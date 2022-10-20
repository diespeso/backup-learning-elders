const { readDump } = require('../utils/handleDump');

module.exports = async (req, res) => {
    try {
        const data = await readDump('post');
        res.send(data);
    } catch (error) {
        res.status(500).json({
            name: error.name,
            message: error.message,
        })
    }
    res.send(data);
}