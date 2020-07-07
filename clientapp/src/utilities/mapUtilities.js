let map = null; //global 
let layer = [];
let pins = [];

function createCustomClusteredPin(cluster) {
    //Define variables for minimum cluster radius, and how wide the outline area of the circle should be.
    var minRadius = 12;
    var outlineWidth = 7;
    //Get the number of pushpins in the cluster
    var clusterSize = cluster.containedPushpins.length;
    //Calculate the radius of the cluster based on the number of pushpins in the cluster, using a logarithmic scale.
    var radius = Math.log(clusterSize) / Math.log(10) * 5 + minRadius;
    //Default cluster color is red.
    var fillColor = 'rgba(255, 40, 40, 0.5)';
    if (clusterSize < 10) {
        //Make the cluster green if there are less than 10 pushpins in it.
        fillColor = 'rgba(20, 180, 20, 0.5)';
    }
    else if (clusterSize < 100) {
        //Make the cluster yellow if there are 10 to 99 pushpins in it.
        fillColor = 'rgba(255, 210, 40, 0.5)';
    }
    //Create an SVG string of two circles, one on top of the other, with the specified radius and color.
    var svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2), '" height="', (radius * 2), '">',
        '<circle cx="', radius, '" cy="', radius, '" r="', radius, '" fill="', fillColor, '"/>',
        '<circle cx="', radius, '" cy="', radius, '" r="', radius - outlineWidth, '" fill="', fillColor, '"/>',
        '</svg>'];
    //Customize the clustered pushpin using the generated SVG and anchor on its center.
    cluster.setOptions({
        icon: svg.join(''),
        anchor: new window.Microsoft.Maps.Point(radius, radius),
        textOffset: new window.Microsoft.Maps.Point(0, radius - 8) //Subtract 8 to compensate for height of text.
    });
}

export const BingMap = {
    init: function(){
        map = new window.Microsoft.Maps.Map(document.getElementById('CovidBingMap'), { 
            //options
            //showSearchBar: true, //TODO: embeded map search?
            supportedMapTypes: [window.Microsoft.Maps.MapTypeId.road, window.Microsoft.Maps.MapTypeId.aerial, window.Microsoft.Maps.MapTypeId.birdseye, window.Microsoft.Maps.MapTypeId.streetside, window.Microsoft.Maps.MapTypeId.grayscale, window.Microsoft.Maps.MapTypeId.canvasDark]
        });
    },
    getMap: function(){        
        return map;
    },
    setView: function(type,lat,lon,zoom){
        map.setView({
            mapTypeId: type,
            center: new window.Microsoft.Maps.Location(lat,lon),
            zoom: zoom
        });
    },
    reverseGeocoordsFromZip:function(zipcode, cb) {
        window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            var searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
            var requestOptions = {
                bounds: map.getBounds(),
                where: zipcode,
                callback: function (answer, userData) {
                    cb(answer.results[0].location)
                }
            }
            searchManager.geocode(requestOptions)
        })
    },
    reverseGeocoordsFromAddress:function(address,cb) { // Get lat, lon
        window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            var searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
            var requestOptions = {
                bounds: map.getBounds(),
                where: address,
                callback: function (answer, userData) {
                    cb(answer.results[0].location)
                }
            }
            searchManager.geocode(requestOptions)
        })
    },
    reverseAddress:function(lat, lon, cb) { // Get address
        window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            var searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
            var reverseGeocodeRequestOptions = {
                location: new window.Microsoft.Maps.Location(lat,lon),
                callback: function (answer, userData) {
                    cb(answer.address.formattedAddress)
                }
            }
            searchManager.reverseGeocode(reverseGeocodeRequestOptions);
        })
    },
    drawThePinByAddress:function(address) { // Draw the pin
        window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            var searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
            var requestOptions = {
                bounds: map.getBounds(),
                where: address,
                callback: function (answer, userData) {
                    map.setView({ bounds: answer.results[0].bestView });
                    map.entities.push(new window.Microsoft.Maps.Pushpin(answer.results[0].location));
                }
            }
            searchManager.geocode(requestOptions)
        })
    },
    drawThePinByGeocoords:function(lat, lon, message) { // Draw the pin
        window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            var searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
            var reverseGeocodeRequestOptions = {
                location: new window.Microsoft.Maps.Location(lat,lon),
                callback: function (answer, userData) {
                    map.setView({ bounds: answer.bestView })
                    var pushpin = new window.Microsoft.Maps.Pushpin(reverseGeocodeRequestOptions.location,{
                        enableHoverStyle: true, 
                        enableClickedStyle: true                
                    });
                    var infobox = new window.Microsoft.Maps.Infobox(reverseGeocodeRequestOptions.location, { 
                        title: JSON.parse(message).title, 
                        description: JSON.parse(message).description, 
                        visible: false 
                    });
                    infobox.setMap(map);
                    window.Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
                        infobox.setOptions({ visible: !infobox.getOptions.visible });
                    });
                    map.entities.push(pushpin)
                }
            }
            searchManager.reverseGeocode(reverseGeocodeRequestOptions);
        })
    },
    drawThePinByAddress:function(address, message) { // Draw the pin
        window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            var searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
            var requestOptions = {
                bounds: map.getBounds(),
                where: address,
                callback: function (answer, userData) {
                    map.setView({ bounds: answer.results[0].bestView });
                    var pushpin = new window.Microsoft.Maps.Pushpin(answer.results[0].location,{
                        enableHoverStyle: true, 
                        enableClickedStyle: true,
                        //icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png', //TODO: design with categorial icon
                        //text: 'A', //message.title (initial)
                        //textOffset: new window.Microsoft.Maps.Point(0, 5)
                        //color: 'red' //message.type                        
                    });
                    pins.push(pushpin);
                    var infobox = new window.Microsoft.Maps.Infobox(answer.results[0].location, { 
                        title: JSON.parse(message).title, 
                        description: JSON.parse(message).description, 
                        visible: false 
                    });
                    infobox.setMap(map);
                    window.Microsoft.Maps.Events.addHandler(pushpin, 'click', function (args) {
                        infobox.setOptions({ visible: !infobox.getOptions.visible });
                        //map.setView({ center: args.target.getLocation(), zoom: 14 });
                    });
                    map.entities.push(pushpin);
                }
            }
            searchManager.geocode(requestOptions)
        })
    },
    showCluster:function(){
        window.Microsoft.Maps.loadModule('Microsoft.Maps.Clustering', function () {
            //Generate 3000 random pushpins in the map view.
            //pins = window.Microsoft.Maps.TestDataGenerator.getPushpins(3000, map.getBounds()); 
            //Create a ClusterLayer with options and add it to the map.
            var clusterLayer = new window.Microsoft.Maps.ClusterLayer(pins, {
                clusteredPinCallback: createCustomClusteredPin,
                gridSize: 80
            });
            layer.push(clusterLayer);
            map.layers.insert(clusterLayer);
        });
    },
    showDrawingManager:function(){
        window.Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', function () {
            //Generate 3000 random pushpins in the map view.
            //pins = window.Microsoft.Maps.TestDataGenerator.getPushpins(3000, map.getBounds()); 
            //Create a ClusterLayer with options and add it to the map.
            var tools = new window.Microsoft.Maps.DrawingTools(map);
            tools.showDrawingManager(function (manager) {
                console.log('Drawing manager loaded.');
                window.Microsoft.Maps.Events.addHandler(manager, 'drawingStarted', function () { console.log('Drawing started.'); });
                window.Microsoft.Maps.Events.addHandler(manager, 'drawingEnded', function () { console.log('Drawing ended.'); });
                window.Microsoft.Maps.Events.addHandler(manager, 'drawingErased', function () { console.log('Drawing erased.'); });
            });
        });
    }
};
