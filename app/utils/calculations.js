import moment from 'moment'

class HashrateCalculator {
  hashrateTH = h => h / 1000000000
  hashrateGH = h => h / 1000000
  hashrateMH = h => h / 1000
  reduceHashrate = m => {
    return m.map(x => x.hashrate).reduce((i, c) => i + c)
  }
  smartHashrate = hashrate => {
    const hr = this.reduceHashrate(hashrate)
    if (hr <= 1000000) {
      return this.hashrateMH(hr).toFixed(2) + ' MH'
    } else if (hr <= 1000000000) {
      return this.hashrateGH(hr).toFixed(2) + ' GH'
    } else {
      return this.hashrateTH(hr).toFixed(2) + ' TH'
    }
  }
  filterDate = (dateMax, hashrate) => {
    return hashrate.filter(e => {
      return moment(e.time).unix() > dateMax
    })
  }
  hashrateSince = (minutes, hashrate) => {
    const now = moment.now()
    const dateMax = moment(now).subtract(minutes, 'minutes').unix()
    const filteredHr = this.filterDate(dateMax, hashrate)
    return this.smartHashrate(filteredHr)
  }
}

const hr = new HashrateCalculator()
export default hr
