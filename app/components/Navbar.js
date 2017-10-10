import React, { Component } from 'react'
import styled from 'styled-components'
import styledProps from 'styled-props'
import styles from 'styles'
import breakpoint from 'styled-components-breakpoint'
import { Text } from 'components/Typography'
import { SearchInput } from 'components/Form'
import Container from 'components/Container'
import { Row, Column } from 'hedron'
import Waypoint from 'react-waypoint'

const Links = [
  {
    name: 'Home',
    to: '/'
  },
  {
    name: 'Setup Guide',
    to: '/setup'
  },
  {
    name: 'Blocks',
    to: '/blocks'
  },
  {
    name: 'Miners',
    to: '/miners'
  }
]

const NavContainer = styled(Container)`
  .logo {
    display: none;
  }
  ${breakpoint('md', styles.breakpoint)`
    .logo {
      display: block;
    }
  `}
`
const NavListItem = styled.li`
  display: inline-block;
  background: ${styledProps(styles.color, 'background')};
  width: 35%;
  text-align: center;
  margin-top: 0;
  padding: ${styles.spacing.base * 1.5}px;
  ${breakpoint('md', styles.breakpoint)`
    padding-top: ${styles.spacing.base * 2.5}px;
    padding-bottom: ${styles.spacing.base * 2.5}px;
    width: auto;
    display: inline-block;
    background: transparent;
    text-align: right;
  `}
`
NavListItem.defaultProps = {
  background: 'alt'
}

const NavList = styled.ul`
  display: block;
  margin: 0;
  position: relative;
  list-style: none;
  padding-left: 0;
  overflow-x: auto;
  white-space:nowrap;
  transform: ${props => (props.active ? `translateY(0)` : `translateY(500%)`)};
  transition: all ${styles.transition.base};
  margin-bottom: 10px;
  &::-webkit-scrollbar { 
    display: none; 
  }
  ${breakpoint('md', styles.breakpoint)`
    display: flex;
    margin-bottom: 0;
    justify-content: flex-end;
    position: relative;
    transform: translateY(0);
    white-space: normal;
    overflow-x: none;
    width: 100%;
  `}
`

const NavListOuter = styled.div`
  position: fixed;
  bottom: ${styles.spacing.base * 8}px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  ${breakpoint('md', styles.breakpoint)`
    top: 0;
    left: 0;
    position: relative;
    transform: translateX(0);
  `}
`

const CloseMenu = styled.button`
  position: absolute;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${styles.radius.base}px;
  left: 50%;
  transform: translateX(-50%);
  height: 50px;
  width: 100px;
  background: ${styles.color.darkYellow};
  transition: all ${styles.transition.base};
  &:before {
    position: absolute;
    content:"";
    height: 20px;
    width: 1.5px;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
    background: ${styles.color.light};
    transform: ${props => (props.active ? `rotate(45deg) translateX(0)` : `rotate(90deg) translateX(-4px)`)};
    border-radius: ${styles.radius.base}px;
    transition: all ${styles.transition.base};
  }
  &:after {
    position: absolute;
    content:"";
    height: 20px;
    width: 1.5px;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
    background: ${styles.color.light};
    transform: ${props => (props.active ? `rotate(135deg) translateX(0)` : `rotate(90deg) translateX(4px)`)};
    border-radius: ${styles.radius.base}px;
    transition: all ${styles.transition.base};
  }
  &:focus {
    outline: none;
  }
  ${breakpoint('md', styles.breakpoint)`
    display:none
  `}
`

const SearchOuter = styled.div`
  position: relative;
  bottom: 0;
  background: white;
  transform: ${props => (props.active ? `translateY(0)` : `translateY(500%)`)};
  height: 100%;
  transition: all ${styles.transition.base};
`

class Navbar extends Component {
  state = {
    active: false
  }
  mapLinks = links =>
    links.map(({ name, to }, i) => (
      <NavListItem key={i}>
        <Text.Link nav to={to}>{name}</Text.Link>
      </NavListItem>
    ))
  render () {
    return (
      <NavContainer>
        <Row alignItems='center'>
          <Column className='logo' fluid md={3}>
            <Text.Link nav to='/' marginLeft={15}>Luxor Mining</Text.Link>
          </Column>
          <Column fluid md={9}>
            <NavListOuter>
              {/* <SearchOuter active={this.state.active}>
                <SearchInput placeholder='Search Miner Address' type='text' />
              </SearchOuter> */}
              <NavList active={this.state.active}>
                {this.mapLinks(Links)}
              </NavList>
              <CloseMenu
                active={this.state.active}
                onClick={() => this.setState({ active: !this.state.active })}
              />
            </NavListOuter>
          </Column>
        </Row>
      </NavContainer>
    )
  }
}

export default Navbar
