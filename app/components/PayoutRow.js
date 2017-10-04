import React, { Component } from 'react'
import moment from 'moment'
import calc from 'utils/calculations'

class PayoutRow extends Component {
  render () {
    const { payout } = this.props
    return (
      <tr>
        <td>{moment(payout.time).fromNow()}</td>
        <td>{calc.hastingsToSC(payout.amount)} SC</td>
        <td colSpan={2}>
          {payout.tx_id}
        </td>
        <td>confirmed</td>
      </tr>
    )
  }
}

export default PayoutRow
