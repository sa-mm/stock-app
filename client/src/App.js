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
          <TitleBar onSymbolSubmit={onSymbolSubmit} currentStock={currentStock} />
          <Grid divided stackable reversed='mobile' columns={2}>
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
      </div>
    )
  }
}

export default App
