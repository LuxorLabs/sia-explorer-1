import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import 'styles/spectre.scss'

import stats from 'mock/stats'

@inject('mainStore')
@observer
class Landing extends React.Component {
  render () {
    return (
      <div className='container'>
        <Nav className='container grid-xl '>
          <header className='navbar'>
            <section className='navbar-section'>
              <div className='form-group'>
                <input
                  className='form-input'
                  type='text'
                  placeholder='Search...'
                />
              </div>
            </section>
            <section className='navbar-center'>Luxor Mining</section>
            <section className='navbar-section'>
              <a
                target='_blank'
                href='https://twitter.com/LuxorTechTeam'
                className='btn btn-link'
              >
                Twitter
              </a>
              <a
                target='_blank'
                href='https://github.com/LuxorLabs'
                className='btn btn-link'
              >
                GitHub
              </a>
            </section>
          </header>
        </Nav>
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
  }
  mapStats = stats => {
    return stats.users.map((m, i) => {
      console.log(m)

      return (
        <tr key={m.address}>
          <td>{i + 1}</td>
          <td>{m.address}</td>
          <td>{m.hashrate / 1000000000} GH/s</td>
          <td>100%</td>
          <td>1 Min. Ago</td>
        </tr>
      )
    })
  }
}

const Tables = styled.div`
padding-top: 50px;
`

const Nav = styled.div`
padding: 50px 0;
`

export default Landing
