// use util for seeting current page cookie
const { setGetCurrentPageCoockie } = require('../utils/handleCookies') 

module.exports = async (req, res) => {
    return setGetCurrentPageCoockie(req, res)
}