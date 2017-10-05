import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import 'styles/spectre.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navigation from 'components/Navigation'
import Loading from 'components/Loading'
import moment from 'moment'
import calc from 'utils/calculations'
import Button from 'components/Buttons'

const Hero = styled.div`
  background: ${props => props.theme.dark_3};
  padding: 3rem;
  h5 {
    margin-bottom: 2rem;
  }
  .btn {
    margin: 0.5rem;
  }
`

@inject('mainStore')
@observer
class Landing extends React.Component {
  componentWillMount () {
    this.fetchStats()
    this.setPolling = setInterval(() => {
      this.fetchStats()
    }, 10000)
  }
  componentWillUnmount () {
    clearInterval(this.setPolling)
  }
  fetchStats = () => {
    axios.get('/api/stats').then(({ data }) => {
      this.props.mainStore.stats = data
    })
  }
  render () {
    const { stats } = this.props.mainStore
    var total = stats && stats.users
      ? calc.smartHashrate(
          stats.users.reduce((a, b) => {
            return a + b.hashrate
          }, 0)
        )
      : 0.0
    return (
      <div>
        <Navigation />
        <Hero>
          <div className='container grid-xl text-center'>
            <h2>Hello Miners, we're hashing at <b>{total}/s</b></h2>
            <h5>
              Welcome to a
              {' '}
              <u>lightweight</u>
              ,
              {' '}
              <u>fair</u>
              , and
              {' '}
              <u>fast</u>
              {' '}
              mining pool for Sia.
            </h5>
            <a
              className='btn btn-lg btn-primary'
              target='_blank'
              href='https://medium.com/@nitronick600/31b8cb83e21f'
            >
              Learn more
            </a>
            <Button to='/setup' text='Get Started' />
          </div>
        </Hero>
        <Tables>
          <div className='container grid-xl text-center'>
            {stats && stats.users
              ? <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th colSpan={5}>Address</th>
                    <th>Hashrate</th>
                    <th>Efficiency</th>
                    <th colSpan={2}>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {this.mapStats(stats)}
                </tbody>
              </table>
              : <Loading />}
          </div>
        </Tables>
      </div>
    )
  }
  mapStats = stats => {
    return stats.users
      .sort((a, b) => {
        return b.hashrate - a.hashrate
      })
      .slice(0, 20)
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
            <td colSpan={5}>
              <Link to={`/miner/${m.address}`}>{m.address}</Link>
            </td>
            <td>{calc.smartHashrate(m.hashrate)}/s</td>
            <td>{eff.toFixed(2)}%</td>
            <td colSpan={2}>
              {time === 0 ? 'Never' : moment.unix(time).fromNow()}
            </td>
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
