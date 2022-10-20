const dotenv = require('dotenv');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const { coockieTrySetUser } = require('./utils/handleCookies');

dotenv.config();

app.use(cookieParser())
app.use((req, res, next) => {
  coockieTrySetUser(req, res)
  next()
})
app.use(express.static(path.join(__dirname, 'frontend', "build")));
app.use('/media', express.static(__dirname + '/media'));
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

/*
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
});
*/

// router 
app.post('/evaluacion-pre', require('./controllers/postEvaluationPre'))
app.post('/evaluacion-post', require('./controllers/postEvaluationPost'))
app.post('/currentPageCookie', require('./controllers/postCurrentPageCoockie'))

app.get('/currentPageCookie', require('./controllers/getCurrentPageCoockie'))

app.get('/userEvaluation/pre', require('./controllers/getUserEvaluationPre'));
app.get('/userEvaluation/post', require('./controllers/getUserEvaluationPost'));

app.get('/dump/pre', require('./controllers/getResultsPre'))
app.get('/dump/post', require('./controllers/getResultsPost'))
//app.get('/dump/post', require('./controllers/getResultsPost'))
app.listen(process.env.PORT, `${process.env.HOST}`, () => {
  console.log('server up');
});
