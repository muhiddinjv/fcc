//your node app starts here

// init project
var express = require('express');
var app = express();

// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
// 1451001600000
// 2015-12-25 
app.get("/api/:date", function (req, res) {
  const timestamp = req.params.date;
  if (isNaN(timestamp)) {
    res.json({utc: new Date(timestamp).toUTCString()});
  } else  {
    const utcDate = new Date(timestamp * 1000).toUTCString();
    res.json({unix: timestamp, utc: utcDate});
  }
});

// listen for requests :)
var listener = app.listen(1000 || process.env.PORT, function () {
  console.log('Your app is listening on http://localhost:' + listener.address().port);
});
