var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://188.225.36.182/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ 
  name: 'Zildjian',
  say: 'Hello World' 
});

kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  Cat.find(function (err, kittys) {
    res.render('index', { 
      title: 'Express',
      cats: kittys 

    });
  });
  
});

module.exports = router;
