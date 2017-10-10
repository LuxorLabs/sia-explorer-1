import React, { Component } from 'react'
import styles from 'styles'
import Topbar from 'components/Topbar'
import Navbar from 'components/Navbar'
import Container from 'components/Container'
import Footer from 'components/Footer'
import { Section } from 'components/Section'
import { Row, Column } from 'hedron'
import { Text } from 'components/Typography'
import { BlocksTable } from 'components/Table'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import calc from 'utils/calc'
@inject('mainStore')
@observer
class Blocks extends Component {
  mapBlocks = blocks =>
    blocks
      .sort((a, b) => a.timestamp < b.timestamp)
      .map(b => [
        b.height,
        b.hash,
        calc.hastingsToSC(b.payout).toFixed(0),
        moment.utc(b.timestamp).fromNow(),
        b.paid ? 'Paid' : 'Unpaid'
      ])
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
                  We have successfully mined {mainStore.blocksFound} blocks
                </Text.Block>
              </Column>
            </Row>
          </Container>
        </Section>
        <Section ptm={70} pbm={200} alt>
          <Container>
            {mainStore.UI.loading
              ? <h1>Loading</h1>
              : <BlocksTable
                breakpoint={styles.breakpoint.lg}
                headers={['Height', 'Hash', 'Payout', 'Time Found', 'Paid']}
                data={this.mapBlocks(mainStore.stats.block_stats)}
                />}
          </Container>
        </Section>
        <Footer />
      </div>
    )
  }
}

export default Blocks
