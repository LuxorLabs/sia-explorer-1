import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import 'styles/spectre.scss'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Navigation from 'components/Navigation'
import moment from 'moment'

@inject('mainStore')
@observer
class Landing extends React.Component {
  componentWillMount () {
    setInterval(() => {
      axios.get('/api/stats').then(({ data }) => {
        this.props.mainStore.stats = data
      })
    }, 5000)
  }
  render () {
    const { stats } = this.props.mainStore
    if (stats && stats.users) {
      return (
        <div className='container'>
          <Navigation />
          <div className='h6 text-center'>
            Blocks Found: {this.props.mainStore.stats.block_stats.length}
          </div>
          <Tables>
            <div className='container grid-xl text-center'>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Address</th>
                    <th>Hashrate</th>
                    <th>Efficiency</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {this.mapStats(stats)}
                </tbody>
              </table>
            </div>
          </Tables>
          <Padding>
            <div className='m-2 p2 text-center'>
              <h4>Get Started</h4>
              <pre>
                ./marlin -H us-east.luxor.tech:3333 -u YourSiacoinAddress.YourWorkerName -I 28
              </pre>
              <pre>
                ./ccminer -a sia -e --url=stratum+tcp://us-east.luxor.tech:3333 -u YourSiacoinAddress.YourWorkerName -i 28
              </pre>
              <pre>
                ./sgminer --algorithm=sia --url=stratum+tcp://us-east.luxor.tech:3333 --userpass=YourSiacoinAddress.YourWorkerName -I 28
              </pre>
              <pre>
                ./gominer -url stratum+tcp://us-east.luxor.tech:3333 -user YourSiacoinAddress.YourWorkerName
              </pre>
              <h4>Claymore</h4>
              <pre>Please use port 7777 instead of 3333</pre>
              <h4>Optional Regional Servers</h4>
              <p>
                Instead of using us-east, you can also use the following (please add the right port 3333 or 7777):
              </p>
              <pre>US West: us-west.luxor.tech</pre>
              <pre>Europe: eu.luxor.tech</pre>
              <pre>Asia: asia.luxor.tech</pre>
            </div>
            <div className='p-2 m-2 container text-center'>
              Thanks for being a Luxor supporter!
            </div>
          </Padding>
        </div>
      )
    } else {
      return <div className='loading loading-lg' />
    }
  }
  mapStats = stats => {
    return stats.users
      .sort((a, b) => {
        return b.hashrate - a.hashrate
      })
      .map((m, i) => {
        const time = m.miners && m.miners.length > 0
          ? m.miners.map(w => w.last_beat).reduce((c, a) => (c > a ? c : a))
          : 0
        const eff = m.rejects_count > 0 || m.invalid_shares_count > 0
          ? 100 -
              (m.rejects_count + m.invalid_shares_count) / m.valid_shares_count
          : 100
        return (
          <tr key={m.address}>
            <td>{i + 1}</td>
            {/* <td><Link to={`/miner/${m.address}`}>{m.address}</Link></td> */}
            <td>{m.address}</td>
            <td>{m.hashrate / 1000000} MH/s</td>
            <td>{eff.toFixed(2)}%</td>
            <td>{time === 0 ? 'Never' : moment.unix(time).fromNow()}</td>
          </tr>
        )
      })
  }
}

const Tables = styled.div`
padding-top: 50px;
padding-bottom: 100px;
`

const Padding = styled.div`
  padding-bottom: 150px;
`

export default Landing
