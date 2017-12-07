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
import mock from 'mock/block_output.json'

import calc from 'utils/calc'
@inject('mainStore')
@observer
class Blocks extends Component {
  mapStats = block => {
    const height = block.height
    const id = block.blockid
  }
  render () {
    const { mainStore } = this.props
    const block = mock.blocks[0]
    return (
      <div>
        <Topbar />
        <Navbar />
        <Section>
          <Container>
            <Row>
              <Column style={{ textAlign: 'center' }}>
                <Text.Block h2>
                  Block {block.height}
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
                headers={[
                  'Height',
                  'ID',
                  'Parent Block',
                  'Time',
                  'Difficulty',
                  'Estimated Hashrate',
                  'Total Coins',
                  'Active File Contracts',
                  'Total Contract Cost',
                  'Storage Proofs'
                ]}
                data={this.mapStats(block)}
                />}
          </Container>
        </Section>
        <Footer />
      </div>
    )
  }
}

export default Blocks
