const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const buildPath = path.join(__dirname, '../../app/build');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(buildPath));

app.use('/', require('../controllers/index'));

const port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port ', port);

module.exports = app;

