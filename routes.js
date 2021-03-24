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

  if (user.name === conf.admin.username && user.pass === conf.admin.password) {
    return next();
  } else {
    return unauthorized(res);
  }
}

var combineMessageInfoAndMessage = function (messages, matchMessages)
{
  let matches = [];
  if (!matchMessages) {
    return matches;
  }

  for (i = 0; i < matchMessages.length; i++) {
    matches.push({
      messageId: messages[i].messageId,
      messageTimestamp: messages[i].messageTimestamp,
      userMessage: matchMessages[i].userMessage,
      area: matchMessages[i].area
    });
  }
  return matches;
}

router.get('/', function (req, res) {
  res.sendFile('index.html', { root: "./clientapp/build"});
})

router.get('/admin', function (req, res) {
  res.sendFile('index.html', { root: "./clientapp/build"});
})

router.get('/welcome', function (req,res) {
  res.render('pages/index');
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
      catch (e) {
        console.log("JSON.stringify error");
      }
      API.postMessage(messageInput, (response) => {
        let matchMessages = response.content.narrowcastMessages;
        let matches = combineMessageInfoAndMessage(messages, matchMessages);
        let result = {
          matches: matches
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

router.get('/api/usermentionstweets', function (req, res) {
  API.getUserMentionsTweets('1350123171933003776', (e) => {
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
    catch (e) {
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
  catch (e) {
    console.log("JSON.stringify error");
  }
  API.putAreaReport(input, (e) => {
    res.send(e)
  })
})

router.post('/auth', function (req, res) { //todo basic authentication <> backend
  let user = '';
  user = req.body.user;
  if (!user || !user.name || !user.pass) {
    res.send(401)
  }
  if (user.name === conf.admin.username && user.pass === conf.admin.password) {
    res.send(200)
  } else {
    res.send(401)
  }
})

module.exports = router