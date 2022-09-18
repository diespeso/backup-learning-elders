const dotenv = require('dotenv');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

dotenv.config();

app.use('/media', express.static(__dirname + '/media'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/public' + 'index.html')
});

app.post('/test_post', (req, res) => {
    console.log(req.body);
    res.send("ok");
});

app.listen(process.env.PORT, `${process.env.HOST}`, () => {
    console.log('server up');
});