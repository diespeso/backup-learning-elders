module.exports = async (req, res) => {
    console.log(req)
    res.json({response: `got ${JSON.stringify(req.body)}`})
}