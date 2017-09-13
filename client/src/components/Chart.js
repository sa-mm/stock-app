import React, { Component } from 'react'
import { XYFrame } from 'semiotic'

const data = [
  {
    id: 'linedata-1',
color: '#00a2ce',
    data: [
      { sales: 500, daysSinceRelease: 1 },
      { sales: 700, daysSinceRelease: 2 },
      { sales: 0, daysSinceRelease: 3 },
      { sales: 0, daysSinceRelease: 4 },
      { sales: 200, daysSinceRelease: 5 },
      { sales: 300, daysSinceRelease: 6 },
      { sales: 500, daysSinceRelease: 7 }
    ]
  }
]

class Chart extends Component {
  render () {
    return (
      <XYFrame
        size={[500, 500]}
        lines={data}
        xAccessor='daysSinceRelease'
        yAccessor='sales'
        lineDataAccessor='data'
        lineStyle={d => ({ stroke: d.color, fill: d.color })}
      />
    )
  }
}

export default Chart
