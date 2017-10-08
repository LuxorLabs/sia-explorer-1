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
  a { 
    color: ${props => props.theme.yellow_dark}
  }
`
class Setup extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <SetupWrap>
          <div className='container grid-xl'>
            <div className='columns'>
              <div className='col-3 col-sm-12'>
                <SetupNav className='nav'>
                  <li className='nav-item active'>
                    <a href='#'>Making The Switch</a>
                  </li>
                  <li className='nav-item '>
                    <a href='#'>Quickstart</a>
                  </li>
                  <li className='nav-item'>
                    <a href='#'>Compatible Miners</a>
                  </li>
                  <li className='nav-item'>
                    <a href='#'>Pre-Built Commands</a>
                  </li>
                  <li className='nav-item'>
                    <a href='#'>Hosted Mining</a>
                  </li>
                  <li className='nav-item'>
                    <a href='#'>Questions?</a>
                  </li>
                </SetupNav>
              </div>
              <div className='col-9 col-sm-12'>
                <Section>
                  <h3>Making The Switch</h3>
                  <p>If you’re mining Siacoin currently, follow these steps to make the switch:</p>
                  <ol>
                    <li>Finish up mining with your current pool. You most likely need to get to 500SC before your current pool will pay you out. You don’t want to leave those coins behind!</li>
                    <li>Update your configuration: In your configuration, change the pool address to one of our supported pools.  Our default pool is us-east.luxor.tech:3333.</li>
                    <li>Check your stats on our <a href='https://mining.luxor.tech'>stats page</a>.  It will take a minute or two for your stats to start showing up. </li>
                    <li>Go grab a drink.  You deserve it! (if you’re ever in Seattle, reach out to <a href='https://twitter.com/NickHansen600'>Nick</a>. He’d love to grab a drink with you!)</li>
                  </ol>
                </Section>
                <Section>
                  <h3>Quickstart</h3>
                  <p>
                    If you have experience mining - here are the basic commands we recommend for different miners. Just fill in a payout address and a worker name, and it's off to the races!
  The following is a quick start guide of mining SiaCoin on Windows 7 or greater x64.

  To mine SiaCoin you need a SiaCoin address, a GPU and mining software.

  To get an address you can either:
</p>
                  <ul>
                    <li> Get the <a href='http://sia.tech/apps/'>Sia</a> client and use it to generate an address. </li>
                    <li> Use an exchange address (e.g. <a href='https://bittrex.com/'>Bittrex</a>, <a href='https://hitbtc.com/'>HitBTC</a>, <a href='https://poloniex.com/'>Poloniex</a>, or <a href='https://shapeshift.io/'>ShapeShift</a>). </li>
                  </ul>
                </Section>
                <Section>
                  <h3>Compatible Miners</h3>
                  <p> A compatible Miner can be downloaded from the links below </p>
                  <span className='label red'>AMD</span>
                  <span className='label green'>Nvidia</span>
                  <h5>Marlin: {' '}
                    <a href='https://siamine.com/marlin'>Windows/Linux</a>
                  </h5>
                  <span className='label green'>Nvidia</span>
                  <h5>CCMiner: {' '}
                    <a href='https://github.com/KlausT/ccminer/releases/tag/8.00'>
                      Windows
                    </a>{' & '}
                    <a href='https://siamining.com/files/ccminer/linux-amd64/ccminer-7.04-linux-amd64.tar.gz'>
                      Linux
                    </a>
                  </h5>
                  <span className='label red'>AMD</span>
                  <h5>SGMiner: {' '}
                    <a href='https://siamining.com/files/sgminer-xurious-wolf-win32.zip'>
                      Windows
                    </a>
                  </h5>
                  <span className='label red'>AMD</span>
                  <h5>GoMiner: {' '}
                    <a href='https://github.com/robvanmieghem/gominer/releases'>
                      Binaries
                    </a>
                  </h5>
                </Section>
                <Section>
                  <h3>Pre-Built Commands</h3>
                  <p> Just fill these commands in with your mining address and a miner name and you’re set.
                    <br />
                    <b>Note</b>: make sure to pick the region that best suits you.  Latency is important! </p>

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
                      EthDcrMiner64.exe -epool us1.ethpool.org:3333 -ewal YourEthAddress.YourWorkerName -epsw x -dpool stratum+tcp://us-east.luxor.tech:7777 -dwal YourSiacoinAddress.YourWorkerName -dcoin sia
                    </code>
                  </p>
                </Section>
                <Section>
                  <h3>What's Claymore</h3>
                  <p>Claymore is a way to dual mine Ethereum with other coins.  It is generally the most profitable way to mine base purely on ROI, but to accumulate the most SC, many of our miners choose to mine SC exclusively.</p>
                </Section>
                <Section>
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
                  <h3>Hosted Mining</h3>
                  <h5><a href='https://www.miningrigrentals.com/register?ref=43501'>Mining Rig Rentals</a></h5>
                  <p> Mining Rig Rentals has partnered with Luxor and offers hosted Siacoin mining. They offer competitive mining contracts and work with all of Luxor’s pools.  We used them during testing, and had great success!</p>

                  <h5><a href='https://www.nicehash.com?refby=512247'>NiceHash</a></h5>
                  <p> Have you ever owned 8Th/s of mining power?  It’s pretty awesome! We used NiceHash to test Luxor’s ability to scale, and it was incredible.</p>
                </Section>
                <Section>
                  <h3>Questions?</h3>
                  <p> We're here to help. Send us an <a href='mailto:hello@luxor.tech'>email</a> or tweet us <a href='https://twitter.com/LuxorTechTeam'>@LuxorTechTeam</a> </p>
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
