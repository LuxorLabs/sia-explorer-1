import React, { Component } from 'react'
import styled from 'styled-components'
import styles from 'styles'
import { withRouter } from 'react-router-dom'

const InputBar = styled.input`
  border-radius: 10px;
  background: ${styles.color.light};
  border: none;
  height: 40px;
  width: 100%;
  color: ${styles.color.dark};
  padding-left: 20px;
  font-size: ${styles.fontSize.small}rem;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;

  &:hover,
  &:active {
    background: ${styles.color.secondaryL1};
    color: ${styles.color.dark};
  }
`
const Wrap = styled.div`
  width: 100%;
  padding-top: ${props => (props.paddingTop ? props.paddingTop : `0px`)};
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
      <Wrap {...this.props}>
        <InputBar
          type='text'
          placeholder='Block, Hash, Transaction ID, Address, etc.'
          onKeyPress={this._handleKeyPress}
          validated={this.isValidAddress(address)}
          name='address'
          value={address}
          onChange={this.handleInput}
        />
      </Wrap>
    )
  }
}

export default withRouter(SearchBar)
