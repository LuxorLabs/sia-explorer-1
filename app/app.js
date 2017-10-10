import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Route from 'components/ScrollToTopRoute'
import { injectGlobal } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { BreakpointProvider } from 'hedron'
import { inject, observer, Provider } from 'mobx-react'
import { MainStore } from 'stores/MainStore'
import styles from 'styles'
import styledNormalize from 'styled-normalize'
import interReg from 'assets/Inter-UI-Regular.woff'
import interReg2 from 'assets/Inter-UI-Regular.woff2'
import interMed from 'assets/Inter-UI-Medium.woff'
import interMed2 from 'assets/Inter-UI-Medium.woff2'

import Landing from 'containers/Landing'
import Miners from 'containers/Miners'
import Blocks from 'containers/Blocks'
import Setup from 'containers/Setup'
import Address from 'containers/Address'

injectGlobal`
  ${styledNormalize}
  @font-face {
    font-family: 'Interface';
    src: url('${interReg}') format('woff'),
    url('${interReg2}') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Interface';
    src: url('${interMed}') format('woff'),
    url('${interMed2}') format('woff2');
    font-weight: bold;
    font-style: normal;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  html { 
    height: 100%;
    font-size: ${styles.fontSize.basePxMobile}px;
    ${breakpoint('md', styles.breakpoint)`
      font-size: ${styles.fontSize.basePxTablet}px;    
    `}
    ${breakpoint('lg', styles.breakpoint)`
      font-size: ${styles.fontSize.basePx}px;    
    `}
  }
  body {
    position: relative;
    background: ${styles.color.primary};
    margin: 0px;
    min-height: 100%;
    font-family: 'Interface', -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto;
    line-height: 1.3;
    color: ${styles.color.light};
  }
  ul,ol {
    margin: 0.8rem 0 0.8rem 0.8rem;
    padding: 0;
    
    li {
      margin-top: 0.6rem;
    }
  }
  ol {
    list-style: decimal inside;
    ol {
      list-style-type: lower-alpha;
    }
  }
  ul {
    list-style: disc inside;
    ul {
      list-style-type: circle;
    }
  }
  
`
@inject('mainStore')
@observer
class App extends React.Component {
  componentDidMount () {
    this.props.mainStore.intervalFetch()
  }
  componentWillUnmount () {
    clearInterval(this.props.mainStore.fetchProcess)
  }
  render () {
    return (
      <Router>
        <div className='app'>
          <Route exact path='/' component={Landing} />
          <Route exact path='/miners' component={Miners} />
          <Route exact path='/blocks' component={Blocks} />
          <Route exact path='/setup' component={Setup} />
          <Route exact path='/miners/:address' component={Address} />
        </div>
      </Router>
    )
  }
}

class Wrapper extends React.Component {
  mainStore = new MainStore()

  render () {
    return (
      <Provider mainStore={this.mainStore}>
        <BreakpointProvider breakpoints={styles.breakpoint}>
          <App />
        </BreakpointProvider>
      </Provider>
    )
  }
}

ReactDOM.render(<Wrapper />, document.getElementById('root'))
