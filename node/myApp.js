let express = require("express");
let app = express();
require('dotenv').config();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

function middleWare(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}
app.use(middleWare);

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({time: req.time});
});

app.get('/json',(req, res) => {
  let text = "Hello json!";

  if(process.env.MESSAGE_STYLE === 'uppercase'){
    text = text.toUpperCase();
  }

  res.json({message: text});
})

module.exports = app;
