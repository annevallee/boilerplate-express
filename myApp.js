let express = require('express');
let app = express();
let bodyParser = require("body-parser");
require('dotenv').config()

absolutePath = __dirname + '/views/index.html';
publicAbsolutePath = __dirname + "/public";

app.use(function middleware(req, res, next){
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

app.use("/public", express.static(publicAbsolutePath))

app.use(bodyParser.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
    getMessage = "Hello json";
    if (process.env.MESSAGE_STYLE == "uppercase") {
        getMessage = getMessage.toUpperCase();
    }
    res.json({"message": getMessage});
});

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    console.log(req.time)
    next();
}, (req, res) => {
    res.json({"time": req.time});
});

app.get("/:word/echo", (req, res) =>{
    res.json({echo: req.params.word});
    // console.log({"echo": req.params.word});
})

app.route("/name")
    .get((req, res) => {
        console.log(`INSIDE GET REQUEST: ${req.query.first}`)
        res.json({"name": `${req.query.first} ${req.query.last}`});
    })
    .post((req, res) => {
        res.json({name: `${req.body.first} ${req.body.last}`})
        console.log(`name: ${req.body.first} ${req.body.last}`)
    })

 module.exports = app;
