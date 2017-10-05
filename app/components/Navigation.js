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
  handleChange = e => {
    this.props.mainStore.address = e.target.value
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
                style={{ color: '#FFFFFF' }}
              >
                Twitter
              </a>
              <a
                target='_blank'
                href='https://github.com/LuxorLabs'
                className='btn btn-link'
                style={{ color: '#FFFFFF' }}
              >
                GitHub
              </a>
              <span
                className='label label-rounded label-primary'
                style={{ color: '#FFFFFF', marginLeft: '10px' }}
              >
                Blocks Found:
                {' '}
                {this.props.mainStore.stats.block_stats
                  ? this.props.mainStore.stats.block_stats.length
                  : 0}
              </span>
            </section>
          </header>
        </div>
      </Nav>
    )
  }
}

export default Navigation
