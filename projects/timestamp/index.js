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

/*
  INPUT: 2015-12-25 OR 1451001600000
  BOTH OUTPUTS: {
  "unix": 1451001600000,
  "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
  }
*/

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const timestamp = req.params.date;
  
  if (isNaN(timestamp)) {
    const d = new Date(timestamp);

    res.json({unix: d.getTime(), utc: d.toUTCString()});
  } else {
    const utc = new Date(timestamp * 1).toUTCString();

    res.json({unix: parseInt(timestamp), utc});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 1000, function () {
  console.log('Your app is listening on http://localhost:' + listener.address().port);
});
