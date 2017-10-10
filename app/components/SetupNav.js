import React, { Component } from 'react'
import styled from 'styled-components'
import styles from 'styles'
import { Card } from 'components/Card'
import { Text } from 'components/Typography'
import breakpoint from 'styled-components-breakpoint'
import { inject, observer } from 'mobx-react'

const NavList = styled.ul`
  color: white;
  padding: 0;
  list-style: none;
`

const NavListItem = styled.li`
  padding-top: 10px;
  a {
    color: ${props => (String(props.index) === String(props.activeIndex) ? `${styles.color.secondary}` : `${styles.color.light}`)};
  }
`

const NavCard = styled(Card)`
  ${breakpoint('md', styles.breakpoint)`
    position: fixed;
    width: 200px;
    top: 50%;
    left: 10%;
  `}
`

const Menu = [
  'Making the Switch',
  'Quickstart',
  'Compatible Miners',
  'Prebuilt Commands',
  "What's Claymore",
  'Regions',
  'Hosted Mining',
  'Questions?'
]

@inject('mainStore')
@observer
class SetupNav extends Component {
  mapNav = list =>
    list.map((l, i) => (
      <NavListItem
        key={i}
        activeIndex={this.props.mainStore.UI.Setup.activeIndex}
        index={i}
      >
        <Text.Anchor href={`#${i}`}>
          {l}
        </Text.Anchor>
      </NavListItem>
    ))
  render () {
    return (
      <NavCard alt>
        <NavList>
          {this.mapNav(Menu)}
        </NavList>
      </NavCard>
    )
  }
}

export default SetupNav
