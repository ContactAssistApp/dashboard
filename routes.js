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

router.get('/api/list', auth, function (req, res) {
  API.getList(req.query.lat, req.query.lon, req.query.precision, req.query.lastTimestamp, (e) => {
    res.send(e)
  })
})

router.get('/api/message', auth, function (req, res) { //todo post <> backend
  API.postMessage('', (e) => {
    res.send(e)
  })
})

router.get('/api/report', auth, function (req, res) { //todo put <> backend
  API.putAreaReport('', (e) => {
    res.send(e)
  })
})


module.exports = router