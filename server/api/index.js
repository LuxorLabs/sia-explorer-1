const axios = require('axios')
const router = require('express').Router()

const luxor = axios.create({
  baseURL: 'http://api.luxor.tech:8082',
  timeout: 2000
})

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
      res.send({ message: 'Not found' })
    })
})

module.exports = router
