import React, { Component } from 'react'
import Navigation from 'components/Navigation'
import styled from 'styled-components'

const SetupWrap = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.dark_2};
`

const SetupNav = styled.div`
  position: fixed;
  top: 20%;
`

const Section = styled.div`
  margin-top: 50px;
  pre {
    word-wrap: break-word;
    white-space: normal;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  h5 {
    margin-bottom: 0.5rem;
  }
  h3 {
    margin-bottom: 1.5rem;
  }
  
`
class Setup extends Component {
  render () {
    return (
      <div>
        <Navigation />
        <SetupWrap>
          <div className='container grid-xl'>
            <div className='columns'>
              <div className='col-3'>
                <SetupNav className='nav'>
                  <li className='nav-item'>
                    <a href='#'>Elements</a>
                  </li>
                  <li className='nav-item active'>
                    <a href='#'>Layout</a>
                    <ul className='nav'>
                      <li className='nav-item'>
                        <a href='#'>Flexbox grid</a>
                      </li>
                      <li className='nav-item'>
                        <a href='#'>Responsive</a>
                      </li>
                      <li className='nav-item'>
                        <a href='#'>Navbar</a>
                      </li>
                      <li className='nav-item'>
                        <a href='#'>Empty states</a>
                      </li>
                    </ul>
                  </li>
                  <li className='nav-item'>
                    <a href='#'>Components</a>
                  </li>
                  <li className='nav-item'>
                    <a href='#'>Utilities</a>
                  </li>
                </SetupNav>
              </div>
              <div className='col-9'>
                <Section>
                  <h3>Setup</h3>
                  <p>
                    It’s simple. Grab your miner and run one of the commands:
                  </p>
                  <pre>
                    ./miner -H us-east.luxor.tech:3333 -u YourSiacoinAddress.YourWorkerName -I 28
                  </pre>
                </Section>
                <Section>
                  <h3>Protocols</h3>
                  <h5>Stratum</h5>
                  <p>
                    We fully support Claymore mining. Just use port 7777 instead of 3333
                  </p>
                  <pre>
                    ./miner -H us-east.luxor.tech:3333 -u YourSiacoinAddress.YourWorkerName -I 28
                  </pre>
                  <h5>Stratum Claymore</h5>
                  <p>
                    We fully support Claymore mining. Just use port 7777 instead of 3333
                  </p>
                  <pre>
                    ./miner -H us-east.luxor.tech:3333 -u YourSiacoinAddress.YourWorkerName -I 28
                  </pre>
                </Section>
              </div>
            </div>
          </div>
        </SetupWrap>
      </div>
    )
  }
}

export default Setup
