export const BingMap = {
    createMap: function(){
        let map = null;
        map = new window.Microsoft.Maps.Map(document.getElementById('CovidBingMap'), { 
            //options
        });
        return map;
    },
    reverseGeocoordsFromZip:function(map, zipcode, cb) {
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
    reverseGeocoordsFromAddress:function(map,address,cb) { // Get lat, lon
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
    reverseAddress:function(map, lat, lon, cb) { // Get address
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
    drawThePinByAddress:function(map, address) { // Draw the pin
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
    drawThePinByGeocoords:function(map, lat, lon) { // Draw the pin
        window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            var searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
            var reverseGeocodeRequestOptions = {
                location: new window.Microsoft.Maps.Location(lat,lon),
                callback: function (answer, userData) {
                    map.setView({ bounds: answer.bestView })
                    map.entities.push(new window.Microsoft.Maps.Pushpin(reverseGeocodeRequestOptions.location))
                }
            }
            searchManager.reverseGeocode(reverseGeocodeRequestOptions);
        })
    }
};
