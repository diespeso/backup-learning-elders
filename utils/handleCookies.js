const { v4: uuid} = require('uuid')

const PRE_COOKIE_NAME = 'PRETESTDONE'
const USER_ID = 'USERID'
const COOKIE_AGE =  900000
const CURRENT_PAGE = 'CURRENTPAGE'

const defaultOptions = {
    maxAge: COOKIE_AGE,
    httpOnly: true,
}

const coockieSetPreTestDone = (req, res) => {
    res.cookie(PRE_COOKIE_NAME, true, defaultOptions)
}

const coockieGetPreTestDone = (req, res) => {
    return req.cookies[PRE_COOKIE_NAME] ?? false
}
/**
 * Tries to set the user id cookie,
 * if the cockie already exists, it does nothing
 * @param {*} req 
 * @param {*} res 
 */
const coockieTrySetUser = (req, res) => {
    const currentId = req.cookies[USER_ID]
    console.log('cur', currentId)
    if (!currentId) {
        console.log('entered')
        res.cookie(USER_ID, uuid(), defaultOptions)
    }
}

const coockieGetUser = (req, res) => {
    console.log(JSON.stringify(req.cookies))
    return req.cookies[USER_ID]
}

const setGetCurrentPageCoockie = (req, res) => {
    const { currentPage } = req.body
    res.cookie(
        CURRENT_PAGE,
        currentPage,
        defaultOptions
    )
}

module.exports = {
    coockieSetPreTestDone,
    coockieGetPreTestDone,
    coockieTrySetUser,
    coockieGetUser,
    setGetCurrentPageCoockie,
}