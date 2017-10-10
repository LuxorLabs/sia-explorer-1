import moment from 'moment'

class HashrateCalculator {
  hashrateTH = h => h / 1000000000000
  hashrateGH = h => h / 1000000000
  hashrateMH = h => h / 1000000
  reduceHashrate = m => {
    return m.map(x => x.hashrate).reduce((i, c) => i + c)
  }
  smartHashrate = hr => {
    if (hr <= 1000000000) {
      return this.hashrateMH(hr).toFixed(2) + ' MH'
    } else if (hr <= 1000000000000) {
      return this.hashrateGH(hr).toFixed(2) + ' GH'
    } else {
      return this.hashrateTH(hr).toFixed(2) + ' TH'
    }
  }
  reduceHATS = hashrateArray => {
    const hr = hashrateArray.length > 0
      ? this.reduceHashrate(hashrateArray) / hashrateArray.length
      : 0
    return this.smartHashrate(hr)
  }
  filterDate = (dateMax, hashrate) => {
    return hashrate.filter(e => {
      return e.time > dateMax
    })
  }
  hashrateSince = (minutes, hashrate) => {
    const now = moment.now()
    const dateMax = moment(now).subtract(minutes, 'minutes').unix()
    const filteredHr = this.filterDate(dateMax, hashrate)
    return this.reduceHATS(filteredHr)
  }
  hastingsToSC = hastings => hastings / 1e24
  numberWithCommas = x =>
    x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const hr = new HashrateCalculator()
export default hr
