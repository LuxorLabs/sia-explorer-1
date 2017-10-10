import React from 'react'
import { Column } from 'hedron'
import { Text } from 'components/Typography'

export default props => (
  <Column md={6}>
    <Text.Block altL2 small>
      {props.title}
    </Text.Block>
    <Text h5>
      {props.stat}
    </Text>
  </Column>
)
