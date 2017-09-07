const express = require('express')
const request = require('request')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
}

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(allowCrossDomain)

app.get('/api/:symbol', function (req, res) {
  const symbol = req.params.symbol
  // console.log(symbol)
  const url = 'http://careers-data.benzinga.com/rest/richquoteDelayed?symbols=' + symbol
  request.get({
    url: url,
    json: true,
    headers: { 'User-Agent': 'request' }
  }, (err, response, data) => {
    if (err) {
      console.log('Error:', err)
    } else if (response.statusCode !== 200) {
      console.log('Status:', response.statusCode)
    } else {
      // data is already parsed as JSON:
      // console.log(data)
      res.json(data)
    }
  })
})

app.listen(PORT)
