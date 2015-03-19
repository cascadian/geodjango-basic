import express = require('express');

import _ = require('lodash');
import geoQuery = require('../data-access/geoQuery');

var runGeoQuery = geoQuery.runGeoQuery;

var router = express.Router();

router.get('/', function(req, res, next) {
  var sql = 
  `SELECT 
    id, 
    name,
    pop2005, 
    area, 
    ST_AsGeoJSON(mpoly) as geom 
  FROM world_worldborder 
  WHERE name = $1 OR name = $2`;
  
  runGeoQuery(sql, ['United States', 'Mexico'], "id", ["name", "pop2005", "area"], (err, result) => {
    if (!err){
      res.json(result);
    }
  });

});

router.get('/usa/states', function(req, res, next) {
  var sql = 
  `SELECT id, 
  state_name,
  ST_AsGeoJSON(geom) as geom 
  FROM world_state`;
  
  runGeoQuery(sql, [], "id", ["state_name"], (err, result) => {
    if (!err){
      res.json(result);
    }
  });
  
});

router.post('/usa/states', (req, res, next) => next(new Error('not implemented')));

router.get('/usa/buffer/:buffer_size', function(req, res, next) {
  var sql = 
  `SELECT id, 
          name, 
          pop2005, 
          area, 
          ST_AsGeoJSON(ST_Buffer(mpoly, $1)) as geom 
  FROM world_worldborder  
  WHERE name = $2`;
  
  runGeoQuery(sql, [req.params.buffer_size, 'United States'], "id", ["name", "pop2005", "area"], (err, result) => {
    if (err) return next(err);
    
    res.json(result);
    
  });
  
});




export = router;
