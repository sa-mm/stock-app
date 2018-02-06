import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Table,
  Form,
  Grid,
  Dimmer,
  Header,
  Segment,
  Responsive,
  Container,
  Icon
} from "semantic-ui-react";
import { PriceTooHighWarning, SellingTooManySharesWarning } from "./Warnings";
import StockHistoryContainer from "./StockHistoryContainer";

export class Stock extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      quantity: "",
      showWarning: false,
      priceTooHigh: false,
      sellingTooMany: false,
      warningColor: "",
      dimmerActive: false
    };

    // So the component is dimmed, initially
    this.initialState = {
      ...this.defaultState,
      dimmerActive: true
    };
    this.state = { ...this.initialState };
  }

  componentWillReceiveProps(nextProps) {
    const nextSymbol = nextProps.currentStock.yahooStock.symbol;
    const symbol = this.props.currentStock.yahooStock.symbol;

    // If a new symbol is passed to the compoennt,
    // then the state should be reset:
    // no warnings, no assumptions about quantity
    if (nextSymbol !== symbol) {
      this.resetState();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextError = nextProps.currentStock.yahooError;
    if (nextError) return false;
    return true;
  }

  resetState = () => {
    this.setState(this.defaultState);
  };

  handleChange = event => {
    const value = event.target.value;

    this.setState({
      quantity: value > 0 ? +value : "",
      priceTooHigh: false,
      sellingTooMany: false
    });

    event.preventDefault();
  };

  handleBuySubmit = event => {
    const { symbol, shortName, ask } = this.props.currentStock.yahooStock;
    const { balance } = this.props.portfolio;

    const isTooHigh = ask * this.state.quantity > balance;

    if (isTooHigh) {
      this.setState({
        warningColor: "red",
        priceTooHigh: true,
        sellingTooMany: false
      });
    } else {
      // do something with redux
      const { quantity } = this.state;

      this.props.onBuyClick({ symbol, price: ask, quantity, name: shortName });

      // reset internal state of component
      this.resetState();
    }
  };

  handleSellSubmit = event => {
    const { quantity } = this.state;
    const { currentStock, portfolio } = this.props;
    const { symbol, bid } = currentStock.yahooStock;
    const { stocks } = portfolio;

    const idx = stocks.findIndex(stock => stock.symbol === symbol);
    const theStock = stocks[idx];

    const isSellingTooMany = theStock.quantity < quantity;

    if (isSellingTooMany) {
      this.setState({
        sellingTooMany: true,
        priceTooHigh: false,
        warningColor: "red"
      });
    } else {
      // do something with redux
      this.props.onSellClick({ symbol, price: bid, quantity });

      // reset internal state of component
      this.resetState();
    }
  };

  render() {
    const {
      quantity,
      dimmerActive,
      warningColor,
      priceTooHigh,
      sellingTooMany
    } = this.state;
    const { fetchHistory, currentStock, portfolio: { stocks } } = this.props;
    const { displayChart, history, yahooStock } = currentStock;
    const { symbol, shortName, bid, ask } = yahooStock;
    const ownsStock = stocks ? stocks.some(e => e.symbol === symbol) : false;

    return (
      <Grid>
        <Dimmer.Dimmable as={Grid} dimmed={dimmerActive}>
          <Dimmer active={dimmerActive} inverted>
            <Header color="black">Lookup a stock!</Header>
          </Dimmer>
          <Grid.Row columns={2}>
            <Grid.Column floated="left" width={6}>
              {shortName} ({symbol})
            </Grid.Column>
            <Grid.Column floated="right" width={3}>
              <StockHistoryContainer
                symbol={symbol}
                fetchHistory={fetchHistory}
                history={history}
                displayChart={displayChart}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign="center">Bid</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Ask</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell textAlign="center">{bid}</Table.Cell>
                    <Table.Cell textAlign="center">{ask}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Form>
                <Form.Group>
                  <Form.Input
                    placeholder="Quantity"
                    value={quantity}
                    onChange={this.handleChange}
                  />
                  <Form.Button
                    className="buy-btn"
                    content="Buy"
                    onClick={this.handleBuySubmit}
                  />
                  <Form.Button
                    className="sell-btn"
                    content="Sell"
                    onClick={this.handleSellSubmit}
                    disabled={!ownsStock}
                  />
                </Form.Group>
                {priceTooHigh ? (
                  <PriceTooHighWarning color={warningColor} />
                ) : (
                  ""
                )}
                {sellingTooMany ? (
                  <SellingTooManySharesWarning color={warningColor} />
                ) : (
                  ""
                )}
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Dimmer.Dimmable>
      </Grid>
    );
  }
}

Stock.propTypes = {
  fetchHistory: PropTypes.func.isRequired,
  onSellClick: PropTypes.func.isRequired,
  onBuyClick: PropTypes.func.isRequired,
  currentStock: PropTypes.object.isRequired,
  portfolio: PropTypes.object.isRequired
};

class StockInfoToggle extends React.Component {
  state = {
    displayStockInfo: false
  };

  componentWillReceiveProps(nextProps) {
    const { symbol } = this.props.currentStock.yahooStock;

    if (symbol !== nextProps.currentStock.yahooStock.symbol) {
      this.setState({
        displayStockInfo: true
      });
    }
  }

  handleClick = () => {
    this.setState({
      displayStockInfo: !this.state.displayStockInfo
    });
  };

  render() {
    const { displayStockInfo } = this.state;

    return (
      <div>
        {displayStockInfo ? (
          <div>
            <div style={{ marginBottom: "20px" }} onClick={this.handleClick}>
              <Icon name="triangle down" />
              Hide selected stock information.
            </div>
          </div>
        ) : (
          <div onClick={this.handleClick}>
            <Icon name="triangle right" /> Display selected stock information.
          </div>
        )}
        <div style={{ display: displayStockInfo ? "inherit" : "none" }}>
          <Stock {...this.props} />
        </div>
      </div>
    );
  }
}

const StockContainer = props => {
  return (
    <div>
      <Responsive as={Container} maxWidth={767}>
        <StockInfoToggle {...props} />
      </Responsive>
      <Responsive as={Container} minWidth={768}>
        <Stock {...props} />
      </Responsive>
    </div>
  );
};
export default StockContainer;
