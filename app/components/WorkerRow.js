import React, { Component } from 'react'
import calc from 'utils/calculations'
import moment from 'moment'

class WorkerRow extends Component {
  render () {
    const { miner } = this.props
    return (
      <tr>
        <td>
          {miner.name}
          {' '}
          <br />
          <small className='label label-primary'>
            {miner.affinity}
          </small>
        </td>
        <td>
          {moment(miner.time).fromNow()}
          <br />
          <small className='label label-primary'>
            Stratum
          </small>
        </td>
        <td>
          {calc.smartHashrate(miner.hashrate_five_min)}/s
          {' '}
          <br />
          <small className='label label-primary'>
            0.0% stale
          </small>
        </td>
        <td>
          {calc.smartHashrate(miner.hashrate_fifteen_min)}/s
          {' '}
          <br />
          <small className='label label-primary'>
            0.0% stale
          </small>
        </td>
        <td>
          {calc.smartHashrate(miner.hashrate_one_hour)}/s
          {' '}
          <br />
          <small className='label label-primary'>
            0.0% stale
          </small>
        </td>
        <td>
          {calc.smartHashrate(miner.hashrate_six_hour)}/s
          {' '}
          <br />
          <small className='label label-primary'>
            0.0% stale
          </small>
        </td>
        <td>
          {calc.smartHashrate(miner.hashrate_one_day)}/s
          {' '}
          <br />
          <small className='label label-primary'>
            0.0% stale
          </small>
        </td>
      </tr>
    )
  }
}

export default WorkerRow
