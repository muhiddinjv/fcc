require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true})); 
app.use('/', express.static(`${process.cwd()}/`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/index.html');
});

const options = {
  all:true,
};

// Your first API endpoint
//https://forum.freecodecamp.org/
app.post('/api/shorturl', function(req, res) {

  dns.lookup(req.body.url, (err, address) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`IP address: ${address}`);
    }
  });

  res.json({ original_url : req.body.url, short_url : 1, orError: 'Invalid URL', error: "Invalid Hostname"});
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
