const express = require('express');
var bodyParser = require('body-parser')
require('dotenv').config();

let userRouter = require('./src/user/router');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use('/user', userRouter);

app.listen(process.env.PORT, () => console.log(`Example app listening at http://localhost:${process.env.PORT}`))
