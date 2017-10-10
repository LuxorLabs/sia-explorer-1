import React, { Component } from 'react'
import styled from 'styled-components'
import styles from 'styles'
import styledProps from 'styled-props'
import { Page, Row, Column, withBreakpoints } from 'hedron'
import breakpoint from 'styled-components-breakpoint'
import { Text } from 'components/Typography'
import { FloatRight } from 'components/Helper'
import Container from 'components/Container'
import { inject, observer } from 'mobx-react'

const TopbarOuter = styled.div`
  background: ${styledProps(styles.color, 'background')};
`

const TopbarInner = styled(Row)`
    height: 50px;
    align-items: center;
    text-align: center;
    padding: 5px;
    ${breakpoint('md', styles.breakpoint)`
      padding: 0;
      div:first-child {
        span {
          margin-left: 15px;
        }
        text-align: left;
      }
      div:nth-child(2) {
        span {
          margin-right: 15px;
        }
        text-align: right;
      }
    `}
  `

TopbarOuter.defaultProps = {
  background: 'darkYellow'
}

@inject('mainStore')
@observer
class Topbar extends Component {
  render () {
    const { mainStore } = this.props
    return (
      <TopbarOuter>
        <Container>
          <TopbarInner>
            <Column fluid md={6}>
              <Text small>
                Price: ¢{(mainStore.coinmarketcap.price_usd * 100).toFixed(4)}
              </Text>
            </Column>
            <Column fluid md={6}>
              <Text small marginRight={10}>
                Blocks Found: {mainStore.blocksFound}
              </Text>
              <Text small>Hashrate: {mainStore.totalHashrate}/s</Text>
            </Column>
          </TopbarInner>
        </Container>
      </TopbarOuter>
    )
  }
}

export default Topbar
