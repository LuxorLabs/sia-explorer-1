import React, { Component } from 'react'
import styles from 'styles'
import Topbar from 'components/Topbar'
import Navbar from 'components/Navbar'
import Container from 'components/Container'
import Footer from 'components/Footer'
import { Section } from 'components/Section'
import { Row, Column } from 'hedron'
import { Text } from 'components/Typography'
import { MinersTable } from 'components/Table'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import moment from 'moment'
import calc from 'utils/calc'
import { Link } from 'react-router-dom'
import Loading from 'components/Loading'
@inject('mainStore')
@observer
class Miners extends Component {
  render () {
    const { mainStore } = this.props
    return (
      <div>
        <Topbar />
        <Navbar />
        <Section>
          <Container>
            <Row>
              <Column style={{ textAlign: 'center' }}>
                <Text.Block h2>
                  Hello miners — we're hashing at {mainStore.totalHashrate}/s
                </Text.Block>
              </Column>
            </Row>
          </Container>
        </Section>
        <Section ptm={70} pbm={200} alt>
          <Container>
            {mainStore.UI.loading
              ? <Loading />
              : <MinersTable
                breakpoint={styles.breakpoint.lg}
                headers={[
                  'Rank',
                  'Address',
                  'Hashrate',
                  'Efficiency',
                  'Last Active'
                ]}
                data={this.mapStats(mainStore.stats)}
                />}
          </Container>
        </Section>
        <Footer />
      </div>
    )
  }
  mapStats = stats => {
    return stats.users
      .sort((a, b) => {
        return b.hashrate - a.hashrate
      })
      .filter(a => a.hashrate > 0)
      .slice(0, 20)
      .map((m, i) => {
        const time = m.miners && m.miners.length > 0
          ? m.miners.map(w => w.last_beat).reduce((c, a) => (c > a ? c : a))
          : 0
        const eff = m.rejects_count > 0 || m.invalid_shares_count > 0
          ? 100 -
              (m.rejects_count + m.invalid_shares_count) /
                m.valid_shares_count *
                100
          : 100
        return [
          i + 1,
          <Text.Link small to={`/miners/${m.address}`}>
            {m.address}
          </Text.Link>,

          `${calc.smartHashrate(m.hashrate)}/s`,
          eff.toFixed(2) + '%',
          time === 0 ? 'Never' : moment.unix(time).fromNow()
        ]
      })
  }
}

export default Miners
