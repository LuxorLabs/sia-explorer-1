const axios = require('axios')
const router = require('express').Router()
const CoinMarketCap = require('coinmarketcap-api')
const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 10, checkperiod: 120 })

const luxor = axios.create({
  baseURL: 'http://explorer.luxor.tech:6000',
  timeout: 15000,
  headers: {
    'User-Agent': 'Sia-Agent'
  }
})

const cmc = new CoinMarketCap()

const TICKER_KEY = 'Ticker'

/*
/explorer
/explorer/pending
/explorer/ws
/explorer/tx/ws
/explorer/blocks/:height
/explorer/hashes/:hash
*/

// returns curr block
router.get('/block', (req, res) => {
  luxor
    .get('/explorer')
    .then(({ data }) => {
      cache.set(BLOCK_KEY, data)
      res.send(data)
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/block/:height', (req, res) => {
  const { height } = req.params
  luxor
    .get(`/explorer/blocks/${height}`)
    .then(({ data }) => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/hash/:hash', (req, res) => {
  const { hash } = req.params
  luxor
    .get(`/explorer/hashes/${hash}`)
    .then(({ data }) => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/pending', (req, res) => {
  luxor
    .get('/explorer/pending')
    .then(({ data }) => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
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
        // cache hit
        res.send(val)
      }
    } else {
      console.log(
        'Error in caching CMC infrastructure.  This needs to be investigated. Making the API call as a fallback'
      )
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
