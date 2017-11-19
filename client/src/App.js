import React, { Component } from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import TitleBar from './components/TitleBar'
import Stock from './components/Stock'
import Portfolio from './components/Portfolio'

const style = {
  maxWidth: '780px'
}

class App extends Component {
  render () {
    const { portfolio, currentStock, onBuyClick, onSellClick, onSymbolSubmit, fetchHistory } = this.props

    return (
      <div className='App' style={style}>
        <Segment raised>
          <Grid divided='vertically'>
            <Grid.Row columns={1}>
              <Grid.Column>
                <TitleBar onSymbolSubmit={onSymbolSubmit} currentStock={currentStock} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} divided>
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
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default App
