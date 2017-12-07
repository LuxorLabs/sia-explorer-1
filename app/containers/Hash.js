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
  hash: null
}

@inject('mainStore')
@observer
class Blocks extends Component {
  constructor (props) {
    super(props)
    extendObservable(this, defaultState)
  }
  fetchBlock = async hash => {
    try {
      const { data } = await axios.get(`/api/hash/${hash}`)
      if (data) {
        this.hash = data
        this.loading = false
      }
    } catch (err) {
      console.log(err)
      this.error = true
    }
  }
  componentDidMount () {
    this.fetchBlock(this.props.match.params.hash)
  }
  componentWillReceiveProps (newProps) {
    if (newProps.match.params.hash !== this.props.match.params.hash) {
      this.loading = true
      this.fetchBlock(newProps.match.params.hash)
    }
  }
  mapStats = block => {
    const height = block.height
    const id = block.blockid
  }
  render () {
    const { mainStore } = this.props
    const { hash } = this
    return (
      <div>
        <Topbar />
        <Navbar />
        <Section>
          <Container>
            <Row>
              <Column style={{ textAlign: 'center' }}>
                <Text.Block h2>
                  {this.props.match.params.hash}
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
                      <td>Type</td>
                      <td>{hash.hashtype}</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
              : this.error
                  ? <Column style={{ textAlign: 'center', height: '80vh' }}>
                    <h5>Hash not found or does not exist!</h5>
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
