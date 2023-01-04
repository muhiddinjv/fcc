let express = require("express");
let app = express();

bodyParser.urlencoded({extended: false})
require('dotenv').config();

// Serve an HTML file
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// 6 Use the .env file
app.get('/json',(req, res) => {
  let text = "Hello json!";

  if(process.env.MESSAGE_STYLE === 'uppercase'){
    text = text.toUpperCase();
  }

  res.json({message: text});
})

// 7 Implement a Root-Level Request Logger Middleware
function middleWare(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}
app.use(middleWare);

// 8 Chain Middleware to Create a Time Server
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({time: req.time});
});

// 9 Get Route Parameter Input from the Client
app.get('/:word/echo',(req, res)=>{
  res.json({echo: req.params.word});
})

// 10 Get Query Parameter Input from the Client
app.get('/name', (req, res)=>{
  res.json({name: `${req.query.first} ${req.query.last}`});
})

// 11 Use body-parser to Parse POST Requests
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}))

// 12 Get Data from POST Requests
app.post('/name', (req, res)=>{
  res.json({name: `${req.body.first} ${req.body.last}`});
})

module.exports = app;
