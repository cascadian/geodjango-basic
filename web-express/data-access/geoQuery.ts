import pg = require('pg');
import _ = require('lodash');
var topojson = require('topojson');


export function runGeoQuery(commandText: string, params: any[], idColumn: string, propertyColumns: string[], callback: (err, result) => void) {
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

var topoOptions = {
  "property-transform": feature => feature.properties
};

function toTopoJson(featureCollection: GeoJSON.FeatureCollection) {
  return topojson.topology({ borders: featureCollection }, topoOptions);
}