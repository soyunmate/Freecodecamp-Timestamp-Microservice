// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function(req,res) {
  const newTime = new Date(Date.now());
    const response = {
      unix: newTime.getTime(),
      utc: newTime.toUTCString(),
    };
    res.send(response);
})

app.get("/api/:date", function (req,res) {
  const date = req.params.date
  const timeHandler = function (time) {
  const timeStamp = Date.parse(time);
  const timeDate = new Date(time).toUTCString();
  if (!isNaN(timeStamp)) {
    const response = {
      unix: timeStamp,
      utc: timeDate,
    };
    return response;
  } else if (isNaN(timeStamp)) {
    const timeStamp = new Date(+time).getTime();
    const timeDate = new Date(+time).toUTCString();
    if (timeDate === "Invalid Date") {
      const response = {
        error: timeDate,
      };
      return response;
    }
    const response = {
      unix: timeStamp,
      utc: timeDate,
    };
    return response;
  };
};
  res.send(timeHandler(date))
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
