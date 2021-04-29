L.Control.SliderControl=L.Control.extend({options:{position:"bottomright",
layers:null,timeAttribute:'Date Const',isEpoch:false,maxValue:-1,minValue:-1,markers:null,range:!1,follow:!1},
initialize:function(a){L.Util.setOptions(this,a),this._layer=this.options.layer},
setPosition:function(a){var b=this._map;return b&&b.removeControl(this),
this.options.position=a,b&&b.addControl(this),this.startSlider(),this},
onAdd:function(a){this.options.map=a;var b=L.DomUtil.create("div","slider",this._container);
$(b).append('<div id="leaflet-slider" style="width:400px"><div class="ui-slider-handle"></div><div id="slider-timestamp" style="width:350px; margin-top:15px;background-color:#FFFFFF"></div></div>'),
$(b).mousedown(function(){a.dragging.disable()}),
$(document).mouseup(function(){a.dragging.enable(),$("#slider-timestamp").html("")});
var c=this.options;return this.options.markers=[],
this._layer?(this._layer.eachLayer(function(a){-1===c.minValue&&(c.minValue=a._leaflet_id),
c.maxValue=a._leaflet_id,c.markers[a._leaflet_id]=a}),
this.options=c):console.log("Error: You have to specify a layer via new SliderControl({layer: your_layer});"),b},
onRemove:function(a){for(i=this.options.minValue;i<this.options.maxValue;i++)a.removeLayer(this.options.markers[i]);$("#leaflet-slider").remove()},
startSlider:function(){_options=this.options,$("#leaflet-slider").slider({range:_options.range,value:_options.minValue+1,
min:_options.minValue,max:_options.maxValue+1,step:1,
slide:function(a,b){var c=_options.map;if(_options.markers[b.value]){void 0!==_options.markers[b.value].feature?_options.markers[b.value].feature.properties.time?_options.markers[b.value]&&$("#slider-timestamp").html(_options.markers[b.value].feature.properties.time.substr(0,19)):
console.error("You have to have a time property"):_options.markers[b.value].options.time?_options.markers[b.value]&&$("#slider-timestamp").html(_options.markers[b.value].options.time.substr(0,19)):console.error("You have to have a time property");
var d;if(_options.range){for(d=b.values[0];d<=b.values[1];d++)_options.markers[d]&&c.addLayer(_options.markers[d]);for(d=_options.maxValue;d>b.values[1];d--)_options.markers[d]&&c.removeLayer(_options.markers[d]);for(d=_options.minValue;d<b.values[0];d++)_options.markers[d]&&c.removeLayer(_options.markers[d])}else if(_options.follow){for(d=_options.minValue;d<b.value-_options.follow;d++)_options.markers[d]&&c.removeLayer(_options.markers[d]);for(d=b.value-_options.follow;d<b.value;d++)_options.markers[d]&&c.addLayer(_options.markers[d]);for(d=b.value;d<=_options.maxValue;d++)_options.markers[d]&&c.removeLayer(_options.markers[d])}else{for(d=_options.minValue;d<=b.value;d++)_options.markers[d]&&c.addLayer(_options.markers[d]);for(d=b.value+1;d<=_options.maxValue;d++)_options.markers[d]&&c.removeLayer(_options.markers[d])}}}}),_options.map.addLayer(_options.markers[_options.minValue])}}),
L.control.sliderControl=function(a){return new L.Control.SliderControl(a)};
