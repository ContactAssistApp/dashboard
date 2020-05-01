'use strict'

var express = require("express"),
  app = express(),
  router = require("./routes"),
  path = require('path'),
  port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,
  host = process.env.OPENSHIFT_NODEJS_IP

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// serve static content
app.use(express.static(path.join(__dirname, 'public')))

app.use("/", router)
app.use('*', function (req, res) {
  res.render('pages/404')
})

app.listen(port, host, function () {
  host = host || 'localhost'
  console.log('Server is running at ' + host + ':' + port)
})