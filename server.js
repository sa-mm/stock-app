const express = require('express')
const request = require('request')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/avapi/:symbol', function (req, res) {
  const symbol = req.params.symbol

  const key = process.env.ALPHA_VANTAGE_KEY
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${key}`

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
      process.env.NODE_ENV === 'dev' && console.log(data)
      res.json(data)
    }
  })
})
app.get('/api/:symbol', function (req, res) {
  const symbol = req.params.symbol
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
      res.json(data)
    }
  })
})

app.listen(PORT)
