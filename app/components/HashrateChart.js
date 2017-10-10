import React, { Component } from 'react'
import styles from 'styles'
import ReactHighcharts from 'react-highcharts'
import calc from 'utils/calc'

class HashrateChart extends Component {
  processData = hr => {
    return hr.map(h => [
      new Date(h.time * 1000).getTime(),
      Math.ceil(h.hashrate)
    ])
  }
  componentWillMount () {
    const data = this.processData(this.props.data)
    this.config = {
      chart: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: '250'
      },
      colors: [styles.color.secondary],
      title: {
        text: 'User Hashrate',
        style: {
          color: '#FFFFFF',
          fontFamily: "'Interface', -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto"
        }
      },
      tooltip: {
        backgroundColor: styles.color.primary,
        borderColor: styles.color.secondary,
        style: {
          color: styles.color.light,
          fontFamily: "'Interface', -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto"
        }
      },
      plotOptions: {
        areaspline: {
          fillColor: styles.color.darkYellow,
          lineWidth: 1,
          lineColor: styles.color.secondary,
          marker: {
            lineWidth: 0,
            radius: 2,
            enabled: false,
            states: {
              hover: {
                enabled: true,
                fillColor: styles.color.secondary,
                lineWidth: 0
              }
            }
          },
          tooltip: {
            pointFormatter () {
              return `Hashrate: ${calc.smartHashrate(this.y)}/s`
            }
          }
        }
      },
      legend: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%e. %b',
          month: "%b '%y",
          year: '%Y'
        },
        title: {
          enabled: false
        }
      },
      yAxis: {
        title: {
          enabled: false
        }
      },
      series: [
        {
          name: 'Hashrate',
          type: 'areaspline',
          data
        }
      ],
      credits: {
        enabled: false
      }
    }
  }
  render () {
    return <ReactHighcharts neverReflow config={this.config} />
  }
}

export default HashrateChart
