import React, { Component } from 'react'
import { Grid, Header, Divider, Responsive } from 'semantic-ui-react'
import SymbolSearchForm from './SymbolSearchForm'

class TitleBar extends Component {
  render () {
    const { onSymbolSubmit, currentStock } = this.props
    return (
      <div>
        <Grid verticalAlign='top' columns='equal' doubling>
          <Grid.Column floated='left'>
            <Header size='large' id='title'>Simple Stock Exchange</Header>
          </Grid.Column>
          <Grid.Column floated='right'
            style={{
              display: 'flex',
              alignItems: 'flex-end'}}
              >
            <SymbolSearchForm
              onSymbolSubmit={onSymbolSubmit}
              currentStock={currentStock}
            />
          </Grid.Column>
        </Grid>
        <Responsive as={Divider} minWidth={768} />
      </div>
    )
  }
}

export default TitleBar
