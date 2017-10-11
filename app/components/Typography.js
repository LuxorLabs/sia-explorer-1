import React from 'react'
import styled from 'styled-components'
import styledProps from 'styled-props'
import styles from 'styles'
import { Link } from 'react-router-dom'

export const Text = styled.span`
  font-size: ${styledProps(styles.fontSize, 'fontSize')}rem;
  margin-left: ${props => props.marginLeft || 0}px;
  margin-right: ${props => props.marginRight || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
  margin-top: ${props => props.marginTop || 0}px;
  color: ${styledProps(styles.color, 'color')};
  font-weight: ${styledProps(styles.fontWeight, 'fontWeight')};
  line-height: 1.4;
`

Text.Block = Text.withComponent('div')

Text.Link = Text.withComponent(({ small, nav, marginLeft, ...rest }) => (
  <Link {...rest} />
)).extend`
  text-decoration: none;
`

Text.Anchor = Text.withComponent(
  ({
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    h5,
    secondary,
    ...rest
  }) => <a {...rest} />
).extend`
  text-decoration: none;
`

Text.Pre = Text.withComponent('pre').extend`
  background: ${styles.color.altDark};
  padding: 0.4rem 0.6rem;
  margin: 0.4rem 0;
  font-size: 0.75rem;
  overflow: auto;  
  &::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }
  
  &::-webkit-scrollbar
  {
    width: 6px;
    background-color: #F5F5F5;
  }
  
  &::-webkit-scrollbar-thumb
  {
    background-color: #000000;
  }
`

Text.defaultProps = {
  fontSize: 'baseRem',
  fontWeight: 'base',
  color: 'light'
}
