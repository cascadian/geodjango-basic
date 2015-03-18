import express = require('express');
import pg = require('pg');
import _ = require('lodash');
var topojson = require('topojson');

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
    if (!err){
      
      res.json(result);
    }
  });
  
});


function runGeoQuery(commandText: string, params: any[], idColumn: string, propertyColumns: string[], callback: (err, result) => void) {
  pg.connect("postgres://geo@db/geodjango", (err, client, done) => {
    if (err) {
      return console.error('error connecting to database', err);
    }
    var query = client.query(commandText, params);
    query.on('row', (row, result) => result.addRow(toFeature(row, idColumn, ...propertyColumns)));
    query.on('end', (result) => callback(null, toTopoJson(featureCollection(result.rows))));
    
  });
}

function toFeature(r, idColumn: string, ...propertyColumns: string[]){
  var props = _.pick(r, propertyColumns);
  return {
    id: r.id,
    type: "Feature",
    properties: props,
    geometry: JSON.parse(r.geom)
  };
}

function featureCollection(features){
  var geojson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: features
  };
  return geojson;
}

function toTopoJson(featureCollection: GeoJSON.FeatureCollection) {

  var topoOptions = {
    "property-transform": feature => feature.properties
  };
  return topojson.topology({ borders: featureCollection }, topoOptions);
}

export = router;
