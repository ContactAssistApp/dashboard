const twitterBearToken = require('../config').twitter.bearerToken;
const bingKey = require('../config').bingKey;

const https = require('https'),
  api = require('../config').api,
  format = (str2Format, ...args) => str2Format.replace(/(\{\d+\})/g, a => args[+(a.substr(1, a.length - 2)) || 0]);

var API = {
  getSize: function (lat, lon, precision, lastTimestamp, cb) {
    const options = {
      hostname: api.host,
      port: 443,
      path: format('/api/Messages/Size?api-version={0}&lat={1}&lon={2}&precision={3}&lastTimestamp={4}', api.version, lat, lon, precision, lastTimestamp),
      method: 'HEAD',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      cb({ status: 200, content: res.headers['content-length'] })
    })
    req.on('error', error => {
      console.error(error)
      cb({ status: 500, content: error })
    })
    req.end()
  },
  getList: function (lat, lon, precision, lastTimestamp, cb) {
    const options = {
      hostname: api.host,
      port: 443,
      path: format('/api/Messages/List?api-version={0}&lat={1}&lon={2}&precision={3}&lastTimestamp={4}', api.version, lat, lon, precision, lastTimestamp),
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        cb({ status: 200, content: data && JSON.parse(data) || 'success'})
      });
    })
    req.on('error', (error) => {
      console.error(error)
      cb({ status: 500, content: error })
    })
    req.end()
  },
  getUserMentionsTweets: function (twitterId, cb) {
    const options = {
      hostname: 'api.twitter.com',
      port: 443,
      path: format('/2/users/{0}/mentions?expansions=geo.place_id&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type', twitterId),
      method: 'GET',
      headers: {
        'Authorization': format('Bearer {0}', twitterBearToken)
      }
    }
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        cb({ status: 200, content: data && JSON.parse(data) || 'success'})
      });
    })
    req.on('error', (error) => {
      console.error(error)
      cb({ status: 500, content: error })
    })
    req.end()
  },
  setRulesForNewTweets: function (body, cb) {
    const options = {
      hostname: 'api.twitter.com',
      port: 443,
      path: format('/2/tweets/search/stream/rules'),
      method: 'POST',
      headers: {
        'Authorization': format('Bearer {0}', twitterBearToken),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        cb({ status: 200, content: data && JSON.parse(data) || 'success'})
      });
    })
    req.on('error', (error) => {
      console.error(error)
      cb({ status: 500, content: error })
    })
    req.end(JSON.stringify(body))
  },
  getRulesForNewTweets: function (cb) {
    const options = {
      hostname: 'api.twitter.com',
      port: 443,
      path: format('/2/tweets/search/stream/rules'),
      method: 'GET',
      headers: {
        'Authorization': format('Bearer {0}', twitterBearToken)
      }
    }
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        cb({ status: 200, content: data && JSON.parse(data) || 'success'})
      });
    })
    req.on('error', (error) => {
      console.error(error)
      cb({ status: 500, content: error })
    })
    req.end()
  },
  postMessage: function (obj, cb) {
    let input = obj || JSON.stringify({
      "RequestedQueries": [{
        "messageId": "0af080d1-f5a5-4263-97e2-8429b1c67c51",
        "messageTimestamp": 1589492344628
        }]
    })
    const options = {
      hostname: api.host,
      port: 443,
      path: format('/api/Message?api-version={0}', api.version),
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        cb({ status: 200, content: data && JSON.parse(data) || 'success'})
      });
    })
    req.on('error', (error) => {
      console.error(error)
      cb({ status: 500, content: error })
    })
    req.write(input)
    req.end()
  },
  /*
  TODO: Message schema contract:
  --- Actions: Detect,Monitor,Report
  --- Location: lat, lon
  --- Level: 1,2,3
  --- Timestampe: Unix Timestamp <> UTC Timestring in below formats
  ------------------------------------------------------------------
  2020-05-01T23:35:10+00:00 in ISO 8601
  Fri, 01 May 2020 23:35:10 +0000 in RFC 822, 1036, 1123, 2822
  Friday, 01-May-20 23:35:10 UTC in RFC 2822
  2020-05-01T23:35:10+00:00 in RFC 3339
  ------------------------------------------------------------------
  */
  putAreaReport: function (obj, cb) {
    let input = obj || JSON.stringify({
      "userMessage": "Detected Postive Case at .",
      "areas": [{
        "location": {
          "latitude": 42.7569,
          "longitude": -73.9828
        },
        "radiusMeters": 100,
        "beginTime": 1589489812000,
        "endTime": 1589490012000
      }]
    })
    const options = {
      hostname: api.host,
      port: 443,
      path: format('/api/Messages/Announce?api-version={0}', api.version),
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        cb({ status: 200, content: data && JSON.parse(data) || 'success'})
      });
    })
    req.on('error', (error) => {
      console.error(error)
      cb({ status: 500, content: error })
    })
    req.write(input)
    req.end()
  },
  getAddressFromBing: function(location, cb) {
    const options = {
      hostname: "dev.virtualearth.net",
      port: 443,
      path: format('/REST/v1/Locations/{0},{1}?&key={2}', location.latitude, location.longitude, bingKey),
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        cb({ status: 200, content: data && JSON.parse(data) || 'success'})
      });
    })
    req.on('error', (error) => {
      console.error(error)
      cb({ status: 500, content: error })
    })
    req.end()
  }
}

module.exports = API