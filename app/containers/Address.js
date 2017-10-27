import React, { Component } from 'react'
import styles from 'styles'
import Topbar from 'components/Topbar'
import Navbar from 'components/Navbar'
import Container from 'components/Container'
import Footer from 'components/Footer'
import { Section } from 'components/Section'
import { Row, Column } from 'hedron'
import { Text } from 'components/Typography'
import { Card } from 'components/Card'
import AddressCardStat from 'components/AddressCardStat'
import { WorkersTable, TimeStatsTable, PayoutTable } from 'components/Table'
import HashrateChart from 'components/HashrateChart'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import calc from 'utils/calc'
import Loading from 'components/Loading'
@inject('mainStore')
@observer
class Address extends Component {
  componentDidMount () {
    const user = this.props.match.params.address
    this.props.mainStore.fetchAddress(user)
  }
  componentWillUnmount () {
    this.props.mainStore.UI.Address.loading = true
    this.props.mainStore.addressStats = {}
  }
  mapWorkers = () => {
    return this.props.mainStore.summaryWorkerStats.map(m => {
      return [
        m.name,
        m.lastShare,
        m.five_minutes,
        m.fifteen_minutes,
        m.one_hour,
        m.six_hour,
        m.one_day
      ]
    })
  }
  mapPayouts = () => {
    return this.props.mainStore.summaryPayoutStats
      .sort((a, b) => b.dateTime - a.dateTime)
      .slice(0, 30)
      .map(p => {
        return [p.date, p.amount, p.txid, 'Confirmed']
      })
  }
  mapShares = () => {
    const { addressStats } = this.props.mainStore
    const totalSharesFiveMin =
      addressStats.stale_shares_five_min +
      addressStats.invalid_shares_five_min +
      addressStats.valid_shares_five_min
    const totalSharesFifteenMin =
      addressStats.stale_shares_fifteen_min +
      addressStats.invalid_shares_fifteen_min +
      addressStats.valid_shares_fifteen_min
    const totalSharesOneHour =
      addressStats.stale_shares_one_hour +
      addressStats.invalid_shares_one_hour +
      addressStats.valid_shares_one_hour
    const totalSharesSixHours =
      addressStats.stale_shares_six_hour +
      addressStats.invalid_shares_six_hour +
      addressStats.valid_shares_six_hour
    const totalSharesOneDay =
      addressStats.stale_shares_one_day +
      addressStats.invalid_shares_one_day +
      addressStats.valid_shares_one_day

    const percentageCalc = (s, t) => {
      return (s / t).toFixed(2) + '%'
    }
    const shareFactory = (ts, hr, vs, ss, is) => [
      ts,
      hr + '/s',
      calc.numberWithCommas(vs),
      calc.numberWithCommas(ss),
      calc.numberWithCommas(is)
    ]
    return [
      shareFactory(
        '5 minutes',
        calc.hashrateSince(5, addressStats.hashrate),
        addressStats.valid_shares_five_min,
        addressStats.stale_shares_five_min,
        addressStats.invalid_shares_five_min
      ),
      shareFactory(
        '15 minutes',
        calc.hashrateSince(15, addressStats.hashrate),
        addressStats.valid_shares_fifteen_min,
        addressStats.stale_shares_fifteen_min,
        addressStats.invalid_shares_fifteen_min
      ),
      shareFactory(
        '60 minutes',
        calc.hashrateSince(60, addressStats.hashrate),
        addressStats.valid_shares_one_hour,
        addressStats.stale_shares_one_hour,
        addressStats.invalid_shares_one_hour
      ),
      shareFactory(
        '6 hours',
        calc.hashrateSince(360, addressStats.hashrate),
        addressStats.valid_shares_six_hour,
        addressStats.stale_shares_six_hour,
        addressStats.invalid_shares_six_hour
      ),
      shareFactory(
        '24 hours',
        calc.hashrateSince(1440, addressStats.hashrate),
        addressStats.valid_shares_one_day,
        addressStats.stale_shares_one_day,
        addressStats.invalid_shares_one_day
      )
    ]
  }
  render () {
    const user = this.props.match.params.address
    const summary = this.props.mainStore.summaryCardStats
    const { mainStore } = this.props
    return (
      <div>
        <Topbar />
        <Navbar />
        {mainStore.UI.Address.loading
          ? <Loading />
          : <div>
            <Section>
              <Container>
                <Row>
                  <Column
                    style={{
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    >
                    <Text>
                      {user}
                    </Text>
                  </Column>
                </Row>
              </Container>
            </Section>
            <Section alt>
              <Container>
                <Card altDark>
                  <Row>
                    <Column style={{ textAlign: 'center' }}>
                      <Text.Block h4>
                        {summary.unpaidBalance}
                      </Text.Block>
                      <Text.Block h5>
                          Please note that we count shares using PPS. This means consistent payouts at 500 SC. Your current balance is reflected here.
                        </Text.Block>
                    </Column>
                  </Row>
                </Card>
                <Row>
                  <Column md={4}>
                    <Card altDark>
                      <Row>
                        <AddressCardStat
                          title='Unpaid Balance'
                          stat={summary.unpaidBalance}
                          />
                        <AddressCardStat
                          title='Hash Rate'
                          stat={summary.hashrate}
                          />
                        <AddressCardStat
                          title='Efficiency'
                          stat={summary.efficiency}
                          />
                        <AddressCardStat
                          title='Paid Rewards'
                          stat={summary.paidRewards}
                          />
                        <AddressCardStat
                          title='Blocks Found'
                          stat={summary.blocksFound}
                          />
                        <AddressCardStat
                          title='Last Share'
                          stat={summary.lastShare}
                          />
                      </Row>
                    </Card>
                  </Column>
                  <Column md={8}>
                    <Card altDark>
                      {mainStore.UI.Address.loading
                          ? <h1>Loading</h1>
                          : <HashrateChart
                            data={mainStore.addressStats.hashrate
                                .slice(0, 50)
                                .reverse()}
                            />}
                    </Card>
                  </Column>
                </Row>
                <Row>
                  <Column md={12}>
                    <WorkersTable
                      breakpoint={styles.breakpoint.lg}
                      headers={[
                        'Time Span',
                        'Hash Rate',
                        'Valid Shares',
                        'Stale Shares',
                        'Invalid Shares'
                      ]}
                      data={this.mapShares()}
                      />
                  </Column>
                </Row>
                <Row>
                  <Column md={12}>
                    <WorkersTable
                      breakpoint={styles.breakpoint.lg}
                      headers={[
                        'Name',
                        'Last Share',
                        '5 minutes',
                        '15 minutes',
                        '1 hour',
                        '6 hours',
                        '24 hours'
                      ]}
                      data={this.mapWorkers()}
                      />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    {mainStore.payoutsExist
                        ? <PayoutTable
                          breakpoint={styles.breakpoint.lg}
                          headers={[
                            'Date/Time',
                            'Amount',
                            'Transaction ID',
                            'Confirmed'
                          ]}
                          data={this.mapPayouts()}
                          />
                        : <Card altDark>
                          <Text h5>No Payouts Exist for this Address</Text>
                        </Card>}

                  </Column>
                </Row>
              </Container>
            </Section>
          </div>}

        <Footer />
      </div>
    )
  }
}

export default Address
