
var map = L.map('my-map').setView([37.8, -96], 4);

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'png'
}).addTo(map);

L.geoJson(statesData).addTo(map);

function getColor(d) {
    return d > 50000000  ? '#722F37' :
           d > 20000000  ? '#895158' :
           d > 1000000  ? '#A17479' :
           d > 500000   ? '#B8979B' :
           d > 2000   ? '#D0B9BC' :
           d > 0   ? '#E7DCDD' :
                      '#FFFFFF';
}
function style(feature) {
    return {
        fillColor: getColor(feature.properties.gallon),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
		info.update(layer.feature.properties);

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
		}}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
		info.update();
}

var geojson;

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
			}
var info = L.control();

		info.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		    this.update();
		    return this._div;
		};
		info.update = function (props) {
		    this._div.innerHTML = '<h4>Wine Production by gallon</h4>' +  (props ?
		        '<b>' + props.name + '</b><br />' + props.gallon
		        : 'Hover over a state');
		};
		info.addTo(map);

		$('.reset').click(function() {
  map.flyTo([37.8, -96], 4)
});
