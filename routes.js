var express = require('express'),
  router = express.Router(),
  API = require('./src/controller'),
  conf = require('./config'),
  basicAuth = require('basic-auth')

router.use(function (req, res, next) {
  console.log(req.method + ' ' + req.path)
  next()
})

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  }

  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (user.name === conf.admin.username  && user.pass === conf.admin.password) {
    return next();
  } else {
    return unauthorized(res);
  }
}


router.get('/', function (req, res) {
  res.render('pages/index')
})

router.get('/design', function (req, res) { //MSR Design
  res.render('pages/design')
})

router.get('/dashboards', function (req, res) { //References
  res.render('pages/dashboards')
})

router.get('/about', function (req, res) {
  res.render('pages/about')
})

router.get('/contact', function (req, res) {
  res.render('pages/contact')
})


//API TEST
router.get('/api/size', auth, function (req, res) { //todo head <> backend
  API.getSize(req.query.lat, req.query.lon, req.query.precision, req.query.lastTimestamp, (e) => {
    res.send(e)
  })
})


router.get('/api/areaMatches', function (req, res) {
  // get the list of message ids
  API.getList(req.query.lat, req.query.lon, req.query.precision, req.query.lastTimestamp, (response) => {
    let messages = response.content.messageInfoes;
    let messageInput = '';
    if (messages) {
      let query = {
        "RequestedQueries": messages
      };
      try {
        messageInput = JSON.stringify(query);
      }
      catch(e) {
        console.log("JSON.stringify error");
      }
      API.postMessage(messageInput, (response) => {
        let matches = [];
        let matchMessages = response.content.matchMessages;
        if (matchMessages) {
          matches = matchMessages.map((m) => {
            return m.areaMatches;
          });
        }
        // flat requires Node > 11
        let flattenedMatches = matches.flat();
        let result = {
          matches: flattenedMatches
        };
        res.send(result);
      })
    }
  })
})

router.get('/api/list', function (req, res) {
  API.getList(req.query.lat, req.query.lon, req.query.precision, req.query.lastTimestamp, (e) => {
    res.send(e)
  })
})


router.post('/api/message', function (req, res) { //todo post <> backend
  let messageInput = '';

  let messages = req.body.messages;
  if (messages) {
    let query = {
      "RequestedQueries": messages
    };
    try {
      messageInput = JSON.stringify(query);
    }
    catch(e) {
      console.log("JSON.stringify error");
    }
  }

  API.postMessage(messageInput, (e) => {
    res.send(e)
  })
})


router.post('/api/report', function (req, res) { //todo put <> backend
  let input = '';
  let body = req.body;
  try {
    input = JSON.stringify(body);
  }
  catch(e) {
    console.log("JSON.stringify error");
  }
  API.putAreaReport(input, (e) => {
    res.send(e)
  })
})


module.exports = router