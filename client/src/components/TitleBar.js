import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import SymbolSearchForm from './SymbolSearchForm'

class TitleBar extends Component {
  render () {
    const { onSymbolSubmit, currentStock } = this.props
    return (
      <Grid verticalAlign='top' columns='equal' padded='horizontally'>
        <Grid.Column>
          <Header size='large' id='title'>Simple Stock Exchange</Header>
        </Grid.Column>
        <Grid.Column width={3} />
        <Grid.Column>
          <SymbolSearchForm onSymbolSubmit={onSymbolSubmit} currentStock={currentStock} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default TitleBar
