import React, { Component } from 'react'
import Footer from 'components/Footer'
import styled from 'styled-components'
import styles from 'styles'
import Topbar from 'components/Topbar'
import Navbar from 'components/Navbar'
import { Page, Row, Column } from 'hedron'
import { Section } from 'components/Section'
import Container from 'components/Container'
import { Text } from 'components/Typography'
import SVGInline from 'react-svg-inline'
import heroSetupSvg from 'assets/imgs/heroSetup.svg'
import { Card } from 'components/Card'
import SetupNav from 'components/SetupNav'
import SetupCard from 'components/SetupCard'
import { inject, observer } from 'mobx-react'
import { SetupRegionTable } from 'components/Table'
import breakpoint from 'styled-components-breakpoint'
import { FormattedMessage } from 'react-intl'

const SetupHeroImageWrapper = styled.div`
  width: 100%;
  max-width: 40vw;
`

const serverLocations = [
  ['US East', 'us-east.luxor.tech:3333', 'us-east.luxor.tech:7777'],
  ['US West', 'us-west.luxor.tech:3333', 'us-west.luxor.tech:7777'],
  ['Asia', 'asia.luxor.tech:3333', 'asia.luxor.tech:7777'],
  ['Europe', 'eu.luxor.tech:3333', 'eu.luxor.tech:7777']
]

const CenterColumn = styled(Column)`
  display: flex;
  align-items: center;
  justify-content: center;
  ${breakpoint('md', styles.breakpoint)`
    display: block;
  `}
`

@inject('mainStore')
@observer
class Setup extends Component {
  mapLocations = () => {}
  render () {
    return (
      <div>
        <Topbar />
        <Navbar />
        <Section ptm={50} pbm={50} alt>
          <Container>
            <Row alignItems='center'>
              <CenterColumn fluid md={9}>
                <Text h2><FormattedMessage id='setup.gettingStarted' /></Text>
              </CenterColumn>
              <CenterColumn fluid md={3}>
                <SetupHeroImageWrapper>
                  <SVGInline svg={heroSetupSvg} />
                </SetupHeroImageWrapper>
              </CenterColumn>
            </Row>
          </Container>
        </Section>
        <Container>
          <Row>
            <Column lg={3} md={4}>
              <SetupNav />
            </Column>
            <Column lg={9} md={8}>
              <SetupCard
                anchor={0}
                title={<FormattedMessage id='setup.switch' />}
              >
                <Text.Block>
                  <FormattedMessage id='setup.switchDesc' />
                </Text.Block>
                <ol>
                  <li>
                    <FormattedMessage id='setup.switchLi_1' />
                  </li>
                  <li>
                    <FormattedMessage id='setup.switchLi_2' />
                  </li>
                  <li>
                    <FormattedMessage id='setup.switchLi_3' />
                  </li>
                  <li>
                    <FormattedMessage id='setup.switchLi_4_1' />
                    {' '}
                    <Text.Anchor
                      href='https://twitter.com/NickHansen600'
                      target='_blank'
                      secondary
                    >
                      Nick
                    </Text.Anchor>
                    <FormattedMessage id='setup.switchLi_4_2' />
                  </li>
                </ol>
              </SetupCard>
              <SetupCard anchor={1} title='Quickstart'>
                <Text.Block>
                  <FormattedMessage id='setup.quickstartDesc' />
                </Text.Block>
                <ul>
                  <li>
                    <FormattedMessage id='setup.quickstartLi_1_1' />
                    {' '}
                    <Text.Anchor
                      secondary
                      href='http://sia.tech/apps/'
                      target='_blank'
                    >
                      <FormattedMessage id='setup.quickstartLi_1_2' />
                    </Text.Anchor>
                    {' '}
                    <FormattedMessage id='setup.quickstartLi_1_3' />
                  </li>
                  <li>
                    <FormattedMessage id='setup.quickstartLi_1_2' />
                    {' '}
                    <Text.Anchor
                      secondary
                      href='https://bittrex.com/'
                      target='_blank'
                    >
                      Bittrex
                    </Text.Anchor>
                    ,
                    {' '}

                    <Text.Anchor
                      secondary
                      href='https://hitbtc.com/'
                      target='_blank'
                    >
                      HitBTC
                    </Text.Anchor>
                    ,
                    {' '}
                    <Text.Anchor
                      secondary
                      href='https://poloniex.com/'
                      target='_blank'
                    >
                      Poloniex
                    </Text.Anchor>
                    , or
                    {' '}
                    <Text.Anchor
                      secondary
                      href='https://shapeshift.io/#/coins'
                      target='_blank'
                    >
                      ShapeShift
                    </Text.Anchor>
                    ).
                  </li>
                </ul>
              </SetupCard>
              <SetupCard anchor={2} title='Compatible Miners'>
                <Text.Block marginBottom={10}>
                  <FormattedMessage id='setup.minersDesc' />
                </Text.Block>
                <Text.Block>
                  Marlin (AMD & Nvidia):
                  {' '}
                  <Text.Anchor
                    secondary
                    href='https://siamine.com/marlin'
                    target='_blank'
                  >
                    Windows + Linux
                  </Text.Anchor>
                </Text.Block>
                <Text.Block>
                  CCMiner (Nvidia):
                  {' '}
                  <Text.Anchor
                    secondary
                    href='https://github.com/KlausT/ccminer/releases/tag/8.00'
                    target='_blank'
                  >
                    Windows{' '}
                  </Text.Anchor>
                  & <Text.Anchor
                    secondary
                    href='https://siamining.com/files/ccminer/linux-amd64/ccminer-7.04-linux-amd64.tar.gz'
                    target='_blank'
                  >
                    Linux
                  </Text.Anchor>
                </Text.Block>
                <Text.Block>
                  SGMiner (AMD):
                  {' '}
                  <Text.Anchor
                    secondary
                    href='https://siamining.com/files/sgminer-xurious-wolf-win32.zip'
                    target='_blank'
                  >
                    Windows + Linux
                  </Text.Anchor>
                </Text.Block>
                <Text.Block>
                  GoMiner (AMD):
                  {' '}
                  <Text.Anchor
                    secondary
                    href='https://github.com/robvanmieghem/gominer/releases'
                    target='_blank'
                  >
                    Binaries
                  </Text.Anchor>
                </Text.Block>
              </SetupCard>
              <SetupCard anchor={3} title='Pre-Built Commands'>
                <Text.Block marginBottom={10}>
                  <FormattedMessage id='setup.prebuiltCommandsDesc_1' />
                </Text.Block>
                <Text.Block>
                  <strong>
                    <FormattedMessage id='setup.prebuiltCommandsDesc_2' />
                  </strong>
                </Text.Block>
                <Text.Block marginBottom={10}>
                  Marlin:
                </Text.Block>
                <Text.Pre>
                  marlin -H us-east.luxor.tech:3333 -u YourSiacoinAddress.YourWorkerName -I 28
                </Text.Pre>
                <Text.Block marginBottom={10}>
                  CCMiner:
                </Text.Block>
                <Text.Pre>
                  ccminer -a sia -e --url=stratum+tcp://us-east.luxor.tech:3333 -u YourSiacoinAddress.YourWorkerName -i 28
                </Text.Pre>
                <Text.Block marginBottom={10}>
                  SGMiner:
                </Text.Block>
                <Text.Pre>
                  sgminer --algorithm=sia --url=stratum+tcp://us-east.luxor.tech:3333 --userpass=YourSiacoinAddress.YourWorkerName -I 28
                </Text.Pre>
                <Text.Block marginBottom={10}>
                  GoMiner:
                </Text.Block>
                <Text.Pre>
                  gominer -url stratum+tcp://us-east.luxor.tech:3333 -user YourSiacoinAddress.YourWorkerName
                </Text.Pre>
                <Text.Block marginBottom={10}>
                  Claymore Dual Mine:
                </Text.Block>
                <Text.Pre>
                  EthDcrMiner64.exe -epool us1.ethpool.org:3333 -ewal YourEthAddress.YourWorkerName -epsw x -dpool stratum+tcp://us-east.luxor.tech:7777 -dwal YourSiacoinAddress.YourWorkerName -dcoin sia
                </Text.Pre>
              </SetupCard>
              <SetupCard anchor={4} title="What's Claymore">
                <Text.Block>
                  <FormattedMessage id='setup.claymoreDesc' />
                </Text.Block>
              </SetupCard>
              <SetupCard anchor={5} title='Regions'>
                <Text.Block marginBottom={20}>
                  <FormattedMessage id='setup.regionsDesc' />
                </Text.Block>
                <SetupRegionTable
                  breakpoint={styles.breakpoint.lg}
                  headers={['Location', 'Stratum', 'Claymore (Dual Mining)']}
                  data={serverLocations}
                />
              </SetupCard>
              <SetupCard anchor={6} title='Hosted Mining'>
                <Text.Anchor
                  href='https://www.miningrigrentals.com/register?ref=43501'
                  target='_blank'
                  secondary
                >
                  Mining Rig Rentals
                </Text.Anchor>
                <Text.Block marginTop={10} marginBottom={10}>
                  <FormattedMessage id='setup.hostedMiningDesc_1' />
                </Text.Block>
                <Text.Anchor
                  href='https://www.nicehash.com/?refby=512247'
                  target='_blank'
                  secondary
                >
                  Nicehash
                </Text.Anchor>
                <Text.Block marginTop={10}>
                  <FormattedMessage id='setup.hostedMiningDesc_2' />
                </Text.Block>
              </SetupCard>
              <SetupCard anchor={7} title='Questions?'>
                <Text.Block>
                  <FormattedMessage id='setup.questionsDesc_1' />
                  {' '}
                  <Text.Anchor secondary href='mailto:hello@luxor.tech'>
                    <FormattedMessage id='setup.questionsEmail' />
                  </Text.Anchor>
                  {' '}
                  <FormattedMessage id='setup.questionsDesc_2' />
                  {' '}
                  <Text.Anchor
                    href='https://twitter.com/LuxorTechTeam'
                    target='_blank'
                    secondary
                  >
                    @LuxorTechTeam
                  </Text.Anchor>
                </Text.Block>
              </SetupCard>
            </Column>

          </Row>
        </Container>
        <Footer />
      </div>
    )
  }
}

export default Setup
