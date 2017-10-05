import React, { Component } from 'react'
import moment from 'moment'
import calc from 'utils/calculations'

class GeneralStatsTable extends Component {
  render () {
    const { stats } = this.props
    return (
      <table className='table'>
        <thead>
          <tr>
            <th colSpan='2'>General Stats</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Unpaid Balance</th>
            <td>
              {calc.hastingsToSC(stats.balance).toFixed(2)} SC
            </td>
          </tr>
          <tr>
            <th>All-time Rewards</th>
            <td>
              {calc.hastingsToSC(stats.total_payouts).toFixed(2)}
              {' '}
              SC
            </td>
          </tr>
          <tr>
            <th>All-time Hashes</th>
            <td>
              {calc.smartHashrate(calc.reduceHashrate(stats.hashrate))}
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
              {moment.unix(stats.last_share_time).fromNow()}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default GeneralStatsTable
