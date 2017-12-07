import React, { Component } from 'react'
import { TableWrap } from './Table'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import Loading from 'components/Loading'

@inject('mainStore')
@observer
class GeneralStatistics extends Component {
  render () {
    const block = this.props.mainStore.currentBlock
    switch (block.state) {
      case 'pending':
        return <Loading />
      case 'rejected':
        return <h1>Error</h1>
      case 'fulfilled':
        const { data } = block.value
        return (
          <TableWrap>
            <table>
              <tbody>
                <tr>
                  <th colSpan={2}>General Statistics</th>
                </tr>
                <tr>
                  <td>Height</td>
                  <td>{data.height}</td>
                </tr>
                <tr>
                  <td>Current Block</td>
                  <td>
                    {data.blockid}
                  </td>
                </tr>
                <tr><td>Total Coins</td><td>{data.totalcoins}</td></tr>
                <tr><td>Difficulty</td><td>{data.difficulty}</td></tr>
                <tr>
                  <td>Estimated Hashrate</td><td>{data.estimatedhashrate}</td>
                </tr>
                <tr>
                  <td>Maturity Timestamp</td><td>{data.maturitytimestamp}</td>
                </tr>
                <tr>
                  <td>Active File Contracts</td>
                  <td>{data.activecontractcount}</td>
                </tr>
                <tr>
                  <td>Total File Contract Cost</td>
                  <td>{data.activecontractcost}</td>
                </tr>
                <tr>
                  <td>Total File Contract Size</td>
                  <td>{data.activecontractsize}</td>
                </tr>
                <tr>
                  <td>Successful Storage Proofs</td>
                  <td>{data.storageproofcount}</td>
                </tr>
              </tbody>
            </table>
          </TableWrap>
        )
    }
  }
}

export default GeneralStatistics
