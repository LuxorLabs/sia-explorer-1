import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import styles from 'styles'
import breakpoint from 'styled-components-breakpoint'
import { inject, observer } from 'mobx-react'
import { Page, Row, Column } from 'hedron'
import Container from 'components/Container'
import Topbar from 'components/Topbar'
import Navbar from 'components/Navbar'
import { Button } from 'components/Button'
import { Text } from 'components/Typography'
import { Section } from 'components/Section'
import Animation from 'components/Animation'
import { Card } from 'components/Card'
import Footer from 'components/Footer'
import SVGInline from 'react-svg-inline'
import heroSvg from 'assets/imgs/hero.svg'
import intro01 from 'assets/imgs/intro01.svg'
import intro02 from 'assets/imgs/intro02.svg'
import intro03 from 'assets/imgs/intro03.svg'
import GeneralStatistics from 'components/GeneralStatistics'
import logo from 'assets/imgs/explorer.svg'
import { FormattedMessage } from 'react-intl'
import Searchbar from 'components/Searchbar'
import { TransactionTable } from 'components/Table'
import AppliedTx from 'mock/tx_output.json'
import calc from 'utils/calc'
import { toJS } from 'mobx'

const HeroImageWrapper = styled.div`
  width: 100%;
  max-width: 40vw;
  height: 250px;
  margin: ${styles.spacing.baseRem * 4}rem;
  @keyframes hovering {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(25px);
      opacity: 0.2;
    }
  }
  @keyframes asic {
    0% {
      transform: translate(120.715801px, 36.614051px);
    }
    100% {
      transform:translate(120.715801px, 16.614051px);
    }
  }
  #asic {
    animation: asic 3s ease-in-out infinite alternate;
  }
  #hv1 {
    animation: hovering 3s ease-in-out infinite alternate;
  }
  #hv2 {
    animation: hovering 3s ease-in-out infinite alternate;
    animation-delay: 0.25s;
  }
  #hv3 {
    animation: hovering 3s ease-in-out infinite alternate;
    animation-delay: 0.5s;
  }
`

const IntroImageWrapper = styled.div`
  width: 100%;
`

const IntroText = styled(Text)`

`

const ReverseRow = styled(Row)`
  flex-direction: row-reverse;
`

const NewsCard = styled(Card)`
  padding: 15px;
`

const NewsButton = styled(Button.a)`
  height: 30px;
  line-height: 30px;
  font-size: 0.9rem;
  margin: 1rem;
  ${breakpoint('md', styles.breakpoint)`
    margin: 0;
  `}
`

const NewCol = styled(Column)`
  text-align: center;
  button {
    margin: 0 auto;
  }
  ${breakpoint('md', styles.breakpoint)`
      span {
        text-align: left;
      }
      button {
        float: right;
      }
  `}

`

const articleLinks = {
  zh: 'http://www.jianshu.com/p/51f419e31a33',
  en: 'https://medium.com/@nitronick600/introducing-luxor-mining-31b8cb83e21f'
}

@inject('mainStore')
@observer
class Landing extends React.Component {
  mapTx = data => {
    const sumOutputs = a => a.reduce((x, y) => ({ value: x.value + y.value }))
    return data.transactions.map(t => [
      t.id,
      `${calc
        .hastingsToSC(sumOutputs(t.siacoininputoutputs).value)
        .toFixed(2)} SC`,
      t.height,
      t.filecontractids ? 'File Contract' : 'Transaction'
    ])
  }

  mapBlocks = blocks => {
    // ['Height', 'Age', 'Transactions', 'Difficulty', 'Active Contract Size']
    const re = blocks.map(b => {
      return [
        b.height,
        moment.unix(b.rawblock.timestamp).fromNow(),
        b.transactions.length,
        b.difficulty,
        b.activecontractsize
      ]
    })
    return re
  }
  render () {
    const { latestBlocks, pendingBlock } = this.props.mainStore
    return (
      <div style={{ width: '100%' }}>
        <Topbar />
        <Navbar />
        <Section greenGradient ptm={150} pbm={150}>
          <Container>
            <Row justifyContent='center'>
              <Column style={{ textAlign: 'center' }} sm={6}>
                <SVGInline svg={logo} />
                <Text.Block h2 marginBottom={20}>
                  <FormattedMessage id='landing.greeting' />
                </Text.Block>
                <Text.Block bold>
                  <FormattedMessage id='landing.subtitle' />
                </Text.Block>
                <Row style={{ paddingTop: '50px' }}>
                  <Column
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    fluid
                    md={8}
                  >
                    <Searchbar />
                  </Column>
                  <Column
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    fluid
                    md={4}
                  >
                    <Button background='altD1'>Search</Button>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Container>
        </Section>
        <Section altD2 ptm={70} pbm={70}>
          <Container>
            <GeneralStatistics />
          </Container>
        </Section>
        <Section dark ptm={70} pbm={70}>
          <Container>
            <Row>
              <TransactionTable
                breakpoint={styles.breakpoint.lg}
                headers={[
                  'Height',
                  'Age',
                  'Transactions',
                  'Difficulty',
                  'Active Contract Size'
                ]}
                data={
                  latestBlocks.state === 'fulfilled'
                    ? this.mapBlocks(latestBlocks.value.data.blocks)
                    : [[0, 0, 0, 0, 0]]
                }
              />
            </Row>
          </Container>
        </Section>
        <Section dark ptm={70} pbm={70}>
          <Container>
            <Row>
              <TransactionTable
                breakpoint={styles.breakpoint.lg}
                headers={['Hash', 'Amount', 'Time', 'Type']}
                data={
                  pendingBlock.state === 'fulfilled'
                    ? this.mapTx(pendingBlock.value.data.blocks[0])
                    : [[0, 0, 0, 0]]
                }
              />
            </Row>
          </Container>
        </Section>
        <Footer />
      </div>
    )
  }
}

export default Landing
