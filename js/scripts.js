var defaultCenter = [40.8169169,-73.918108];
var defaultZoom = 14;
var map = L.map('my-map').setView(defaultCenter, defaultZoom);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
    attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
}).addTo(map);

const lookupYearBuilt = function(YearBuilt) {
  switch(YearBuilt){
    case '2017':
      return{
        color: 'white',
      }
    }
    }

var plutodataGeojson = L.geoJSON(plutodata, {
  style: function(feature){

    return{
      color: 'white',
      fillColor: lookupYearBuilt(feature.properties.YearBuilt).color,
      fillOpacity:0.8,
      weight:1,
    }
},
onEachFeature: function(feature, layer){
  const description= lookupYearBuilt(feature.properties.YearBuilt).description;

  layer.bindPopup('${feature.properties.Address}<br/>${description}',{
    closeButton: false,
    minWidth:60,
    offset:[0,-10]
  });
  layer.on('mouseover',function(e){
    this.openPopup();

    e.target.setSTyle({
      weight:3,
      color: 'white',
    });

    if(!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  });
  layer.on('mouseout', function(e){
    this.closePopup();
    plutodataGeojson.resetStyle(e.target);
  });
}
}).addto(map);
