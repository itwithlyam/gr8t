const express = require('express');
const {uid} = require('uid/secure')
const cookieParser = require("cookie-parser");


const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use(cors({
    origin: "http://127.0.0.1:3000",
    credentials: true
}));

app.use(express.json())
app.use(cookieParser());


db = {
    "admin": {
        pass: "admin",
        token: null
    }
}

app.post('/verify', (req, res) => {
    console.log("Verifying Session ID")
    console.log(req)
    res.send(JSON.stringify({ pass: true }))
})

app.post('/login', (req, res) => {
    if (!db[req.body.uname]) {
        console.log(req.body.uname)
        res.send(JSON.stringify({
            type: "error",
            content: "username"
        }))
    } else if (req.body.pass == db[req.body.uname].pass) {
        let t;
        if (!db[req.body.uname].token) {
            t = uid(100)
            db[req.body.uname].token = t
        } else t = db[req.body.uname].token

        res.cookie('session', t, { maxAge: 900000, httpOnly: true });
        res.send({
            type: "success",
            token: t
        });
    } else {
        res.send(JSON.stringify({
            type: "error",
            content: "password"
        }))
    }

});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));