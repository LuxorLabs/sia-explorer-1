import React, { Component } from 'react'
import styles from 'styles'
import Topbar from 'components/Topbar'
import Navbar from 'components/Navbar'
import Container from 'components/Container'
import Footer from 'components/Footer'
import { Section } from 'components/Section'
import { Row, Column } from 'hedron'
import { Text } from 'components/Typography'
import { TableWrap } from 'components/Table'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { extendObservable } from 'mobx'
import Loading from 'components/Loading'
import axios from 'axios'
import calc from 'utils/calc'
require('babel-polyfill')

const defaultState = {
  loading: true,
  error: false,
  block: null
}

@inject('mainStore')
@observer
class Blocks extends Component {
  constructor (props) {
    super(props)
    extendObservable(this, defaultState)
  }
  fetchBlock = async height => {
    try {
      const { data } = await axios.get(`/api/block/${height}`)
      if (data) {
        this.block = data.blocks[0]
        this.loading = false
      }
    } catch (err) {
      console.log(err)
      this.error = true
    }
  }
  componentDidMount () {
    this.fetchBlock(this.props.match.params.height)
  }
  componentWillReceiveProps (newProps) {
    if (newProps.match.params.height !== this.props.match.params.height) {
      this.loading = true
      this.fetchBlock(newProps.match.params.height)
    }
  }
  mapStats = block => {
    const height = block.height
    const id = block.blockid
  }
  render () {
    const { mainStore } = this.props
    const { block } = this
    return (
      <div>
        <Topbar />
        <Navbar />
        <Section>
          <Container>
            <Row>
              <Column style={{ textAlign: 'center' }}>
                <Text.Block h2>
                  Block {this.props.match.params.height}
                </Text.Block>
              </Column>
            </Row>
          </Container>
        </Section>
        <Section ptm={70} pbm={200} alt>
          <Container>
            {!this.loading
              ? <TableWrap>
                <table>
                  <tbody>
                    <tr>
                      <td>Height</td>
                      <td>{block.height}</td>
                    </tr>
                    <tr>
                      <td>Block ID</td>
                      <td>{block.blockid}</td>
                    </tr>
                    <tr>
                      <td>Parent Block</td>
                      <td>{block.rawblock.parentid}</td>
                    </tr>
                    <tr>
                      <td>Time</td>
                      <td>
                        {moment.unix(block.rawblock.timestamp).fromNow()}
                      </td>
                    </tr>
                    <tr>
                      <td>Difficulty</td>
                      <td>{block.difficulty}</td>
                    </tr>
                    <tr>
                      <td>Estimated Hashrate</td>
                      <td>{block.estimatedhashrate}</td>
                    </tr>
                    <tr>
                      <td>Total Coins</td>
                      <td>{block.totalcoins}</td>
                    </tr>
                    <tr>
                      <td>Active File Contracts</td>
                      <td>{block.activecontractcount}</td>
                    </tr>
                    <tr>
                      <td>Total Contract Cost</td>
                      <td>{block.totalcontractcost}</td>
                    </tr>
                    <tr>
                      <td>Storage Proofs</td>
                      <td>{block.storageproofcount}</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
              : this.error
                  ? <Column style={{ textAlign: 'center', height: '80vh' }}>
                    <h5>Block not found or does not exist!</h5>
                  </Column>
                  : <Loading />}
          </Container>
        </Section>
        <Footer />
      </div>
    )
  }
}

export default Blocks
