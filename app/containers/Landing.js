import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import 'styles/spectre.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navigation from 'components/Navigation'

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
    console.log(stats.users)
    return stats.users.map((m, i) => {
      console.log(m)

      return (
        <tr key={m.address}>
          <td>{i + 1}</td>
          <td><Link to={`/miner/${m.address}`}>{m.address}</Link></td>
          <td>{m.hashrate / 1000000} MH/s</td>
          <td>100%</td>
          <td>1 Min. Ago</td>
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
