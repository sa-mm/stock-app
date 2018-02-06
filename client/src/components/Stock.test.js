import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import { Stock } from "./Stock";
import { SellingTooManySharesWarning, PriceTooHighWarning } from "./Warnings";

const mockProps = {
  currentStock: {
    isFetching: false,
    yahooStock: {
      symbol: "FREDDIE",
      shortName: "Not Real",
      bid: 10,
      ask: 10
    },
    yahooError: "",
    yahooResult: [],
    history: {},
    displayChart: false,
    error: ""
  },
  portfolio: {
    stocks: [],
    balance: 100.0
  },
  onBuyClick: () => "on buy click",
  onSellClick: () => "on sell click",
  fetchHistory: () => "fetch history"
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Stock {...mockProps} />, div);
});

it("I can get the internal state", () => {
  const wrapper = shallow(<Stock {...mockProps} />);
  expect(wrapper.state().dimmerActive).toEqual(true);
});

it("should deactivate dimmer when new stock is passed to it", () => {
  const nextProps = {
    ...mockProps,
    currentStock: {
      ...mockProps.currentStock,
      yahooStock: {
        ...mockProps.currentStock.yahooStock,
        symbol: "AAPL"
      }
    }
  };
  const wrapper = shallow(<Stock {...mockProps} />);
  wrapper.setProps(nextProps);

  expect(wrapper.state().dimmerActive).toEqual(false);
});

it("keeps dimmer active if the stock symbol is unchanged", () => {
  const nextProps = {
    ...mockProps,
    currentStock: {
      ...mockProps.currentStock,
      yahooStock: {
        ...mockProps.currentStock.yahooStock,
        symbol: "FREDDIE"
      }
    }
  };
  const wrapper = shallow(<Stock {...mockProps} />);
  wrapper.setProps(nextProps);

  expect(wrapper.state().dimmerActive).toEqual(true);
});

it("displays a warning message if the price to be paid is greater than the balance", () => {
  const wrapper = mount(<Stock {...mockProps} />);

  wrapper.find("input").simulate("change", { target: { value: "100" } });
  expect(wrapper.state().quantity).toEqual(100);

  wrapper
    .find("button")
    .at(1)
    .simulate("click");
  expect(wrapper.state().priceTooHigh).toEqual(true);
  expect(wrapper.containsMatchingElement(<PriceTooHighWarning />)).toEqual(
    true
  );

  expect(wrapper.state().sellingTooMany).toEqual(false);
  expect(
    wrapper.containsMatchingElement(<SellingTooManySharesWarning />)
  ).toEqual(false);
});

it("displays a warning message if user tries to sell more stocks than exist in portfolio", () => {
  const mockWithStocks = {
    ...mockProps,
    portfolio: {
      stocks: [
        {
          symbol: "FREDDIE",
          name: "Not Real",
          pricePaid: 10,
          quantity: 10
        }
      ],
      balance: 100.0
    }
  };
  const wrapper = mount(<Stock {...mockWithStocks} />);
  wrapper.find("input").simulate("change", { target: { value: "100" } });
  expect(wrapper.state().quantity).toEqual(100);

  const sellBtn = wrapper.find("button").last();
  expect(sellBtn.text()).toEqual("Sell");

  wrapper
    .find("button")
    .last()
    .simulate("click");
  expect(wrapper.state().priceTooHigh).toEqual(false);
  expect(wrapper.containsMatchingElement(<PriceTooHighWarning />)).toEqual(
    false
  );

  expect(wrapper.state().sellingTooMany).toEqual(true);
  expect(
    wrapper.containsMatchingElement(<SellingTooManySharesWarning />)
  ).toEqual(true);
});

it("has a disabled sell btn if the current stock is not in the portfolio", () => {
  const wrapper = mount(<Stock {...mockProps} />);
  const sellBtn = wrapper.find("button").last();
  expect(sellBtn.props().disabled).toEqual(true);
});

it("state.quantity will be an empty string if a value is input and then deleted", () => {
  // Placeholder text disappears if quantity is set to 0
  const wrapper = mount(<Stock {...mockProps} />);

  // Check the defaults
  const input = wrapper.find("input");
  expect(wrapper.state().quantity).toEqual("");
  expect(input.props().value).toEqual("");

  // Simulate input
  input.instance().value = 100;
  input.simulate("change", input);
  const inputOf100 = wrapper.find("input");
  expect(wrapper.state().quantity).toEqual(100);
  expect(inputOf100.props().value).toEqual(100);

  // Simulate delete
  input.instance().value = 0;
  input.simulate("change", input);
  const inputAfterDeletion = wrapper.find("input");
  expect(wrapper.state().quantity).toEqual("");
  expect(inputAfterDeletion.props().value).toEqual("");

  // Coercion, yay!
});
