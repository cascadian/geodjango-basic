import express = require('express');
import fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'World Maps' });
});

router.get('/upload', (req, res, next) => {
  res.render('upload', { title: 'Upload geospatial data' });
  
});

router.post('/upload', (req, res, next) => {
  var files = req.files;
  
});

export = router;
