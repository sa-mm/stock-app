import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

export const SellingTooManySharesWarning = ({ color }) => {
  return (
    <Message
      color={color}
      visible
      header='You are selling too many!'
      list={[
        'The number of shares you are trying to sell exceeds the number in your portfolio.'
      ]}
      size='mini'
    />
  )
}

export const PriceTooHighWarning = ({ color }) => {
  return (
    <Message
      color={color}
      visible
      warning
      header='You are buying too many!'
      list={['The total price of those shares exceeds your current balance']}
      size='mini'
    />
  )
}

const sharedTypes = {
  color: PropTypes.oneOf(['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']).isRequired
}

const sharedDefaults = {
  color: 'red'
}

SellingTooManySharesWarning.propTypes = sharedTypes
PriceTooHighWarning.propTypes = sharedTypes

SellingTooManySharesWarning.defaultProps = sharedDefaults
PriceTooHighWarning.defaultProps = sharedDefaults
