import React, { Component } from 'react'
import Navigation from 'components/Navigation'
import axios from 'axios'
import calc from 'utils/calculations'
import moment from 'moment'

class MinerAddress extends Component {
  state = {
    user: 'null',
    stats: null,
    loading: true
  }
  componentWillMount () {
    const user = this.props.match.params.address
    this.setState({
      user
    })
    axios.get(`/api/user/${user}`).then(({ data }) => {
      this.setState({
        loading: false,
        stats: data
      })
    })
  }
  render () {
    const { stats } = this.state
    console.log(stats)
    if (!this.state.loading) {
      return (
        <div className='container'>
          <Navigation />
          <div className='container grid-xl'>
            <div className='columns'>
              <div className='col-12 text-center p-2'>
                <h6>{this.state.user}</h6>
              </div>
              <div className='col-4 col-md-12 p-2'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th colSpan='2'>General Stats</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Unpaid Balance</th>
                      <td>{stats.balance} SC</td>
                    </tr>
                    <tr>
                      <th>All-time Rewards</th>
                      <td>{stats.total_payouts} SC</td>
                    </tr>
                    <tr>
                      <th>All-time Hashes</th>
                      <td>
                        {calc.smartHashrate(stats.hashrate)}
                      </td>
                    </tr>
                    <tr>
                      <th>Blocks Found</th>
                      <td>{stats.blocks_found}</td>
                    </tr>
                    <tr>
                      <th>
                        Last Share
                      </th>
                      <td>
                        {moment(stats.last_share_time).fromNow()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='col-8 col-md-12 p-2'>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Hash Rate</th>
                      <th>Valid Shares</th>
                      <th>Stale Shares</th>
                      <th>Invalid Shares</th>
                      <th>Rewards</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>5 minutes</th>
                      <td>{calc.hashrateSince(30, stats.hashrate)}/s</td>
                      <td>172,840,960</td>
                      <td>0 (0.0%)</td>
                      <td>1,466,368 (0.8%)</td>
                      <td>2,468.26 SC</td>
                    </tr>
                    <tr>
                      <th>15 minutes</th>
                      <td>9,666 GH/s</td>
                      <td>172,840,960</td>
                      <td>0 (0.0%)</td>
                      <td>1,466,368 (0.8%)</td>
                      <td>2,468.26 SC</td>
                    </tr>
                    <tr>
                      <th>60 minutes</th>
                      <td>9,666 GH/s</td>
                      <td>172,840,960</td>
                      <td>0 (0.0%)</td>
                      <td>1,466,368 (0.8%)</td>
                      <td>2,468.26 SC</td>
                    </tr>
                    <tr>
                      <th>6 hours</th>
                      <td>9 666 GH/s</td>
                      <td>172,840,960</td>
                      <td>0 (0.0%)</td>
                      <td>1,466,368 (0.8%)</td>
                      <td>2,468.26 SC</td>
                    </tr>
                    <tr>
                      <th>24 hours</th>
                      <td>9,666 GH/s</td>
                      <td>172,840,960</td>
                      <td>0 (0.0%)</td>
                      <td>1,466,368 (0.8%)</td>
                      <td>2,468.26 SC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='col-12 m-2 p-2'>
                <h4>Miners</h4>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Last Share</th>
                      <th>5 minutes</th>
                      <th>15 minutes</th>
                      <th>1 hour</th>
                      <th>6 hours</th>
                      <th>24 hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>10Y001</td>
                      <td>
                        3 min ago
                        <br />
                        <small className='label'>Claymore Stratum</small>
                      </td>
                      <td>
                        916MH/s
                        {' '}
                        <br />
                        <small className='label'>0.0% stale</small>
                      </td>
                      <td>
                        1200MH/s
                        {' '}
                        <br />
                        <small className='label'>0.0% stale</small>
                      </td>
                      <td>
                        126MH/s
                        {' '}
                        <br />
                        <small className='label'>0.0% stale</small>
                      </td>
                      <td>
                        1216MH/s
                        {' '}
                        <br />
                        <small className='label'>0.0% stale</small>
                      </td>
                      <td>
                        1816MH/s
                        {' '}
                        <br />
                        <small className='label'>0.0% stale</small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='col-12 m-2 p-2'>
                <h4>Payouts</h4>
                Payouts are performed daily with a minimum threshold of 500 SC, or up to every 6 hours when over 1000 SC.
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Date/Time </th>
                      <th>Amount</th>
                      <th>Transaction ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2017-09-23 17:25 UTC</td>
                      <td>103,463.69 SC</td>
                      <td>
                        020b7024c42909f590bea997ef71e27931190bd9bf227899864e16ea498dc103
                      </td>
                      <td>confirmed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <h1>Loading</h1>
    }
  }
}

export default MinerAddress
