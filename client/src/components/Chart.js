import React, { Component } from 'react'

// vx stuff
import { scaleLinear, scaleBand } from '@vx/scale'
import { Group } from '@vx/group'
import { AxisLeft, AxisBottom } from '@vx/axis'
import { LinearGradient } from '@vx/gradient'
import { BoxPlot } from '@vx/boxplot'

// d3 stuff
import { max, min } from 'd3-array'

class Chart extends Component {
  render () {
    const series = this.props.data['Time Series (Daily)']
    const dates = Object.keys(series)
    const datesWithInfo = dates.map(date => {
      return { 'date': date, 'info': series[date] }
    })
    const mungedData = datesWithInfo.slice(0, 10).reverse()

    const width = 750
    const height = 400
    const margin = {
      top: 60,
      bottom: 80,
      left: 80,
      right: 80
    }
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    // "1. open": "74.7700",
    // "2. high": "75.2400",
    // "3. low": "74.4400",
    // "4. close": "74.5750",
    // "5. volume": "693669"

    // accessors
    const x = d => d.date
    const minAcc = d => Number(d['info']['3. low'])
    const maxAcc = d => Number(d['info']['2. high'])
    const close = d => Number(d['info']['4. close'])
    const open = d => Number(d['info']['1. open'])
    const firstQuartile = d => close(d) < open(d) ? close(d) : open(d)
    const thirdQuartile = d => close(d) > open(d) ? close(d) : open(d)
    const median = d => (thirdQuartile(d) + firstQuartile(d)) / 2

    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: mungedData.map(x),
      padding: 0.65
    })

    const values = mungedData.reduce(
      (r, e) => r.push(e['info']['3. low'], e['info']['2. high']) && r,
      []
    )

    const minYValue = Number(min(values))
    const maxYValue = Number(max(values))

    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [minYValue - 0.1, maxYValue + 0.1]
    })

    const boxWidth = xScale.bandwidth()
    const actualyWidth = Math.min(40, boxWidth)

    const style = {
      display: 'block',
      margin: 'auto'
    }
    return (
      < svg width={width} height={height} style={style}>
        <LinearGradient id='boxplot' to='#8b6ce7' from='#87f2d4' />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={`url(#boxplot)`}
          rx={14}
        />
        <Group top={margin.top} left={margin.left}>
          <AxisLeft
            scale={yScale}
            top={0}
            left={0}
            label={'Price ($)'}
            stroke={'#1b1a1e'}
            tickTextFill={'#1b1a1e'}
          />
          <AxisBottom
            scale={xScale}
            top={yMax}
            stroke={'#1b1a1e'}
            tickTextFill={'#1b1a1e'}
            tickLabelProps={(value, index) => {
              return {
                transform: 'rotate(45 ' + xScale(value) + ',0)',
                dy: '-1em',
                dx: '0.4em',
                fontSize: 10
              }
            }}
          />
          {mungedData.map((d, i) =>
            <BoxPlot
              key={i}
              data={d}
              min={yScale(minAcc(d))}
              max={yScale(maxAcc(d))}
              left={xScale(x(d))}
              firstQuartile={yScale(firstQuartile(d))}
              thirdQuartile={yScale(thirdQuartile(d))}
              median={yScale(median(d))}
              medianProps={{
                style: {
                  stroke: 'none'
                }
              }}
              boxWidth={actualyWidth}
              fill={close(d) > open(d) ? '#FFFFFF' : 'red'}
              fillOpacity={0.3}
              stroke='#FFFFFF'
              strokeWidth={2}
            />
          )}
        </Group>
      </svg>
    )
  }
}

Chart.defaultProps = {
  data: {
    'Time Series (Daily)': {
      '2017-09-12': {
        '1. open': '74.7700',
        '2. high': '75.2400',
        '3. low': '74.4400',
        '4. close': '74.5750',
        '5. volume': '693669'
      }
    }
  }
}

export default Chart
