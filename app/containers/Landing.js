import React from 'react'
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
    const res = data.applied_txs.map(t => [
      t.id,
      `${calc
        .hastingsToSC(sumOutputs(t.siacoininputoutputs).value)
        .toFixed(2)} SC`,
      Date.now(),
      'Transaction'
    ])

    return res
  }
  render () {
    return (
      <div style={{ width: '100%' }}>
        {/* <Animation /> */}
        <Topbar />
        <Navbar />
        <Section greenGradient ptm={150} pbm={150}>
          <Container>
            <Row>
              {/* <Column fluid md={6} mdShift={3}>
                <NewsCard altL1>
                  <Row>
                    <NewCol
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                      fluid
                      md={9}
                    >
                      <Text h5>
                        <FormattedMessage id='landing.news' />
                      </Text>
                    </NewCol>
                    <NewCol fluid md={3}>
                      <NewsButton
                        href={
                          this.props.mainStore.i18nConfig.locale === 'zh'
                            ? articleLinks.zh
                            : articleLinks.en
                        }
                        target='_blank'
                      >
                        <FormattedMessage id='landing.newsCTA' />
                      </NewsButton>
                    </NewCol>
                  </Row>
                </NewsCard>
              </Column> */}
            </Row>
            <Row justifyContent='center'>
              {/* <HeroImageWrapper>
                <SVGInline svg={heroSvg} />
              </HeroImageWrapper> */}

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
                headers={['Height', 'Age', 'Transactions', 'Mined By', 'Size']}
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
                data={this.mapTx(AppliedTx)}
              />
            </Row>
          </Container>
        </Section>
        {/* <Section ptm={70} pbm={70}>
          <Container>
            <Row>
              <Column md={6}>
                <Text.Block marginBottom={styles.spacing.base} h3>
                  <FormattedMessage id='landing.pitchTitle1_1' />
                  <br />
                  <FormattedMessage id='landing.pitchTitle1_2' />
                </Text.Block>
                <Text.Block>
                  <FormattedMessage id='landing.pitchDesc1' />
                </Text.Block>
              </Column>
              <Column md={6}>
                <IntroImageWrapper>
                  <SVGInline svg={intro01} />
                </IntroImageWrapper>
              </Column>
            </Row>
          </Container>
        </Section> */}
        {/* <Section ptm={70} pbm={70}>
          <Container>
            <ReverseRow>
              <Column md={6}>
                <Text.Block marginBottom={styles.spacing.base} h3>
                  <FormattedMessage id='landing.pitchTitle2_1' />
                  {' '}
                  <br />
                  <FormattedMessage id='landing.pitchTitle2_2' />
                </Text.Block>
                <Text.Block>
                  <FormattedMessage id='landing.pitchDesc2' />
                </Text.Block>
              </Column>
              <Column md={6}>
                <IntroImageWrapper>
                  <SVGInline svg={intro02} />
                </IntroImageWrapper>
              </Column>
            </ReverseRow>
          </Container>
        </Section>
        <Section ptm={70} pbm={70}>
          <Container>
            <Row>
              <Column md={6}>
                <Text.Block marginBottom={styles.spacing.base} h3>
                  <FormattedMessage id='landing.pitchTitle3_1' />
                  <br />
                  <FormattedMessage id='landing.pitchTitle3_2' />
                </Text.Block>
                <Text.Block>
                  <FormattedMessage id='landing.pitchDesc3' />
                </Text.Block>
                <div style={{ marginTop: `${styles.spacing.base * 5}px` }}>
                  <Button.a
                    target='_blank'
                    href='https://discord.gg/sia'
                    background='discordPurple'
                  >
                    <FormattedMessage id='landing.discordButton' />
                  </Button.a>
                </div>
              </Column>
              <Column md={6}>
                <IntroImageWrapper>
                  <SVGInline svg={intro03} />
                </IntroImageWrapper>
              </Column>
            </Row>
          </Container>
        </Section>
        <Section alt ptm={100} pbm={100}>
          <Container>
            <Row>
              <Column style={{ textAlign: 'center' }} md={12}>
                <Text h2>
                  <FormattedMessage id='landing.cta' />
                  {' '}
                  <Text.Link h2 secondary to='/setup'>
                    <FormattedMessage id='landing.ctaLink' />
                  </Text.Link>
                </Text>
              </Column>
            </Row>
          </Container>
        </Section> */}
        <Footer />
      </div>
    )
  }
}

export default Landing
