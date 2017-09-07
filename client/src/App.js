import React, { Component } from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import TitleBar from './components/TitleBar'
import Stock from './components/Stock'
import Portfolio from './components/Portfolio'

const style = {
  maxWidth: '780px',
  marginRight: '80px',
  marginLeft: '80px',
  marginTop: '80px',
  marginBottom: '80px'
}

class App extends Component {
  render () {
    const { stocks, balance, currentStock, onBuyClick, onSellClick, onSymbolSubmit } = this.props

    return (
      <div className='App' style={style}>
        <Segment raised>
          <Grid divided='vertically'>
            <Grid.Row columns={1}>
              <Grid.Column>
                <TitleBar actions={{ onSymbolSubmit }} currentStock={currentStock} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} divided>
              <Grid.Column width={8}>
                <Stock
                  portfolio={{ stocks, balance }}
                  currentStock={currentStock}
                  actions={{ onBuyClick, onSellClick }}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Portfolio
                  portfolio={{ stocks, balance }}
                  actions={{ onSymbolSubmit }}
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
