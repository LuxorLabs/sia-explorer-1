import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import 'styles/spectre.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navigation from 'components/Navigation'
import moment from 'moment'

@inject('mainStore')
@observer
class Landing extends React.Component {
  componentWillMount () {
    axios.get('/api/stats').then(({ data }) => {
      this.props.mainStore.stats = data
    })
  }
  render () {
    const { stats } = this.props.mainStore
    if (stats && stats.users) {
      return (
        <div className='container'>
          <Navigation />
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
        </div>
      )
    } else {
      return <h1>Loading</h1>
    }
  }
  mapStats = stats => {
    return stats.users
      .sort((a, b) => {
        return b.hashrate - a.hashrate
      })
      .map((m, i) => {
        const time = m.miners
          .map(w => w.last_beat)
          .reduce((c, a) => (c > a ? c : a))
        console.log(time)
        const eff = m.rejects_count > 0 || m.invalid_shares_count > 0
          ? 100 -
              (m.rejects_count + m.invalid_shares_count) / m.valid_shares_count
          : 100
        return (
          <tr key={m.address}>
            <td>{i + 1}</td>
            <td><Link to={`/miner/${m.address}`}>{m.address}</Link></td>
            <td>{m.hashrate / 1000000} MH/s</td>
            <td>{eff.toFixed(2)}%</td>
            <td>{moment.unix(time).fromNow()}</td>
          </tr>
        )
      })
  }
}

const Tables = styled.div`
padding-top: 50px;
padding-bottom: 100px;
`

export default Landing
