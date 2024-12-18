const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser());

module.exports = app;