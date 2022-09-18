const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config();

app.get('/', (req, res) => {
    return res.redirect('./public/index.html');
});


app.use('/media', express.static(__dirname + '/media'));
app.use(express.static(__dirname + '/public'));


app.listen(process.env.PORT, `${process.env.HOST}`, () => {
    console.log('server up');
});