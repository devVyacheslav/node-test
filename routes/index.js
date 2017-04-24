let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

let Cat = mongoose.model('Cat', { name: String });

let kitty = new Cat({ name: 'Zildjian' });

kitty.save();



/* GET home page. */
router.get('/', function(req, res, next) {
    Cat.find(function (err, cats) {
      res.render('index', { 
        title: 'Express',
        cats: cats
      });
    });
    
});

module.exports = router;
