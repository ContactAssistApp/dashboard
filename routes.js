var express = require('express'),
router = express.Router();

router.use(function (req,res,next) {
  console.log(req.method + ' ' + req.path);
  next();
});

router.get('/',function(req,res){
  res.render('pages/index');
});

router.get('/about',function(req,res){
  res.render('pages/about');
});

router.get('/contact',function(req,res){
  res.render('pages/contact');
});

module.exports = router;