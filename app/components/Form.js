import styled from 'styled-components'
import styles from 'styles'
import breakpoint from 'styled-components-breakpoint'

export const SearchInput = styled.input`
  width: 100%;
  color: ${styles.spacing.primary};
  padding: ${styles.spacing.form}px;
  ${breakpoint('md', styles.breakpoint)`
    display: none;
  `}
`
