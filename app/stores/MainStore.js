import { observable, computed } from 'mobx'
import axios from 'axios'
import calc from 'utils/calc'
import moment from 'moment'
import langEn from 'translations/en.json'
import langZh from 'translations/zh.json'
import browserLocale from 'utils/locale'
import { fromPromise } from 'mobx-utils'

const i18nConfig = {
  locale: 'en',
  messages: langEn
}

export class MainStore {
  @observable counter = 0
  @observable i18nConfig = i18nConfig

  handleLocale = () => {
    const locale = browserLocale().split('-')
    const lang = locale[0].toLowerCase()
    if (lang === 'zh') {
      this.i18nConfig.locale = 'zh'
      this.i18nConfig.messages = langZh
    }
  }

  @observable coinmarketcap = {
    price_usd: '0.00'
  }
  intervalFetch = () => {
    this.fetchPrice()
    this.fetchProcess = setInterval(() => {
      this.fetchPrice()
    }, 60000)
  }

  currentBlock = fromPromise(axios.get('/api/block'))
  latestBlocks = fromPromise(axios.get('/api/latestblocks'))
  pendingBlock = fromPromise(axios.get('/api/pending'))
  fetchPrice = () => {
    axios.get('/api/price').then(({ data }) => {
      this.coinmarketcap = data[0]
    })
  }
}
