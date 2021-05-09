'use strict'

const API = require("./src/controller")
const TweetParser = require("./src/tweetparser")

var express = require("express"),
  app = express(),
  router = require("./routes"),
  path = require('path'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,
  host = process.env.OPENSHIFT_NODEJS_IP

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// serve static content
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'clientapp/build')));

app.use("/", router)
app.use('*', function (req, res) {
  res.render('pages/404')
})

app.listen(port, host, function () {
  host = host || 'localhost'
  console.log('Server is running at ' + host + ':' + port)
})

const tweetParser = new TweetParser();
API.getNewTweets(tweetParser);