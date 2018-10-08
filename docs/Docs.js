import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import HistoricRatesLineChart from '../src';
import rates from './rates.json';

class Docs extends Component {
  render() {
    return (
      <div>
        <HistoricRatesLineChart format="MMM D" rates={rates || []} source="GBP" target="EUR" />
      </div>
    );
  }
}

export default hot(module)(Docs);
