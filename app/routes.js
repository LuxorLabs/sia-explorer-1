import Route from "components/ScrollToTopRoute"
import Landing from "containers/Landing"
import Miners from "containers/Miners"
import Blocks from "containers/Blocks"
import Setup from "containers/Setup"
import Address from "containers/Address"

export default (
  <div className="app">
    <Route exact path="/" component={Landing} />
    <Route exact path="/miners" component={Miners} />
    <Route exact path="/blocks" component={Blocks} />
    <Route exact path="/setup" component={Setup} />
    <Route exact path="/miners/:address" component={Address} />
  </div>
)
