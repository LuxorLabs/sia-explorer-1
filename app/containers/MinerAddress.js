import React, { Component } from 'react'
import Navigation from 'components/Navigation'
import axios from 'axios'
import calc from 'utils/calculations'
import moment from 'moment'
import Loading from 'components/Loading'
import styled from 'styled-components'
import WorkerRow from 'components/WorkerRow'
import PayoutRow from 'components/PayoutRow'

const AddressWrap = styled.div`
  padding: 50px;
  background: ${props => props.theme.dark_2};
  margin-bottom: 50px;
  #userAddress {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;    
    text-overflow: ellipsis;
  }
`

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
    const totalSharesFiveMin = this.state.loading
      ? 0
      : stats.stale_shares_five_min +
          stats.invalid_shares_five_min +
          stats.valid_shares_five_min
    const totalSharesFifteenMin = this.state.loading
      ? 0
      : stats.stale_shares_fifteen_min +
          stats.invalid_shares_fifteen_min +
          stats.valid_shares_fifteen_min
    const totalSharesOneHour = this.state.loading
      ? 0
      : stats.stale_shares_one_hour +
          stats.invalid_shares_one_hour +
          stats.valid_shares_one_hour
    const totalSharesSixHours = this.state.loading
      ? 0
      : stats.stale_shares_six_hour +
          stats.invalid_shares_six_hour +
          stats.valid_shares_six_hour
    const totalSharesOneDay = this.state.loading
      ? 0
      : stats.stale_shares_one_day +
          stats.invalid_shares_one_day +
          stats.valid_shares_one_day

    return (
      <div>
        <Navigation />
        <div className='text-dark'>
          {!this.state.loading
            ? <div>
              <AddressWrap>
                <div className='text-center text-light'>
                  <span id='userAddress'>{this.state.user}</span>
                </div>
              </AddressWrap>
              <div className='container grid-xl'>
                <div className='columns'>
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
                          <td>
                            {calc.hastingsToSC(stats.balance).toFixed(2)} SC
                            </td>
                        </tr>
                        <tr>
                          <th>All-time Rewards</th>
                          <td>
                            {calc
                                .hastingsToSC(stats.total_payouts)
                                .toFixed(2)}
                            {' '}
                              SC
                            </td>
                        </tr>
                        <tr>
                          <th>All-time Hashes</th>
                          <td>
                            {calc.smartHashrate(
                                calc.reduceHashrate(stats.hashrate)
                              )}
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
                          <td>{calc.hashrateSince(5, stats.hashrate)}/s</td>
                          <td>
                            {calc.numberWithCommas(
                                stats.valid_shares_five_min
                              )}
                          </td>
                          <td>
                            {calc.numberWithCommas(
                                stats.stale_shares_five_min
                              )}
                            {' '}
                              (
                              {(stats.stale_shares_five_min /
                                totalSharesFiveMin).toFixed(1)}
                              %)
                            </td>
                          <td>
                            {calc.numberWithCommas(
                                stats.invalid_shares_five_min
                              )}
                            {' '}
                              (
                              {(stats.invalid_shares_five_min /
                                totalSharesFiveMin).toFixed(1)}
                              %)
                            </td>
                          <td>
                            {calc
                                .hastingsToSC(stats.payouts_five_min)
                                .toFixed(2)}
                            {' '}
                              SC
                            </td>
                        </tr>
                        <tr>
                          <th>15 minutes</th>
                          <td>{calc.hashrateSince(15, stats.hashrate)}/s</td>
                          <td>
                            {calc.numberWithCommas(
                                stats.valid_shares_fifteen_min
                              )}
                          </td>
                          <td>
                            {calc.numberWithCommas(
                                stats.stale_shares_fifteen_min
                              )}
                            {' '}
                              (
                              {(stats.stale_shares_fifteen_min /
                                totalSharesFifteenMin).toFixed(1)}
                              %)
                            </td>
                          <td>
                            {calc.numberWithCommas(
                                stats.invalid_shares_fifteen_min
                              )}
                            {' '}
                              (
                              {(stats.invalid_shares_fifteen_min /
                                totalSharesFifteenMin).toFixed(1)}
                              %)
                            </td>
                          <td>
                            {calc
                                .hastingsToSC(stats.payouts_fifteen_min)
                                .toFixed(2)}
                            {' '}
                              SC
                            </td>
                        </tr>
                        <tr>
                          <th>60 minutes</th>
                          <td>{calc.hashrateSince(60, stats.hashrate)}/s</td>
                          <td>
                            {calc.numberWithCommas(
                                stats.valid_shares_one_hour
                              )}
                          </td>
                          <td>
                            {calc.numberWithCommas(
                                stats.stale_shares_one_hour
                              )}
                            {' '}
                              (
                              {(stats.stale_shares_one_hour /
                                totalSharesOneHour).toFixed(1)}
                              %)
                            </td>
                          <td>
                            {calc.numberWithCommas(
                                stats.invalid_shares_one_hour
                              )}
                            {' '}
                              (
                              {(stats.invalid_shares_one_hour /
                                totalSharesOneHour).toFixed(1)}
                              %)
                            </td>
                          <td>
                            {calc
                                .hastingsToSC(stats.payouts_one_hour)
                                .toFixed(2)}
                            {' '}
                              SC
                            </td>
                        </tr>
                        <tr>
                          <th>6 hours</th>
                          <td>{calc.hashrateSince(360, stats.hashrate)}/s</td>
                          <td>
                            {calc.numberWithCommas(
                                stats.valid_shares_six_hour
                              )}
                          </td>
                          <td>
                            {calc.numberWithCommas(
                                stats.stale_shares_six_hour
                              )}
                            {' '}
                              (
                              {(stats.stale_shares_six_hour /
                                totalSharesSixHours).toFixed(1)}
                              %)
                            </td>
                          <td>
                            {calc.numberWithCommas(
                                stats.invalid_shares_six_hour
                              )}
                            {' '}
                              (
                              {(stats.invalid_shares_six_hour /
                                totalSharesSixHours).toFixed(1)}
                              %)
                            </td>
                          <td>
                            {calc
                                .hastingsToSC(stats.payouts_six_hour)
                                .toFixed(2)}
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
                            {calc.numberWithCommas(
                                stats.valid_shares_one_day
                              )}
                          </td>
                          <td>
                            {calc.numberWithCommas(
                                stats.stale_shares_one_day
                              )}
                            {' '}
                              (
                              {(stats.stale_shares_one_day /
                                totalSharesOneDay).toFixed(1)}
                              %)
                            </td>
                          <td>
                            {calc.numberWithCommas(
                                stats.invalid_shares_one_day
                              )}
                            {' '}
                              (
                              {(stats.invalid_shares_one_day /
                                totalSharesOneDay).toFixed(1)}
                              %)
                            </td>
                          <td>
                            {calc
                                .hastingsToSC(stats.payouts_one_day)
                                .toFixed(2)}
                            {' '}
                              SC
                            </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='col-12 m-2 p-2'>
                    <HeaderWrap>
                      <h4>Miners</h4>
                    </HeaderWrap>
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
                        {this.mapWorkers()}
                      </tbody>
                    </table>
                  </div>
                  <div className='col-12 m-2 p-2'>
                    <HeaderWrap>
                      <h4>Payouts</h4>
                      <span>
                          Payouts are performed daily with a minimum threshold of 500 SC, or up to every 6 hours when over 1000 SC.
                        </span>
                    </HeaderWrap>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>Date/Time </th>
                          <th>Amount</th>
                          <th colSpan={2}>Transaction ID</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.mapPayouts()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            : <Loading />}
        </div>
      </div>
    )
  }
  mapWorkers = () => {
    return this.state.stats.miners.map((m, i) => (
      <WorkerRow key={i} miner={m} />
    ))
  }
  mapPayouts = () => {
    return this.state.stats.payouts.map((p, i) => (
      <PayoutRow key={i} payout={p} />
    ))
  }
}

const HeaderWrap = styled.div`
  padding-bottom: 20px;
  padding-top: 50px;
`

export default MinerAddress
