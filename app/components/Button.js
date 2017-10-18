import React from 'react'
import styled from 'styled-components'
import styles from 'styles'
import styledProps from 'styled-props'
import { Link } from 'react-router-dom'

export const Button = styled.button`
  display: inline-block;
  padding-left: ${styles.button.spacing}px;
  padding-right: ${styles.button.spacing}px;
  height: 40px;
  border: none;
  margin-left: ${props => props.marginLeft || 0}px;
  margin-right: ${props => props.marginRight || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
  margin-top: ${props => props.marginTop || 0}px;
  border-radius: ${styles.radius.base}px;
  color: ${styledProps(styles.color, 'color')};
  background: ${styledProps(styles.color, 'background')};
  cursor: pointer;
  &:focus {
    outline: none;
  }
`

Button.a = Button.withComponent(
  ({
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    background,
    ...rest
  }) => <a {...rest} />
).extend`
  text-decoration: none;
  line-height: 40px;
`

Button.Link = Button.withComponent(
  ({ small, nav, marginLeft, marginTop, background, ...rest }) => (
    <Link {...rest} />
  )
).extend`
  text-decoration: none;
  line-height: 40px;
`

Button.defaultProps = {
  color: 'light',
  background: 'darkYellow'
}
