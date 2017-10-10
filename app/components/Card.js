import styled from 'styled-components'
import styles from 'styles'
import styledProps from 'styled-props'

export const Card = styled.div`
  background: ${styledProps(styles.color, 'background')};
  box-shadow: 0 2px 45px 0 rgba(0,0,0,0.21);
  color: ${styledProps(styles.color, 'color')};
  padding: 20px;
  height: ${props => (props.height ? props.height : 'auto')};
  height: ${props => (props.width ? props.width : 'auto')};
`

Card.defaultProps = {
  color: 'primary',
  background: 'light'
}
