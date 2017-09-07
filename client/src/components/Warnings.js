import React from 'react'
import { Message } from 'semantic-ui-react'

export const SellingTooManySharesWarning = (props) => {
  return (
    <Message
      color={props.color}
      visible
      header='You are selling too many!'
      list={[
        'The number of shares you are trying to sell exceeds the number in your portfolio.'
      ]}
      size='mini'
    />
  )
}

export const PriceTooHighWarning = (props) => {
  return (
    <Message
      color={props.color}
      visible
      warning
      header='You are buying too many!'
      list={['The total price of those shares exceeds your current balance']}
      size='mini'
    />
  )
}
