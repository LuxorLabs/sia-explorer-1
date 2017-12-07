import React, { Component } from 'react'
import styled from 'styled-components'
import styles from 'styles'
import breakpoint from 'styled-components-breakpoint'
import { Section } from 'components/Section'
import Container from 'components/Container'
import { Text } from 'components/Typography'
import { Row, Column } from 'hedron'

const FooterRow = styled(Row)`
  text-align: center;
  div {
    padding: ${styles.spacing.base}px;
  }
  ${breakpoint('md', styles.breakpoint)`
    div:first-child {
      text-align: left;
    }
    div:nth-child(2) {
      text-align: right;
    }
  `}
`

const FooterWrap = styled.div`

`

class Footer extends Component {
  render () {
    return (
      <FooterWrap>
        <Section background='dark' pt={20} pb={20} ptm={30} pbm={30}>
          <Container>
            <FooterRow alignItems='center'>
              <Column fluid md={6}>
                <Text small>Luxor Technologies Inc.</Text>
              </Column>
              <Column fluid md={6}>
                <Text small>Proudly Made in Toronto & Seattle</Text>
              </Column>
            </FooterRow>
          </Container>
        </Section>
      </FooterWrap>
    )
  }
}

export default Footer
