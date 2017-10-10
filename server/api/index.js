const axios = require('axios')
const router = require('express').Router()
const CoinMarketCap = require('coinmarketcap-api')

const luxor = axios.create({
  baseURL: 'http://api.luxor.tech:8082',
  timeout: 10000
})

const cmc = new CoinMarketCap()

router.get('/stats', (req, res) => {
  luxor
    .get('/api/stats')
    .then(({ data }) => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/user/:address', (req, res) => {
  const address = req.params.address
  luxor
    .get(`/api/user/${address}`)
    .then(({ data }) => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/price', (req, res) => {
  cmc
    .getTicker({
      currency: 'siacoin'
    })
    .then(data => {
      res.send(data)
    })
    .catch(console.error)
})

module.exports = router
