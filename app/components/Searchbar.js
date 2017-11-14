import React, { Component } from 'react'
import styled from 'styled-components'
import styles from 'styles'
import { withRouter } from 'react-router-dom'

const InputBar = styled.input`
  background: ${styles.color.alt};
  border: none;
  border-left: 2px solid ${styles.color.altL2};
  height: 30px;
  color: ${styles.color.light};
  padding-left: 20px;
  width: 100%;
  font-size: ${styles.fontSize.small}rem;
  transition: ${styles.transition.base};
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;

  &:hover, &:active {
    background: ${styles.color.altD1};
    transition: ${styles.transition.base};
    border: 1px solid ${props => (props.validated ? styles.color.green : styles.color.secondary)};
  }
`

class SearchBar extends Component {
  state = {
    address: ''
  }
  _handleKeyPress = e => {
    const address = e.target.value
    if (e.key === 'Enter' && this.isValidAddress(address)) {
      this.props.history.push(`/miners/${address}`)
    }
  }
  isValidAddress = address => address.length >= 74
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render () {
    const { address } = this.state
    return (
      <div>
        <InputBar
          type='text'
          placeholder='Enter your miner address and press enter!'
          onKeyPress={this._handleKeyPress}
          validated={this.isValidAddress(address)}
          name='address'
          value={address}
          onChange={this.handleInput}
        />
      </div>
    )
  }
}

export default withRouter(SearchBar)
