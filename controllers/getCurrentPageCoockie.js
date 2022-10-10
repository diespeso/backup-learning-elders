const { getCurrentPageCoockie } = require('../utils/handleCookies')

module.exports = (req, res) => {
    res.send({
        currentPage: getCurrentPageCoockie(req, res)
    })
}