const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config();

let userRouter = require('./src/user/router');
let essayRouter = require('./src/essay/router');
let reviewRouter = require('./src/review/router');

const app = express();

app.use(cors());
const authMiddleware = (req, res, next) => {
    let isLogin = req.method == 'PUT' && (req.url == '/user/login' || req.url == '/user/login/');
    let isSignUp = req.method == 'POST' && (req.url == '/user' || req.url == '/user/')
    if (isLogin || isSignUp) {
        next();
    } else {
        const { authorization } = req.headers
        jwt.verify(authorization, 'testsecret', (err, decoded) => {
            if (err)
                res.status(500).send({ status: "failed", msg: "Un authorized" })
            else {
                // console.log('decoded data', decoded)
                req.id = decoded.data.id
                next();
            }
        })

        // try {
        //     let verify = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMCwiZW1haWwiOjExfSwiaWF0IjoxNTg3Mjg0MDM2LCJleHAiOjE1ODcyODc2MzZ9.65slG4P1JGIDqLeEKcJK50aWu_r2mGt4Qp-uqfjnyu0', 'testsecret');
        //     req.id = verify.data.id;
        //     next();
        // } catch (err) {
        //     console.log('verify failed')
        //     res.status(404).send({ msg: 'unauthorised' })
        // }
    }
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(authMiddleware)
app.use('/user', userRouter);

app.use('/essay', essayRouter);

app.use('/review', reviewRouter);

app.use('/test', (req, res) => res.status(200).send('Server running successfully'))

app.listen(process.env.PORT, () => console.log(`Example app listening at http://localhost:${process.env.PORT}`))
