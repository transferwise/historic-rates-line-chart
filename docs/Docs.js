import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import HistoricRatesLineChart from '../src';
import rates1 from './rates1.json';
import rates2 from './rates2.json';
import rates3 from './rates3.json';

class Docs extends Component {
  constructor(props) {
    super(props);
    this.source = 'GBP';
    this.target = 'EUR';
  }

  renderBasicSingleDataset() {
    const singleDataset = [{ rates: rates1.slice().reverse() }];
    return (
      <React.Fragment>
        <h2>Default Single Dataset</h2>
        <HistoricRatesLineChart
          format="MMM D"
          datasets={singleDataset}
          source={this.source}
          target={this.target}
        />
      </React.Fragment>
    );
  }

  renderBasicMultiDataset() {
    const multipleDatasets = [
      { rates: rates2.slice().reverse(), options: { borderColor: '#ffe202' } },
      { rates: rates3.slice().reverse(), options: { borderColor: '#ffa900' } },
    ];
    return (
      <React.Fragment>
        <h2>Default Multi-Dataset</h2>
        <HistoricRatesLineChart
          format="MMM D"
          datasets={multipleDatasets}
          source={this.source}
          target={this.target}
        />
      </React.Fragment>
    );
  }

  renderCustomConfiguredChart() {
    const multipleDatasets = [
      {
        rates: rates3.slice().reverse(),
        options: {
          borderColor: '#2ed06e',
          pointBackgroundColor: '#2ed06e',
          label: 'TransferWise',
          backgroundColor: '#2ed06e',
        },
      },
      {
        rates: rates2.slice().reverse(),
        options: {
          borderColor: '#00b9ff',
          pointBackgroundColor: '#00b9ff',
          label: 'UK Bank Average',
          backgroundColor: '#00b9ff',
        },
      },
    ];
    const options = {
      legend: {
        display: true,
        position: 'top',
        labels: {
          fontColor: '#829ca9',
        },
      },
      tooltips: {
        enabled: true,
        mode: 'index',
        position: 'nearest',
        intersect: false,
        backgroundColor: '#eeeeee',
        titleFontColor: '#37517e',
        bodyFontColor: '#37517e',
        xPadding: 16,
        yPadding: 8,
        cornerRadius: 3,
        displayColors: true,
        callbacks: {
          label: (tooltipItem, data) => {
            const { label } = data.datasets[tooltipItem.datasetIndex];
            return `1 ${this.source} → ${tooltipItem.yLabel} ${this.target} - [${label}]`;
          },
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              fontColor: '#a1bcc9',
              maxRotation: 0,
              maxTicksLimit: 8,
            },
          },
        ],
        yAxes: [
          {
            position: 'left',
            gridLines: {
              color: '#829ca9',
              drawBorder: false,
            },
            ticks: {
              fontColor: '#829ca9',
              maxTicksLimit: 5,
            },
          },
        ],
      },
    };
    return (
      <div style={{ height: '700px', color: 'black', backgroundColor: '#fff' }}>
        <h2>Custom Configured</h2>
        <div style={{ height: '650px' }}>
          <HistoricRatesLineChart
            format="MMM D"
            datasets={multipleDatasets}
            source={this.source}
            target={this.target}
            options={options}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={{ height: '300px', color: '#ffffff' }}>
        {this.renderBasicSingleDataset()}
        {this.renderBasicMultiDataset()}
        {this.renderCustomConfiguredChart()}
      </div>
    );
  }
}

export default hot(module)(Docs);
