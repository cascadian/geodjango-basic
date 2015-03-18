var os = require('openlayers');
var httpinvoke = require('httpinvoke');

MAP = (function() {
  var image = new ol.style.Circle({
    radius: 5,
    fill: null,
    stroke: new ol.style.Stroke({
      color: 'red',
      width: 1
    })
  });

  var styles = {
    'Point': [new ol.style.Style({
      image: image
    })],
    'LineString': [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'green',
        width: 1
      })
    })],
    'MultiLineString': [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'green',
        width: 1
      })
    })],
    'MultiPoint': [new ol.style.Style({
      image: image
    })],
    'MultiPolygon': function(feature) {
      return [new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'green',
          width: 1
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 0, 0.1)'
        })
      })];
    },
    'Polygon': [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'blue',
        lineDash: [4],
        width: 3
      }),
      fill: new ol.style.Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      })
    })],
    'GeometryCollection': [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'magenta',
        width: 2
      }),
      fill: new ol.style.Fill({
        color: 'magenta'
      }),
      image: new ol.style.Circle({
        radius: 10,
        fill: null,
        stroke: new ol.style.Stroke({
          color: 'magenta'
        })
      })
    })],
    'Circle': [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 2
      }),
      fill: new ol.style.Fill({
        color: 'rgba(255,0,0,0.2)'
      })
    })]
  };

  var styleFunction = function(feature, resolution) {
    var type = feature.getGeometry().getType();
    var style = styles[type];
    return typeof style === 'function' ? style(feature, resolution) : style;
  };

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        title: "Global Imagery",
        source: new ol.source.TileWMS({
          url: 'http://maps.opengeo.org/geowebcache/service/wms',
          params: {
            LAYERS: 'bluemarble',
            VERSION: '1.1.1'
          }
        })
      })
    ],
    view: new ol.View({
      projection: 'EPSG:4326',
      center: [-98.35, 39.5],
      zoom: 4,
      maxResolution: 0.703125
    })
  });

  addLayer('/world/borders/', 'World borders');
  addLayer('/world/borders/usa/states/', 'States');
  addLayer('/world/borders/usa/buffer/0.05', 'Buffered World Borders',
    function(feature) {
      return [new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3
        }),
        fill: new ol.style.Fill({
          color: 'rgba(0, 0, 255, 0.1)'
        }),
        text: new ol.style.Text({
          text: feature.get('name'),
          font: '12px Calibri,sans-serif',
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
          })
        })
      })]
    }
  );

  function addLayer(url, title, style) {

    return httpinvoke(url, 'GET', {
        headers: {
          'accept': 'application/json'
        },
      })
      .then(function(res) {
        var geoJSON = JSON.parse(res.body);
        var source = new ol.source.TopoJSON({
          object: geoJSON
        });
        map.addLayer(new ol.layer.Vector({
          title: title,
          source: source,
          style: style ? style : styleFunction
        }));
      }, function(err) {
        console.log(err);
      });

  }

  return map;

})()
