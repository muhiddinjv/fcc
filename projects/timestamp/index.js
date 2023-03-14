//your node app starts here
// init project
var express = require('express');
require('dotenv').config();
var app = express();

// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

/*
  INPUT: 2015-12-25 OR 1451001600000
  BOTH OUTPUTS: {
  "unix": 1451001600000,
  "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
  }
*/

function isValidDate(dateString) {
  var dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) {
    return false;
  }
  return true;
}



// your first API endpoint.... 
app.get("/api/:date?", function (req, res) {
  const timestamp = req.params.date;  
  let isTimeStamp = Number(timestamp) ? new Date(Number(timestamp)).getTime() > 0 : false;

  if (!req.params.date) {
    res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
  } 

  const d = new Date(timestamp);
  
  if(d == "Invalid Date" && !isTimeStamp){
    res.json({error: 'Invalid Date'});
  } else {
    if (isNaN(timestamp)) {
      res.json({unix: d.getTime(), utc: d.toUTCString()});
    } else {
      const utc = new Date(timestamp * 1).toUTCString();
  
      res.json({unix: parseInt(timestamp), utc});
    }
  }
});

// listen for requests :)
const port = process.env.PORT || 1000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on http://localhost:' + listener.address().port);
});
