import React from 'react'
import styled from 'styled-components'
import styles from 'styles'

const LoadingSpinner = styled.div`
  color: transparent !important;
  min-height: 2rem;
  pointer-events: none;
  position: relative;
  &:after {
    content: "";
    animation: loading 500ms infinite linear;
    border: .1rem solid ${styles.color.secondary};
    border-radius: 50%;
    border-right-color: transparent;
    border-top-color: transparent;
    display: block;
    height: .8rem;
    left: 50%;
    margin-left: -.4rem;
    margin-top: -.4rem;
    position: absolute;
    top: 50%;
    width: .8rem;
    z-index: 1;
  }
`
const Loading = () => {
  return (
    <LoadingSpinner
      style={{
        minHeight: '80vh'
      }}
    />
  )
}
export default Loading
