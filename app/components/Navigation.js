import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { Link, Redirect } from 'react-router-dom'
import { ButtonSmall } from 'components/Buttons'

const Nav = styled.div`
  padding: 50px 0;
  background: ${props => props.theme.dark_3};
`

@inject('mainStore')
@observer
class Navigation extends Component {
  state = {
    redirect: false
  }
  handleChange = e => {
    this.props.mainStore.address = e.target.value
  }
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.setState({
        redirect: true
      })
    }
  }
  render () {
    return (
      <Nav>
        <div className='container grid-xl'>
          <header className='navbar'>
            <section className='navbar-section'>
              <Link className='text-light' to='/'>
                Luxor Mining Private Beta
              </Link>
            </section>
            <section className='navbar-center'>
              <input
                className='form-input'
                type='text'
                placeholder='Miner Address'
                value={this.props.mainStore.address}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
              {this.state.redirect &&
                <Redirect to={`/miner/${this.props.mainStore.address}`} />}
              <ButtonSmall
                style={{ marginLeft: '0.8rem' }}
                to={`/miner/${this.props.mainStore.address}`}
                text='Find Address'
              />
            </section>
            <section className='navbar-section'>
              <a
                target='_blank'
                href='https://twitter.com/LuxorTechTeam'
                className='btn btn-link'
              >
                Twitter
              </a>
              <a
                target='_blank'
                href='https://github.com/LuxorLabs'
                className='btn btn-link'
              >
                GitHub
              </a>
            </section>
          </header>
        </div>
      </Nav>
    )
  }
}

export default Navigation
