import React, { Component } from 'react'
import styled from 'styled-components'

class Navigation extends Component {
  render () {
    return (
      <Nav className='container grid-xl '>
        <header className='navbar'>
          <section className='navbar-section'>
            <strong>Luxor Mining Private Beta</strong>
            {/* <div className='form-group'>
              <input
                className='form-input'
                type='text'
                placeholder='Search...'
              />
            </div> */}
          </section>
          {/* <section className='navbar-center'>Luxor Mining</section> */}
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
      </Nav>
    )
  }
}

const Nav = styled.div`
padding: 50px 0;
`

export default Navigation
