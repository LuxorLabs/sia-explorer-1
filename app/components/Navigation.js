import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Nav = styled.div`
  padding: 50px 0;
  background: ${props => props.theme.dark_3};
`

class Navigation extends Component {
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
