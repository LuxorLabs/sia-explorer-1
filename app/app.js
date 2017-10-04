import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from 'containers/Landing'
import MinerAddress from 'containers/MinerAddress'

import { Provider } from 'mobx-react'
import { MainStore } from 'stores/MainStore'
import styled, { ThemeProvider } from 'styled-components'

const theme = {
  yellow: '#fff1b9',
  dark_1: '#5e5e5f',
  dark_2: '#3f4040',
  dark_3: '#272625'
}

const MainContainer = styled.div`
  background: ${props => props.theme.yellow};
  min-height: 100vh;
`

class App extends React.Component {
  mainStore = new MainStore()

  render () {
    return (
      <Provider mainStore={this.mainStore}>
        <ThemeProvider theme={theme}>
          <Router>
            <MainContainer className='app'>
              <Route exact path='/' component={Landing} />
              <Route exact path='/miner/:address' component={MinerAddress} />
            </MainContainer>
          </Router>
        </ThemeProvider>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
