import React, { Component } from 'react'
import styled from 'styled-components'
import { Section } from 'components/Section'
import { Text } from 'components/Typography'
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor'
import Waypoint from 'react-waypoint'
import { inject, observer } from 'mobx-react'

configureAnchors({ offset: -450, scrollDuration: 300 })

const CardWrap = styled.div`
  font-size: 1rem;
`

@inject('mainStore')
@observer
class SetupCard extends Component {
  setActiveNav = () => {
    this.props.mainStore.UI.Setup.activeIndex = String(this.props.anchor)
  }
  render () {
    const anchor = String(this.props.anchor)
    return (
      <ScrollableAnchor id={anchor || 'disabled'}>
        <CardWrap>
          <Section.readableCard alt>
            <Text.Block marginBottom={20} secondary h4>
              {this.props.title}
            </Text.Block>
            {this.props.children}
          </Section.readableCard>
          <Waypoint onEnter={this.setActiveNav} topOffset='10%' />
        </CardWrap>
      </ScrollableAnchor>
    )
  }
}

export default SetupCard
