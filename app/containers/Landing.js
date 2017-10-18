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
import { Card } from 'components/Card'
import Footer from 'components/Footer'
import SVGInline from 'react-svg-inline'
import heroSvg from 'assets/imgs/hero.svg'
import intro01 from 'assets/imgs/intro01.svg'
import intro02 from 'assets/imgs/intro02.svg'
import intro03 from 'assets/imgs/intro03.svg'
import { FormattedMessage } from 'react-intl'

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
`

@inject('mainStore')
@observer
class Landing extends React.Component {
  render () {
    return (
      <div>
        <Topbar />
        <Navbar />
        <Section ptm={70} pbm={70}>
          <Container>
            <Row>
              <Column fluid md={6} mdShift={3}>
                <NewsCard altL1>
                  <Row>
                    <Column
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                      fluid
                      md={9}
                    >
                      <Text h5>
                        Read our official launch post from our co-founder Nick Hansen
                      </Text>
                    </Column>
                    <Column fluid md={3}>
                      <NewsButton
                        href='https://medium.com/@nitronick600/introducing-luxor-mining-31b8cb83e21f'
                        target='_blank'
                        style={{ float: 'right' }}
                      >
                        Read Post
                      </NewsButton>
                    </Column>
                  </Row>
                </NewsCard>
              </Column>
            </Row>
            <Row justifyContent='center'>
              <HeroImageWrapper>
                <SVGInline svg={heroSvg} />
              </HeroImageWrapper>
              <Column style={{ textAlign: 'center' }} sm={6}>
                <Text.Block h2 marginBottom={20}>
                  <FormattedMessage id='landing.greeting' />
                </Text.Block>
                <Text.Block bold>
                  <FormattedMessage id='landing.subtitle' />
                </Text.Block>
                <Button.Link to='/setup' marginTop={25}>
                  <FormattedMessage id='landing.setupButton' />
                </Button.Link>
              </Column>
            </Row>
          </Container>
        </Section>
        <Section alt ptm={70} pbm={70}>
          <Container>
            <Row alignItems='center'>
              <Column md={6}>
                <IntroText huge>
                  <FormattedMessage id='landing.prePitch' />
                </IntroText>
              </Column>
              <Column md={6}>
                <Card altDark>
                  <Row
                    style={{ textAlign: 'center' }}
                    justifyContent='space-around'
                  >
                    <Column fluid xs={4}>
                      <Text.Block huge bold>2%</Text.Block>
                      <Text.Block small bold>
                        <FormattedMessage id='landing.prePitchMini1' />
                      </Text.Block>
                    </Column>
                    <Column fluid xs={4}>
                      <Text.Block huge bold>0.3%</Text.Block>
                      <Text.Block small bold>
                        <FormattedMessage id='landing.prePitchMini2' />
                      </Text.Block>
                    </Column>
                    <Column fluid xs={4}>
                      <Text.Block huge bold>100%</Text.Block>
                      <Text.Block small bold>
                        <FormattedMessage id='landing.prePitchMini3' />
                      </Text.Block>
                    </Column>
                  </Row>
                </Card>
              </Column>
            </Row>
          </Container>
        </Section>
        <Section ptm={70} pbm={70}>
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
        </Section>
        <Section ptm={70} pbm={70}>
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
        </Section>
        <Footer />
      </div>
    )
  }
}

export default Landing
