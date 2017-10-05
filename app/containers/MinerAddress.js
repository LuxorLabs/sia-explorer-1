import React, { Component } from 'react'
import Navigation from 'components/Navigation'
import axios from 'axios'
import calc from 'utils/calculations'
import moment from 'moment'
import Loading from 'components/Loading'
import styled from 'styled-components'
import WorkerRow from 'components/WorkerRow'
import PayoutRow from 'components/PayoutRow'
import GeneralStatsTable from 'components/GeneralStatsTable'
import ShareScheduleTable from 'components/ShareScheduleTable'
import HashrateChart from 'components/HashrateChart'
import { inject, observer } from 'mobx-react'

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

const ChartWrap = styled.div`
  padding-bottom: 50px;
  padding-left: 1rem;
  padding-right: 1rem;
`

const StatsWrap = styled.div`
  padding-bottom: 50px;
`

@inject('mainStore')
@observer
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
  componentDidMount () {
    this.props.mainStore.address = ''
  }
  render () {
    const { stats } = this.state
    return (
      <div>
        <Navigation />
        <div className='text-dark'>
          {!this.state.loading
            ? <StatsWrap>
              <AddressWrap>
                <div className='text-center text-light'>
                  <span id='userAddress'>{this.state.user}</span>
                </div>
              </AddressWrap>
              <div className='container grid-xl'>
                <div className='columns'>
                  <ChartWrap className='col-12'>
                    <HashrateChart data={stats.hashrate} />
                  </ChartWrap>
                  <div className='col-4 col-md-12 p-2'>
                    <GeneralStatsTable stats={stats} />
                  </div>
                  <div className='col-8 col-md-12 p-2'>
                    <ShareScheduleTable stats={stats} />
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

                    {this.state.stats.payouts.length > 0
                        ? <table className='table bg-primary'>
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
                        : <div className='empty'>
                          <div className='empty-icon'>
                            <i className='icon icon-people' />
                          </div>
                          <p className='empty-title h5'>
                              You have no payouts just yet!
                            </p>
                          <p className='empty-subtitle'>
                              Note that the minimum payout is currently set at 500SC.
                            </p>
                        </div>}
                  </div>
                </div>
              </div>
            </StatsWrap>
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
