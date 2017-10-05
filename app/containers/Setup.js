import React, { Component } from 'react'
import Navigation from 'components/Navigation'
import styled from 'styled-components'

const SetupWrap = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.dark_3};
  padding-bottom: 400px;
`

const SetupNav = styled.div`
  position: fixed;
  top: 20%;
  li {
    margin-top: 10px;
  }
`

const Section = styled.div`
  margin-top: 50px;
  max-width: 700px;
  pre {
    word-wrap: break-word;
    white-space: normal;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
  h5 {
    margin-bottom: 0.5rem;
  }
  h3 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.yellow}
  }
  code {
    white-space: nowrap;
  }
  .label {
    margin-right: 0.3rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }
  .label.red {
    background: red !important;
  }
  .label.green {
    background: #5BC7A2 !important;
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
              <div className='col-3 col-sm-12'>
                <SetupNav className='nav'>
                  <li className='nav-item active'>
                    <a href='#'>Quickstart</a>
                  </li>
                  <li className='nav-item '>
                    <a href='#'>Protocols</a>
                    <ul className='nav'>
                      <li className='nav-item'>
                        <a href='#'>Stratum</a>
                      </li>
                      <li className='nav-item'>
                        <a href='#'>Claymore</a>
                      </li>
                      <li className='nav-item'>
                        <a href='#'>HTTP</a>
                      </li>
                    </ul>
                  </li>
                  <li className='nav-item'>
                    <a href='#'>Compatible Miners</a>
                  </li>
                  <li className='nav-item'>
                    <a href='#'>Support</a>
                  </li>
                </SetupNav>
              </div>
              <div className='col-9 col-sm-12'>
                <Section>
                  <h3>Quickstart</h3>
                  <p>
                    If you have experience mining - here are the basic commands we recommend for different miners. Just fill in a payout address and a worker name, and it's off to the races!
                  </p>
                  <p>
                    Marlin:<br />
                    <code>
                      marlin -H us-east.luxor.tech:3333 -u YourSiacoinAddress.YourWorkerName -I 28
                    </code>
                  </p>

                  <p>
                    CCMiner:<br />
                    <code>
                      ccminer -a sia -e — url=stratum+tcp://us-east.luxor.tech:3333 -u YourSiacoinAddress.YourWorkerName -i 28
                    </code>
                  </p>

                  <p>
                    SGMiner:<br /><code>
                      sgminer — algorithm=sia — url=stratum+tcp://us-east.luxor.tech:3333 — userpass=YourSiacoinAddress.YourWorkerName -I 28
                    </code>
                  </p>

                  <p>
                    GoMiner<br /><code>
                      gominer -url stratum+tcp://us-east.luxor.tech:3333 -user YourSiacoinAddress.YourWorkerName
                    </code>
                  </p>

                  <p>
                    Claymore Dual Mine:<br /><code>
                      claymore -H us-east.luxor.tech:3333 -u YourSiacoinAddress.YourWorkerName -I 28
                    </code>
                  </p>
                  <h3>Regions</h3>
                  <p>Our regions are listed below:</p>
                  <table className='table table-striped'>
                    <thead>
                      <th>Location</th>
                      <th>Stratum</th>
                      <th>Claymore (Dual Mining)</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>US East</td>
                        <td>us-east.luxor.tech:3333</td>
                        <td>us-east.luxor.tech:7777</td>
                      </tr>
                      <tr>
                        <td>US West</td>
                        <td>us-west.luxor.tech:3333</td>
                        <td>us-west.luxor.tech:7777</td>
                      </tr>
                      <tr>
                        <td>Asia</td>
                        <td>asia.luxor.tech:3333</td>
                        <td>asia.luxor.tech:7777</td>
                      </tr>
                      <tr>
                        <td>Europe</td>
                        <td>eu.luxor.tech:3333</td>
                        <td>eu.luxor.tech:7777</td>
                      </tr>
                    </tbody>
                  </table>
                </Section>
                <Section>
                  <h3>Protocols</h3>
                  <h5>Stratum</h5>
                  <p>
                    We fully support Stratum mining.{' '}
                  </p>
                  <h5>Stratum Claymore</h5>
                  <p>
                    We fully support Claymore mining. Just use port 7777 instead of 3333
                  </p>
                  <h5>HTTP</h5>
                  <p>
                    We currently do not support HTTP getwork.
                  </p>
                </Section>
                <Section>
                  <h3>Compatible Miners</h3>
                  <span className='label red'>AMD</span>
                  <span className='label green'>Nvidia</span>
                  <h5>Marlin</h5>
                  <p>
                    <a href='https://siamine.com/marlin'>Windows/Linux</a>
                  </p>
                  <span className='label green'>Nvidia</span>
                  <h5>CCMiner</h5>
                  <p>
                    <a href='https://github.com/KlausT/ccminer/releases/tag/8.00'>
                      Windows
                    </a>{' '}
                    <a href='https://siamining.com/files/ccminer/linux-amd64/ccminer-7.04-linux-amd64.tar.gz'>
                      Linux
                    </a>
                  </p>
                  <span className='label red'>AMD</span>
                  <h5>SGMiner</h5>
                  <p>
                    <a href='https://siamining.com/files/sgminer-xurious-wolf-win32.zip'>
                      Windows
                    </a>
                  </p>
                  <span className='label red'>AMD</span>
                  <h5>GoMiner</h5>
                  <p>
                    <a href='https://github.com/robvanmieghem/gominer/releases'>
                      Binary
                    </a>
                  </p>
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
