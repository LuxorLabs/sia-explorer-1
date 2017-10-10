const axios = require('axios')
const router = require('express').Router()
const CoinMarketCap = require('coinmarketcap-api')
const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 10, checkperiod: 120 })

const luxor = axios.create({
  baseURL: 'http://api.luxor.tech:8082',
  timeout: 10000
})

const cmc = new CoinMarketCap()

const STATS_KEY = 'StatsKey'
const TICKER_KEY = 'Ticker'

router.get('/stats', (req, res) => {
  cache.get(STATS_KEY, (err, val) => {
    if (!err) {
      if (val === undefined) {
        //cache miss
        luxor
          .get('/api/stats')
          .then(({ data }) => {
            cache.set(STATS_KEY, data)
            res.send(data)
          }).catch(err => {
            console.log(err)
          })
      } else {
        //cache hit (woo!)
        res.send(val)
      }
    } else {
      console.log('Error in caching stats infrastructure.  This needs to be investigated. Making the API call as a fallback')
      luxor
        .get('/api/stats')
        .then(({ data }) => {
          cache.set(STATS_KEY, data)
          res.send(data)
        }).catch(err => {
          console.log(err)
        })
    }
  })
})

router.get('/user/:address', (req, res) => {
  const address = req.params.address
  cache.get(address, (err, val) => {
    if (!err) {
      if (val === undefined) {
        //cache miss
        luxor
          .get(`/api/user/${address}`)
          .then(({ data }) => {
            cache.set(address, data)
            res.send(data)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        //cache hit. 
        res.send(val)
      }
    } else {
      console.log('Error in caching address infrastructure.  This needs to be investigated. Making the API call as a fallback')
      luxor
        .get(`/api/user/${address}`)
        .then(({ data }) => {
          cache.set(address, data)
          res.send(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
})

router.get('/price', (req, res) => {
  cache.get(TICKER_KEY, (err, val) => {
    if (!err) {
      if (val === undefined) {
        cmc
          .getTicker({
            currency: 'siacoin'
          })
          .then(data => {
            cache.set(TICKER_KEY, data)
            res.send(data)
          })
          .catch(console.error)
      } else {
        //cache hit
        res.send(val)
      }
    } else {
      console.log('Error in caching CMC infrastructure.  This needs to be investigated. Making the API call as a fallback')
      cmc
        .getTicker({
          currency: 'siacoin'
        })
        .then(data => {
          cache.set(TICKER_KEY, data)
          res.send(data)
        })
        .catch(console.error)
    }
  })

})

module.exports = router
