import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Header } from "semantic-ui-react";
import SymbolSearchForm from "./SymbolSearchForm";

class TitleBar extends Component {
  render() {
    const { onSymbolSubmit, currentStock } = this.props;
    return (
      <div>
        <Grid verticalAlign="top" columns="equal" doubling>
          <Grid.Column floated="left">
            <Header size="large" id="title">
              Simple Stock Exchange
            </Header>
          </Grid.Column>
          <Grid.Column floated="right">
            <SymbolSearchForm
              onSymbolSubmit={onSymbolSubmit}
              currentStock={currentStock}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

TitleBar.propTypes = {
  onSymbolSubmit: PropTypes.func.isRequired,
  currentStock: PropTypes.object.isRequired
};

export default TitleBar;
