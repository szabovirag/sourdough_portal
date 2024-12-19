const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const postRouter = require("./router/postRouter");
const sourdoughRouter = require("./router/sourdoughRouter") ;
const userRouter = require("./router/userRouter");

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser());

app.use('/api/posts', postRouter);
app.use('/api/sourdough', sourdoughRouter);
app.use('/api/users', userRouter);

module.exports = app;