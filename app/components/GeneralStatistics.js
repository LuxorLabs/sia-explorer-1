import React, { Component } from 'react'
import { TableWrap } from './Table'

class GeneralStatistics extends Component {
  render () {
    return (
      <TableWrap>
        <table>
          <tr>
            <th colSpan={2}>General Statistics</th>
          </tr>
          <tbody>
            <tr>
              <td>Height</td>
              <td>124,988</td>
            </tr>
            <tr>
              <td>Current Block</td>
              <td>
                00000000000000027f61332fcde1dc7bb3a06dea113c0af0dab2cde11c558abe
              </td>
            </tr>
            <tr><td>Total Coins</td><td>31.9 billion siacoins</td></tr>
            <tr><td>Difficulty</td><td>181,916 TH</td></tr>
            <tr><td>Estimated Hashrate</td><td>341,265 GH/s</td></tr>
            <tr><td>Maturity Timestamp</td><td>14:29 Dec 5 2017</td></tr>
            <tr><td>Active File Contracts</td><td>71,264</td></tr>
            <tr>
              <td>Total File Contract Cost</td><td>52,323,123 siacoins</td>
            </tr>
            <tr><td>Total File Contract Size</td><td>358.44 TB</td></tr>
            <tr><td>Successful Storage Proofs</td><td>106,733</td></tr>
          </tbody>
        </table>
      </TableWrap>
    )
  }
}

export default GeneralStatistics
