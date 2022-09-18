const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config();

app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log('server up');
});