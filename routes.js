var express = require('express'),
  router = express.Router(),
  API = require('./src/controller')

router.use(function (req, res, next) {
  console.log(req.method + ' ' + req.path)
  next()
})

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
router.get('/api/size', function (req, res) { //todo head <> backend
  API.getSize(req.query.lat, req.query.lon, req.query.precision, req.query.lastTimestamp, (e) => {
    res.send(e)
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