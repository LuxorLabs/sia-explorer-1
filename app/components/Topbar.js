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
import { FormattedMessage } from 'react-intl'
import langEn from 'translations/en.json'
import langZh from 'translations/zh.json'

const TopbarOuter = styled.div`
  background: ${styledProps(styles.color, 'background')};
`

const TopbarInner = styled(Row)`
    height: 50px;
    align-items: center;
    text-align: center;
    padding: 5px;
    button {
      border: none;
      background: transparent;
      color: ${styles.color.light};
      &:focus {
        outline: none;
      }
    }
    ${breakpoint('md', styles.breakpoint)`
      padding: 0;
      div:first-child {
        #price {
          margin-left: 15px;
        }
        text-align: left;
      }
      div:nth-child(3) {
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
  switchLanguage = () => {
    const config = this.props.mainStore.i18nConfig
    if (config.locale === 'en') {
      this.props.mainStore.i18nConfig.locale = 'zh'
      this.props.mainStore.i18nConfig.messages = langZh
    } else {
      this.props.mainStore.i18nConfig.locale = 'en'
      this.props.mainStore.i18nConfig.messages = langEn
    }
  }
  render () {
    const { mainStore } = this.props
    return (
      <TopbarOuter>
        <Container>
          <TopbarInner>
            <Column fluid md={4}>
              <Text id='price' small>
                <FormattedMessage id='topbar.price' /> :
                ¢
                {(mainStore.coinmarketcap.price_usd * 100).toFixed(4)}
              </Text>
            </Column>
            <Column fluid md={4} style={{ textAlign: 'center' }}>
              <button onClick={this.switchLanguage}>
                {this.props.mainStore.i18nConfig.locale === 'en'
                  ? <FormattedMessage id='topbar.translate' />
                  : <FormattedMessage id='topbar.translate' />}
              </button>
            </Column>
            <Column fluid md={4}>
              <Text marginRight={15} small>
                <FormattedMessage id='topbar.blocksFound' /> :
                {' '}{mainStore.blocksFound}
              </Text>
              <Text small>
                <FormattedMessage id='topbar.hashrate' /> :
                {' '}{mainStore.totalHashrate}
                /s
              </Text>
            </Column>
          </TopbarInner>
        </Container>
      </TopbarOuter>
    )
  }
}

export default Topbar
