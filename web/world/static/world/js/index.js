MAP = (function(){
var image = new ol.style.Circle({
  radius: 5,
  fill: null,
  stroke: new ol.style.Stroke({color: 'red', width: 1})
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
  'MultiPolygon': [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 1
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 0, 0.1)'
    })
  })],
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
  return styles[feature.getGeometry().getType()];
};

var map = new ol.Map({
  target: 'map',
  layers: [
  new ol.layer.Tile({
    title: "Global Imagery",
    source: new ol.source.TileWMS({
      url: 'http://maps.opengeo.org/geowebcache/service/wms',
      params: {LAYERS: 'bluemarble', VERSION: '1.1.1'}
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
addLayer('/world/buffered-borders/', 'Buffered World Borders',
[new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'blue',
    lineDash: [4],
    width: 3
  }),
  fill: new ol.style.Fill({
    color: 'rgba(0, 0, 255, 0.1)'
  })
})]);

function addLayer(url, title, style){

  httpinvoke(url, 'GET')
  .then(function(res){
    var geoJSON = JSON.parse(res.body);
    var source = new ol.source.GeoJSON({
      object: geoJSON
    });
    map.addLayer(new ol.layer.Vector({
      title: title,
      source: source,
      style: style ? style : styleFunction
    }));
  }, function (err){
      console.log(err);
  });

}

return map;

})()
