const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config();

app.use('/media', express.static(__dirname + '/media'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    return res.json({ message: "ok" });
    // return res.sendFile(__dirname + '/public' + 'index.html')
});

app.listen(process.env.PORT, `${process.env.HOST}`, () => {
    console.log('server up');
});