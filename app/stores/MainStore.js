import { observable, computed } from 'mobx'
import axios from 'axios'
import calc from 'utils/calc'
import moment from 'moment'
import langEn from 'translations/en.json'
import langZh from 'translations/zh.json'
import browserLocale from 'utils/locale'

const summaryCardState = {
  unpaidBalance: '0 SC',
  estimatedPayout: '0 SC',
  ppsBalance: '0 SC',
  hashrate: '0',
  efficiency: '0',
  paidRewards: '0 SC',
  blocksFound: '0',
  lastShare: 'Never'
}

const singleWorkState = {
  name: 'None',
  lastShare: 'Never',
  five_minutes: '0.00 MH/s',
  fifteen_minutes: '0.00MH/s',
  one_hour: '0.00MH/s',
  six_hour: '0.00MH/s',
  one_day: '0.00MH/s'
}

const singlePayoutState = {
  date: 'Never',
  amount: '0 SC',
  txid: 'N/A',
  status: 'unconfirmed'
}

const i18nConfig = {
  locale: 'en',
  messages: langEn
}

export class MainStore {
  @observable counter = 0
  @observable UI = {
    loading: true,
    Setup: {
      activeIndex: '0'
    },
    Address: {
      loading: true
    }
  }

  @observable i18nConfig = i18nConfig

  handleLocale = () => {
    const locale = browserLocale().split('-')
    const lang = locale[0].toLowerCase()
    if (lang === 'zh') {
      this.i18nConfig.locale = 'zh'
      this.i18nConfig.messages = langZh
    }
  }
  @observable stats = {}
  @observable addressStats = {}
  @observable coinmarketcap = {
    price_usd: '0.00'
  }
  intervalFetch = () => {
    this.fetchStats()
    this.fetchPrice()
    this.fetchProcess = setInterval(() => {
      this.fetchPrice()
      this.fetchStats()
    }, 60000)
  }

  @computed get summaryCardStats () {
    const stats = this.addressStats
    const { address } = stats
    if (stats && stats.balance) {
      const hashrate = `${calc.smartHashrate(this.userHashrate(address))}/s`
      const efficiency = `${this.userEff(address)}%`
      return {
        unpaidBalance: `${calc.hastingsToSC(stats.balance).toFixed(2)} SC`,
        paidRewards: `${calc.hastingsToSC(stats.total_payouts).toFixed(2)} SC`,
        blocksFound: stats.blocks_found,
        hashrate,
        efficiency,
        lastShare: moment.unix(stats.last_share_time).fromNow()
      }
    } else {
      return summaryCardState
    }
  }

  @computed get summaryWorkerStats () {
    const stats = this.addressStats
    if (stats && stats.miners) {
      const workerMap = stats.miners.map(m => {
        return {
          name: m.name,
          affinity: m.affinity,
          minerType: m.miner_type,
          lastShare: moment(m.time).fromNow(),
          five_minutes: `${calc.smartHashrate(m.hashrate_five_min)}/s`,
          fifteen_minutes: `${calc.smartHashrate(m.hashrate_fifteen_min)}/s`,
          one_hour: `${calc.smartHashrate(m.hashrate_one_hour)}/s`,
          six_hour: `${calc.smartHashrate(m.hashrate_six_hour)}/s`,
          one_day: `${calc.smartHashrate(m.hashrate_one_day)}/s`
        }
      })
      return workerMap
    } else {
      return [singleWorkState]
    }
  }

  @computed get payoutsExist () {
    const stats = this.addressStats
    const { address } = stats
    if (stats && stats.payouts) {
      return stats.payouts.length
    } else {
      return 0
    }
  }

  @computed get summaryPayoutStats () {
    const stats = this.addressStats
    const { address } = stats
    if (stats && stats.payouts) {
      return stats.payouts.sort((a, b) => a.time < b.time).map(p => {
        return {
          amount: `${calc.hastingsToSC(p.amount).toFixed(2)} SC`,
          date: moment(p.time).fromNow(),
          txid: p.tx_id,
          username: p.username
        }
      })
    } else {
      return [singlePayoutState]
    }
  }

  userHashrate = address => {
    const { stats } = this
    if (stats && stats.users) {
      return this.stats.users.filter(u => u.address === address)[0].hashrate
    } else {
      return 0
    }
  }

  userPayoutRound = address => {
    const { stats } = this
    if (stats && stats.users) {
      return this.stats.users.filter(u => u.address === address)[0]
        .estimated_round_payout
    } else {
      return 0
    }
  }

  userEff = address => {
    const { stats } = this
    if (stats && stats.users) {
      const m = this.stats.users.filter(u => u.address === address)[0]
      const eff = m.rejects_count > 0 || m.invalid_shares_count > 0
        ? 100 -
            (m.rejects_count + m.invalid_shares_count) /
              m.valid_shares_count *
              100
        : 100
      return eff.toFixed(2)
    } else {
      return 0
    }
  }

  @computed get blocksFound () {
    return !this.UI.loading ? this.stats.block_stats.length : 0
  }

  @computed get totalHashrate () {
    return !this.UI.loading
      ? calc.smartHashrate(
          this.stats.users.reduce((a, b) => {
            return a + b.hashrate
          }, 0)
        )
      : 0.0
  }

  fetchStats = () => {
    axios.get('/api/stats').then(({ data }) => {
      this.stats = data
      this.UI.loading = false
    })
  }

  fetchAddress = address => {
    axios.get(`/api/user/${address}`).then(({ data }) => {
      this.addressStats = data
      this.UI.Address.loading = false
    })
  }

  fetchPrice = () => {
    axios.get('/api/price').then(({ data }) => {
      this.coinmarketcap = data[0]
    })
  }
}
