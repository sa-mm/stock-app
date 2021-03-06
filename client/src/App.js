import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Grid } from "semantic-ui-react";
import TitleBar from "./components/TitleBar";
import Stock from "./components/Stock";
import Portfolio from "./components/Portfolio";
import "./App.css";

class App extends Component {
  render() {
    const {
      portfolio,
      currentStock,
      onBuyClick,
      onSellClick,
      onSymbolSubmit,
      fetchHistory
    } = this.props;

    return (
      <div className="App">
        <Segment.Group raised>
          <Segment>
            <TitleBar
              onSymbolSubmit={onSymbolSubmit}
              currentStock={currentStock}
            />
          </Segment>
          <Segment>
            <Grid divided stackable columns={2}>
              <Grid.Column width={8}>
                <Stock
                  portfolio={portfolio}
                  currentStock={currentStock}
                  onBuyClick={onBuyClick}
                  onSellClick={onSellClick}
                  fetchHistory={fetchHistory}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Portfolio
                  portfolio={portfolio}
                  onSymbolSubmit={onSymbolSubmit}
                />
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

App.propTypes = {
  portfolio: PropTypes.object.isRequired,
  currentStock: PropTypes.object.isRequired,
  onBuyClick: PropTypes.func.isRequired,
  onSellClick: PropTypes.func.isRequired,
  onSymbolSubmit: PropTypes.func.isRequired,
  fetchHistory: PropTypes.func.isRequired
};

export default App;
