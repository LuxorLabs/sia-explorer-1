import React, { Component } from 'react'
import calc from 'utils/calculations'

class ShareScheduleTable extends Component {
  render () {
    const { stats } = this.props
    const totalSharesFiveMin = this.props.loading
      ? 0
      : stats.stale_shares_five_min +
          stats.invalid_shares_five_min +
          stats.valid_shares_five_min
    const totalSharesFifteenMin = this.props.loading
      ? 0
      : stats.stale_shares_fifteen_min +
          stats.invalid_shares_fifteen_min +
          stats.valid_shares_fifteen_min
    const totalSharesOneHour = this.props.loading
      ? 0
      : stats.stale_shares_one_hour +
          stats.invalid_shares_one_hour +
          stats.valid_shares_one_hour
    const totalSharesSixHours = this.props.loading
      ? 0
      : stats.stale_shares_six_hour +
          stats.invalid_shares_six_hour +
          stats.valid_shares_six_hour
    const totalSharesOneDay = this.props.loading
      ? 0
      : stats.stale_shares_one_day +
          stats.invalid_shares_one_day +
          stats.valid_shares_one_day

    return (
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
            <td>{calc.hashrateSince(5, stats.hashrate)}/s</td>
            <td>
              {calc.numberWithCommas(stats.valid_shares_five_min)}
            </td>
            <td>
              {calc.numberWithCommas(stats.stale_shares_five_min)}
              {' '}
              (
              {(stats.stale_shares_five_min / totalSharesFiveMin).toFixed(1)}
              %)
            </td>
            <td>
              {calc.numberWithCommas(stats.invalid_shares_five_min)}
              {' '}
              (
              {(stats.invalid_shares_five_min / totalSharesFiveMin).toFixed(1)}
              %)
            </td>
            <td>
              {calc.hastingsToSC(stats.payouts_five_min).toFixed(2)}
              {' '}
              SC
            </td>
          </tr>
          <tr>
            <th>15 minutes</th>
            <td>{calc.hashrateSince(15, stats.hashrate)}/s</td>
            <td>
              {calc.numberWithCommas(stats.valid_shares_fifteen_min)}
            </td>
            <td>
              {calc.numberWithCommas(stats.stale_shares_fifteen_min)}
              {' '}
              (
              {(stats.stale_shares_fifteen_min / totalSharesFifteenMin).toFixed(
                1
              )}
              %)
            </td>
            <td>
              {calc.numberWithCommas(stats.invalid_shares_fifteen_min)}
              {' '}
              (
              {(stats.invalid_shares_fifteen_min /
                totalSharesFifteenMin).toFixed(1)}
              %)
            </td>
            <td>
              {calc.hastingsToSC(stats.payouts_fifteen_min).toFixed(2)}
              {' '}
              SC
            </td>
          </tr>
          <tr>
            <th>60 minutes</th>
            <td>{calc.hashrateSince(60, stats.hashrate)}/s</td>
            <td>
              {calc.numberWithCommas(stats.valid_shares_one_hour)}
            </td>
            <td>
              {calc.numberWithCommas(stats.stale_shares_one_hour)}
              {' '}
              (
              {(stats.stale_shares_one_hour / totalSharesOneHour).toFixed(1)}
              %)
            </td>
            <td>
              {calc.numberWithCommas(stats.invalid_shares_one_hour)}
              {' '}
              (
              {(stats.invalid_shares_one_hour / totalSharesOneHour).toFixed(1)}
              %)
            </td>
            <td>
              {calc.hastingsToSC(stats.payouts_one_hour).toFixed(2)}
              {' '}
              SC
            </td>
          </tr>
          <tr>
            <th>6 hours</th>
            <td>{calc.hashrateSince(360, stats.hashrate)}/s</td>
            <td>
              {calc.numberWithCommas(stats.valid_shares_six_hour)}
            </td>
            <td>
              {calc.numberWithCommas(stats.stale_shares_six_hour)}
              {' '}
              (
              {(stats.stale_shares_six_hour / totalSharesSixHours).toFixed(1)}
              %)
            </td>
            <td>
              {calc.numberWithCommas(stats.invalid_shares_six_hour)}
              {' '}
              (
              {(stats.invalid_shares_six_hour / totalSharesSixHours).toFixed(1)}
              %)
            </td>
            <td>
              {calc.hastingsToSC(stats.payouts_six_hour).toFixed(2)}
              {' '}
              SC
            </td>
          </tr>
          <tr>
            <th>24 hours</th>
            <td>
              {calc.hashrateSince(1440, stats.hashrate)}/s
            </td>
            <td>
              {calc.numberWithCommas(stats.valid_shares_one_day)}
            </td>
            <td>
              {calc.numberWithCommas(stats.stale_shares_one_day)}
              {' '}
              (
              {(stats.stale_shares_one_day / totalSharesOneDay).toFixed(1)}
              %)
            </td>
            <td>
              {calc.numberWithCommas(stats.invalid_shares_one_day)}
              {' '}
              (
              {(stats.invalid_shares_one_day / totalSharesOneDay).toFixed(1)}
              %)
            </td>
            <td>
              {calc.hastingsToSC(stats.payouts_one_day).toFixed(2)}
              {' '}
              SC
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default ShareScheduleTable
